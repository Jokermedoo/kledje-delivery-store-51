
import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  start?: number;
}

export default function AnimatedCounter({ 
  end, 
  duration = 1000, 
  start = 0 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    // Guard against invalid values
    if (typeof end !== 'number' || isNaN(end)) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (end - start) + start);
      
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
  }, [end, duration, start]);

  return <span>{isNaN(count) ? 0 : count}</span>;
}
