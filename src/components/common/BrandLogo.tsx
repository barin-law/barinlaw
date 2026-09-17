import React, { useState } from 'react';

// Import optimized crisp vector branding assets with D symbol and DHENZE ENF
import logoBwSvg from '../../assets/branding/barin-enf-logo-bw.svg';
import logoWhiteSvg from '../../assets/branding/barin-enf-logo-white.svg';
import emblemBwSvg from '../../assets/branding/barin-enf-emblem-bw.svg';
import emblemWhiteSvg from '../../assets/branding/barin-enf-emblem-white.svg';

export type BrandLogoVariant = 'full' | 'emblem';
export type BrandLogoTheme = 'light' | 'dark' | 'auto';

export interface BrandLogoProps {
  /**
   * 'full': Complete official logo (Seal + DHENZE ENF + ELECTRONIC NOTARIZATION FACILITY)
   * 'emblem': Compact circular seal symbol with 'D' only
   */
  variant?: BrandLogoVariant;
  /**
   * 'light': Black artwork on transparent (for light backgrounds)
   * 'dark': White artwork on transparent (for dark backgrounds)
   * 'auto': Uses CSS classes / DOM dark mode detection
   */
  themeMode?: BrandLogoTheme;
  /**
   * Accessible alternative text. Defaults to 'DHENZE ENF Electronic Notarization Facility'.
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
    ? 'DHENZE ENF Electronic Notarization Facility'
    : 'DHENZE ENF Emblem';

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
        {variant === 'full' ? 'DHENZE ENF' : 'D'}
      </span>
    );
  }

  // Explicit 'light' mode
  if (themeMode === 'light') {
    const svgSrc = variant === 'full' ? logoBwSvg : emblemBwSvg;

    return (
      <img
        id={id}
        src={svgSrc}
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
        referrerPolicy="no-referrer"
      />
    );
  }

  // Explicit 'dark' mode
  if (themeMode === 'dark') {
    const svgSrc = variant === 'full' ? logoWhiteSvg : emblemWhiteSvg;

    return (
      <img
        id={id}
        src={svgSrc}
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
        referrerPolicy="no-referrer"
      />
    );
  }

  // Automatic Theme Switcher (light logo in standard mode, white logo in dark mode)
  const lightSvg = variant === 'full' ? logoBwSvg : emblemBwSvg;
  const darkSvg = variant === 'full' ? logoWhiteSvg : emblemWhiteSvg;

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
      <img
        src={lightSvg}
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
        referrerPolicy="no-referrer"
      />

      {/* Dark Theme Logo */}
      <img
        src={darkSvg}
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
        referrerPolicy="no-referrer"
      />
    </span>
  );
};

export default BrandLogo;
