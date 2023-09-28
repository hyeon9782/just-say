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
    case "next":
      classStr =
        "w-full bg-[blue] rounded-[50px] p-[22px] text-3xl font-bold text-white color";
      break;
    case "outline":
      classStr =
        "w-full border bg-white rounded-[50px] p-[22px] text-3xl font-bold text-black hover:bg-[blue] hover:text-white";
      break;
  }
  return classStr;
}
export default Button;
