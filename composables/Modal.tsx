import Button from "./Button";
import { CloseIcon } from "./icons";

type Props = {
  onClose: () => void;
  onSubmit?: () => void;
};
const Modal = ({ onClose }: Props) => {
  return (
    <article className="bg-black bg-opacity-50 h-screen w-screen absolute top-0 left-0 flex justify-center items-center">
      <div className="text-red bg-white w-[50%] h-[30%] rounded-xl">
        <div className="flex justify-end p-[10px] text-3xl">
          <CloseIcon />
        </div>
        <div></div>
        <div className="flex">
          <Button onClick={onClose} type="outline">
            취소
          </Button>
          <Button onClick={onClose} type="outline">
            확인
          </Button>
        </div>
      </div>
    </article>
  );
};

export default Modal;
