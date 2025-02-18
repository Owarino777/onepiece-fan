import Image from 'next/image';
import { useState } from 'react';

type CardImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export const CardImage = ({ src, alt, width, height, className, priority }: CardImageProps) => {
  const [error, setError] = useState(false);
  const fallbackImage = `/card-placeholder.webp`;  // Image par défaut

  return (
    <div className="relative">
      <Image
        src={error ? fallbackImage : src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        onError={() => setError(true)}
        onLoadingComplete={(result) => {
          if (result.naturalWidth === 0) setError(true);
        }}
      />
      {/* Effet de chargement */}
      <div className={`absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 animate-pulse
        ${error || !src ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-500 text-sm">{alt}</span>
        </div>
      </div>
    </div>
  );
}; 