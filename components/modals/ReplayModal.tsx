import Button from "@/composables/Button";
import Modal from "@/composables/Modal";
import useMessageStore from "@/stores/useMessageStore";
import { Messages, MessagesAction } from "@/types";
type Props = {
  onClose: () => void;
};
const ReplayModal = ({ onClose }: Props) => {
  const { messages } = useMessageStore();

  return (
    <Modal>
      <div className="bg-blue-300 p-[20px] rounded-xl min-w-[500px]">
        <div className="flex flex-col gap-[10px]">
          {messages.map((message, index) => {
            if (message.role === "user") {
              return (
                <div
                  key={index}
                  className="rounded-md px-[10px] py-[5px] bg-yellow-300 max-w-[400px] self-start break-words"
                >
                  나 : {message.content}{" "}
                </div>
              );
            } else if (message.role === "assistant") {
              return (
                <div
                  key={index}
                  className="bg-white rounded-md px-[10px] py-[5px] max-w-[400px] self-end break-words"
                >
                  직원 : {message.content}
                </div>
              );
            } else {
              return <></>;
            }
          })}
        </div>
        <div className="pt-[20px]">
          <Button onClick={onClose} type="outline" size="sm">
            닫기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReplayModal;
