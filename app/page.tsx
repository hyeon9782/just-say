import NextButton from "@/components/NextButton";
import Container from "@/composables/Container";
import Image from "next/image";

export default function HomePage() {
  return (
    <Container>
      <div className="flex items-center h-full">
        <div>
          <h1 className="text-6xl font-bold mb-[50px]">Just Say!</h1>
          <p className="text-xl mb-[50px]">
            두려움없이 외국어를 말할 수 있도록. <br />될 때까지 말해보세요!
          </p>
          <NextButton>시작하기</NextButton>
        </div>
        <div>
          <Image
            src={"/images/BG_IMG 1.png"}
            alt="BG_IMG 1"
            width={300}
            height={300}
          />
        </div>
      </div>
    </Container>
  );
}
