"use client";
import { FormEvent, useState } from "react";

const GptForm = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`request failed with status ${response.status}`)
        );
      }

      console.log(data);

      setAnswer(data.result);
      setQuestion("");
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
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
