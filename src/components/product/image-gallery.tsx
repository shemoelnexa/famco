"use client";

import { useState, useCallback, useEffect } from "react";
import { RotateCcw, ZoomIn, X, ChevronLeft, ChevronRight, Grid2x2, Images, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModelViewer } from "@/components/3d/model-viewer";
import { getModelForProduct } from "@/lib/models-3d";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  productId?: string;
  category?: string;
}

export function ImageGallery({ images, alt, productId, category }: ImageGalleryProps) {
  const model = getModelForProduct({ id: productId, category });
  const [activeIndex, setActiveIndex] = useState(0);
  const [show360, setShow360] = useState(true); // default to 3D View
  const [lightbox, setLightbox] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const handlePrev = useCallback(
    () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1)),
    [images.length]
  );
  const handleNext = useCallback(
    () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1)),
    [images.length]
  );

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, handlePrev, handleNext]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    if (lightbox || showGrid) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox, showGrid]);

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main image area */}
        <div className="relative overflow-hidden rounded-2xl bg-[#F0EFEE] group">
          {show360 ? (
            /* ---- Real 3D Model Viewer ---- */
            <div className="aspect-[3/2] relative bg-gradient-to-br from-[#F4F4F4] to-[#E5E5E5]">
              <ModelViewer
                src={model.src}
                alt={`${alt} — interactive 3D view`}
                cameraOrbit={model.cameraOrbit}
                fieldOfView={model.fieldOfView}
                autoRotate
                cameraControls
                disableZoom={false}
                disablePan
                ar
                rotationPerSecond="14deg"
                showInteractionPrompt
                className="absolute inset-0"
              />

              {/* Bottom bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="rounded-lg bg-black/60 backdrop-blur-sm px-3 py-1.5 text-[12px] font-medium text-white inline-flex items-center gap-1.5 pointer-events-auto">
                  <Box className="size-3.5" />
                  Interactive 3D View · Drag, zoom, AR
                </span>
                <button
                  onClick={() => setShow360(false)}
                  className="rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[12px] font-medium text-black transition-colors hover:bg-white pointer-events-auto"
                >
                  View Photos
                </button>
              </div>
            </div>
          ) : (
            /* ---- Normal image view ---- */
            <div className="aspect-[3/2] relative">
              <img
                key={activeIndex}
                src={images[activeIndex]}
                alt={`${alt} - Photo ${activeIndex + 1}`}
                className="h-full w-full object-cover transition-opacity duration-300"
              />

              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow transition-all hover:bg-white hover:shadow-md opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="size-5 text-black" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow transition-all hover:bg-white hover:shadow-md opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="size-5 text-black" />
                  </button>
                </>
              )}

              {/* Top controls */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <button
                  onClick={() => setShow360(true)}
                  className="flex items-center gap-1.5 rounded-lg bg-black/50 backdrop-blur-md px-3 py-2 text-[12px] font-medium text-white transition-colors hover:bg-black/70"
                >
                  <Box className="size-3.5" />
                  3D View
                </button>
                <button
                  onClick={() => setLightbox(true)}
                  className="flex items-center justify-center size-9 rounded-lg bg-black/50 backdrop-blur-md text-white transition-colors hover:bg-black/70"
                >
                  <ZoomIn className="size-4" />
                </button>
                <button
                  onClick={() => setShowGrid(true)}
                  className="flex items-center justify-center size-9 rounded-lg bg-black/50 backdrop-blur-md text-white transition-colors hover:bg-black/70"
                >
                  <Grid2x2 className="size-4" />
                </button>
              </div>

              {/* Bottom bar — counter + "View all" */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                {/* Dot indicators */}
                <div className="flex items-center gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={cn(
                        "rounded-full transition-all duration-300",
                        i === activeIndex
                          ? "w-6 h-1.5 bg-white"
                          : "size-1.5 bg-white/50 hover:bg-white/80"
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setShowGrid(true)}
                  className="flex items-center gap-1.5 rounded-lg bg-black/50 backdrop-blur-md px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-black/70"
                >
                  <Images className="size-3.5" />
                  View all {images.length} photos
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail strip — bento style */}
        {images.length > 1 && !show360 && (
          <div className={cn(
            "grid gap-2",
            images.length === 2 && "grid-cols-2",
            images.length === 3 && "grid-cols-3",
            images.length >= 4 && "grid-cols-3 sm:grid-cols-4"
          )}>
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative overflow-hidden rounded-xl bg-[#F0EFEE] transition-all duration-200 aspect-[4/3]",
                  index === activeIndex
                    ? "ring-2 ring-black ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                )}
              >
                <img
                  src={image}
                  alt={`${alt} - ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                {index === activeIndex && (
                  <div className="absolute inset-0 bg-famco-blue/10" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ===== Full Gallery Grid Overlay ===== */}
      {showGrid && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-lg border-b border-black/[0.06]">
            <div className="mx-auto max-w-[1200px] px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-[18px] font-semibold text-black tracking-tight">{alt}</h3>
                <p className="text-[13px] text-black/40">{images.length} photos</p>
              </div>
              <button
                onClick={() => setShowGrid(false)}
                className="flex size-10 items-center justify-center rounded-xl bg-black/[0.04] text-black/60 transition-colors hover:bg-black/[0.08] hover:text-black"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Gallery grid */}
          <div className="mx-auto max-w-[1200px] px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setShowGrid(false);
                    setLightbox(true);
                  }}
                  className="group relative overflow-hidden rounded-2xl bg-[#F0EFEE] aspect-[3/2] transition-all duration-300 hover:shadow-lg"
                >
                  <img
                    src={image}
                    alt={`${alt} - Photo ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute bottom-3 left-3 rounded-lg bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[12px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {index + 1} / {images.length}
                  </div>
                  <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-lg bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="size-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== Lightbox ===== */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[110] flex flex-col bg-black/95"
          onClick={() => setLightbox(false)}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4" onClick={(e) => e.stopPropagation()}>
            <span className="text-[14px] font-medium text-white/60">
              {activeIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setLightbox(false)}
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-16 relative">
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}

            <img
              src={images[activeIndex]}
              alt={`${alt} - Photo ${activeIndex + 1}`}
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Bottom thumbnail strip */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 px-5 py-4" onClick={(e) => e.stopPropagation()}>
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative size-14 shrink-0 overflow-hidden rounded-lg transition-all duration-200",
                    index === activeIndex
                      ? "ring-2 ring-white ring-offset-2 ring-offset-black opacity-100"
                      : "opacity-40 hover:opacity-80"
                  )}
                >
                  <img
                    src={image}
                    alt={`${alt} - ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
