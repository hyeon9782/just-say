type Props = {
  city: string;
  onSelect: () => void;
};
const Card = ({ city, onSelect }: Props) => {
  return <div onClick={onSelect}>{city}</div>;
};

export default Card;
