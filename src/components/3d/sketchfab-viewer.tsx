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
    s.onerror = () => reject(new Error("Failed to load Sketchfab SDK"));
    document.head.appendChild(s);
  });
  return sdkPromise;
}

/**
 * Sketchfab embed with auto-recentering camera.
 * Lazy-mounts the iframe when scrolled into view, then uses the Sketchfab
 * Viewer SDK to (a) initialize the model and (b) call recenterCamera() on
 * viewerready so it fills the container regardless of the author's saved camera.
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

  // SDK init when in view
  useEffect(() => {
    if (!inView) return;
    const iframe = iframeRef.current;
    if (!iframe) return;
    let cancelled = false;
    let started = false;

    loadSdk()
      .then(() => {
        if (cancelled || !window.Sketchfab) {
          if (!cancelled) setLoaded(true);
          return;
        }
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
            if (cancelled) return;
            api.start();
            api.addEventListener("viewerready", () => {
              if (cancelled) return;
              try {
                api.recenterCamera();
              } catch {
                // ignore — some models throw; framing fallback below
              }
              if (!started) {
                started = true;
                setLoaded(true);
              }
            });
            // Fallback in case viewerready never fires
            setTimeout(() => {
              if (!cancelled && !started) {
                started = true;
                setLoaded(true);
              }
            }, 4000);
          },
          error: () => {
            if (!cancelled) setLoaded(true);
          },
        });
      })
      .catch(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [inView, uid, autoSpin, hideInfo, disableInteraction, showAr]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", ...style }}
    >
      {inView && (
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
