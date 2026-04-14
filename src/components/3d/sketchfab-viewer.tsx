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
  /**
   * Use the Sketchfab Viewer SDK to call recenterCamera() after load,
   * giving a sensible 3/4 framing instead of the author's saved camera.
   * Costs an extra ~150KB SDK script + has a small fallback delay if
   * SDK fails — only enable for premium spots like the hero.
   */
  recenterOnLoad?: boolean;
  className?: string;
  style?: CSSProperties;
};

type SketchfabApi = {
  start: () => void;
  recenterCamera: () => void;
  addEventListener: (event: string, handler: () => void) => void;
};

declare global {
  interface Window {
    Sketchfab?: new (
      versionOrIframe: string | HTMLIFrameElement,
      iframe?: HTMLIFrameElement
    ) => {
      init: (
        uid: string,
        opts: Record<string, unknown> & {
          success: (api: SketchfabApi) => void;
          error?: () => void;
        }
      ) => void;
    };
  }
}

const SDK_URL = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
let sdkPromise: Promise<void> | null = null;

function loadSdk(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Sketchfab) return Promise.resolve();
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SDK_URL;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      sdkPromise = null;
      reject(new Error("SDK load failed"));
    };
    document.head.appendChild(s);
  });
  return sdkPromise;
}

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
  recenterOnLoad = false,
  className,
  style,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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
      { rootMargin: "600px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Optional SDK init (only when recenterOnLoad=true) — gives proper 3/4
  // framing via api.recenterCamera() on viewerready. If SDK fails or stalls,
  // a 3-second timer drops the iframe.src as a guaranteed fallback so the
  // model always appears.
  useEffect(() => {
    if (!recenterOnLoad || !inView) return;
    const iframe = iframeRef.current;
    if (!iframe) return;
    let cancelled = false;
    let sdkTookOver = false;

    const fallbackTimer = window.setTimeout(() => {
      if (cancelled || sdkTookOver) return;
      iframe.src = buildEmbedUrl({
        uid,
        autoSpin,
        hideInfo,
        disableInteraction,
        showAr,
      });
    }, 3000);

    loadSdk()
      .then(() => {
        if (cancelled || !window.Sketchfab) return;
        sdkTookOver = true;
        window.clearTimeout(fallbackTimer);
        const client = new window.Sketchfab("1.0.0", iframe);
        client.init(uid, {
          autostart: 1,
          preload: 1,
          transparent: 1,
          ui_infos: hideInfo ? 0 : 1,
          ui_controls: disableInteraction ? 0 : 1,
          ui_help: 0,
          ui_settings: 0,
          ui_inspector: 0,
          ui_stop: 0,
          ui_animations: 0,
          ui_hint: 0,
          ui_loading: 0,
          annotations_visible: 0,
          camera: disableInteraction ? 0 : 1,
          autospin: autoSpin,
          ui_ar: showAr ? 1 : 0,
          success: (api) => {
            if (cancelled) return;
            api.addEventListener("viewerready", () => {
              if (cancelled) return;
              try {
                api.recenterCamera();
                window.setTimeout(() => {
                  try {
                    api.recenterCamera();
                  } catch {
                    /* ignore */
                  }
                }, 600);
              } catch {
                /* ignore */
              }
              setLoaded(true);
            });
            api.start();
            window.setTimeout(() => {
              if (!cancelled) setLoaded(true);
            }, 5000);
          },
          error: () => {
            if (cancelled) return;
            iframe.src = buildEmbedUrl({
              uid,
              autoSpin,
              hideInfo,
              disableInteraction,
              showAr,
            });
          },
        });
      })
      .catch(() => {
        // SDK failed — fallback timer handles it.
      });

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
    };
  }, [recenterOnLoad, inView, uid, autoSpin, hideInfo, disableInteraction, showAr]);

  // Plain-iframe path (default). When recenterOnLoad is true the iframe is
  // mounted without src; the SDK or the fallback timer fills it in.
  const src =
    inView && !recenterOnLoad
      ? buildEmbedUrl({ uid, autoSpin, hideInfo, disableInteraction, showAr })
      : undefined;

  return (
    <div ref={containerRef} className={className} style={style}>
      {inView && (
        <iframe
          key={uid}
          ref={iframeRef}
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
