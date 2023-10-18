import { useState } from "react";
import ReplayModal from "../modals/ReplayModal";
import LikeBox from "../result/LikeBox";
import FullViewButton from "../result/FullViewButton";
import { Message, SelectedData } from "@/types";

const TAGS = [
  "언어 바꾸기",
  "도시 바꾸기",
  "같은 직원과 다시 대화하기",
  "다른 직원과 다시 대화하기",
];
type Props = {
  selectedData: SelectedData;
  messages: Message[];
  isSuccess: boolean;
};

const ResultArea = ({ selectedData, messages, isSuccess }: Props) => {
  const [replayModal, setReplayModal] = useState(false);
  return (
    <>
      <div className="flex flex-col justify-center h-full">
        <div className="text-center">
          <h1 className="text-3xl sm:text-6xl font-bold mb-[50px] leading-normal">
            {isSuccess ? "축하합니다! 🎉" : "앗, 다시 말해볼까요?"}
          </h1>
        </div>
        <div className="flex flex-col items-center sm:flex-row justify-center gap-[20px]">
          {TAGS.map((tag, index) => (
            <div
              key={index}
              className="border border-sky-blue rounded-3xl text-sky-blue bg-[#F9FAFC] px-[15px] py-[5px] text-lg sm:text-2xl"
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center my-[30px]">
          <span className="text-lg sm:text-xl">대화는 어떠셨나요?</span>
          <LikeBox />
          <FullViewButton onClick={() => setReplayModal(true)} />
        </div>
      </div>

      {replayModal && (
        <ReplayModal
          onClose={() => setReplayModal(false)}
          messages={messages}
        />
      )}
    </>
  );
};

export default ResultArea;
