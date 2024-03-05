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
import { SelectedData } from "@/types";
import { Dict } from "@/types/dict";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type Step = "언어" | "도시" | "상황" | "준비" | "대화" | "결과";

const RolePlayContainer = ({ dict }: { dict: Dict }) => {
  const router = useRouter();
  const [step, setStep] = useState<Step>("언어");
  const [selectedData, setSelectedData] = useState<SelectedData>({
    language: "",
    language_code: "",
    voice_name: "",
    situation: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

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

  const moveStep = (step: Step) => {
    setStep(step);
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

  useCustomBack({ customBack: prevStep });
  return (
    <Container>
      {step !== "결과" && <Back onPrev={prevStep} />}
      {step === "언어" && <LanguageArea dict={dict} onSelect={selectData} />}
      {step === "도시" && (
        <CityArea
          dict={dict}
          onSelect={selectData}
          selectedData={selectedData}
        />
      )}
      {step === "상황" && (
        <SituationArea
          dict={dict}
          onSelect={selectData}
          selectedData={selectedData}
        />
      )}
      {step === "준비" && (
        <PreparationArea
          dict={dict}
          selectedData={selectedData}
          onNext={nextStep}
        />
      )}
      {step === "대화" && (
        <ConversationArea
          dict={dict}
          selectedData={selectedData}
          result={result}
        />
      )}
      {step === "결과" && (
        <ResultArea
          dict={dict}
          selectedData={selectedData}
          isSuccess={isSuccess}
          moveStep={moveStep}
        />
      )}
    </Container>
  );
};

export default RolePlayContainer;
