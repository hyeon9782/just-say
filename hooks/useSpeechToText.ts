import { useEffect, useState } from "react";

type SpeechToText = {
  isRecording: boolean;
  lang: string;
};

const useSpeechToText = ({ isRecording, lang }: SpeechToText): string => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition: any = null;

    const handleResult = (event: any) => {
      const results = event.results;
      const contents: string[] = [];
      Object.keys(results).forEach((key) =>
        contents.push(results[key][0].transcript)
      );
      const content = contents.join(" ");
      setContent(content);
    };

    if (isRecording) {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = lang;
      recognition.onresult = handleResult;
      recognition.onerror = (event: any) => {
        console.error(event.error);
      };
      recognition.start();
    } else if (recognition) {
      recognition.stop();
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isRecording, lang]);

  return content;
};

export default useSpeechToText;
