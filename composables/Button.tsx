"use client";
import { ReactNode } from "react";
type Props = {
  children: ReactNode;
  onClick: () => void;
  type?: "fill" | "outline" | "view";
  size?: "sm" | "md" | "lg";
};
const Button = ({
  children,
  onClick,
  type = "fill",
  size = "sm",
  ...props
}: Props) => {
  return (
    <button
      className={generateClassStr(type, size)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

function generateClassStr(type: string, size?: string) {
  let classStr = "";
  switch (type) {
    case "fill":
      classStr = "w-full bg-sky-blue rounded-[50px] font-bold text-white color";
      break;
    case "outline":
      classStr = `w-full border border-sky-blue bg-white rounded-[50px] font-bold text-sky-blue hover:bg-sky-blue hover:text-white`;
      break;
    case "view":
      classStr = "rounded-3xl py-[5px] px-[25px] bg-[#D9EFF7]";
  }

  switch (size) {
    case "sm":
      classStr += " text-md sm:text-xl py-[4px] sm:py-[10px]";
      break;
    case "md":
      classStr += " text-lg sm:text-2xl py-[8px] sm:py-[15px]";
      break;
    case "lg":
      classStr += " text-xl sm:text-3xl py-[10px] sm:py-[20px]";
      break;
  }

  return classStr;
}
export default Button;
