import { useCallback, useRef } from 'react';

export const useIntersectionObserver = (options: any, cb: any) => {
  const observer = useRef<any | null>();

  return useCallback(
    (node: any) => {
      if (!node) {
        if (observer.current) {
          observer.current.disconnect();
        }
        return;
      }

      observer.current = new window.IntersectionObserver(cb, options);
      observer.current.observe(node);
    },
    [cb, options]
  );
};
