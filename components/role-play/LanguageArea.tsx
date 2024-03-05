import Button from "@/composables/Button";
import { SELECT_DATA } from "@/constants/select-data";
import { Dict } from "@/types/dict";
type Props = {
  onSelect: (key: string, value: string) => void;
  dict: Dict;
};
const LanguageArea = ({ onSelect, dict }: Props) => {
  return (
    <div className="flex flex-col justify-center h-full px-[10px]">
      <p className="text-center text-2xl sm:text-4xl font-bold leading-normal mb-[50px]">
        {dict.language.title}
      </p>
      <div className="flex flex-col w-[300px] mx-auto sm:w-full sm:flex-row gap-[20px] sm:gap-[50px]">
        {SELECT_DATA.LANGUAGES.map((language) => (
          <Button
            key={language.en}
            type="outline"
            size="lg"
            onClick={() => onSelect("language", language.en)}
            disabled={language.en === "jp"}
          >
            {language.ko}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageArea;
