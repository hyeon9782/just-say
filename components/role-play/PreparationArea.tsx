import Button from "@/composables/Button";
import { SELECT_DATA } from "@/constants/select-data";
import { useRecordVoice } from "@/hooks/useRecordVoice";
import useSpeechToText from "@/hooks/useSpeechToText";
import { SelectedData } from "@/types";
import { Dict } from "@/types/dict";
import { useState } from "react";

type Props = {
  selectedData: SelectedData;
  onNext: () => void;
  dict: Dict;
};

const PreparationArea = ({ selectedData, onNext, dict }: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  let text = useSpeechToText({ isRecording, lang: "en-US" });
  // const { startRecording, stopRecording, text, isRecording } = useRecordVoice(
  //   {}
  // );
  const situation = SELECT_DATA.SITUATIONS.find(
    (situation) => situation.en === selectedData.situation
  );
  const city = SELECT_DATA.CITIES.find((city) => city.en === selectedData.city);

  const handleMikeTest = () => {
    setIsRecording(!isRecording);
  };
  return (
    <div className="h-full box-border flex flex-col justify-center px-[10px]">
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-bold mb-[20px] sm:mb-[50px] leading-normal">
          {city?.ko} {situation?.ko}
          {dict.preparation.preparation_title} <br />
          {dict.preparation.preparation_subtitle}
        </h1>
        <p className="text-md sm:text-xl font-400 pb-[30px] sm:pb-[60px]">
          {dict.preparation.test_message}
        </p>
      </div>
      <div className="flex justify-center pb-[20px] sm:pb-[30px]">
        <div className="h-[200px] sm:h-[300px] w-[90%] bg-blue-300 overflow-auto rounded-2xl bg-opacity-30 py-[10px] px-[15px]">
          {text}
        </div>
      </div>
      <div className="flex flex-col w-[70%] m-auto my-0 sm:w-full sm:flex-row gap-[10px] sm:gap-[50px]">
        <Button type="fill" size="lg" onClick={handleMikeTest}>
          {isRecording
            ? dict.preparation.test_end
            : dict.preparation.test_start}
        </Button>
        {/* <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={startRecording}
          onTouchEnd={stopRecording}
        >
          {isRecording ? "마이크 테스트 종료" : "마이크 테스트 시작"}
        </button> */}
        <Button type="fill" size="lg" onClick={onNext}>
          {dict.preparation.start}
        </Button>
      </div>
    </div>
  );
};

export default PreparationArea;
