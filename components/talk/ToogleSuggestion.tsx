"use client";

import useIsSuggested from "@/stores/useIsSuggested";

const ToogleSuggestion = () => {
  const { isSuggested, setSuggested } = useIsSuggested();

  const handleToggle = () => {
    setSuggested(!isSuggested);
  };
  return (
    <div className="flex items-center justify-center">
      <label
        htmlFor="toggle-suggestion"
        className="inline-flex items-center cursor-pointer"
      >
        <span className="relative rounded-full w-10 h-6 transition-transform duration-300 ease-in-out">
          <input
            type="checkbox"
            id="toggle-suggestion"
            checked={isSuggested}
            onChange={handleToggle}
            className="sr-only"
          />
          <span
            className="absolute inset-0 rounded-full bg-white transition-colors duration-200 ease-in-out"
            aria-hidden="true"
          ></span>
          <span
            className="absolute inset-0 rounded-full  bg-indigo-500 transition-colors duration-200 ease-in-out"
            style={{
              transform: `translate(${isSuggested ? "50%" : "0"})`,
            }}
          ></span>
        </span>
        <span className="ml-8 text-sm font-medium text-gray-900">
          {isSuggested ? "추천 답변 활성화" : "추천 답변 비활성화"}
        </span>
      </label>
    </div>
  );
};

export default ToogleSuggestion;
