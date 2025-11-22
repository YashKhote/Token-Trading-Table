import { useEffect } from 'react';

export const CriticalCSS = () => {
  useEffect(() => {
    // Load non-critical CSS asynchronously
    const loadCSS = (href: string) => {
      const link = document.createElement('link');
      link.href = href;
      link.rel = 'stylesheet';
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
      document.head.appendChild(link);
    };

    // Load non-critical CSS after initial render
    const timeoutId = setTimeout(() => {
      loadCSS('/styles/non-critical.css');
    }, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
};
