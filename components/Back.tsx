"use client";
import { LeftArrow } from "@/composables/icons";

const Back = ({ onPrev }: { onPrev: () => void }) => {
  return (
    <div onClick={onPrev}>
      <LeftArrow className="text-5xl sm:text-7xl pt-[5px] sm:pt-[10px]" />
    </div>
  );
};

export default Back;
