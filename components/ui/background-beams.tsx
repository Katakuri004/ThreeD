"use client";
import React from "react";
import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 opacity-50 mix-blend-soft-light",
        className
      )}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern
            id="dotted-pattern"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="16" cy="16" r="1" fill="white" fillOpacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotted-pattern)" />
      </svg>
    </div>
  );
} 