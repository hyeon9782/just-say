"use client";

import { VoiceIcon } from "@/composables/icons";
import { CAFE_STAFF, TAXI_DRIVER } from "@/constants/role";
import useSpeechToText from "@/hooks/useSpeechToText";
import { gptAPI } from "@/services/gpt";
import useMessageStore from "@/stores/useMessageStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TalkButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { messages, setMessages } = useMessageStore();
  const params = useSearchParams();
  const situationParam = params.get("situation") ?? "";

  const initGPT = (type: string) => {
    let content = "";
    switch (type) {
      case "cafe":
        content = CAFE_STAFF;
        break;
      case "taxi":
        content = TAXI_DRIVER;
        break;
    }
    if (messages.length === 0) {
      console.log("데이터 넣을 게!");

      setMessages({
        role: "system",
        content,
      });
    }
  };

  let text = useSpeechToText({ isRecording, lang: "ko-KR" });

  const handleClick = () => {
    setIsRecording(!isRecording);
  };

  const handleResult = async () => {
    try {
      const response = await gptAPI([
        ...messages,
        {
          role: "user",
          content: text,
        },
      ]);

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }

      console.log(data);
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
    if (messages.length === 0 && situationParam) {
      initGPT(situationParam);
    }
  }, [situationParam]); // messages 배열에 대한 의존성 제거

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
