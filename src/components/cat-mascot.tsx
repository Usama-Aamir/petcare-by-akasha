"use client";

import { useRef, useState } from "react";

export default function CatMascot() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showMeow, setShowMeow] = useState(false);

  const handleMeow = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/meow.mp3");
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
    setShowMeow(true);
    setTimeout(() => setShowMeow(false), 1200);
  };

  return (
    <div className="cat-mascot pointer-events-none fixed top-20 left-0 z-30">
      <div className="cat-mascot-bob relative">
        <button
          onClick={handleMeow}
          className="pointer-events-auto flex h-12 w-12 cursor-pointer items-center justify-center text-4xl select-none sm:text-5xl"
          aria-label="Meow"
          style={{ color: "#3F6B57" }}
        >
          🐈
        </button>
        {showMeow && (
          <span
            className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sage-deep px-2 py-0.5 text-xs font-semibold text-cream"
          >
            Meow!
          </span>
        )}
      </div>
    </div>
  );
}
