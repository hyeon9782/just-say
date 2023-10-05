"use client";
import { ReactNode } from "react";
type Props = {
  children: ReactNode;
  onClick: () => void;
  type?: "fill" | "outline" | "view";
  size?: "sm" | "md" | "lg";
};
const Button = ({ children, onClick, type = "fill", size = "sm" }: Props) => {
  return (
    <button className={generateClassStr(type, size)} onClick={onClick}>
      {children}
    </button>
  );
};

function generateClassStr(type: string, size?: string) {
  let classStr = "";
  switch (type) {
    case "fill":
      classStr =
        "w-full bg-sky-blue rounded-[50px] font-bold text-white color text-xl sm:text-3xl";
      break;
    case "outline":
      classStr = `w-full border border-sky-blue bg-white rounded-[50px] font-bold text-sky-blue hover:bg-sky-blue hover:text-white`;
      break;
    case "view":
      classStr = "rounded-3xl py-[5px] px-[25px] text-xl bg-[#D9EFF7]";
  }

  switch (size) {
    case "sm":
      classStr += " text-xl py-[10px]";
      break;
    case "md":
      classStr += " text-2xl py-[15px]";
      break;
    case "lg":
      classStr += " text-3xl py-[20px]";
      break;
  }

  return classStr;
}
export default Button;
