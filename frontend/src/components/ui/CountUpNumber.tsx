import React from 'react';
import { useCountUp } from '@/hooks/useCountUp';

interface CountUpNumberProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  formatCommas?: boolean;
  className?: string;
  as?: 'div' | 'span';
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  formatCommas = false,
  className = '',
  as = 'div',
}) => {
  const { ref, displayValue } = useCountUp({
    end,
    duration,
    decimals,
    prefix,
    suffix,
    formatCommas,
  });

  const Component = as;

  return (
    <Component ref={ref} className={className}>
      {displayValue}
    </Component>
  );
};
