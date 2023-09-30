"use client";
import { ReactNode } from "react";
type Props = {
  children: ReactNode;
  onClick: () => void;
  type: string;
};
const Button = ({ children, onClick, type }: Props) => {
  return (
    <button className={generateClassStr(type)} onClick={onClick}>
      {children}
    </button>
  );
};

function generateClassStr(type: string) {
  let classStr = "";
  switch (type) {
    case "start":
      classStr =
        "w-full bg-sky-blue rounded-[50px] p-[22px] text-3xl font-bold text-white color";
      break;
    case "outline":
      classStr =
        "w-full border border-sky-blue bg-white rounded-[50px] p-[22px] text-3xl font-bold text-sky-blue hover:bg-sky-blue hover:text-white";
      break;
    case "view":
      classStr =
        "rounded-3xl bg-sky-blue py-[5px] px-[25px] text-xl bg-[#D9EFF7]";
  }
  return classStr;
}
export default Button;
