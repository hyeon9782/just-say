"use client";
import Back from "@/components/Back";
import CityArea from "@/components/role-play/CityArea";
import ConversationArea from "@/components/role-play/ConversationArea";
import LanguageArea from "@/components/role-play/LanguageArea";
import PreparationArea from "@/components/role-play/PreparationArea";
import ResultArea from "@/components/role-play/ResultArea";
import SituationArea from "@/components/role-play/SituationArea";
import Container from "@/composables/Container";
import useCustomBack from "@/hooks/useCustomBack";
import { Message, SelectedData } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const RolePlayPage = () => {
  console.log("RolePlayPage rendered");

  const router = useRouter();
  const [step, setStep] = useState<
    "언어" | "도시" | "상황" | "준비" | "대화" | "결과"
  >("언어");
  const [selectedData, setSelectedData] = useState<SelectedData>({
    language: "",
    city: "",
    situation: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const nextStep = () => {
    switch (step) {
      case "언어":
        setStep("도시");
        break;
      case "도시":
        setStep("상황");
        break;
      case "상황":
        setStep("준비");
        break;
      case "준비":
        setStep("대화");
        break;
      case "대화":
        setStep("결과");
        break;
      default:
        alert("잘못된 값입니다.");
    }
  };

  const prevStep = () => {
    switch (step) {
      case "언어":
        router.push("/");
        break;
      case "도시":
        setStep("언어");
        break;
      case "상황":
        setStep("도시");
        break;
      case "준비":
        setStep("상황");
        break;
      case "대화":
        setStep("준비");
        break;
      default:
        alert("잘못된 값입니다.");
    }
  };

  const selectData = (key: string, value: string) => {
    setSelectedData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    nextStep();
  };

  const result = (result: boolean) => {
    setIsSuccess(result);
    nextStep();
  };

  const addMessages = useCallback((newMessages: Message[]) => {
    setMessages((prev) => [...prev, ...newMessages]);
  }, []);

  // useCustomBack({ customBack: prevStep });

  return (
    <Container>
      {step !== "결과" && <Back onPrev={prevStep} />}
      {step === "언어" && <LanguageArea onSelect={selectData} />}
      {step === "도시" && (
        <CityArea onSelect={selectData} selectedData={selectedData} />
      )}
      {step === "상황" && (
        <SituationArea onSelect={selectData} selectedData={selectedData} />
      )}
      {step === "준비" && (
        <PreparationArea selectedData={selectedData} onNext={nextStep} />
      )}
      {step === "대화" && (
        <ConversationArea
          messages={messages}
          selectedData={selectedData}
          addMessages={addMessages}
          result={result}
        />
      )}
      {step === "결과" && (
        <ResultArea
          selectedData={selectedData}
          messages={messages}
          isSuccess={isSuccess}
        />
      )}
    </Container>
  );
};

export default RolePlayPage;
