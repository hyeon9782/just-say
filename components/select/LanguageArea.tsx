import Button from "@/composables/Button";
type Props = {
  onSelect: (key: string, value: string) => void;
};
const LanguageArea = ({ onSelect }: Props) => {
  return (
    <div className="flex flex-col justify-center h-full">
      <p className="text-4xl font-bold leading-normal mb-[50px]">
        이제부터 여행을 떠나봅시다! <br />
        내가 말할 언어를 골라주세요.
      </p>
      <div className="flex gap-[50px]">
        <Button type="outline" onClick={() => onSelect("language", "영어")}>
          영어
        </Button>
        <Button type="outline" onClick={() => onSelect("language", "일본어")}>
          일본어
        </Button>
      </div>
    </div>
  );
};

export default LanguageArea;
