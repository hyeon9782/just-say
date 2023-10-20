"use client";
import { VoiceIcon } from "@/composables/icons";
import { SUMMARIZE } from "@/constants/summarize";
import { rolePlaying } from "@/services/gpt";
import { arrayToString, initGPT, textToSpeech } from "@/services/talk";
import useMessageStore from "@/stores/useMessageStore";
import { Message, Messages, MessagesAction } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
type Props = {
  success: () => void;
};
const TalkButton = ({ success }: Props) => {
  console.log("TalkButtonTest rendered");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  const { messages, addMessage } = useMessageStore() as
    | MessagesAction
    | Messages;

  useEffect(() => {
    const initData = initGPT({ lang: "Korean", type: "cafe" });
    addMessage([initData]);
  }, [addMessage]);

  const callGPT = async (msgs: Message[]) => {
    // 입력 값이 없을 경우 GPT 호출 방지
    if (msgs[msgs.length - 1].content === "") return;
    setLoading(true);
    // GPT API 호출
    const res = await rolePlaying(msgs);

    const data = await res.json();
    console.log(data);
    console.log(data.token);

    msgs.push({ role: "assistant", content: data.result });

    addMessage(msgs);

    textToSpeech({ text: data.result });

    if (data.result.includes("@")) {
      success();
    }

    setLoading(false);

    // token이 특정 값 이상이면 내용을 요약하자
    if (data.token > 3500) {
      const messagesStr = arrayToString(msgs);

      const res = await fetch("/api/summarize", {
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: SUMMARIZE,
            },
            {
              role: "user",
              content: messagesStr,
            },
          ],
        }),
      }).then((res) => res.json());

      const initData = initGPT({ lang: "Korean", type: "cafe" });

      addMessage([
        initData,
        {
          role: "user",
          content: res.result,
        },
      ]);
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition: any = null;

    let content = "";
    const handleResult = async (event: any) => {
      const results = event.results;
      const contents: string[] = [];
      await Object.keys(results).forEach((key) =>
        contents.push(results[key][0].transcript)
      );
      content = contents.join(" ,");

      await requestGPT();
    };

    function requestGPT() {
      if (recognition && content) {
        recognition.stop();
        setIsRecording(!isRecording);
        const newMessages = [...messages, { role: "user", content }];
        callGPT(newMessages);
        addMessage(newMessages);
      }
    }

    if (isRecording) {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "ko-KR";
      recognition.onresult = handleResult; // 이벤트 핸들러를 변수로 빼서 사용
      recognition.onerror = (event: any) => {
        console.error(event.error);
      };
      recognition.start();
    } else if (recognition) {
      recognition.stop();
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isRecording]);

  const handleClick = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col items-center ">
      {loading ? (
        <Image
          src="/images/spinner.gif"
          alt="spinner"
          width={200}
          height={200}
        />
      ) : (
        <div>
          <span className="text-md sm:text-xl pt-[10px] pb-[20px]">
            {isRecording
              ? "듣는 중이에요..."
              : "마이크를 클릭하여 대화를 시작하세요!"}
          </span>
          <div className="flex justify-center pt-[10px]">
            <div
              className={`border border-sky-blue rounded-full w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] flex justify-center items-center ${
                isRecording
                  ? "bg-sky-blue text-white"
                  : "bg-white text-sky-blue"
              }`}
              onClick={handleClick}
            >
              <VoiceIcon className="text-4xl sm:text-7xl " />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalkButton;
