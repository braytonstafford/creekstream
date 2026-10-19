import { SITE } from "@/lib/site";

/** Non-empty GA4 id matching G- + alphanumerics. Construct only via parseMeasurementId. */
export type MeasurementId = string & { readonly __brand: "MeasurementId" };

/**
 * Path with leading slash, no query/hash, email-like or token-like segments redacted.
 * Construct only via sanitizePathForAnalytics.
 */
export type SanitizedPath = string & { readonly __brand: "SanitizedPath" };

/** Origin-only URL (scheme + host[+port]). Construct only via sanitizeReferrerOrigin. */
export type OriginOnlyUrl = string & { readonly __brand: "OriginOnlyUrl" };

export type PageViewInput = {
  origin: string;
  pathname: string;
  documentReferrer?: string;
};

export type PageViewPayload = {
  page_title: string;
  page_path: SanitizedPath;
  page_location: string;
  page_referrer?: OriginOnlyUrl;
};

const MEASUREMENT_ID_RE = /^G-[A-Z0-9]+$/i;
const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
/** Opaque path segment: long base64url / hex / UUID-ish material. */
const TOKEN_SEGMENT_RE =
  /^(?:[A-Za-z0-9_-]{16,}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;
const JWT_LIKE_RE = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

function isEmailLike(value: string): boolean {
  return EMAIL_RE.test(value) || value.includes("@");
}

function isTokenLikeSegment(segment: string): boolean {
  if (!segment) return false;
  if (JWT_LIKE_RE.test(segment)) return true;
  if (TOKEN_SEGMENT_RE.test(segment)) return true;
  return false;
}

function containsTokenLikeText(value: string): boolean {
  if (JWT_LIKE_RE.test(value)) return true;
  for (const part of value.split(/[/?#&=]/)) {
    if (isTokenLikeSegment(part)) return true;
  }
  return false;
}

function stripQueryAndHash(raw: string): string {
  const q = raw.indexOf("?");
  const h = raw.indexOf("#");
  let end = raw.length;
  if (q >= 0) end = Math.min(end, q);
  if (h >= 0) end = Math.min(end, h);
  return raw.slice(0, end);
}

/** Trim + brand. Empty or invalid shape → undefined (no-op signal). */
export function parseMeasurementId(
  raw: string | undefined,
): MeasurementId | undefined {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return undefined;
  if (!MEASUREMENT_ID_RE.test(trimmed)) return undefined;
  return trimmed as MeasurementId;
}

/**
 * Strip ?, # if present. Redact email-like and token-like path segments
 * to a placeholder so auth-style routes never leak into analytics.
 */
export function sanitizePathForAnalytics(pathname: string): SanitizedPath {
  const stripped = stripQueryAndHash(pathname.trim() || "/");
  const withSlash = stripped.startsWith("/") ? stripped : `/${stripped}`;
  const segments = withSlash.split("/").map((segment) => {
    if (!segment) return segment;
    if (isEmailLike(segment) || isTokenLikeSegment(segment)) {
      return "_";
    }
    return segment;
  });
  const joined = segments.join("/") || "/";
  return joined as SanitizedPath;
}

/**
 * Origin only, or undefined when missing/invalid/empty.
 * Raw query/hash on document.referrer is stripped via URL.origin — not a throw.
 */
export function sanitizeReferrerOrigin(
  documentReferrer: string | undefined,
): OriginOnlyUrl | undefined {
  const raw = (documentReferrer ?? "").trim();
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return undefined;
    }
    return url.origin as OriginOnlyUrl;
  } catch {
    return undefined;
  }
}

/** Pure. Builds a PageViewPayload safe to hand to gtag. page_title from SITE.name. */
export function buildPageViewPayload(input: PageViewInput): PageViewPayload {
  const path = sanitizePathForAnalytics(input.pathname);
  const origin = input.origin.replace(/\/$/, "");
  const page_location = `${origin}${path}`;
  const page_referrer = sanitizeReferrerOrigin(input.documentReferrer);
  const payload: PageViewPayload = {
    page_title: SITE.name,
    page_path: path,
    page_location,
  };
  if (page_referrer) {
    payload.page_referrer = page_referrer;
  }
  return payload;
}

/**
 * Test-facing postcondition. Throws if page_location missing or if
 * location/path/referrer contain "?", "#", email-like text, or token-like segments.
 */
export function assertPageViewPayloadSafe(payload: PageViewPayload): void {
  const location = (payload as { page_location?: unknown }).page_location;
  if (typeof location !== "string" || location.length === 0) {
    throw new Error("page_location is required");
  }

  const fields: Array<{ name: string; value: string | undefined }> = [
    { name: "page_location", value: location },
    { name: "page_path", value: payload.page_path },
    { name: "page_referrer", value: payload.page_referrer },
  ];

  for (const { name, value } of fields) {
    if (value === undefined) continue;
    if (value.includes("?")) {
      throw new Error(`${name} must not contain query ("?")`);
    }
    if (value.includes("#")) {
      throw new Error(`${name} must not contain hash ("#")`);
    }
    if (isEmailLike(value)) {
      throw new Error(`${name} must not contain email-like text`);
    }
    if (containsTokenLikeText(value)) {
      throw new Error(`${name} must not contain token-like segments`);
    }
  }
}
