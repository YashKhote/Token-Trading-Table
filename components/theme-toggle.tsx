"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const iconMap = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  const Icon = iconMap[theme];
  const isDark = resolvedTheme === "dark";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 relative hover:bg-muted/50 rounded-lg transition-all duration-200 flex-shrink-0"
          aria-label="Toggle theme"
        >
          <Icon className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-5 sm:w-5 transition-transform duration-200" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2" align="end">
        <div className="space-y-1">
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
              theme === "light"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <Sun className="h-4 w-4" />
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
              theme === "dark"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <Moon className="h-4 w-4" />
            Dark
          </button>
          <button
            onClick={() => setTheme("system")}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
              theme === "system"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <Monitor className="h-4 w-4" />
            System
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

