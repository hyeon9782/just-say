"use client";

import { VoiceIcon } from "@/composables/icons";
import useSpeechToText from "@/hooks/useSpeechToText";
import { gptAPI } from "@/services/gpt";
import { initGPT, textToSpeech } from "@/services/talk";
import useMessageStore from "@/stores/useMessageStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TalkButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { messages, setMessages } = useMessageStore();
  const params = useSearchParams();
  const situationParam = params.get("situation") ?? "";

  let text = useSpeechToText({ isRecording, lang: "ko-KR" });

  const handleClick = () => {
    setIsRecording(!isRecording);
  };

  const handleResult = async () => {
    try {
      const msgList = [
        ...messages,
        {
          role: "user",
          content: text,
        },
      ];

      if (messages.length === 0) {
        const initData = initGPT({ type: situationParam, lang: "Korean" });
        msgList.push({
          role: "system",
          content: initData,
        });
        setMessages({
          role: "system",
          content: initData,
        });
      }

      const response = await gptAPI(msgList);

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }

      console.log(data);

      textToSpeech({ text: data.result });
      setMessages({
        role: "user",
        content: text,
      });

      setMessages({
        role: "assistant",
        content: data.result,
      });
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (text && !isRecording) {
      handleResult();
    }
  }, [text, isRecording]);

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
