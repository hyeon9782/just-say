import { SELECT_DATA } from "@/constants/select-data";
import Card from "../Card";
import { SelectedData } from "@/types";

type Props = {
  onSelect: (key: string, value: string) => void;
  selectedData: SelectedData;
};
const CityArea = ({ onSelect, selectedData }: Props) => {
  const selectCities = SELECT_DATA.CITIES.filter(
    (city) => city.language === selectedData.language
  );
  return (
    <div className="flex flex-col justify-center box-border h-full p-[10px]">
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-bold pb-[30px]">
          어디로 갈까요?
        </h1>
        <p className="text-lg sm:text-xl font-400 pb-[60px]">
          선택한 도시의 억양이 내가 대화할 상대방에게 반영됩니다.
        </p>
      </div>
      <div className="flex items-center flex-wrap justify-between gap-[30px] sm:gap-[40px]">
        {selectCities.map((city, index) => (
          <Card
            key={index}
            city={city}
            onSelect={() => onSelect("city", city.en)}
          />
        ))}
      </div>
    </div>
  );
};

export default CityArea;
