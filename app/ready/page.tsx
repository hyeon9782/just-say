"use client";
import Button from "@/composables/Button";
import Container from "@/composables/Container";
import { SELECT_DATA } from "@/constants/select-data";
import { useSearchParams } from "next/navigation";

const ReadyPage = () => {
  const params = useSearchParams();
  const situationParam = params.get("situation");
  const cityParam = params.get("city");
  const situation = SELECT_DATA.SITUATIONS.find(
    (situation) => situation.en === situationParam
  );
  const city = SELECT_DATA.CITIES.find((city) => city.en === cityParam);

  const handleMikeTestStart = () => {};

  return (
    <Container>
      <div
        className="h-full box-border flex flex-col justify-center min-h-[800px] px-[10px]"
        style={{
          backgroundImage: `url('${situation?.img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-[50px] leading-normal">
            {city?.ko} {situation?.ko}에 도착했습니다. <br />
            메뉴를 보고, <br /> 내가 먹고 싶은 것을 주문해 볼까요?
          </h1>
          <p className="text-xl font-400 pb-[60px]">
            내 스피커와 마이크가 잘 동작하는지 확인해 주세요.
          </p>
        </div>
        <div className="flex justify-center pb-[30px]">
          <div className="h-[300px] w-[70%] bg-white overflow-auto rounded-2xl opacity-70"></div>
        </div>
        <div className="flex gap-[50px]">
          <Button type="start" onClick={() => console.log("테스트 시작")}>
            마이크 테스트
          </Button>
          <Button type="start" onClick={() => console.log("대화 시작")}>
            대화 시작
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ReadyPage;
