import React, { useState } from 'react';

// Official JuriMbrella Vector Branding Assets
import logoNavySvg from '../../assets/branding/jurimbrella-logo.svg';
import logoWhiteSvg from '../../assets/branding/jurimbrella-logo-white.svg';
import emblemNavySvg from '../../assets/branding/jurimbrella-emblem.svg';
import emblemWhiteSvg from '../../assets/branding/jurimbrella-emblem-white.svg';

export type BrandLogoVariant = 'full' | 'compact' | 'emblem' | 'wordmark';
export type BrandLogoTheme = 'light' | 'dark' | 'auto';

export interface BrandLogoProps {
  /**
   * 'full': Complete official logo (Emblem + JuriMbrella + Tagline + Service Descriptor)
   * 'compact': Compact horizontal logo
   * 'emblem': Icon-only presentation (Umbrella + Document + Fountain Pen Nib)
   * 'wordmark': Typography only
   */
  variant?: BrandLogoVariant;
  /**
   * 'light': Deep Navy & Gold on transparent (for light backgrounds)
   * 'dark': White & Gold on transparent (for dark backgrounds)
   * 'auto': Uses CSS / DOM dark mode
   */
  themeMode?: BrandLogoTheme;
  alt?: string;
  decorative?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  id?: string;
  onClick?: () => void;
}

/**
 * 1. BrandMark Component
 * Icon-only presentation featuring the protective umbrella, legal document, and fountain pen signature nib.
 */
