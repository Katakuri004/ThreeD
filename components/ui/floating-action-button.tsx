"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { IconPlus, IconMessage, IconHome, IconUser } from "@tabler/icons-react";

interface FloatingActionButtonProps {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
  }[];
}

export function FloatingActionButton({ items }: FloatingActionButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: idx * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="group flex items-center gap-2"
                >
                  <div className="rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-all hover:scale-110">
                    {item.icon}
                  </div>
                  <span className="rounded-md bg-background px-2 py-1 text-sm font-medium shadow-lg opacity-0 transition-opacity group-hover:opacity-100">
                    {item.title}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-transform hover:scale-110"
      >
        <IconPlus
          className={cn("h-6 w-6 transition-transform", open && "rotate-45")}
        />
      </button>
    </div>
  );
} 