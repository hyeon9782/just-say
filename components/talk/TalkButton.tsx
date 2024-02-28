"use client";
import { googleTTS } from "@/api/google";
import { VoiceIcon } from "@/composables/icons";
import { useRecordVoice } from "@/hooks/useRecordVoice";
import { openaiGPT, rolePlaying, suggestion, summarize } from "@/api/openai";
import { arrayToString, initGPT } from "@/services/talk";
import useMessageStore from "@/stores/useMessageStore";
import useSuggestionStore from "@/stores/useSuggestionStore";
import Image from "next/image";
import { Message } from "postcss";
import { useEffect, useRef, useState } from "react";

type Props = {
  success: () => void;
};
const TalkButton = ({ success }: Props) => {
  console.log("TalkButtonTest rendered");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addSuggestion } = useSuggestionStore();
  const { messages, addMessage } = useMessageStore();

  const callGPT = async (msgs: Message[]) => {
    // 입력 값이 없을 경우 GPT 호출 방지
    if (msgs[msgs.length - 1].content === "") return;
    setLoading(true);
    const { result, token } = await openaiGPT(msgs, "rolePlaying");

    msgs.push({ role: "assistant", content: result });

    addMessage(msgs);

    const response = await googleTTS(result);

    if (audioRef.current) {
      const audioSrc = `data:audio/mp3;base64,${response.audioContent}`;
      audioRef.current.src = audioSrc;
      await audioRef.current.play();
    }

    if (result.includes("@")) {
      success();
    }

    setLoading(false);

    // 추천 답변 기능이 켜져있다면 추천 답변 요청
    if (true) {
      const { result } = await openaiGPT(msgs, "suggestion");
      const answerList = result.split("/");
      addSuggestion(answerList);
    }

    // token이 특정 값 이상이면 내용을 요약하자
    if (token > 3500) {
      const { result } = await openaiGPT(msgs, "summarize");

      addMessage([
        {
          role: "user",
          content: result,
        },
      ]);
    }
  };

  // const { startRecording, stopRecording, isRecording, text } = useRecordVoice({
  //   lang: "en-US",
  //   callback: () => callGPT(), // GPT 호출 함수를 callback으로 전달
  // });

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
      recognition.lang = "en-US";
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
              // onMouseDown={startRecording}
              // onMouseUp={stopRecording}
              // onTouchStart={startRecording}
              // onTouchEnd={stopRecording}
            >
              <VoiceIcon className="text-4xl sm:text-7xl " />
            </div>
          </div>
        </div>
      )}
      <audio controls ref={audioRef} className="hidden"></audio>
    </div>
  );
};

export default TalkButton;
