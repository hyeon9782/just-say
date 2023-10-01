"use client";

import { VoiceIcon } from "@/composables/icons";
import useSpeechToText from "@/hooks/useSpeechToText";
import { useState } from "react";

const TalkButton = () => {
  const [isRecording, setIsRecording] = useState(false);

  let text = useSpeechToText({ isRecording, lang: "en-US" });

  const handleClick = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col items-center">
      <p>{text}</p>
      <span className="text-xl pt-[10px] pb-[20px]">
        {isRecording
          ? "듣는 중이에요..."
          : "마이크를 클릭하여 대화를 시작하세요!"}
      </span>
      <div
        className="border border-sky-blue rounded-full w-[100px] h-[100px] flex justify-center items-center"
        onClick={handleClick}
      >
        <VoiceIcon className="text-7xl text-sky-blue" />
      </div>
    </div>
  );
};

export default TalkButton;
