import { SELECT_DATA } from "@/constants/select-data";

type Props = {
  onSelect: (key: string, value: string) => void;
};
const SituationArea = ({ onSelect }: Props) => {
  return (
    <div>
      <div></div>
      <div>
        {SELECT_DATA.SITUATIONS.map((situation) => (
          <div key={situation} onClick={() => onSelect("situation", situation)}>
            {situation}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SituationArea;
