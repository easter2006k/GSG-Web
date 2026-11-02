import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useLocation } from 'react-router-dom';
import { HeartbeatLoader } from '@/components/ui/HeartbeatLoader';

interface StartLoadingOptions {
  text?: string;
  subtext?: string;
  duration?: number;
}

interface LoadingContextType {
  isLoading: boolean;
  startLoading: (options?: StartLoadingOptions) => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

// Route title dictionary to give context-aware loading messages
function getRouteLoadingDetails(path: string): { text: string; subtext: string } {
  const cleanPath = path.split('?')[0].split('#')[0].toLowerCase();

  if (cleanPath === '/' || cleanPath === '') {
    return {
      text: 'Loading',
      subtext: 'Get Set Go Trust • Guiding Youth Transformation Since 2013',
    };
  }
  if (cleanPath.startsWith('/about')) {
    return {
      text: 'Loading',
      subtext: 'About GSG Trust • Vision, Leadership & Impact',
    };
  }
  if (cleanPath.startsWith('/scholarships')) {
    return {
      text: 'Loading',
      subtext: 'Scholarships Portal • 50+ College Schemes & Direct Sanction',
    };
  }
  if (cleanPath.startsWith('/education')) {
    return {
      text: 'Loading',
      subtext: 'District Education Hub • 38 Districts & Government Schools',
    };
  }
  if (cleanPath.startsWith('/volunteers')) {
    return {
      text: 'Loading',
      subtext: 'Volunteer Community • 500+ Mentors Across Tamil Nadu',
    };
  }
  if (cleanPath.startsWith('/counselling')) {
    return {
      text: 'Loading',
      subtext: 'Counselling Desk • Academic & Career Mentors',
    };
  }
  if (cleanPath.startsWith('/career-guidance')) {
    return {
      text: 'Loading',
      subtext: 'Career Guidance • Stream Selection & College Pathways',
    };
  }
  if (cleanPath.startsWith('/colleges')) {
    return {
      text: 'Loading',
      subtext: 'College Directory • Autonomous Institutions & Seats',
    };
  }
  if (cleanPath.startsWith('/courses')) {
    return {
      text: 'Loading',
      subtext: 'Courses & Degrees • Curated Academic Catalog',
    };
  }
  if (cleanPath.startsWith('/gallery') || cleanPath.startsWith('/news')) {
    return {
      text: 'Loading',
      subtext: 'Training Gallery • 70+ School Awareness Photos',
    };
  }
  if (cleanPath.startsWith('/contact')) {
    return {
      text: 'Loading',
      subtext: 'Contact & Support Desk • Rathinapuri Coimbatore HQ',
    };
  }
  if (cleanPath.startsWith('/testimonials')) {
    return {
      text: 'Loading',
      subtext: 'Student Stories • Meritorious Beneficiaries',
    };
  }
  if (cleanPath.startsWith('/faq')) {
    return {
      text: 'Loading',
      subtext: 'FAQ & Guidelines • Rules & Verification Details',
    };
  }
  if (cleanPath.startsWith('/application-status')) {
    return {
      text: 'Loading',
      subtext: 'Verification Tracker • Real-Time Application Records',
    };
  }
  if (cleanPath.startsWith('/student') || cleanPath.startsWith('/login') || cleanPath.startsWith('/register') || cleanPath.startsWith('/admin')) {
    return {
      text: 'Loading',
      subtext: 'Secure Portal • Authenticating GSG Central Credentials',
    };
  }

  return {
    text: 'Loading',
    subtext: 'Get Set Go Trust • Empowering Students Across Tamil Nadu',
  };
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading');
  const [loadingSubtext, setLoadingSubtext] = useState('Get Set Go Trust • Empowering Students');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();
  const prevPathRef = useRef<string>(location.pathname);

  const stopLoading = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsLoading(false);
  }, []);

  const startLoading = useCallback(
    ({ text, subtext, duration = 450 }: StartLoadingOptions = {}) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setLoadingText(text || 'Loading');
      setLoadingSubtext(subtext || '');
      setIsLoading(true);

      timerRef.current = setTimeout(() => {
        setIsLoading(false);
        timerRef.current = null;
      }, duration);
    },
    []
  );

  // 1. Listen for route transitions (e.g., programmatic navigation, back/forward)
  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      const prevPath = prevPathRef.current;
      prevPathRef.current = location.pathname;

      // Do NOT trigger full screen loading overlay when switching sub-districts within /education
      const isSubEducationNav =
        prevPath.startsWith('/education') && location.pathname.startsWith('/education');

      if (!isSubEducationNav) {
        const details = getRouteLoadingDetails(location.pathname);
        startLoading({
          text: details.text,
          subtext: details.subtext,
          duration: 450,
        });

        // Scroll window to top cleanly upon navigation
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, [location.pathname, startLoading]);

  // 2. Global click interceptor for all main navigation clicks & interactive buttons
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Find the closest clickable interactive target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target or parent is an anchor or button
      const link = target.closest('a') as HTMLAnchorElement | null;
      const button = target.closest('button') as HTMLButtonElement | null;

      // Case A: Link click
      if (link && link.href) {
        const href = link.getAttribute('href');

        // Ignore hash anchors (e.g. #track-status, #footprint), mailto:, tel:, javascript:
        if (
          !href ||
          href.startsWith('#') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          href.startsWith('javascript:') ||
          link.target === '_blank'
        ) {
          return;
        }

        // Check if internal navigation link
        const isInternal =
          href.startsWith('/') ||
          link.href.startsWith(window.location.origin);

        if (isInternal) {
          const path = href.startsWith('/') ? href : new URL(link.href).pathname;

          // Do NOT trigger loading overlay if navigating between /education sub-districts
          const isSubEducationNav =
            window.location.pathname.startsWith('/education') && path.startsWith('/education');

          if (!isSubEducationNav) {
            const details = getRouteLoadingDetails(path);
            startLoading({
              text: details.text,
              subtext: details.subtext,
              duration: 480,
            });
          }
        }
        return;
      }

      // Case B: Button with explicit data-loading attribute or main CTA class
      if (button) {
        const customLoadingText = button.getAttribute('data-loading-text');
        const hasLoadingFlag = button.hasAttribute('data-loading');
        const isMainCTA =
          button.classList.contains('btn-primary') ||
          button.classList.contains('btn-secondary');

        // Ignore disabled buttons or form submit buttons that might have validation errors
        if (button.disabled) return;

        if (hasLoadingFlag || customLoadingText) {
          startLoading({
            text: customLoadingText || 'Processing Action...',
            subtext: 'GSG Trust Central Gateway',
            duration: 500,
          });
          return;
        }

        if (isMainCTA && !button.closest('form')) {
          startLoading({
            text: 'Opening Application...',
            subtext: 'Get Set Go Trust • Coimbatore',
            duration: 450,
          });
        }
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {/* Global Heartbeat Loading Overlay */}
      {isLoading && (
        <HeartbeatLoader
          variant="overlay"
          text={loadingText}
          subtext={loadingSubtext}
          label={loadingText}
        />
      )}
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
