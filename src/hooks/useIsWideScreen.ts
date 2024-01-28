import { useEffect, useState } from 'react';

export const useIsWideScreen = () => {
  const [isDesktopScreen, setIsDesktopScreen] = useState<boolean>(false);
  const [isTabletScreen, setIsTabletScreen] = useState<boolean>(false);

  useEffect(() => {
    setIsDesktopScreen(window.matchMedia('(min-width: 1240px)').matches);
    setIsTabletScreen(
      window.matchMedia('(min-width: 748px) and (max-width: 1239.99px)').matches
    );

    const handleResizeDesktop = (e: any) => {
      setIsDesktopScreen(e.matches);
    };
    const handleResizeTablet = (e: any) => {
      setIsTabletScreen(e.matches);
    };

    const mediaQueryDesktop = window.matchMedia('(min-width: 1240px)');
    const mediaQueryTablet = window.matchMedia(
      '(min-width: 748px) and (max-width: 1239.99px)'
    );

    mediaQueryDesktop.addEventListener('change', handleResizeDesktop);
    mediaQueryTablet.addEventListener('change', handleResizeTablet);

    return () => {
      mediaQueryDesktop.removeEventListener('change', handleResizeDesktop);
      mediaQueryTablet.removeEventListener('change', handleResizeTablet);
    };
  }, []);
  return [isDesktopScreen, isTabletScreen];
};
