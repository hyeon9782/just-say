"use client";

import { VoiceIcon } from "@/composables/icons";
import { useState } from "react";

const TalkButton = () => {
  const [isTalking, setIsTalking] = useState(false);

  const handleClick = () => {
    setIsTalking(!isTalking);
  };

  return isTalking ? (
    <div>Loading...</div>
  ) : (
    <div
      className="border border-sky-blue rounded-full p-[10px]"
      onClick={handleClick}
    >
      <VoiceIcon className="text-7xl text-sky-blue" />
    </div>
  );
};

export default TalkButton;
