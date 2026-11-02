import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number; // ms
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatCommas?: boolean;
}

export function useCountUp({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  formatCommas = false,
}: UseCountUpOptions) {
  const [count, setCount] = useState(0);
  const ref = useRef<any>(null);
  const hasStartedRef = useRef(false);
  const rafRef = useRef<number>();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    hasStartedRef.current = false;
    setCount(0);

    const startAnimation = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutCubic — smooth deceleration
        const eased = 1 - Math.pow(1 - progress, 3);

        setCount(Math.max(0, eased * end));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          setCount(end); // ensure exact final value
        }
      };

      rafRef.current = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration]);

  const formatNumber = (val: number) => {
    if (decimals > 0) {
      return val.toFixed(decimals);
    }
    const rounded = Math.round(val);
    return formatCommas ? rounded.toLocaleString('en-US') : `${rounded}`;
  };

  const display = `${prefix}${formatNumber(count)}${suffix}`;

  return { ref, displayValue: display };
}

