"use client";
import { CAFE_STAFF, TAXI_DRIVER } from "@/constants/role";
import { gptAPI } from "@/services/gpt";
import useMessageStore from "@/stores/useMessageStore";
import { FormEvent, useState } from "react";

const GptForm = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const { messages, setMessages } = useMessageStore();

  const handleClick = (type: string) => {
    let content = "";

    switch (type) {
      case "cafe":
        content = CAFE_STAFF;
        break;
      case "taxi":
        content = TAXI_DRIVER;
        break;
    }
    setMessages({
      role: "system",
      content,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await gptAPI([
        ...messages,
        {
          role: "user",
          content: question,
        },
      ]);

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }

      console.log(data);
      setMessages({
        role: "user",
        content: question,
      });

      setMessages({
        role: "assistant",
        content: data.result,
      });
      setAnswer(data.result);
      setQuestion("");
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <section>
      <button className="bg-red-200" onClick={() => handleClick("cafe")}>
        Cafe
      </button>
      <button className="bg-blue-200" onClick={() => handleClick("taxi")}>
        Taxi
      </button>
      <form onSubmit={handleSubmit}>
        <input
          className="bg-gray-100"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit">질문하기</button>
      </form>
      <div>{answer}</div>
    </section>
  );
};

export default GptForm;
