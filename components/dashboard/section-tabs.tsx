"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";

interface SectionTabsProps {
  onSectionChange?: (section: string) => void;
}

export function SectionTabs({ onSectionChange }: SectionTabsProps) {
  const tokens = useAppSelector((state) => state.tokens.tokens);
  const [activeSection, setActiveSection] = useState<string>("new-pairs");

  // Count tokens by category
  const counts = {
    "new-pairs": tokens.filter((t) => t.category === "new-pairs").length,
    "final-stretch": tokens.filter((t) => t.category === "final-stretch").length,
    migrated: tokens.filter((t) => t.category === "migrated").length,
  };

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["new-pairs", "final-stretch", "migrated"];
      const scrollPosition = window.scrollY + 200; // Offset for sticky header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            if (onSectionChange) {
              onSectionChange(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onSectionChange]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 200; // Account for sticky header and tabs
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      
      // Update active section immediately
      setActiveSection(sectionId);
      if (onSectionChange) {
        onSectionChange(sectionId);
      }
    }
  };

  const tabs = [
    {
      id: "new-pairs",
      label: "New Pairs",
      count: counts["new-pairs"],
    },
    {
      id: "final-stretch",
      label: "Final Stretch",
      count: counts["final-stretch"],
    },
    {
      id: "migrated",
      label: "Migrated",
      count: counts.migrated,
    },
  ];

  return (
    <div className="sticky top-14 xs:top-16 sm:top-18 md:top-20 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-1 xs:px-2 sm:px-3 md:px-4 lg:px-8">
        <div className="grid grid-cols-3 gap-0 xs:gap-0.5 sm:gap-1 md:gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={cn(
                "relative flex items-center justify-center gap-0.5 xs:gap-1 sm:gap-1.5 md:gap-2 px-1 xs:px-1.5 sm:px-2.5 md:px-3 lg:px-4 xl:px-6 py-1.5 xs:py-2 sm:py-2.5 md:py-3 lg:py-4 text-[10px] xs:text-xs sm:text-sm md:text-base font-semibold transition-all duration-200 whitespace-nowrap border-b-2 border-transparent",
                "hover:text-foreground hover:border-emerald-500/30",
                activeSection === tab.id
                  ? "text-emerald-500 dark:text-emerald-400 border-emerald-500 dark:border-emerald-400"
                  : "text-muted-foreground"
              )}
            >
              <span className="truncate text-center leading-tight">{tab.label}</span>
              
              {/* Count badge */}
              <span
                className={cn(
                  "inline-flex items-center justify-center min-w-[14px] xs:min-w-[16px] sm:min-w-[18px] md:min-w-[20px] lg:min-w-[24px] h-3.5 xs:h-4 sm:h-4.5 md:h-5 lg:h-6 px-0.5 xs:px-1 sm:px-1.5 md:px-2 rounded-full text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-semibold transition-all duration-200 flex-shrink-0",
                  activeSection === tab.id
                    ? "bg-emerald-500 text-white dark:bg-emerald-400 dark:text-emerald-950 shadow-sm"
                    : "bg-muted/50 text-muted-foreground dark:bg-muted/30"
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

