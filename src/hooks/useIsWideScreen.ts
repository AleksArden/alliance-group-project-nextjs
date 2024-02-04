import { useEffect, useState } from 'react';

export const useIsWideScreen = () => {
  const [isDesktopScreen, setIsDesktopScreen] = useState<boolean>(false);
  const [isTabletScreen, setIsTabletScreen] = useState<boolean>(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);

  useEffect(() => {
    setIsDesktopScreen(window.matchMedia('(min-width: 1240px)').matches);
    setIsTabletScreen(
      window.matchMedia('(min-width: 768px) and (max-width: 1239.98px)').matches
    );
    setIsMobileScreen(window.matchMedia('(max-width: 767.98px)').matches);

    const handleResizeDesktop = (e: any) => {
      setIsDesktopScreen(e.matches);
    };
    const handleResizeTablet = (e: any) => {
      setIsTabletScreen(e.matches);
    };
    const handleResizeMobile = (e: any) => {
      setIsMobileScreen(e.matches);
    };

    const mediaQueryDesktop = window.matchMedia('(min-width: 1240px)');
    const mediaQueryTablet = window.matchMedia(
      '(min-width: 768px) and (max-width: 1239.98px)'
    );
    const mediaQueryMobile = window.matchMedia('(max-width: 767.98px)');

    mediaQueryDesktop.addEventListener('change', handleResizeDesktop);
    mediaQueryTablet.addEventListener('change', handleResizeTablet);
    mediaQueryMobile.addEventListener('change', handleResizeMobile);

    return () => {
      mediaQueryDesktop.removeEventListener('change', handleResizeDesktop);
      mediaQueryTablet.removeEventListener('change', handleResizeTablet);
      mediaQueryMobile.removeEventListener('change', handleResizeMobile);
    };
  }, []);
  return [isDesktopScreen, isTabletScreen, isMobileScreen];
};
