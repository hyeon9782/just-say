import Button from "@/composables/Button";
import { SELECT_DATA } from "@/constants/select-data";
import { SelectedData } from "@/types";
import { Dict } from "@/types/dict";

type Props = {
  onSelect: (key: string, value: string) => void;
  selectedData: SelectedData;
  dict: Dict;
};
const SituationArea = ({ onSelect, selectedData, dict }: Props) => {
  return (
    <div className="flex flex-col justify-center h-full px-[10px]">
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-bold pb-[30px]">
          {dict.situation.situation_title}
        </h1>
        <p className="text-lg sm:text-xl font-400 pb-[60px]">
          {dict.situation.situation_subtitle}
        </p>
      </div>
      <div className="flex flex-col w-[300px] mx-auto sm:w-full sm:flex-row gap-[20px] sm:gap-[50px]">
        {SELECT_DATA.SITUATIONS.map((situation) => (
          <Button
            key={situation.en}
            type="outline"
            size="lg"
            onClick={() => onSelect("situation", situation.en)}
            disabled={situation.ko === "택시"}
          >
            {situation.ko}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SituationArea;
