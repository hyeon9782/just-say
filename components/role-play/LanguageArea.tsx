import Button from "@/composables/Button";
import { SELECT_DATA } from "@/constants/select-data";
type Props = {
  onSelect: (key: string, value: string) => void;
};
const LanguageArea = ({ onSelect }: Props) => {
  return (
    <div className="flex flex-col justify-center h-full px-[10px]">
      <p className="text-center text-2xl sm:text-4xl font-bold leading-normal mb-[50px]">
        이제부터 여행을 떠나봅시다! <br />
        내가 말할 언어를 골라주세요.
      </p>
      <div className="flex flex-col w-[300px] mx-auto sm:w-full sm:flex-row gap-[20px] sm:gap-[50px]">
        {SELECT_DATA.LANGUAGES.map((language) => (
          <Button
            key={language.en}
            type="outline"
            size="lg"
            onClick={() => onSelect("language", language.en)}
          >
            {language.ko}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageArea;
