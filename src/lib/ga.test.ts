import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";
import {
  assertPageViewPayloadSafe,
  buildPageViewPayload,
  parseMeasurementId,
  type PageViewPayload,
  type SanitizedPath,
} from "@/lib/ga";
import { getGaMeasurementId } from "@/lib/env";
import { SITE } from "@/lib/site";

afterEach(() => {
  delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
});

describe("assertPageViewPayloadSafe", () => {
  test("fails when page_location is missing", () => {
    const incomplete = {
      page_title: SITE.name,
      page_path: "/terms" as SanitizedPath,
    } as PageViewPayload;

    assert.throws(
      () => assertPageViewPayloadSafe(incomplete),
      /page_location/,
    );
  });

  test("fails when sent location/path/referrer contain ?, #, email, or token-like segments", () => {
    const withQuery: PageViewPayload = {
      page_title: SITE.name,
      page_path: "/privacy" as SanitizedPath,
      page_location: "https://creekstream.live/privacy?utm=1",
    };
    assert.throws(() => assertPageViewPayloadSafe(withQuery), /\?/);

    const withHash: PageViewPayload = {
      page_title: SITE.name,
      page_path: "/privacy" as SanitizedPath,
      page_location: "https://creekstream.live/privacy#section",
    };
    assert.throws(() => assertPageViewPayloadSafe(withHash), /#/);

    const withEmail: PageViewPayload = {
      page_title: SITE.name,
      page_path: "/u/user@x.com" as SanitizedPath,
      page_location: "https://creekstream.live/u/user@x.com",
    };
    assert.throws(() => assertPageViewPayloadSafe(withEmail), /email/i);

    const authFixtures: Array<{ label: string; path: string; location: string }> =
      [
        {
          label: "reset-password",
          path: "/reset-password/a1b2c3d4e5f6g7h8i9j0k1l2",
          location:
            "https://creekstream.live/reset-password/a1b2c3d4e5f6g7h8i9j0k1l2",
        },
        {
          label: "invite",
          path: "/invite/eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.signaturepart",
          location:
            "https://creekstream.live/invite/eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.signaturepart",
        },
        {
          label: "magic-link",
          path: "/magic-link/AbCdEfGhIjKlMnOpQrStUvWx",
          location:
            "https://creekstream.live/magic-link/AbCdEfGhIjKlMnOpQrStUvWx",
        },
      ];

    for (const fixture of authFixtures) {
      const dirty: PageViewPayload = {
        page_title: SITE.name,
        page_path: fixture.path as SanitizedPath,
        page_location: fixture.location,
      };
      assert.throws(
        () => assertPageViewPayloadSafe(dirty),
        /token/i,
        `expected token-like failure for ${fixture.label}`,
      );
    }

    const dirtyReferrer: PageViewPayload = {
      page_title: SITE.name,
      page_path: "/terms" as SanitizedPath,
      page_location: "https://creekstream.live/terms",
      page_referrer: "https://evil.test/a?secret=1" as PageViewPayload["page_referrer"],
    };
    assert.throws(() => assertPageViewPayloadSafe(dirtyReferrer), /\?/);
  });

  test("page_title matches SITE.name", () => {
    const payload = buildPageViewPayload({
      origin: "https://creekstream.live",
      pathname: "/privacy",
    });
    assert.equal(payload.page_title, SITE.name);
  });

  test("accepts sanitized builder output including dirty inputs", () => {
    const payload = buildPageViewPayload({
      origin: "https://creekstream.live",
      pathname: "/reset-password/a1b2c3d4e5f6g7h8i9j0k1l2?utm=1#top",
      documentReferrer: "https://news.example/a?utm=1#frag",
    });
    assert.equal(payload.page_title, SITE.name);
    assert.equal(payload.page_path, "/reset-password/_");
    assert.equal(
      payload.page_location,
      "https://creekstream.live/reset-password/_",
    );
    assert.equal(payload.page_referrer, "https://news.example");
    assert.doesNotThrow(() => assertPageViewPayloadSafe(payload));
  });
});

describe("measurement id no-op", () => {
  test("parseMeasurementId and getGaMeasurementId return undefined when unset/empty", () => {
    assert.equal(parseMeasurementId(undefined), undefined);
    assert.equal(parseMeasurementId(""), undefined);
    assert.equal(parseMeasurementId("   "), undefined);

    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    assert.equal(getGaMeasurementId(), undefined);

    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "";
    assert.equal(getGaMeasurementId(), undefined);

    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST123456";
    assert.equal(getGaMeasurementId(), "G-TEST123456");
  });
});
