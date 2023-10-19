"use client";
import { VoiceIcon } from "@/composables/icons";
import useSpeechToText from "@/hooks/useSpeechToText";
import { rolePlaying } from "@/services/gpt";
import { checkEnd, initGPT, textToSpeech } from "@/services/talk";
import useMessageStore from "@/stores/useMessageStore";
import { Message, Messages, MessagesAction } from "@/types";
import { debounce } from "@/utils/debounce";
import { useCallback, useEffect, useState } from "react";
type Props = {
  messages: Message[];
  success: () => void;
  addMessage: (newMessage: Message) => void;
};
const TalkButtonTest = ({ success }: Props) => {
  console.log("TalkButtonTest rendered");
  const [isRecording, setIsRecording] = useState(false);

  // let text = useSpeechToText({ isRecording, lang: "ko-KR" });
  const { messages, addMessage } = useMessageStore() as
    | MessagesAction
    | Messages;

  // const callGPT = async (msgList: any[]) => {
  //   try {
  //     const response = await rolePlaying(msgList);

  //     // 추가: 요청이 취소되지 않았을 때만 결과 처리
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);

  //       addMessage({
  //         role: "assistant",
  //         content: data.result,
  //       });

  //       textToSpeech({ text: data.result });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   if (messages.length === 0) {
  //     const initData = initGPT({ lang: "Korean", type: "cafe" });

  //     addMessage(initData); // 초기화
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const handleResult = useCallback(async () => {
  //   try {
  //     console.log("result");
  //     console.log(text);

  //     addMessage({ role: "user", content: text });
  //     const msgList = [...messages, { role: "user", content: text }];
  //     callGPT(msgList);
  //   } catch (error: any) {
  //     console.error(error);
  //     alert(error.message);
  //   }
  // }, [addMessage, messages, text]);

  // useEffect(() => {
  //   if (text && !isRecording) {
  //     console.log(text);
  //     console.log("result 발동 전");

  //     handleResult();
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isRecording, text]);

  useEffect(() => {
    const initData = initGPT({ lang: "Korean", type: "cafe" });
    addMessage([initData]);
  }, [addMessage]);

  const callGPT = async (msgs: Message[]) => {
    // 입력 값이 없을 경우 GPT 호출 방지
    if (msgs[msgs.length - 1].content === "") return;
    // setLoading(true);
    // GPT API 호출
    const res = await rolePlaying(msgs);

    const data = await res.json();
    console.log(data);

    msgs.push({ role: "assistant", content: data.result });

    addMessage(msgs);

    textToSpeech({ text: data.result });

    // GPT 답변 저장
    // msgs.push({ role: "assistant", content: res.data.answer });
    // messages 업데이트
    // setMessages(msgs);
    // console.log(res.data, msgs);
    // let answer = data.result
    // if (answer === undefined || answer.length < 1) {
    //   //  예외 발생
    //   console.log("ERROR ", answer);
    // } else {
    //   callTTS(answer, voiceInfo).then(() => {
    //     // GPT가 대화가 끝났다고 판단하면 성공 페이지로 이동
    //     if (answer.includes("@")) {
    //       //  음성 데이터는 비동기 형태로 출력되므로 (사운드 버퍼에 순차적으로 기록됨.) 이 시점에 아직 대화가 출력중임.
    //       //  문자의 길이로 남은 대기 시간을 정해라.
    //       //  철자 개수 ? 단어 수?
    //       setTimeout(() => {
    //         setIsClose(false);
    //         navitate(`/result/success`);
    //       }, 7000);
    //     } else {
    //       if (res.data.referenceAnswers.length > "empty".length) {
    //         props.onUpdateSuggestedAnswers(res.data.referenceAnswers);
    //       }
    //     }
    //   });
    // }
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
      // setContent(content); // setContent 호출
      await requestGPT();
    };

    function requestGPT() {
      if (recognition && content) {
        recognition.stop();
        setIsRecording(!isRecording);
        const newMessages = [...messages, { role: "user", content }];
        callGPT(newMessages);
        addMessage(newMessages);
        // setMessages((prev) => {
        //   if (content === undefined || content.length < 1) {
        //     console.log("nothing!!", prev);
        //     setMessages(prev);
        //     return prev;
        //   } else {
        //     const newMessages = [...prev];
        //     newMessages.push({
        //       role: "user",
        //       content,
        //     });
        //     callGPT(newMessages);
        //     setMessages(newMessages);
        //     console.log("new message = ", newMessages);
        //     return newMessages;
        //   }
        // });
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
    }
  }, [isRecording]);

  const handleClick = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col items-center ">
      {/* <p>{text}</p> */}
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
