import React, { useState } from 'react';

// Import local optimized assets directly so Vite bundles and hashes them cleanly
import logoBwPng from '../../assets/branding/barin-enf-logo-bw.png';
import logoBwWebp from '../../assets/branding/barin-enf-logo-bw.webp';
import logoWhitePng from '../../assets/branding/barin-enf-logo-white.png';
import logoWhiteWebp from '../../assets/branding/barin-enf-logo-white.webp';

import emblemBwPng from '../../assets/branding/barin-enf-emblem-bw.png';
import emblemBwWebp from '../../assets/branding/barin-enf-emblem-bw.webp';
import emblemWhitePng from '../../assets/branding/barin-enf-emblem-white.png';
import emblemWhiteWebp from '../../assets/branding/barin-enf-emblem-white.webp';

export type BrandLogoVariant = 'full' | 'emblem';
export type BrandLogoTheme = 'light' | 'dark' | 'auto';

export interface BrandLogoProps {
  /**
   * 'full': Complete official logo (Seal + BARIN ENF + ELECTRONIC NOTARIZATION FACILITY)
   * 'emblem': Compact circular seal symbol only
   */
  variant?: BrandLogoVariant;
  /**
   * 'light': Black artwork on transparent (for light backgrounds)
   * 'dark': White artwork on transparent (for dark backgrounds)
   * 'auto': Uses CSS classes / DOM dark mode detection
   */
  themeMode?: BrandLogoTheme;
  /**
   * Accessible alternative text. Defaults to 'BARIN ENF Electronic Notarization Facility'.
   * Set to empty string for decorative instances.
   */
  alt?: string;
  /**
   * If true, forces alt="" for decorative repeated instances.
   */
  decorative?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  id?: string;
  onClick?: () => void;
}

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

  // Default accessible alt text
  const resolvedAlt = decorative
    ? ''
    : alt !== undefined
    ? alt
    : variant === 'full'
    ? 'BARIN ENF Electronic Notarization Facility'
    : 'BARIN ENF Emblem';

  // Sizing defaults based on variant recommendations
  const defaultHeight = variant === 'full' ? 44 : 36;
  const resolvedHeight = height ?? defaultHeight;

  // Render text fallback if image asset encounters an unexpected network/decoding issue
  if (loadError) {
    return (
      <span
        id={id}
        className={`inline-flex items-center select-none font-serif font-bold tracking-wider text-black dark:text-white ${className}`}
        style={{ height: resolvedHeight, width: width ?? 'auto' }}
        onClick={onClick}
      >
        {variant === 'full' ? 'BARIN ENF' : 'B'}
      </span>
    );
  }

  // Explicit 'light' mode
  if (themeMode === 'light') {
    const webpSrc = variant === 'full' ? logoBwWebp : emblemBwWebp;
    const pngSrc = variant === 'full' ? logoBwPng : emblemBwPng;

    return (
      <picture id={id} className={`inline-block ${className}`} onClick={onClick}>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={pngSrc}
          alt={resolvedAlt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setLoadError(true)}
          className="h-full w-auto object-contain transition-opacity duration-150"
          style={{
            maxHeight: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
            width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
          }}
          referrerPolicy="no-referrer"
        />
      </picture>
    );
  }

  // Explicit 'dark' mode
  if (themeMode === 'dark') {
    const webpSrc = variant === 'full' ? logoWhiteWebp : emblemWhiteWebp;
    const pngSrc = variant === 'full' ? logoWhitePng : emblemWhitePng;

    return (
      <picture id={id} className={`inline-block ${className}`} onClick={onClick}>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={pngSrc}
          alt={resolvedAlt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setLoadError(true)}
          className="h-full w-auto object-contain transition-opacity duration-150"
          style={{
            maxHeight: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
            width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
          }}
          referrerPolicy="no-referrer"
        />
      </picture>
    );
  }

  // Automatic Theme Switcher (light logo in standard mode, white logo in dark mode)
  const lightWebp = variant === 'full' ? logoBwWebp : emblemBwWebp;
  const lightPng = variant === 'full' ? logoBwPng : emblemBwPng;
  const darkWebp = variant === 'full' ? logoWhiteWebp : emblemWhiteWebp;
  const darkPng = variant === 'full' ? logoWhitePng : emblemWhitePng;

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
      {/* Light Theme Logo */}
      <picture className="dark:hidden inline-block h-full">
        <source srcSet={lightWebp} type="image/webp" />
        <img
          src={lightPng}
          alt={resolvedAlt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setLoadError(true)}
          className="h-full w-auto object-contain"
          style={{
            maxHeight: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
            width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
          }}
          referrerPolicy="no-referrer"
        />
      </picture>

      {/* Dark Theme Logo */}
      <picture className="hidden dark:inline-block h-full">
        <source srcSet={darkWebp} type="image/webp" />
        <img
          src={darkPng}
          alt={resolvedAlt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setLoadError(true)}
          className="h-full w-auto object-contain"
          style={{
            maxHeight: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
            width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
          }}
          referrerPolicy="no-referrer"
        />
      </picture>
    </span>
  );
};

export default BrandLogo;
