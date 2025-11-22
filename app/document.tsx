import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  // This function will be properly typed by React's event handler
  const onLoad = (e: React.SyntheticEvent<HTMLLinkElement, Event>) => {
    const link = e.target as HTMLLinkElement;
    link.onload = null;
    link.rel = 'stylesheet';
  };

  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* Preload critical CSS */}
        <link
          rel="preload"
          href="/_next/static/css/app/layout.css"
          as="style"
          onLoad={onLoad}
        />
        <noscript>
          <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
        </noscript>

        {/* Add any other meta tags, preloads, etc. */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>
      <body className="font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
