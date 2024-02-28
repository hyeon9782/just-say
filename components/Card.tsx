import { City } from "@/types";

type Props = {
  city: City;
  onSelect: () => void;
  disabled?: boolean;
};
const Card = ({ city, onSelect, disabled, ...props }: Props) => {
  return (
    <div
      onClick={!disabled ? onSelect : () => {}}
      style={{
        backgroundImage: `url('${city.img}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`w-[45%] h-[100px] sm:w-[400px] sm:h-[200px] border rounded-3xl hover:border-sky-blue  box-border flex justify-end items-end ${
        disabled ? "opacity-10" : ""
      }`}
      {...props}
    >
      <span className="text-white text-2xl sm:text-5xl font-bold p-[20px]">
        {city.ko}
      </span>
    </div>
  );
};

export default Card;
