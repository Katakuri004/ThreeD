"use client"

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { IconBrain, IconUsers, IconRocket, IconHeart, IconTrophy, IconChartBar } from "@tabler/icons-react";
import { motion } from "framer-motion";

const reviews = [
  { 
    quote: "ThreeD has revolutionized how we teach mechanical engineering concepts!", 
    name: "Prof. Alice Chen", 
    title: "MIT Professor" 
  },
  { 
    quote: "The platform's 3D models helped me understand complex mechanisms better.", 
    name: "Bob Smith", 
    title: "Engineering Student" 
  },
  { 
    quote: "An invaluable resource for our engineering department.", 
    name: "Dr. Charlie Wilson", 
    title: "Department Head" 
  },
  { 
    quote: "The collaborative features make teaching so much more interactive.", 
    name: "Diana Martinez", 
    title: "Engineering Educator" 
  },
];

const teamMembers = [
  { 
    id: 1, 
    name: "John Doe", 
    designation: "Founder & CEO", 
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
    bio: "Former SpaceX engineer with a passion for education"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    designation: "CTO", 
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Jane",
    bio: "PhD in Computer Graphics from Stanford"
  },
  { 
    id: 3, 
    name: "Emily Davis", 
    designation: "Head of Education", 
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emily",
    bio: "15 years of experience in engineering education"
  },
  { 
    id: 4, 
    name: "Michael Chen", 
    designation: "Lead Developer", 
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
    bio: "Full-stack developer specialized in 3D web technologies"
  },
];

const stats = [
  { number: "50K+", label: "Active Users", icon: <IconUsers className="h-6 w-6" /> },
  { number: "100K+", label: "3D Models", icon: <IconRocket className="h-6 w-6" /> },
  { number: "200+", label: "Universities", icon: <IconBrain className="h-6 w-6" /> },
  { number: "1M+", label: "Downloads", icon: <IconChartBar className="h-6 w-6" /> },
];

const values = [
  {
    title: "Innovation",
    description: "Pushing the boundaries of 3D visualization in education",
    icon: <IconRocket className="h-6 w-6 text-violet-500" />,
  },
  {
    title: "Accessibility",
    description: "Making engineering education accessible to everyone",
    icon: <IconHeart className="h-6 w-6 text-pink-500" />,
  },
  {
    title: "Excellence",
    description: "Maintaining the highest standards in our platform",
    icon: <IconTrophy className="h-6 w-6 text-yellow-500" />,
  },
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
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500">
            Revolutionizing Engineering Education
          </h1>
          <p className="text-xl text-neutral-300 leading-relaxed">
            ThreeD is on a mission to transform how engineering concepts are taught and learned through interactive 3D visualization and collaboration.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm"
            >
              <div className="flex justify-center mb-4 text-violet-500">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
              <p className="text-neutral-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-600 text-center">
            Our Mission
          </h2>
          <div className="prose prose-invert mx-auto">
            <p className="text-lg text-neutral-300 leading-relaxed text-center">
              At ThreeD, we believe that understanding complex engineering concepts shouldn't be a struggle. 
              Our platform combines cutting-edge 3D visualization technology with intuitive collaboration tools 
              to create an immersive learning experience that makes engineering education more engaging and effective.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-600 text-center">
          Our Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-lg bg-white/5 backdrop-blur-sm"
            >
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-neutral-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-600 text-center">
          Meet Our Team
        </h2>
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-8 justify-center flex-wrap">
            <AnimatedTooltip items={teamMembers} />
          </div>
          <p className="text-neutral-400 text-center max-w-2xl mt-8">
            Our team combines expertise in engineering, education, and technology to create the best possible learning experience for our users.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-600 text-center">
          What People Say
        </h2>
        <div className="h-[200px] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards items={reviews} direction="right" speed="slow" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-600 text-center">
            Get in Touch
          </h2>
          <Card className="p-6 bg-white/5 backdrop-blur-sm">
            <Textarea
              className="min-h-[100px] bg-neutral-950 border-neutral-800 text-neutral-200 resize-none mb-4"
              placeholder="Share your thoughts or questions with us..."
              value={comment}
              onChange={handleCommentChange}
            />
            <div className="flex justify-end">
              <Button
                className="bg-violet-500 hover:bg-violet-600 text-white"
                onClick={handleCommentSubmit}
              >
                Send Message
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
