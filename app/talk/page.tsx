"use client";
import GptForm from "@/components/GptForm";
import TalkButton from "@/components/talk/TalkButton";
import Container from "@/composables/Container";
import { SELECT_DATA } from "@/constants/select-data";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

type TextToSpeech = {
  rate?: number;
  pitch?: number;
  lang?: string;
  text: string;
};

const TalkPage = () => {
  const params = useSearchParams();
  const situationParam = params.get("situation");
  const situation = SELECT_DATA.SITUATIONS.find(
    (situation) => situation.en === situationParam
  );

  const textToSpeech = ({
    rate = 3, // 속도 (0.1 ~ 10)
    pitch = 2, // 음 높이 (0 ~ 2)
    lang = "ko-KR", // 언어
    text = "음성이 없습니다.", // 내용
  }: TextToSpeech) => {
    speechSynthesis.cancel(); // 현재 읽고 있다면 초기화

    const utterance = new SpeechSynthesisUtterance();
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.lang = lang;
    utterance.text = text;

    speechSynthesis.speak(utterance);
  };

  return (
    <Container>
      <div className="h-full">
        <div
          className="h-[70%] flex items-end"
          style={{
            backgroundImage: `url('${situation?.img}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex w-full justify-around">
            <h1 className="text-4xl font-bold mb-[30px]">
              메뉴를 보고, 카페에서 내가 먹고 싶은 것을 주문해 보세요.
            </h1>
            <div className="flex flex-col items-center">
              <Image
                src={"/images/document 1.png"}
                alt="메뉴"
                width={40}
                height={40}
              />
              <span className="text-s">메뉴판</span>
            </div>
          </div>
        </div>
        <div className="h-[30%] box-border flex flex-col justify-center items-center">
          {/* <GptForm /> */}
          <button
            onClick={() =>
              textToSpeech({
                text: "안녕하세요. 저는 김보빈 입니다. 저는 바보입니다. 하하하하하하하하",
              })
            }
          >
            음성
          </button>
          <TalkButton />
        </div>
      </div>
    </Container>
  );
};

export default TalkPage;
