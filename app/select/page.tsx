"use client";
import Back from "@/components/Back";
import CityArea from "@/components/select/CityArea";
import LanguageArea from "@/components/select/LanguageArea";
import SituationArea from "@/components/select/SituationArea";
import Container from "@/composables/Container";
import useCustomBack from "@/hooks/useCustomBack";
import { SelectedData } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SelectPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<"언어선택" | "도시선택" | "상황선택">(
    "언어선택"
  );
  const [selectedData, setSelectedData] = useState<SelectedData>({
    language: "",
    city: "",
    situation: "",
  });

  const nextStep = (situation?: string, city?: string) => {
    switch (step) {
      case "언어선택":
        setStep("도시선택");
        break;
      case "도시선택":
        setStep("상황선택");
        break;
      case "상황선택":
        router.push(`/ready?situation=${situation}&city=${city}`);
        break;
      default:
        alert("잘못된 값입니다.");
    }
  };

  const prevStep = () => {
    console.log("발동");

    switch (step) {
      case "언어선택":
        router.push("/");
        break;
      case "도시선택":
        setStep("언어선택");
        break;
      case "상황선택":
        setStep("도시선택");
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
    nextStep(key === "situation" ? value : "", selectedData.city);
    console.log(selectedData);
  };

  useCustomBack({ customBack: prevStep });
  return (
    <Container>
      <Back onPrev={prevStep} />
      {step === "언어선택" && <LanguageArea onSelect={selectData} />}
      {step === "도시선택" && (
        <CityArea onSelect={selectData} selectedData={selectedData} />
      )}
      {step === "상황선택" && (
        <SituationArea onSelect={selectData} selectedData={selectedData} />
      )}
    </Container>
  );
};

export default SelectPage;
