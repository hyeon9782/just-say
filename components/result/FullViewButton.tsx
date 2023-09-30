"use client";
import Button from "@/composables/Button";

const FullViewButton = () => {
  return (
    <div className="pt-[20px]">
      <Button type="view" onClick={() => console.log("전체 대화 보기")}>
        전체 대화 보기
      </Button>
    </div>
  );
};

export default FullViewButton;