export const BrandMark: React.FC<{
  themeMode?: BrandLogoTheme;
  className?: string;
  size?: number | string;
  alt?: string;
  decorative?: boolean;
  onClick?: () => void;
}> = ({
  themeMode = 'auto',
  className = '',
  size = 40,
  alt = 'JuriMbrella Emblem',
  decorative = false,
  onClick,
}) => {
  const [loadError, setLoadError] = useState(false);
  const resolvedAlt = decorative ? '' : alt;

  if (loadError) {
    return (
      <span
        className={`inline-flex items-center justify-center font-serif font-black text-[#0B192C] dark:text-[#E5C07B] rounded-full border border-[#C5A059]/40 ${className}`}
        style={{ width: size, height: size }}
        onClick={onClick}
      >
        J
      </span>
    );
  }

  if (themeMode === 'light') {
    return (
      <img
        src={emblemNavySvg}
        alt={resolvedAlt}
        width={size}
        height={size}
        onError={() => setLoadError(true)}
        className={`inline-block object-contain ${className}`}
        style={{ width: size, height: size }}
        onClick={onClick}
      />
    );
  }

  if (themeMode === 'dark') {
    return (
      <img
        src={emblemWhiteSvg}
        alt={resolvedAlt}
        width={size}
        height={size}
        onError={() => setLoadError(true)}
        className={`inline-block object-contain ${className}`}
        style={{ width: size, height: size }}
        onClick={onClick}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <img
        src={emblemNavySvg}
        alt={resolvedAlt}
        width={size}
        height={size}
        onError={() => setLoadError(true)}
        className="dark:hidden inline-block object-contain"
        style={{ width: size, height: size }}
      />
      <img
        src={emblemWhiteSvg}
        alt={resolvedAlt}
        width={size}
        height={size}
        onError={() => setLoadError(true)}
        className="hidden dark:inline-block object-contain"
        style={{ width: size, height: size }}
      />
    </span>
  );
};

/**
 * 2. BrandWordmark Component
 * Clean typography with official brand name, tagline, and Philippine eNotarization descriptor.
 */
export const BrandWordmark: React.FC<{
  themeMode?: BrandLogoTheme;
  showTagline?: boolean;
  showDescriptor?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}> = ({
  themeMode = 'auto',
  showTagline = true,
  showDescriptor = true,
  className = '',
  size = 'md',
  onClick,
}) => {
  const sizeClasses = {
    sm: {
      name: 'text-base',
      tagline: 'text-[10px]',
      descriptor: 'text-[8px] tracking-[0.2em]',
    },
    md: {
      name: 'text-xl',
      tagline: 'text-xs',
      descriptor: 'text-[9px] tracking-[0.24em]',
    },
    lg: {
      name: 'text-3xl',
      tagline: 'text-sm',
      descriptor: 'text-xs tracking-[0.28em]',
    },
  }[size];

  const colorStyles =
    themeMode === 'light'
      ? {
          name: 'text-[#0B192C]',
          tagline: 'text-slate-600',
          divider: 'bg-[#C5A059]/40',
          descriptor: 'text-[#0B192C]',
        }
      : themeMode === 'dark'
      ? {
          name: 'text-white',
          tagline: 'text-slate-300',
          divider: 'bg-[#E5C07B]/40',
          descriptor: 'text-slate-200',
        }
      : {
          name: 'text-[#0B192C] dark:text-white',
          tagline: 'text-slate-600 dark:text-slate-300',
          divider: 'bg-[#C5A059]/40 dark:bg-[#E5C07B]/40',
          descriptor: 'text-[#0B192C] dark:text-slate-200',
        };

  return (
    <div
      className={`flex flex-col select-none ${className}`}
      onClick={onClick}
    >
      <div className={`font-serif font-black tracking-tight ${sizeClasses.name} ${colorStyles.name} leading-none`}>
        Juri<span className="text-[#C5A059] dark:text-[#E5C07B]">M</span>brella
      </div>
      {showTagline && (
        <div className={`italic font-medium ${sizeClasses.tagline} ${colorStyles.tagline} mt-1 leading-tight`}>
          Protection over every signature
        </div>
      )}
      {showDescriptor && (
        <>
          <div className={`h-[1px] w-full ${colorStyles.divider} my-1`} />
          <div className={`font-mono font-bold uppercase ${sizeClasses.descriptor} ${colorStyles.descriptor} leading-tight`}>
            PHILIPPINE eNOTARIZATION
          </div>
        </>
      )}
    </div>
  );
};

/**
 * 3. BrandLogo Component
 * Master official logo supporting full, compact, emblem, or wordmark variants.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  themeMode = 'auto',
  alt,
  decorative = false,
  className = '',
  width,
  height,
  priority = false,
  id,
  onClick,
}) => {
  const [loadError, setLoadError] = useState(false);

  const resolvedAlt = decorative
    ? ''
    : alt !== undefined
    ? alt
    : variant === 'emblem'
    ? 'JuriMbrella Emblem'
    : 'JuriMbrella — Protection over every signature — Philippine eNotarization';

  const defaultHeight = variant === 'full' ? 48 : variant === 'compact' ? 40 : 36;
  const resolvedHeight = height ?? defaultHeight;

  // Fallback if SVG fails to load
  if (loadError) {
    return (
      <div
        id={id}
        className={`inline-flex items-center gap-2.5 select-none ${className}`}
        onClick={onClick}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B192C] text-[#C5A059] font-serif font-bold text-lg">
          J
        </span>
        {variant !== 'emblem' && (
          <div className="flex flex-col leading-none">
            <span className="font-serif font-black text-lg text-[#0B192C] dark:text-white">
              Juri<span className="text-[#C5A059]">M</span>brella
            </span>
            <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono mt-0.5">
              Philippine eNotarization
            </span>
          </div>
        )}
      </div>
    );
  }

  // Emblem only
  if (variant === 'emblem') {
    return (
      <BrandMark
        themeMode={themeMode}
        size={resolvedHeight}
        alt={resolvedAlt}
        decorative={decorative}
        className={className}
        onClick={onClick}
      />
    );
  }

  // Wordmark only
  if (variant === 'wordmark') {
    return (
      <BrandWordmark
        themeMode={themeMode}
        size="md"
        className={className}
        onClick={onClick}
      />
    );
  }

  // Compact variant (Emblem + horizontal wordmark)
  if (variant === 'compact') {
    return (
      <div
        id={id}
        className={`inline-flex items-center gap-3 select-none cursor-pointer group ${className}`}
        onClick={onClick}
        style={{
          height: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
          width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
        }}
      >
        <BrandMark
          themeMode={themeMode}
          size={typeof resolvedHeight === 'number' ? resolvedHeight : 38}
          alt={resolvedAlt}
          decorative
        />
        <div className="flex flex-col justify-center leading-none">
          <span className="font-serif font-black text-lg sm:text-xl tracking-tight text-[#0B192C] dark:text-white group-hover:text-[#C5A059] transition-colors">
            Juri<span className="text-[#C5A059] dark:text-[#E5C07B]">M</span>brella
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            Philippine eNotarization
          </span>
        </div>
      </div>
    );
  }

  // Explicit 'light' mode (Full Logo)
  if (themeMode === 'light') {
    return (
      <img
        id={id}
        src={logoNavySvg}
        alt={resolvedAlt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setLoadError(true)}
        className={`inline-block h-full w-auto object-contain transition-opacity duration-150 ${className}`}
        style={{
          maxHeight: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
          width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
        }}
        onClick={onClick}
      />
    );
  }

  // Explicit 'dark' mode (Full Logo)
  if (themeMode === 'dark') {
    return (
      <img
        id={id}
        src={logoWhiteSvg}
        alt={resolvedAlt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setLoadError(true)}
        className={`inline-block h-full w-auto object-contain transition-opacity duration-150 ${className}`}
        style={{
          maxHeight: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
          width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
        }}
        onClick={onClick}
      />
    );
  }

  // Auto mode: responsive to light/dark themes
  return (
    <span
      id={id}
      className={`inline-flex items-center justify-center ${className}`}
      onClick={onClick}
      style={{
        height: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
        width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
      }}
    >
      <img
        src={logoNavySvg}
        alt={resolvedAlt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setLoadError(true)}
        className="dark:hidden inline-block h-full w-auto object-contain"
        style={{
          maxHeight: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
          width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
        }}
      />
      <img
        src={logoWhiteSvg}
        alt={resolvedAlt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setLoadError(true)}
        className="hidden dark:inline-block h-full w-auto object-contain"
        style={{
          maxHeight: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
          width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
        }}
      />
    </span>
  );
};

export default BrandLogo;
