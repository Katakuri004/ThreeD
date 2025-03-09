"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        tom: "border-transparent bg-violet-500 text-white hover:bg-violet-600",
        ht: "border-transparent bg-pink-500 text-white hover:bg-pink-600",
        th: "border-transparent bg-purple-500 text-white hover:bg-purple-600",
        civ: "border-transparent bg-fuchsia-500 text-white hover:bg-fuchsia-600",
        fld: "border-transparent bg-rose-500 text-white hover:bg-rose-600",
        sld: "border-transparent bg-indigo-500 text-white hover:bg-indigo-600",
        misc: "border-transparent bg-slate-500 text-white hover:bg-slate-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants } 