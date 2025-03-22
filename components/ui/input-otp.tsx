"use client"

import { OTPInput, SlotProps } from "input-otp"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Dot } from "lucide-react"

interface InputOTPProps {
  maxLength?: number
  className?: string
}

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  ({ maxLength = 6, className }, ref) => (
    <OTPInput
      ref={ref}
      maxLength={maxLength}
      render={({ slots }) => (
        <div className={cn("flex items-center gap-2", className)}>
          {slots.map((props, index) => (
            <InputOTPSlot key={index} {...props} />
          ))}
        </div>
      )}
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

interface InputOTPSlotProps extends SlotProps {
  className?: string
}

const InputOTPSlot = React.forwardRef<HTMLInputElement, InputOTPSlotProps>(
  ({ char, hasFakeCaret, isActive, className, ...props }, ref) => (
    <div
      className={cn(
        "relative h-10 w-10 rounded-md border text-sm transition-all",
        isActive && "ring-2 ring-offset-2",
        className
      )}
    >
      <input
        ref={ref}
        className={cn(
          "absolute inset-0 h-full w-full rounded-md text-center text-base",
          "appearance-none bg-transparent outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
        {...props}
      />
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
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