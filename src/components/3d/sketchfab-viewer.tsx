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
  /**
   * After load, call recenterCamera() via the Sketchfab Viewer API so
   * the model fills the container instead of using the author's
   * (often awkwardly-cropped) saved camera.
   */
  recenterOnLoad?: boolean;
  className?: string;
  style?: CSSProperties;
};

declare global {
  interface Window {
    Sketchfab?: new (
      version: string,
      iframe: HTMLIFrameElement
    ) => {
      init: (
        uid: string,
        opts: {
          success: (api: SketchfabApi) => void;
          error?: () => void;
          autostart?: number;
          ui_infos?: number;
          ui_controls?: number;
          ui_watermark?: number;
          ui_help?: number;
          ui_settings?: number;
          ui_inspector?: number;
          ui_stop?: number;
          ui_animations?: number;
          ui_hint?: number;
          ui_loading?: number;
          ui_ar?: number;
          annotations_visible?: number;
          camera?: number;
          autospin?: number;
          preload?: number;
          transparent?: number;
        }
      ) => void;
    };
  }
}

type SketchfabApi = {
  start: () => void;
  recenterCamera: () => void;
  setCameraEasing: (easing: string) => void;
  setSpeedFactor: (n: number) => void;
};

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
    s.onerror = () => reject(new Error("Failed to load Sketchfab SDK"));
    document.head.appendChild(s);
  });
  return sdkPromise;
}

export function SketchfabViewer({
  uid,
  alt,
  autoSpin = 0.2,
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
      { rootMargin: "200px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // SDK-driven init when recentering is requested
  useEffect(() => {
    if (!inView || !recenterOnLoad) return;
    const iframe = iframeRef.current;
    if (!iframe) return;
    let cancelled = false;
    loadSdk()
      .then(() => {
        if (cancelled || !window.Sketchfab) return;
        const client = new window.Sketchfab("1.12.1", iframe);
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
            api.start();
            // Wait briefly for model to be staged, then recenter
            setTimeout(() => {
              try {
                api.recenterCamera();
              } catch {
                // ignore — camera method may not be available for some models
              }
              setLoaded(true);
            }, 600);
          },
          error: () => setLoaded(true),
        });
      })
      .catch(() => setLoaded(true));
    return () => {
      cancelled = true;
    };
  }, [inView, recenterOnLoad, uid, autoSpin, hideInfo, disableInteraction, showAr]);

  // Plain iframe path (default — fastest, no SDK overhead)
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
    ...(disableInteraction ? { camera: "0", ui_controls: "0" } : {}),
    ui_ar: showAr ? "1" : "0",
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
          {recenterOnLoad ? (
            // SDK initializes this iframe (no src attribute needed).
            <iframe
              ref={iframeRef}
              title={alt}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
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
          ) : (
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
          )}
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
