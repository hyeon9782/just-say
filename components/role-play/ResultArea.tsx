import { useState } from "react";
import ReplayModal from "../modals/ReplayModal";
import LikeBox from "../result/LikeBox";
import FullViewButton from "../result/FullViewButton";
import { Message, SelectedData } from "@/types";
import { Dict } from "@/types/dict";
import { Step } from "./RolePlayContainer";

const TAGS = [
  {
    name: "언어 바꾸기",
    code: "언어",
  },
  {
    name: "도시 바꾸기",
    code: "도시",
  },
  {
    name: "같은 직원과 다시 대화하기",
    code: "대화",
  },
  {
    name: "다른 직원과 다시 대화하기",
    code: "대화",
  },
];
type Props = {
  selectedData: SelectedData;
  isSuccess: boolean;
  moveStep: (step: Step) => void;
  dict: Dict;
};

const ResultArea = ({ selectedData, isSuccess, moveStep, dict }: Props) => {
  const [replayModal, setReplayModal] = useState(false);
  return (
    <>
      <div className="flex flex-col justify-center h-full">
        <div className="text-center">
          <h1 className="text-3xl sm:text-6xl font-bold mb-[50px] leading-normal">
            {isSuccess ? dict.result.success : dict.result.fail}
          </h1>
        </div>
        <div className="flex flex-col items-center sm:flex-row justify-center gap-[20px]">
          {TAGS.map((tag: any, index) => (
            <div
              onClick={() => moveStep(tag.code)}
              key={index}
              className="border border-sky-blue rounded-3xl text-sky-blue bg-[#F9FAFC] px-[15px] py-[5px] text-lg sm:text-2xl"
            >
              {tag.name}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center my-[30px]">
          <span className="text-lg sm:text-xl">
            {dict.result.feedback_message}
          </span>
          <LikeBox />
          <FullViewButton onClick={() => setReplayModal(true)} />
        </div>
      </div>

      {replayModal && <ReplayModal onClose={() => setReplayModal(false)} />}
    </>
  );
};

export default ResultArea;
