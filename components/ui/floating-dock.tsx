"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

interface FloatingDockProps {
  items: {
    title: string
    icon: React.ReactNode
    href: string
    onClick?: () => void
  }[]
  desktopClassName?: string
  mobileClassName?: string
}

export function FloatingDock({
  items,
  desktopClassName,
  mobileClassName,
}: FloatingDockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <>
      {/* Desktop Dock */}
      <div
        className={cn(
          "hidden md:flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg",
          desktopClassName
        )}
      >
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            onHoverStart={() => setHoveredIndex(idx)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="relative"
          >
            <Link
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                item.onClick?.()
              }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {item.icon}
            </Link>
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm whitespace-nowrap"
              >
                {item.title}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Mobile Dock */}
      <div
        className={cn(
          "md:hidden flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg",
          mobileClassName
        )}
      >
        {items.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            onClick={(e) => {
              e.preventDefault()
              item.onClick?.()
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </>
  )
} 