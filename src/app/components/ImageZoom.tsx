import { useState } from 'react';
import Image from 'next/image';

type ImageZoomProps = {
  src: string;
  alt: string;
};

export const ImageZoom = ({ src, alt }: ImageZoomProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="relative">
      <div 
        className={`cursor-zoom-in transition-transform duration-300 ${
          isZoomed ? 'fixed inset-0 z-[60] bg-black/90 cursor-zoom-out' : ''
        }`}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <div className={`relative ${
          isZoomed 
            ? 'h-screen w-screen p-4 flex items-center justify-center' 
            : 'aspect-[3/4]'
        }`}>
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-contain transition-transform duration-300 ${
              isZoomed ? 'scale-100' : 'object-cover hover:scale-105'
            }`}
            sizes={isZoomed ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            priority
          />
        </div>
      </div>
    </div>
  );
}; 