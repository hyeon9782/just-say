import Modal from "@/composables/Modal";
import { CloseIcon } from "@/composables/icons";
import Image from "next/image";
type Props = {
  onClose: () => void;
};
const MenuModal = ({ onClose }: Props) => {
  return (
    <Modal>
      <div className="text-red bg-white rounded-xl p-[20px]">
        <div className="flex justify-end" onClick={() => onClose()}>
          <CloseIcon className="text-2xl" />
        </div>
        <div>
          <Image
            src="/images/new-menu.png"
            alt="Menu"
            width={400}
            height={400}
          />
        </div>
      </div>
    </Modal>
  );
};

export default MenuModal;
