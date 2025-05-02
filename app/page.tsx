"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Sample profile data with fixed name but different descriptions and images
const profileData = [
  {
    description:
      "Loves hiking and outdoor adventures. Always up for a new challenge!",
    imageUrl: "/viktor1.jpeg?height=400&width=300",
  },
  {
    description:
      "Coffee enthusiast and book lover. Let's discuss our favorite novels over a cup of joe.",
    imageUrl: "/viktor2.jpeg?height=400&width=300",
  },
  {
    description:
      "Passionate about cooking and trying new recipes. I make a mean pasta carbonara!",
    imageUrl: "/viktor3.jpeg?height=400&width=300",
  },
  {
    description:
      "Music lover and amateur guitarist. Always looking for concert buddies!",
    imageUrl: "/viktor4.jpeg?height=400&width=300",
  },
  {
    description:
      "Travel addict with a goal to visit 50 countries before turning 40. Currently at 23!",
    imageUrl: "/viktor5.jpeg?height=400&width=300",
  },
  {
    description:
      "Tech geek who loves building things. Currently working on a side project that might change the world... or at least make it a bit more fun.",
    imageUrl: "/viktor6.jpeg?height=400&width=300",
  },
  {
    description:
      "Tech geek who loves building things. Currently working on a side project that might change the world... or at least make it a bit more fun.",
    imageUrl: "/viktor7.jpeg?height=400&width=300",
  },
];

export default function TinderClone() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [direction, setDirection] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasLikedOnce, setHasLikedOnce] = useState(false);
  const [showLogoOverlay, setShowLogoOverlay] = useState(false);

  const currentProfile = profileData[currentProfileIndex];

  const handleLike = () => {
    if (!hasLikedOnce) setHasLikedOnce(true);
    handleSwipe("right");
  };

  const handleSwipe = (dir: string) => {
    if (isAnimating) return;

    setDirection(dir);
    setIsAnimating(true);

    // After animation completes, show next profile
    setTimeout(() => {
      setCurrentProfileIndex(
        (prevIndex) => (prevIndex + 1) % profileData.length
      );
      setIsAnimating(false);
      setDirection("");
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 dark bg-gray-900 dark:text-white">
      <div className="w-full max-w-sm relative">
        <motion.div
          animate={
            direction === "right"
              ? { x: 300, opacity: 0, rotate: 20 }
              : direction === "left"
              ? { x: -300, opacity: 0, rotate: -20 }
              : { x: 0, opacity: 1, rotate: 0 }
          }
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <Card className="overflow-hidden shadow-lg">
            <div className="relative h-[400px] w-full">
              <Image
                src={`/ok-stupid${
                  currentProfile.imageUrl || "/placeholder.svg"
                }`}
                alt="Profile picture"
                fill
                className="object-cover"
                priority
              />
              {hasLikedOnce && (
                <a
                  href="https://instagram.com/viktor_vozar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute flex items-center gap-1 bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full shadow-lg hover:bg-black/90 transition"
                  style={{ zIndex: 10 }}
                >
                  {/* Instagram SVG Logo */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="3"
                      rx="5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="17" cy="7" r="1" fill="currentColor" />
                  </svg>
                  <span className="font-medium text-sm">@viktor_vozar</span>
                </a>
              )}
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-1">Viktor, 27</h2>
              <p className="text-sm md:text-base text-gray-200">
                {currentProfile.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex justify-center gap-8 mt-6">
          <Button
            onClick={() => handleSwipe("left")}
            size="lg"
            className="h-14 w-14 rounded-full bg-gray-200 hover:bg-red-100 border-2 border-gray-300"
            variant="outline"
          >
            <X className="h-7 w-7 text-red-500" />
            <span className="sr-only">Dislike</span>
          </Button>

          <Button
            onClick={handleLike}
            size="lg"
            className="h-14 w-14 rounded-full bg-gray-200 hover:bg-green-100 border-2 border-gray-300"
            variant="outline"
          >
            <Heart className="h-7 w-7 text-green-500" />
            <span className="sr-only">Like</span>
          </Button>
        </div>
      </div>
      {/* Claim at bottom right */}
      <div
        className="fixed bottom-4 right-4 flex items-center gap-2 bg-black/70 text-white px-3 py-1 rounded-full shadow-lg cursor-pointer z-40 hover:bg-black/90 transition text-xs"
        onClick={() => setShowLogoOverlay(true)}
      >
        <span>brought to you by - I Tripel E -</span>
        <img
          src="/ok-stupid/logo.jpeg"
          alt="I TRIPEL E Logo"
          className="w-6 h-6 object-contain rounded-full"
        />
      </div>
      {/* Logo overlay */}
      {showLogoOverlay && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold bg-black/60 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition"
            onClick={() => setShowLogoOverlay(false)}
            aria-label="Close logo overlay"
          >
            &times;
          </button>
          <img
            src="/ok-stupid/logo.jpeg"
            alt="I TRIPLE E Logo Large"
            className="w-64 h-64 object-contain rounded-2xl shadow-2xl border-4 border-white"
          />
          <span className="mt-4 text-white text-lg font-semibold">
            I TRIPLE E
          </span>
        </div>
      )}
    </div>
  );
}
