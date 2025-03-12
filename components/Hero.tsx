"use client";
import React from "react";
import { BackgroundBoxes } from "./ui/background-boxes";
import { Button } from "./ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative h-[100vh] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] flex items-center justify-center overflow-hidden">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      {/* Background Boxes with adjusted z-index */}
      <div className="absolute inset-0 z-0">
        <BackgroundBoxes className="opacity-40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Backdrop blur container */}
        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-xl backdrop-filter rounded-lg p-8 border border-white/10">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-violet-600 to-violet-300">
            Welcome to <span className="text-violet-500">ThreeD</span>
          </h1>
          <p className="mt-4 font-normal text-base md:text-lg text-neutral-800 dark:text-neutral-200 max-w-lg text-center mx-auto">
            Create. Share. Find Your CAD Needs in ThreeD
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-lg font-medium">
              <Link href="/about">About</Link>
            </Button>
            <Button asChild variant="outline" className="border-violet-500 text-violet-500 hover:bg-violet-500/10 px-6 py-3 rounded-lg font-medium">
              <Link href="/explore">Explore</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 