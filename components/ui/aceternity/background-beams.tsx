"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const noise = createNoise3D();

  const springConfig = { damping: 25, stiffness: 700 };
  const springConfig2 = { damping: 15, stiffness: 300 };

  const rotateX = useSpring(
    useTransform(mouseY, [-100, 100], [45, -45]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-100, 100], [-45, 45]),
    springConfig
  );
  const rotateX2 = useSpring(
    useTransform(mouseY, [-100, 100], [30, -30]),
    springConfig2
  );
  const rotateY2 = useSpring(
    useTransform(mouseX, [-100, 100], [-30, 30]),
    springConfig2
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseXPos = e.clientX - rect.left;
      const mouseYPos = e.clientY - rect.top;

      const xPct = mouseXPos / width - 0.5;
      const yPct = mouseYPos / height - 0.5;

      mouseX.set(xPct * 100);
      mouseY.set(yPct * 100);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={ref}
      className={cn(
        "h-full w-full bg-black [perspective:1000px] relative overflow-hidden",
        className
      )}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.1s ease-out",
        }}
        className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotateX2}deg) rotateY(${rotateY2}deg)`,
              transition: "transform 0.1s ease-out",
            }}
            className="relative h-full w-full rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 p-4"
          >
            <div className="absolute inset-0 bg-black/50 rounded-xl" />
            <div className="relative z-10 h-full w-full">
              <div className="h-full w-full rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 p-4">
                <div className="h-full w-full rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 