import { SELECT_DATA } from "@/constants/select-data";
import Card from "../Card";

type Props = {
  onSelect: (key: string, value: string) => void;
};
const CityArea = ({ onSelect }: Props) => {
  return (
    <div>
      <div></div>
      <div>
        {SELECT_DATA.CITIES.map((city, index) => (
          <Card
            key={index}
            city={city}
            onSelect={() => onSelect("city", city)}
          />
        ))}
      </div>
    </div>
  );
};

export default CityArea;
