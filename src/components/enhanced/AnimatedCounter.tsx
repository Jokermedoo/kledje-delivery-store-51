import React, { useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = ''
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from);
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (!isIntersecting) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // استخدام easeOutCubic للحصول على انيميشن أكثر سلاسة
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentCount = Math.round(from + (to - from) * easeProgress);
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isIntersecting, from, to, duration]);

  return (
    <span ref={targetRef as React.RefObject<HTMLSpanElement>} className={className}>
      {prefix}{count.toLocaleString('ar-EG')}{suffix}
    </span>
  );
}