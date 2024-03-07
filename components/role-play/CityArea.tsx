import { SELECT_DATA } from "@/constants/select-data";
import Card from "../Card";
import { SelectedData } from "@/types";
import { getVoiceNames } from "@/services/talk";
import { Dict } from "@/types/dict";

type Props = {
  onSelect: (key: string, value: string) => void;
  selectedData: SelectedData;
  dict: Dict;
};
const CityArea = ({ onSelect, selectedData, dict }: Props) => {
  const selectCities = SELECT_DATA.CITIES.filter(
    (city) => city.language === selectedData.language
  );

  const handleClick = (languageCode: string) => {
    onSelect("language_code", languageCode);
    const voice_name = getVoiceNames(languageCode);

    onSelect("voice_name", voice_name);
  };
  return (
    <div className="flex flex-col justify-center box-border h-full p-[10px]">
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-bold pb-[30px]">
          {/* {dict.city.city_title} */}
          어디로 떠나볼까요?
        </h1>
        <p className="text-lg sm:text-xl font-400 pb-[60px]">
          {/* {dict.city.city_subtitle} */}
          선택한 도시의 억양이 내가 대화할 성대방에게 반영됩니다.
        </p>
      </div>
      <div className="flex items-center flex-wrap justify-between gap-[30px] sm:gap-[40px]">
        {selectCities.map((city, index) => (
          <Card
            key={index}
            city={city}
            onSelect={() => handleClick(city.language_code)}
            disabled={city.ko === "더블린"}
          />
        ))}
      </div>
    </div>
  );
};

export default CityArea;
