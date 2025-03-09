"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(150).fill(1);
  const cols = new Array(100).fill(1);
  
  const getRandomColor = () => {
    const colors = [
      // Violet shades
      "rgb(221 214 254)", // violet-200
      "rgb(196 181 253)", // violet-300
      "rgb(167 139 250)", // violet-400
      "rgb(139 92 246)",  // violet-500
      "rgb(124 58 237)",  // violet-600
      
      // Purple shades
      "rgb(233 213 255)", // purple-200
      "rgb(216 180 254)", // purple-300
      "rgb(192 132 252)", // purple-400
      "rgb(168 85 247)",  // purple-500
      "rgb(147 51 234)",  // purple-600
      
      // Fuchsia shades
      "rgb(245 208 254)", // fuchsia-200
      "rgb(240 171 252)", // fuchsia-300
      "rgb(232 121 249)", // fuchsia-400
      "rgb(217 70 239)",  // fuchsia-500
      "rgb(192 38 211)",  // fuchsia-600
      
      // Pink shades
      "rgb(251 207 232)", // pink-200
      "rgb(249 168 212)", // pink-300
      "rgb(244 114 182)", // pink-400
      "rgb(236 72 153)",  // pink-500
      "rgb(219 39 119)",  // pink-600
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row${i}`}
          className="w-16 h-8 border-l border-slate-700/[0.3] relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
                opacity: 0.7,
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col${j}`}
              className="w-16 h-8 border-r border-t border-slate-700/[0.3] relative hover:z-50 cursor-pointer"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700/[0.3] stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const BackgroundBoxes = React.memo(BoxesCore); 