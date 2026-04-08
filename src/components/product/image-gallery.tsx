"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative overflow-hidden rounded-2xl bg-[#F3F3F2]">
        <div className="aspect-[3/2]">
          <img
            key={activeIndex}
            src={images[activeIndex]}
            alt={alt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative size-20 sm:size-24 overflow-hidden rounded-xl bg-[#F3F3F2] transition-all duration-200",
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
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
