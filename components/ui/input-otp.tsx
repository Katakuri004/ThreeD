"use client"

import * as React from "react"
import { OTPInput, SlotProps } from "input-otp"
import { cn } from "@/lib/utils"
import { Dot } from "lucide-react"

const InputOTP = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof OTPInput>>(
  ({ className, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
)
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
  )
)
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<HTMLInputElement, SlotProps>(
  ({ char, hasFakeCaret, isActive, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative h-10 w-10 rounded-md bg-muted text-center text-sm font-medium shadow-sm transition-all",
          isActive && "ring-2 ring-offset-background ring-offset-2",
          className
        )}
      >
        {char ? (
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            {char}
          </div>
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <Dot />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "absolute inset-0 h-full w-full opacity-0",
            hasFakeCaret && "animate-caret-blink",
          )}
          {...props}
        />
      </div>
    )
  }
)
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Dot />
    </div>
  )
)
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } 