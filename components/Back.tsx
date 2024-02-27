"use client";
import { LeftArrow } from "@/composables/icons";

const Back = ({ onPrev }: { onPrev: () => void }) => (
  <LeftArrow
    onClick={onPrev}
    className="text-3xl sm:text-7xl absolute top-2 left-2"
  />
);

export default Back;
