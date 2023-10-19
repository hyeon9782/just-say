"use client";
import { VoiceIcon } from "@/composables/icons";
import useSpeechToText from "@/hooks/useSpeechToText";
import { rolePlaying } from "@/services/gpt";
import { checkEnd, initGPT, textToSpeech } from "@/services/talk";
import useMessageStore from "@/stores/useMessageStore";
import { Message, MessagesAction } from "@/types";
import { debounce } from "@/utils/debounce";
import { useEffect, useState } from "react";
type Props = {
  messages: Message[];
  success: () => void;
  addMessages: (newMessages: Message[]) => void;
};
const TalkButtonTest = ({ success, addMessages }: Props) => {
  console.log("TalkButtonTest rendered");
  const [isRecording, setIsRecording] = useState(false);

  const { messages, setMessages } = useMessageStore() as MessagesAction;

  let text = useSpeechToText({ isRecording, lang: "ko-KR" });

  const handleClick = () => {
    setIsRecording(!isRecording);
  };

  const callGPT = async (initData: any) => {
    try {
      const response = await rolePlaying(initData);

      // 추가: 요청이 취소되지 않았을 때만 결과 처리
      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }

      console.log(data);

      textToSpeech({ text: data.result });
    } catch (error) {
      console.error(error);
    }
  };

  // 첫번째 useEffect: 초기 메시지 설정
  useEffect(() => {
    const initData = initGPT({ lang: "Korean", type: "cafe" });
    setMessages(initData);
  }, []);

  // 두번째 useEffect: API 호출
  useEffect(() => {
    if (messages.length !== 0) {
      callGPT(messages); // messages는 useMessageStore에서 가져온 상태
    }
  }, [messages]); // messages 변화 시에만 API 요청 실행

  const handleResult = async () => {
    try {
      const msgList = [
        ...messages,
        {
          role: "user",
          content: text,
        },
      ];

      // if (messages.length === 0) {
      //   const initData = initGPT({ type: situationParam, lang: "Korean" });
      //   msgList.push({
      //     role: "system",
      //     content: initData,
      //   });
      //   setMessages({
      //     role: "system",
      //     content: initData,
      //   });
      // }

      const response = await rolePlaying(msgList);

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }

      console.log(data);

      textToSpeech({ text: data.result });
      setMessages([
        {
          role: "user",
          content: text,
        },
      ]);

      setMessages([
        {
          role: "assistant",
          content: data.result,
        },
      ]);

      // if (checkEnd(data.result)) {
      //   router.push("/result?result=success");
      // }
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const debouncedHandleResult = debounce(handleResult, 500);
    if (text && !isRecording) {
      debouncedHandleResult();
    }
  }, [text, isRecording]);

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
