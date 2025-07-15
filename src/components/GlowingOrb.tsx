import { useEffect, useState } from 'react';

interface GlowingOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent';
  intensity?: 'low' | 'medium' | 'high';
  floating?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlowingOrb({ 
  size = 'md', 
  color = 'primary',
  intensity = 'medium',
  floating = true,
  className = '',
  style = {}
}: GlowingOrbProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  const colorVars = {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    accent: 'hsl(var(--accent))'
  };

  const intensityValues = {
    low: 0.3,
    medium: 0.6,
    high: 0.9
  };

  const orbStyle = {
    background: `radial-gradient(circle, ${colorVars[color]}${Math.round(intensityValues[intensity] * 100).toString(16)} 0%, transparent 70%)`,
    filter: `blur(${size === 'sm' ? 8 : size === 'md' ? 12 : size === 'lg' ? 16 : 24}px)`,
    animation: floating ? `cosmic-float ${8 + Math.random() * 4}s ease-in-out infinite` : 'none',
    animationDelay: `${Math.random() * 2}s`,
    ...style
  };

  if (!mounted) return null;

  return (
    <div 
      className={`absolute rounded-full pointer-events-none ${sizeClasses[size]} ${className}`}
      style={orbStyle}
    >
      {/* Inner glow */}
      <div 
        className="absolute inset-2 rounded-full"
        style={{
          background: `radial-gradient(circle, ${colorVars[color]}${Math.round(intensityValues[intensity] * 150).toString(16)} 0%, transparent 50%)`,
          filter: `blur(${size === 'sm' ? 4 : size === 'md' ? 6 : size === 'lg' ? 8 : 12}px)`,
        }}
      />
      
      {/* Core */}
      <div 
        className="absolute inset-4 rounded-full"
        style={{
          backgroundColor: colorVars[color],
          opacity: intensityValues[intensity] * 0.8,
          filter: `blur(${size === 'sm' ? 2 : size === 'md' ? 3 : size === 'lg' ? 4 : 6}px)`,
        }}
      />
    </div>
  );
}