"use client";
import { VoiceIcon } from "@/composables/icons";
import useSpeechToText from "@/hooks/useSpeechToText";
import { rolePlaying } from "@/services/gpt";
import { initGPT, textToSpeech } from "@/services/talk";
import { Message } from "@/types";
import { useEffect, useState } from "react";
type Props = {
  messages: Message[];
  success: () => void;
  addMessages: (newMessages: Message[]) => void;
};
const TalkButtonTest = ({ messages, success, addMessages }: Props) => {
  const [isRecording, setIsRecording] = useState(false);

  let text = useSpeechToText({ isRecording, lang: "ko-KR" });

  const handleClick = () => {
    setIsRecording(!isRecording);
  };

  const callTTS = async (initData: any) => {
    const response = await rolePlaying(initData);
    const data = await response.json();
    if (response.status !== 200) {
      throw (
        data.error || new Error(`request failed with status ${response.status}`)
      );
    }

    console.log(data);

    textToSpeech({ text: data.result });
  };

  useEffect(() => {
    const initData = initGPT({ lang: "Korean", type: "cafe" });
    addMessages(initData);
    callTTS(initData);
  }, [addMessages]);

  return (
    <div className="flex flex-col items-center ">
      <p>{text}</p>
      <span className="text-md sm:text-xl pt-[10px] pb-[20px]">
        {isRecording
          ? "듣는 중이에요..."
          : "마이크를 클릭하여 대화를 시작하세요!"}
      </span>
      <div
        className={`border border-sky-blue rounded-full w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] flex justify-center items-center ${
          isRecording ? "bg-sky-blue text-white" : "bg-white text-sky-blue"
        }`}
        onClick={handleClick}
      >
        <VoiceIcon className="text-4xl sm:text-7xl " />
      </div>
    </div>
  );
};

export default TalkButtonTest;
