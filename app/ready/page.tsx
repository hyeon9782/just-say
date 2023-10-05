"use client";
import Button from "@/composables/Button";
import Container from "@/composables/Container";
import { SELECT_DATA } from "@/constants/select-data";
import useSpeechToText from "@/hooks/useSpeechToText";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ReadyPage = () => {
  const params = useSearchParams();
  const router = useRouter();
  const situationParam = params.get("situation");
  const cityParam = params.get("city");
  const [isRecording, setIsRecording] = useState(false);
  let text = useSpeechToText({ isRecording, lang: "en-US" });
  const situation = SELECT_DATA.SITUATIONS.find(
    (situation) => situation.en === situationParam
  );
  const city = SELECT_DATA.CITIES.find((city) => city.en === cityParam);

  const handleMikeTest = () => {
    setIsRecording(!isRecording);
  };

  return (
    <Container>
      <div
        className="h-full box-border flex flex-col justify-center  sm:min-h-[800px] px-[10px]"
        style={{
          backgroundImage: `url('${situation?.img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold mb-[20px] sm:mb-[50px] leading-normal">
            {city?.ko} {situation?.ko}에 도착했습니다. <br />
            메뉴를 보고, <br /> 내가 먹고 싶은 것을 주문해 볼까요?
          </h1>
          <p className="text-md sm:text-xl font-400 pb-[30px] sm:pb-[60px]">
            내 스피커와 마이크가 잘 동작하는지 확인해 주세요.
          </p>
        </div>
        <div className="flex justify-center pb-[20px] sm:pb-[30px]">
          <div className="h-[200px] sm:h-[300px] w-[70%] bg-white overflow-auto rounded-2xl opacity-70 py-[10px] px-[15px]">
            {text}
          </div>
        </div>
        <div className="flex flex-col w-[70%] m-auto my-0 sm:w-full sm:flex-row gap-[10px] sm:gap-[50px]">
          <Button type="fill" size="lg" onClick={handleMikeTest}>
            {isRecording ? "마이크 테스트 종료" : "마이크 테스트 시작"}
          </Button>
          <Button
            type="fill"
            size="lg"
            onClick={() => router.push(`/talk?situation=${situation?.en}`)}
          >
            대화 시작
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ReadyPage;
