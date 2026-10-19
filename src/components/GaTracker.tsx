"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import {
  buildPageViewPayload,
  type MeasurementId,
} from "@/lib/ga";

type GaTrackerProps = {
  measurementId: MeasurementId;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function sendPageView(pathname: string): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  // Never send search or hash — pathname only; builder strips leftovers.
  const payload = buildPageViewPayload({
    origin: window.location.origin,
    pathname,
    documentReferrer: document.referrer || undefined,
  });
  window.gtag("event", "page_view", payload);
}

export function GaTracker({ measurementId }: GaTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    sendPageView(pathname);
  }, [pathname]);

  const configJson = JSON.stringify({
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',${configJson});`}
      </Script>
    </>
  );
}
