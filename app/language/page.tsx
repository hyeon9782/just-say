import Back from "@/components/Back";
import Button from "@/composables/Button";
import Container from "@/composables/Container";

const LanguagePage = () => {
  return (
    <Container>
      <Back />
      <div className="flex flex-col justify-center h-full">
        <p className="text-4xl font-bold leading-normal mb-[50px]">
          이제부터 여행을 떠나봅시다! <br />
          내가 말할 언어를 골라주세요.
        </p>
        <div className="flex gap-[50px]">
          <Button type="outline">영어</Button>
          <Button type="outline">일본어</Button>
        </div>
      </div>
    </Container>
  );
};

export default LanguagePage;
