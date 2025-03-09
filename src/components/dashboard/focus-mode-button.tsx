"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Focus } from "@/components/ui/focus";

interface FocusModeButtonProps {
  onEnterFocusMode: () => void;
}

export default function FocusModeButton({
  onEnterFocusMode,
}: FocusModeButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      onClick={onEnterFocusMode}
      className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Focus className={`h-5 w-5 mr-2 ${isHovered ? "animate-pulse" : ""}`} />
      Ready to work!
    </Button>
  );
}
