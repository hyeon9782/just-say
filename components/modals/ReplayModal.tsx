"use client";
import { googleTTS } from "@/api/google";
import Button from "@/composables/Button";
import Modal from "@/composables/Modal";
import { SpeakerIcon } from "@/composables/icons";
import useMessageStore from "@/stores/useMessageStore";
import { useRef } from "react";

type Props = {
  onClose: () => void;
};
const ReplayModal = ({ onClose }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { messages } = useMessageStore();
  const handleReplay = async (content: string) => {
    const response = await googleTTS(content);

    if (audioRef.current) {
      const audioSrc = `data:audio/mp3;base64,${response.audioContent}`;
      audioRef.current.src = audioSrc;
      await audioRef.current.play();
    }
  };
  return (
    <Modal>
      <div className="bg-blue-300 p-[20px] rounded-xl w-[90%] h-[70%] sm:w-[350px] sm:h-[500px] flex flex-col justify-between">
        <div className="flex flex-col gap-[10px] overflow-auto max-h-[350px] scroll-m-2">
          {messages?.map((message, index) => {
            if (message.role === "user") {
              return (
                <div
                  key={index}
                  className="rounded-md px-[10px] py-[5px] bg-yellow-300 max-w-[300px] self-start break-words flex gap-[10px]"
                >
                  <span>{message.content}</span>
                  <div>
                    <SpeakerIcon
                      className="text-xl"
                      onClick={() => handleReplay(message.content)}
                    />
                  </div>
                </div>
              );
            } else if (message.role === "assistant") {
              return (
                <div
                  key={index}
                  className="bg-white rounded-md px-[10px] py-[5px] max-w-[300px] self-end break-words flex gap-[10px]"
                >
                  <span>{message.content}</span>
                  <div>
                    <SpeakerIcon
                      className="text-xl"
                      onClick={() => handleReplay(message.content)}
                    />
                  </div>
                </div>
              );
            } else {
              return <div key={index}></div>;
            }
          })}
        </div>
        <div className="pt-[20px]">
          <Button onClick={onClose} type="outline" size="sm">
            닫기
          </Button>
        </div>
      </div>
      <audio controls ref={audioRef} className="hidden"></audio>
    </Modal>
  );
};

export default ReplayModal;
