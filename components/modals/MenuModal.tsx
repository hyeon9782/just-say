import Button from "@/composables/Button";
import Modal from "@/composables/Modal";
import { CloseIcon } from "@/composables/icons";
import Image from "next/image";
type Props = {
  onClose: () => void;
};
const MenuModal = ({ onClose }: Props) => {
  return (
    <Modal>
      <div className="text-red bg-white w-[50%] h-[30%] rounded-xl">
        <div className="flex justify-end">
          <CloseIcon className="text-2xl" />
        </div>
        <div>
          <Image
            src="/images/new-menu.png"
            alt="Menu"
            width={100}
            height={300}
          />
        </div>
      </div>
    </Modal>
  );
};

export default MenuModal;
