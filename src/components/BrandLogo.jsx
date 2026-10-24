import React from 'react';
import HeaderLogo3D from './HeaderLogo3D';

/**
 * BrandLogo - Unified, premium brand identity component for DKoder
 * Supports:
 * - '3d': Interactive rotating 3D isometric crystal cube
 * - 'badge': High-res crisp geometric 2D SVG brand badge with signature #FFD83D fill
 * - 'both': Combines the 3D crystal with the brand name typography
 */
export default function BrandLogo({ 
  variant = 'both', // 'both' | '3d' | 'badge' | 'minimal'
  size = 'md',     // 'sm' | 'md' | 'lg' | 'xl'
  showTagline = false,
  tagline = 'Placement Prep, With A Plan',
  className = '',
  href = '#home'
}) {
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg', dot: 'text-lg' },
    md: { icon: 36, text: 'text-xl', dot: 'text-2xl' },
    lg: { icon: 44, text: 'text-2xl sm:text-3xl', dot: 'text-3xl' },
    xl: { icon: 56, text: 'text-3xl sm:text-4xl', dot: 'text-4xl' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Visual Emblem */}
      {variant === 'badge' ? (
        <div 
          className="relative rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 flex items-center justify-center font-black text-slate-950 shadow-md group-hover:shadow-amber-400/40 group-hover:scale-105 transition-all duration-300 border border-amber-300/60"
          style={{ width: currentSize.icon, height: currentSize.icon }}
        >
          <span 
            className="tracking-tighter font-extrabold leading-none"
            style={{ fontSize: currentSize.icon * 0.52 }}
          >
            dk
          </span>
          {/* Subtle glossy sheen */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-white/30 rounded-t-xl pointer-events-none" />
        </div>
      ) : (
        <HeaderLogo3D size={currentSize.icon} />
      )}

      {/* Typography */}
      {variant !== 'badge' && variant !== '3d' && (
        <div className="flex flex-col">
          <span className={`font-black tracking-tight text-slate-900 leading-tight flex items-center ${currentSize.text}`}>
            dkoder<span className={`text-amber-500 animate-pulse leading-none ${currentSize.dot}`}>.</span>
          </span>
          {showTagline && (
            <span className="text-[10px] font-mono text-slate-500 font-semibold tracking-wider uppercase -mt-0.5">
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="no-underline inline-block">
        {content}
      </a>
    );
  }

  return content;
}
