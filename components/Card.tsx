import { City } from "@/types";

type Props = {
  city: City;
  onSelect: () => void;
};
const Card = ({ city, onSelect }: Props) => {
  return (
    <div
      onClick={onSelect}
      style={{
        backgroundImage: `url('${city.img}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`w-[400px] h-[200px] border rounded-3xl hover:border-sky-blue  box-border flex justify-end items-end `}
    >
      <span className="text-white text-5xl font-bold p-[20px]">{city.ko}</span>
    </div>
  );
};

export default Card;
