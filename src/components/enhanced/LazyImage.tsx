import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
}

export function LazyImage({ 
  src, 
  alt, 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI0VFRSIvPjwvc3ZnPg==',
  className = '',
  aspectRatio = 'auto',
  ...props 
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (isIntersecting && src && src !== placeholder) {
      const imageLoader = new Image();
      
      imageLoader.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      
      imageLoader.onerror = () => {
        setIsError(true);
      };
      
      imageLoader.src = src;
    }
  }, [isIntersecting, src, placeholder]);

  const aspectRatioClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: ''
  }[aspectRatio];

  if (isError) {
    return (
      <div 
        ref={targetRef as React.RefObject<HTMLDivElement>}
        className={`${aspectRatioClass} ${className} bg-muted flex items-center justify-center rounded-lg`}
      >
        <span className="text-muted-foreground text-sm">فشل في تحميل الصورة</span>
      </div>
    );
  }

  return (
    <div 
      ref={targetRef as React.RefObject<HTMLDivElement>}
      className={`${aspectRatioClass} ${className} relative overflow-hidden`}
    >
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
}