import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
}

export function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    // قياس أداء التحميل
    const loadTime = performance.now();
    
    // قياس استخدام الذاكرة (إذا كان متاحاً)
    const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0;

    setMetrics({
      loadTime: Math.round(loadTime),
      renderTime: Math.round(performance.now() - loadTime),
      memoryUsage: Math.round(memoryUsage / 1024 / 1024 * 100) / 100
    });
  }, []);

  // إظهار المقاييس في وضع التطوير فقط
  if (process.env.NODE_ENV !== 'development' || !metrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-2 pointer-events-none">
      <Badge variant="secondary" className="block text-xs">
        ⚡ تحميل: {metrics.loadTime}ms
      </Badge>
      <Badge variant="secondary" className="block text-xs">
        🎨 رندر: {metrics.renderTime}ms
      </Badge>
      {metrics.memoryUsage > 0 && (
        <Badge variant="secondary" className="block text-xs">
          💾 ذاكرة: {metrics.memoryUsage}MB
        </Badge>
      )}
    </div>
  );
}