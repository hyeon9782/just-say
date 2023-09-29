"use client";
import Back from "@/components/Back";
import CityArea from "@/components/select/CityArea";
import LanguageArea from "@/components/select/LanguageArea";
import SituationArea from "@/components/select/SituationArea";
import Container from "@/composables/Container";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SelectData = {
  language: string;
  city: string;
  situation: string;
};

const SelectPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<"언어선택" | "도시선택" | "상황선택">(
    "언어선택"
  );
  const [selectedData, setSelectedData] = useState<SelectData>({
    language: "",
    city: "",
    situation: "",
  });

  const nextStep = () => {
    switch (step) {
      case "언어선택":
        setStep("도시선택");
        break;
      case "도시선택":
        setStep("상황선택");
        break;
      case "상황선택":
        router.push("/ready");
        break;
      default:
        alert("잘못된 값입니다.");
    }
  };

  const prevStep = () => {
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
    nextStep();
    console.log(selectedData);
  };
  return (
    <Container>
      <Back onPrev={prevStep} />
      {step === "언어선택" && <LanguageArea onSelect={selectData} />}
      {step === "도시선택" && <CityArea onSelect={selectData} />}
      {step === "상황선택" && <SituationArea onSelect={selectData} />}
    </Container>
  );
};

export default SelectPage;
