// Optimize JavaScript loading
export const loadScript = (src: string, options: { async?: boolean; defer?: boolean; module?: boolean } = {}) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    
    if (options.async) script.async = true;
    if (options.defer) script.defer = true;
    if (options.module) script.type = 'module';
    
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    
    document.head.appendChild(script);
  });
};

// Batch DOM reads/writes to prevent forced reflows
export const batchDOMUpdates = (callback: () => void) => {
  // Use requestAnimationFrame to batch style reads/writes
  requestAnimationFrame(() => {
    // Force layout calculation
    const dummy = document.body.offsetHeight;
    
    // Execute the callback
    callback();
    
    // Schedule another frame to ensure all updates are processed
    requestAnimationFrame(() => {
      // Another dummy read to ensure all writes are flushed
      const dummy2 = document.body.offsetHeight;
    });
  });
};

// Load non-critical resources
export const loadNonCriticalResources = () => {
  if (typeof window === 'undefined') return;
  
  // Load non-critical CSS
  const nonCriticalCSS = document.createElement('link');
  nonCriticalCSS.rel = 'stylesheet';
  nonCriticalCSS.href = '/styles/non-critical.css';
  nonCriticalCSS.media = 'print';
  nonCriticalCSS.onload = () => {
    nonCriticalCSS.media = 'all';
  };
  document.head.appendChild(nonCriticalCSS);
  
  // Load non-critical JS
  const nonCriticalJS = document.createElement('script');
  nonCriticalJS.src = '/scripts/non-critical.js';
  nonCriticalJS.defer = true;
  document.body.appendChild(nonCriticalJS);
};

// Check if the browser supports modern JavaScript features
export const supportsModernJS = () => {
  try {
    // Test for ES6+ features
    if (
      !('Promise' in window) ||
      !('Map' in window) ||
      !('Set' in window) ||
      !('Symbol' in window) ||
      !('from' in Array) ||
      !('includes' in Array.prototype) ||
      !('fetch' in window) ||
      !('IntersectionObserver' in window)
    ) {
      return false;
    }
    
    // Test for ES modules support
    const script = document.createElement('script');
    return 'noModule' in script;
  } catch (e) {
    return false;
  }
};
