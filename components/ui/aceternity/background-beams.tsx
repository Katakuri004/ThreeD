"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

// Simple noise function that returns a value between -1 and 1
const noise3D = (x: number, y: number, z: number) => {
  return (Math.sin(x * 10 + z) + Math.sin(y * 10 + z)) * 0.5;
};

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    damping: 20,
    stiffness: 300,
  });
  const smoothMouseY = useSpring(mouseY, {
    damping: 20,
    stiffness: 300,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradientBackground = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradientBackground.addColorStop(0, "#1a1a1a");
      gradientBackground.addColorStop(1, "#1a1a1a");
      ctx.fillStyle = gradientBackground;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradientBeams = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradientBeams.addColorStop(0, "#4f46e5");
      gradientBeams.addColorStop(1, "#6366f1");
      ctx.fillStyle = gradientBeams;

      const w = canvas.width;
      const h = canvas.height;
      const mouseXNorm = smoothMouseX.get() / w;
      const mouseYNorm = smoothMouseY.get() / h;

      for (let i = 0; i < 8; i++) {
        const x = w * 0.5;
        const y = h * 0.5;
        const angle = (i / 8) * Math.PI * 2 + time * 0.1;
        const length = w * 0.4;

        const noiseFactor = noise3D(
          mouseXNorm * 0.5,
          mouseYNorm * 0.5,
          time * 0.1 + i
        );

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(-length * 0.5, 0);
        ctx.lineTo(length * 0.5, 0);
        ctx.lineWidth = 50 + noiseFactor * 50;
        ctx.strokeStyle = gradientBeams;
        ctx.stroke();
        ctx.restore();
      }

      time += 0.01;
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mouseX, mouseY, smoothMouseX, smoothMouseY]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}; 