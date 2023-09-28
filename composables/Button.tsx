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
        "w-full bg-[rgb(75, 139, 246)] rounded-[50px] p-[22px] text-3xl font-bold text-white bg-[blue] color";
      break;
  }
  return classStr;
}
export default Button;
