"use client"

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const reviews = [
  { quote: "Amazing platform with great features!", name: "Alice", title: "Developer" },
  { quote: "A wonderful experience using this site.", name: "Bob", title: "Designer" },
  { quote: "Highly recommend to everyone.", name: "Charlie", title: "Product Manager" },
];

const teamMembers = [
  { id: 1, name: "John Doe", designation: "CEO", image: "https://api.dicebear.com/7.x/avatars/svg?seed=John" },
  { id: 2, name: "Jane Smith", designation: "CTO", image: "https://api.dicebear.com/7.x/avatars/svg?seed=Jane" },
  { id: 3, name: "Emily Davis", designation: "COO", image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emily" },
];

export default function AboutPage() {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log("Comment submitted:", comment);
    setComment("");
  };

  return (
    <div className="min-h-screen w-full bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <BackgroundBeams />
      
      {/* About Section */}
      <div className="container mx-auto px-4 py-8 pt-20 relative z-10">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-600">About Us</h1>
        <div className="prose prose-invert mb-12">
          <p className="text-neutral-300">
            Welcome to our platform dedicated to revolutionizing engineering education through interactive 3D models and collaborative learning. Our mission is to make complex engineering concepts more accessible and engaging for students worldwide.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-600">Meet Our Team</h2>
          <div className="flex gap-8 justify-center">
            <AnimatedTooltip items={teamMembers} />
          </div>
        </div>

        {/* Comment Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-600">Share Your Thoughts</h2>
          <div className="max-w-2xl mx-auto">
            <Textarea
              className="min-h-[100px] bg-neutral-950 border-neutral-800 text-neutral-200 resize-none"
              placeholder="Write your comment here..."
              value={comment}
              onChange={handleCommentChange}
            />
            <Button
              className="mt-4 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
              onClick={handleCommentSubmit}
            >
              Submit
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-600">What People Say</h2>
          <div className="h-[200px] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards items={reviews} direction="right" speed="slow" />
          </div>
        </div>
      </div>
    </div>
  );
}
