"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Props = {
  uid: string;
  alt: string;
  /** Auto-spin speed (0 = off). Default 0. */
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Lazy-mount when scrolled near viewport
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

  // Initialize the embed when in view
  useEffect(() => {
    if (!inView) return;
    const iframe = iframeRef.current;
    if (!iframe) return;
    let cancelled = false;
    let sdkUsed = false;

    // Hard fallback: if SDK doesn't take over and recenter within 3s,
    // load plain embed URL so the user always sees the model.
    const fallbackTimer = window.setTimeout(() => {
      if (cancelled || sdkUsed) return;
      iframe.src = buildEmbedUrl({
        uid,
        autoSpin,
        hideInfo,
        disableInteraction,
        showAr,
      });
    }, 3000);

    // Try the SDK path — gives us recenterCamera() for proper framing.
    loadSdk()
      .then(() => {
        if (cancelled || !window.Sketchfab) return;
        sdkUsed = true;
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
            // Listener attached BEFORE start so we never miss the event.
            api.addEventListener("viewerready", () => {
              if (cancelled) return;
              try {
                api.recenterCamera();
                // Some models need a second pass once meshes finish loading.
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
            // Final safety: if viewerready never fires, reveal anyway.
            window.setTimeout(() => {
              if (!cancelled) setLoaded(true);
            }, 5000);
          },
          error: () => {
            if (cancelled) return;
            // SDK init failed — fall back to plain iframe URL.
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
        // SDK script failed to load — fallback timer will handle it.
      });

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
    };
  }, [inView, uid, autoSpin, hideInfo, disableInteraction, showAr]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", overflow: "hidden", ...style }}
    >
      {inView && (
        <iframe
          ref={iframeRef}
          title={alt}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
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
