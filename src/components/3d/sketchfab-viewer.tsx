"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Props = {
  uid: string;
  alt: string;
  /** Auto-spin speed (0 = off). Default 0. */
  autoSpin?: number;
  /** Hide the bottom info bar where supported (free accounts may still show it). */
  hideInfo?: boolean;
  /** Disable user interaction (purely decorative). */
  disableInteraction?: boolean;
  /** Show the AR button (mobile). */
  showAr?: boolean;
  className?: string;
  style?: CSSProperties;
};

function buildEmbedUrl(opts: {
  uid: string;
  autoSpin: number;
  hideInfo: boolean;
  disableInteraction: boolean;
  showAr: boolean;
}) {
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
    autospin: String(opts.autoSpin),
    ui_infos: opts.hideInfo ? "0" : "1",
    ui_ar: opts.showAr ? "1" : "0",
    ...(opts.disableInteraction ? { camera: "0", ui_controls: "0" } : {}),
  });
  return `https://sketchfab.com/models/${opts.uid}/embed?${params.toString()}`;
}

/**
 * Minimal Sketchfab iframe embed.
 * - Lazy-mounts when scrolled into view (IntersectionObserver, rootMargin 100px).
 * - Plain iframe with src — guaranteed to load. No SDK overhead.
 * - Framing is whatever the model author saved on Sketchfab. Models that show
 *   too small are a per-model authoring choice we can't override without the
 *   SDK (which proved unreliable).
 */
export function SketchfabViewer({
  uid,
  alt,
  autoSpin = 0,
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
      { rootMargin: "100px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const src = inView
    ? buildEmbedUrl({ uid, autoSpin, hideInfo, disableInteraction, showAr })
    : undefined;

  return (
    <div ref={containerRef} className={className} style={style}>
      {inView && (
        <iframe
          key={uid}
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
            display: "block",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: disableInteraction ? "none" : "auto",
          }}
        />
      )}
      {!loaded && <LoadingOverlay />}
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black/[0.04] to-black/[0.08] pointer-events-none"
      aria-hidden="true"
    >
      <div className="size-8 rounded-full border-2 border-famco-blue/30 border-t-famco-blue animate-spin" />
    </div>
  );
}
