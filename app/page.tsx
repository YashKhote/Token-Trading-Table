"use client";

import { TokenTradingTable } from "@/components/token-trading-table";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroSection } from "@/components/dashboard/hero-section";
import { SectionTabs } from "@/components/dashboard/section-tabs";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-200">
      {/* Header with theme toggle */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/98 dark:bg-background/98 backdrop-blur-xl supports-[backdrop-filter]:bg-background/95 shadow-md">
        <div className="container mx-auto flex h-14 xs:h-16 sm:h-18 md:h-20 items-center justify-between px-1 xs:px-2 sm:px-3 md:px-4 lg:px-8 max-w-[1920px]">
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
            {/* Logo/Icon */}
            <div className="hidden xs:flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg xs:rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 shadow-lg ring-1 ring-primary/30 dark:ring-primary/40 flex-shrink-0">
              <span className="text-sm xs:text-base sm:text-lg font-bold text-primary-foreground">TD</span>
            </div>
            <h1 className="text-base xs:text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground tracking-tight truncate">
              Token Discovery
            </h1>
          </div>
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 lg:gap-3 flex-shrink-0">
            {/* Status indicator */}
            <div className="hidden xs:flex items-center gap-1.5 xs:gap-2 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm">
              <div className="h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] xs:text-xs font-semibold text-emerald-600 dark:text-emerald-400">Live</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Dashboard Section */}
      <HeroSection />

      {/* Section Navigation Tabs */}
      <SectionTabs />

      {/* Token Tables Content */}
      <div className="container mx-auto px-1 xs:px-2 sm:px-3 md:px-4 lg:px-6 py-2 xs:py-3 sm:py-4 md:py-6 lg:py-8 max-w-[1920px]">
        <TokenTradingTable />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

