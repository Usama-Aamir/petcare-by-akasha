"use client";

import { useRef, useState } from "react";

export default function CatMascot() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showMeow, setShowMeow] = useState(false);

  const handleMeow = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/meow.mp3");
    }
    const audio = audioRef.current;
    let playCount = 0;
    const playOnce = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      playCount++;
    };
    playOnce();
    audio.onended = () => {
      if (playCount < 2) {
        playOnce();
      } else {
        audio.onended = null;
      }
    };
    setShowMeow(true);
    setTimeout(() => setShowMeow(false), 2000);
  };

  return (
    <div className="cat-mascot pointer-events-none fixed top-20 left-0 z-50 h-14 w-20 sm:top-24 sm:h-16 sm:w-24">
      <div className="cat-mascot-bob relative h-full w-full">
        <button
          onClick={handleMeow}
          className="pointer-events-auto flex h-full w-full cursor-pointer items-center justify-center"
          aria-label="Meow"
        >
          <svg
            viewBox="0 0 100 70"
            className="h-12 w-16 sm:h-16 sm:w-24"
            fill="none"
            stroke="#3F6B57"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Tail */}
            <path
              className="cat-tail"
              d="M82 42 Q92 30 88 18"
              stroke="#3F6B57"
              strokeWidth="3"
              fill="none"
            />
            {/* Body */}
            <ellipse cx="50" cy="42" rx="28" ry="14" fill="#3F6B57" stroke="none" opacity="0.9" />
            {/* Head */}
            <circle cx="22" cy="36" r="13" fill="#3F6B57" stroke="none" opacity="0.9" />
            {/* Ears */}
            <path d="M14 28 L11 18 L20 24 Z" fill="#3F6B57" stroke="none" opacity="0.9" />
            <path d="M28 26 L30 16 L22 22 Z" fill="#3F6B57" stroke="none" opacity="0.9" />
            {/* Inner ears */}
            <path d="M15 26 L13 21 L18 24 Z" fill="#7FAF95" stroke="none" />
            <path d="M27 25 L29 19 L24 22 Z" fill="#7FAF95" stroke="none" />
            {/* Eyes */}
            <circle cx="18" cy="35" r="1.8" fill="#F5F1E4" />
            <circle cx="26" cy="35" r="1.8" fill="#F5F1E4" />
            {/* Nose */}
            <path d="M21 39 L22 40 L23 39" stroke="#F5F1E4" strokeWidth="1.2" fill="none" />
            {/* Whiskers */}
            <path d="M10 38 L16 39" stroke="#3F6B57" strokeWidth="1" opacity="0.5" />
            <path d="M10 41 L16 40" stroke="#3F6B57" strokeWidth="1" opacity="0.5" />
            <path d="M28 39 L34 38" stroke="#3F6B57" strokeWidth="1" opacity="0.5" />
            <path d="M28 40 L34 41" stroke="#3F6B57" strokeWidth="1" opacity="0.5" />
            {/* Front legs */}
            <line className="cat-leg-front-1" x1="35" y1="52" x2="35" y2="64" stroke="#3F6B57" strokeWidth="3.5" />
            <line className="cat-leg-front-2" x1="42" y1="52" x2="42" y2="64" stroke="#3F6B57" strokeWidth="3.5" />
            {/* Back legs */}
            <line className="cat-leg-back-1" x1="60" y1="52" x2="60" y2="64" stroke="#3F6B57" strokeWidth="3.5" />
            <line className="cat-leg-back-2" x1="67" y1="52" x2="67" y2="64" stroke="#3F6B57" strokeWidth="3.5" />
          </svg>
        </button>
        {showMeow && (
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sage-deep px-2 py-0.5 text-xs font-semibold text-cream">
            Meow! Meow!
          </span>
        )}
      </div>
    </div>
  );
}
