import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const Modal = ({ children }: Props) => {
  return (
    <article className="bg-black bg-opacity-50 h-screen w-screen absolute top-0 left-0 flex justify-center items-center">
      {children}
    </article>
  );
};

export default Modal;
