import Button from "@/composables/Button";
import Modal from "@/composables/Modal";
import React from "react";
type Props = {
  text: string;
  onClose: () => void;
};
const AlertModal = ({ text, onClose }: Props) => {
  return (
    <Modal>
      <div className="">{text}</div>
      <Button onClick={onClose}>닫기</Button>
    </Modal>
  );
};

export default AlertModal;
