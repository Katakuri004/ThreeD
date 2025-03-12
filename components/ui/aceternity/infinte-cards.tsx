"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"; // ✅ Ensure correct import path

export default function InfiniteCardsComponent() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </div>
  );
}

const testimonials = [
  {
    quote: "It was the best of times, it was the worst of times...",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote: "To be, or not to be, that is the question...",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote: "It is a truth universally acknowledged...",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote: "Call me Ishmael...",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
