"use client";
import Button from "@/composables/Button";
type Props = {
  onClick: () => void;
};
const FullViewButton = ({ onClick }: Props) => {
  return (
    <div className="pt-[20px]">
      <Button type="view" onClick={onClick}>
        전체 대화 보기
      </Button>
    </div>
  );
};

export default FullViewButton;
