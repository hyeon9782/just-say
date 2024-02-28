import { useEffect, useRef, useState } from "react";
type UseRecordVoice = {
  lang?: string;
  callback?: () => void;
};
export const useRecordVoice = ({
  lang = "en-US",
  callback,
}: UseRecordVoice) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const recognitionRef = useRef<any>(null);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const handleResult = async (event: any) => {
    const results = event.results;
    const contents: string[] = [];
    Object.keys(results).forEach((key) =>
      contents.push(results[key][0].transcript)
    );
    const content = contents.join(" ");
    setText(content);

    await callback?.();
  };

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.lang = lang;
    recognitionRef.current.onresult = handleResult;
    recognitionRef.current.onerror = (event: any) => {
      console.error(event.error);
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecording(false);
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return { startRecording, stopRecording, isRecording, text };
};
