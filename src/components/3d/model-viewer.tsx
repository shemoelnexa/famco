"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerJSX;
    }
  }
}

type ModelViewerJSX = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    src?: string;
    alt?: string;
    poster?: string;
    "auto-rotate"?: boolean | string;
    "auto-rotate-delay"?: string | number;
    "rotation-per-second"?: string;
    "camera-controls"?: boolean | string;
    "disable-zoom"?: boolean | string;
    "disable-pan"?: boolean | string;
    "disable-tap"?: boolean | string;
    "interaction-prompt"?: "auto" | "when-focused" | "none";
    "interaction-prompt-style"?: "wiggle" | "basic";
    "shadow-intensity"?: string | number;
    "shadow-softness"?: string | number;
    "environment-image"?: string;
    "skybox-image"?: string;
    exposure?: string | number;
    ar?: boolean | string;
    "ar-modes"?: string;
    "ar-scale"?: string;
    "camera-orbit"?: string;
    "field-of-view"?: string;
    "min-camera-orbit"?: string;
    "max-camera-orbit"?: string;
    loading?: "auto" | "lazy" | "eager";
    reveal?: "auto" | "interaction" | "manual";
    style?: CSSProperties;
  },
  HTMLElement
>;

type Props = {
  src: string;
  alt: string;
  poster?: string;
  cameraOrbit?: string;
  fieldOfView?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  disableZoom?: boolean;
  disablePan?: boolean;
  ar?: boolean;
  className?: string;
  style?: CSSProperties;
  rotationPerSecond?: string;
  showInteractionPrompt?: boolean;
};

let modelViewerLoadPromise: Promise<void> | null = null;

function loadModelViewerOnce(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (customElements.get("model-viewer")) return Promise.resolve();
  if (!modelViewerLoadPromise) {
    modelViewerLoadPromise = import("@google/model-viewer").then(() => undefined);
  }
  return modelViewerLoadPromise;
}

export function ModelViewer({
  src,
  alt,
  poster,
  cameraOrbit = "45deg 75deg 4m",
  fieldOfView = "30deg",
  autoRotate = true,
  cameraControls = true,
  disableZoom = false,
  disablePan = true,
  ar = false,
  className,
  style,
  rotationPerSecond = "20deg",
  showInteractionPrompt = false,
}: Props) {
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Lazy mount once in view
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

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    loadModelViewerOnce().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [inView]);

  return (
    <div ref={containerRef} className={className} style={style}>
      {ready ? (
        <model-viewer
          src={src}
          alt={alt}
          poster={poster}
          camera-orbit={cameraOrbit}
          field-of-view={fieldOfView}
          auto-rotate={autoRotate ? "" : undefined}
          rotation-per-second={rotationPerSecond}
          camera-controls={cameraControls ? "" : undefined}
          disable-zoom={disableZoom ? "" : undefined}
          disable-pan={disablePan ? "" : undefined}
          interaction-prompt={showInteractionPrompt ? "auto" : "none"}
          shadow-intensity="1"
          shadow-softness="0.85"
          exposure="1.15"
          environment-image="neutral"
          ar={ar ? "" : undefined}
          ar-modes={ar ? "webxr scene-viewer quick-look" : undefined}
          loading="lazy"
          reveal="auto"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            ["--poster-color" as never]: "transparent",
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black/[0.04] to-black/[0.08] animate-pulse">
          <div className="size-8 rounded-full border-2 border-famco-blue/30 border-t-famco-blue animate-spin" />
        </div>
      )}
    </div>
  );
}
