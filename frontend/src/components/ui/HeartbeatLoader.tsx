import React from 'react';
import { cn } from '@/lib/utils';

export interface HeartbeatLoaderProps {
  /**
   * Display mode:
   * - 'overlay': full-screen fixed dark overlay (default for modals and route transitions)
   * - 'card': embedded dark container for cards and queries
   * - 'inline': compact minimal layout
   */
  variant?: 'card' | 'overlay' | 'inline';
  /**
   * Sizing for the animated rings:
   * - 'sm': compact rings (~90px)
   * - 'md': medium rings (~160px)
   * - 'lg': full desktop rings (~220px, default)
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Primary loading text (defaults to 'Loading')
   */
  text?: string;
  /**
   * Optional contextual subtext below the main loading label
   */
  subtext?: string;
  /**
   * Accessible aria-label for assistive technologies (defaults to text or 'Loading')
   */
  label?: string;
  /**
   * Custom CSS class name for the container
   */
  className?: string;
}

export function HeartbeatLoader({
  variant = 'card',
  size = 'lg',
  text = 'Loading',
  subtext,
  label,
  className,
}: HeartbeatLoaderProps) {
  const accessibleLabel = label || text || 'Loading';

  const ringsElement = (
    <div className={cn('loader-rings', `size-${size}`)} aria-hidden="true">
      <span className="loader-ring loader-ring-1 ring ring-1" />
      <span className="loader-ring loader-ring-2 ring ring-2" />
      <span className="loader-ring loader-ring-3 ring ring-3" />
      <span className="loader-ring loader-ring-4 ring ring-4" />
      <span className="loader-ring loader-ring-5 ring ring-5" />
      <span className="loader-ring loader-ring-6 ring ring-6" />
    </div>
  );

  if (variant === 'overlay') {
    return (
      <div
        className={cn('loader-overlay', className)}
        role="status"
        aria-live="polite"
        aria-label={accessibleLabel}
      >
        <div className="loader-content">
          {ringsElement}
          <p className="loader-text">{text || 'Loading'}</p>
          {subtext && <p className="loader-subtext">{subtext}</p>}
          <span className="sr-only">{accessibleLabel}</span>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        className={cn('loader-inline', className)}
        role="status"
        aria-live="polite"
        aria-label={accessibleLabel}
      >
        {ringsElement}
        {text && <span className="loader-text">{text}</span>}
        <span className="sr-only">{accessibleLabel}</span>
      </div>
    );
  }

  // Default: 'card'
  return (
    <div
      className={cn('loader-card', className)}
      role="status"
      aria-live="polite"
      aria-label={accessibleLabel}
    >
      <div className="loader-content">
        {ringsElement}
        <p className="loader-text">{text || 'Loading'}</p>
        {subtext && <p className="loader-subtext">{subtext}</p>}
        <span className="sr-only">{accessibleLabel}</span>
      </div>
    </div>
  );
}

// Named aliases for clean modern naming across the codebase
export const MulticolorRingLoader = HeartbeatLoader;
export const CircularRingLoader = HeartbeatLoader;

export default HeartbeatLoader;

