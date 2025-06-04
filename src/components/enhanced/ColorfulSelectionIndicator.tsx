
import React, { useState, useEffect } from 'react';

interface ColorfulSelectionIndicatorProps {
  children: React.ReactNode;
  isSelected?: boolean;
  selectionColor?: string;
  animationDuration?: number;
  glowIntensity?: 'low' | 'medium' | 'high';
}

const ColorfulSelectionIndicator: React.FC<ColorfulSelectionIndicatorProps> = ({
  children,
  isSelected = false,
  selectionColor = 'blue',
  animationDuration = 300,
  glowIntensity = 'medium'
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isSelected) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), animationDuration);
      return () => clearTimeout(timer);
    }
  }, [isSelected, animationDuration]);

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        border: 'border-blue-500',
        bg: 'bg-blue-50',
        shadow: 'shadow-blue-500/50',
        glow: 'shadow-blue-400/30'
      },
      green: {
        border: 'border-green-500',
        bg: 'bg-green-50',
        shadow: 'shadow-green-500/50',
        glow: 'shadow-green-400/30'
      },
      purple: {
        border: 'border-purple-500',
        bg: 'bg-purple-50',
        shadow: 'shadow-purple-500/50',
        glow: 'shadow-purple-400/30'
      },
      orange: {
        border: 'border-orange-500',
        bg: 'bg-orange-50',
        shadow: 'shadow-orange-500/50',
        glow: 'shadow-orange-400/30'
      },
      pink: {
        border: 'border-pink-500',
        bg: 'bg-pink-50',
        shadow: 'shadow-pink-500/50',
        glow: 'shadow-pink-400/30'
      },
      indigo: {
        border: 'border-indigo-500',
        bg: 'bg-indigo-50',
        shadow: 'shadow-indigo-500/50',
        glow: 'shadow-indigo-400/30'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getGlowIntensity = () => {
    switch (glowIntensity) {
      case 'low': return 'shadow-sm';
      case 'high': return 'shadow-xl';
      default: return 'shadow-lg';
    }
  };

  const colors = getColorClasses(selectionColor);

  return (
    <div 
      className={`
        relative transition-all duration-${animationDuration} transform
        ${isSelected || isAnimating ? `
          ${colors.border} ${colors.bg} border-2 
          ${getGlowIntensity()} ${colors.shadow}
          scale-105 
        ` : 'border-2 border-transparent hover:border-gray-200 hover:shadow-md'}
        ${isAnimating ? 'animate-pulse' : ''}
        rounded-lg overflow-hidden
      `}
    >
      {/* Animated border effect */}
      {(isSelected || isAnimating) && (
        <div className={`
          absolute inset-0 rounded-lg border-2 ${colors.border}
          animate-ping opacity-20 pointer-events-none
        `} />
      )}
      
      {/* Gradient overlay for extra visual appeal */}
      {isSelected && (
        <div className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
          animate-pulse pointer-events-none
        `} />
      )}
      
      {/* Selection indicator dot */}
      {isSelected && (
        <div className={`
          absolute top-2 right-2 w-3 h-3 rounded-full
          ${colors.border.replace('border-', 'bg-')}
          animate-bounce shadow-sm z-10
        `} />
      )}
      
      {children}
    </div>
  );
};

export default ColorfulSelectionIndicator;
