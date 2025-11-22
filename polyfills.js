// Polyfills for modern JavaScript features
// This file is only loaded in browsers that need it

// Check for modern browser features
const needsPolyfills = () => {
  // Add feature detection for modern JavaScript features
  const features = {
    'Promise': typeof Promise === 'undefined',
    'fetch': typeof fetch === 'undefined',
    'Object.entries': typeof Object.entries !== 'function',
    'Array.includes': !Array.prototype.includes,
    'String.includes': !String.prototype.includes,
    'Object.assign': typeof Object.assign !== 'function',
    'requestAnimationFrame': !window.requestAnimationFrame,
    'IntersectionObserver': !('IntersectionObserver' in window),
  };

  return Object.values(features).some(Boolean);
};

// Only load polyfills if needed
if (needsPolyfills()) {
  // Load polyfills from CDN
  const script = document.createElement('script');
  script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es2017,es2018,es2019,es2020,fetch,IntersectionObserver,ResizeObserver,URL,Object.entries,Array.prototype.includes,String.prototype.includes,Object.assign,requestAnimationFrame';
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

// Add a class to the HTML element for feature detection
document.documentElement.classList.add(needsPolyfills() ? 'js-legacy' : 'js-modern');
