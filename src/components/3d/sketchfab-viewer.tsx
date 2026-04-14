"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Props = {
  uid: string;
  alt: string;
  /** Auto-spin speed (0 = off). Default 0.2. */
  autoSpin?: number;
  /** Hide the bottom info bar where supported. */
  hideInfo?: boolean;
  /** Disable user interaction (purely decorative). */
  disableInteraction?: boolean;
  /** Show the AR button (mobile). */
  showAr?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Lazy-mounts a Sketchfab iframe embed once the container scrolls into view.
 * Embeds work for any publicly-visible Sketchfab model — no auth required.
 */
export function SketchfabViewer({
  uid,
  alt,
  autoSpin = 0.2,
  hideInfo = true,
  disableInteraction = false,
  showAr = false,
  className,
  style,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const params = new URLSearchParams({
    autostart: "1",
    transparent: "1",
    preload: "1",
    ui_animations: "0",
    ui_inspector: "0",
    ui_settings: "0",
    ui_stop: "0",
    ui_help: "0",
    ui_hint: "0",
    ui_loading: "0",
    annotations_visible: "0",
    autospin: String(autoSpin),
    ...(hideInfo ? { ui_infos: "0" } : {}),
    ...(disableInteraction
      ? { camera: "0", ui_controls: "0" }
      : {}),
    ...(showAr ? { ui_ar: "1" } : { ui_ar: "0" }),
  });

  const src = `https://sketchfab.com/models/${uid}/embed?${params.toString()}`;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", ...style }}
    >
      {inView ? (
        <>
          <iframe
            title={alt}
            src={src}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            onLoad={() => setLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              border: 0,
              background: "transparent",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.4s ease",
              pointerEvents: disableInteraction ? "none" : "auto",
            }}
          />
          {!loaded && <LoadingOverlay />}
        </>
      ) : (
        <LoadingOverlay />
      )}
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/[0.04] to-black/[0.08]"
      aria-hidden="true"
    >
      <div className="size-8 rounded-full border-2 border-famco-blue/30 border-t-famco-blue animate-spin" />
    </div>
  );
}
