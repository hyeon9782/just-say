"use client";
import { LeftArrow } from "@/composables/icons";

const Back = ({ onPrev }: { onPrev: () => void }) => {
  return (
    <div onClick={onPrev}>
      <LeftArrow className="text-7xl pt-[10px]" />
    </div>
  );
};

export default Back;
