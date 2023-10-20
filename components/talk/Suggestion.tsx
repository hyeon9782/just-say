import useSuggestionStore from "@/stores/useSuggestionStore";

const Suggestion = () => {
  const { suggestions } = useSuggestionStore();

  return (
    <div className="flex gap-[20px] flex-col m-auto max-w-[400px]">
      {suggestions?.length !== 0 && (
        <>
          <span className="text-2xl sm:text-3xl font-bold py-[20px]">
            이렇게 말해보세요!
          </span>
          {suggestions?.map((suggestion: string, index: number) => (
            <div
              key={index}
              className="text-sm sm:text-lg bg-opacity-50 bg-black text-white p-[10px] rounded-xl text-center"
            >
              {suggestion.replace("User:", "")}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Suggestion;
