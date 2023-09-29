"use client";
import { LeftArrow } from "@/composables/icons";

const Back = ({ onPrev }: { onPrev: () => void }) => {
  return (
    <div onClick={onPrev}>
      <LeftArrow className="text-6xl " />
    </div>
  );
};

export default Back;
