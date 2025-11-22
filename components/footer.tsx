"use client";

import { Github, Twitter, Linkedin, ExternalLink, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 200;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-border/50 bg-background/95 backdrop-blur-sm mt-16">
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 xs:bottom-6 sm:bottom-8 right-4 xs:right-6 sm:right-8 z-50 h-10 w-10 xs:h-11 xs:w-11 sm:h-12 sm:w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-5 sm:w-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      <div className="container mx-auto px-2 xs:px-3 sm:px-4 lg:px-8 py-8 xs:py-10 sm:py-12 max-w-[1920px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-7 sm:gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-3 xs:space-y-4">
            <div className="flex items-center gap-2 xs:gap-3">
              <div className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg xs:rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 shadow-lg ring-1 ring-primary/30 dark:ring-primary/40 flex flex-shrink-0">
                <span className="text-sm xs:text-base sm:text-lg font-bold text-primary-foreground">TD</span>
              </div>
              <h3 className="text-base xs:text-lg sm:text-xl font-bold text-foreground truncate">Token Discovery</h3>
            </div>
            <p className="text-xs xs:text-sm text-muted-foreground leading-relaxed">
              Discover, track, and analyze the latest token pairs with real-time price updates and comprehensive market data.
            </p>
            <div className="flex items-center gap-2 xs:gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 xs:h-9 xs:w-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 xs:h-9 xs:w-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 xs:h-9 xs:w-9 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors duration-200 flex-shrink-0"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 xs:space-y-4">
            <h4 className="text-xs xs:text-sm font-semibold text-foreground uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 xs:space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("new-pairs")}
                  className="text-xs xs:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 xs:gap-2 group"
                >
                  <span>New Pairs</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("final-stretch")}
                  className="text-xs xs:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 xs:gap-2 group"
                >
                  <span>Final Stretch</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("migrated")}
                  className="text-xs xs:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 xs:gap-2 group"
                >
                  <span>Migrated</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3 xs:space-y-4">
            <h4 className="text-xs xs:text-sm font-semibold text-foreground uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 xs:space-y-3">
              <li>
                <a
                  href="#"
                  className="text-xs xs:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 xs:gap-2 group"
                >
                  <span>Documentation</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs xs:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 xs:gap-2 group"
                >
                  <span>API Reference</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs xs:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 xs:gap-2 group"
                >
                  <span>Support</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs xs:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 xs:gap-2 group"
                >
                  <span>Blog</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3 xs:space-y-4">
            <h4 className="text-xs xs:text-sm font-semibold text-foreground uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 xs:space-y-3">
              <li>
                <a
                  href="#"
                  className="text-xs xs:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 xs:gap-2 group"
                >
                  <span>Privacy Policy</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs xs:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 xs:gap-2 group"
                >
                  <span>Terms of Service</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs xs:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5 xs:gap-2 group"
                >
                  <span>Disclaimer</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 xs:mt-10 sm:mt-12 pt-6 xs:pt-7 sm:pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 xs:gap-4">
            <p className="text-xs xs:text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} Token Discovery. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs text-muted-foreground flex-wrap justify-center">
              <span>Built with</span>
              <span className="text-red-500">♥</span>
              <span className="hidden xs:inline">using Next.js & TypeScript</span>
              <span className="xs:hidden">Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

