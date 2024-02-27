import Button from "@/composables/Button";
import { SELECT_DATA } from "@/constants/select-data";
import { SelectedData } from "@/types";

type Props = {
  onSelect: (key: string, value: string) => void;
  selectedData: SelectedData;
};
const SituationArea = ({ onSelect, selectedData }: Props) => {
  return (
    <div className="flex flex-col justify-center h-full px-[10px]">
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-bold pb-[30px]">
          어떤 상황에서 대화를 하고 싶으세요?
        </h1>
        <p className="text-lg sm:text-xl font-400 pb-[60px]">
          선택한 상황이 대화할 상대방에게 반영됩니다.
        </p>
      </div>
      <div className="flex flex-col w-[300px] mx-auto sm:w-full sm:flex-row gap-[20px] sm:gap-[50px]">
        {SELECT_DATA.SITUATIONS.map((situation) => (
          <Button
            key={situation.en}
            type="outline"
            size="lg"
            onClick={() => onSelect("situation", situation.en)}
          >
            {situation.ko}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SituationArea;
