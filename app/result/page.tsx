"use client";
import ReplayModal from "@/components/modals/ReplayModal";
import FullViewButton from "@/components/result/FullViewButton";
import LikeBox from "@/components/result/LikeBox";
import Container from "@/composables/Container";
import { SpeakerIcon } from "@/composables/icons";
import { useState } from "react";
const TAGS = [
  "언어 바꾸기",
  "도시 바꾸기",
  "같은 직원과 다시 대화하기",
  "다른 직원과 다시 대화하기",
];
const ResultPage = () => {
  const [replayModal, setReplayModal] = useState(false);
  return (
    <>
      <Container>
        <div className="flex flex-col justify-center h-full">
          <div className="text-center">
            <p className="text-2xl font-400 pb-[20px]">
              카페에서 음료와 음식 주문하기
            </p>
            <h1 className="text-6xl font-bold mb-[50px] leading-normal">
              앗, 다시 말해볼까요?
            </h1>
          </div>
          <div className="flex justify-center gap-[20px]">
            {TAGS.map((tag, index) => (
              <div
                key={index}
                className="border border-sky-blue rounded-3xl text-sky-blue bg-[#F9FAFC] px-[15px] py-[5px] text-2xl"
              >
                {tag}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center my-[30px]">
            <span className="text-xl">대화는 어떠셨나요?</span>
            <LikeBox />
            <FullViewButton onClick={() => setReplayModal(true)} />
          </div>
        </div>
      </Container>
      {replayModal && <ReplayModal onClose={() => setReplayModal(false)} />}
    </>
  );
};

export default ResultPage;
