const Suggestion = () => {
  const suggestions = [
    "카드 계산 되는건가요?",
    "인기 메뉴가 뭐에요?",
    "비건 메뉴도 있나요?",
  ];
  return (
    <div className="flex gap-[20px] flex-col m-auto max-w-[400px]">
      <span className="text-3xl font-bold py-[20px]">이렇게 말해보세요!</span>
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="bg-opacity-50 bg-black text-white p-[10px] rounded-xl text-center"
        >
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default Suggestion;
