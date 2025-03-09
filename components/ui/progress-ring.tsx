"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressRingProps extends React.SVGProps<SVGSVGElement> {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  background?: string
  foreground?: string
  children?: React.ReactNode
}

export function ProgressRing({
  value,
  size = 64,
  strokeWidth = 4,
  className,
  background = "stroke-muted",
  foreground = "stroke-primary",
  children,
  ...props
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative inline-flex">
      <svg
        className={cn("transform -rotate-90", className)}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        {...props}
      >
        <circle
          className={background}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={foreground}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
} 