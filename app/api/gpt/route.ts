import { openai } from "@/libs/gpt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { question } = await request.json();
  console.log(question);

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `${question}` }],
    model: "gpt-3.5-turbo",
  });

  console.log(chatCompletion.choices[0].message.content);

  return NextResponse.json({
    status: 200,
    result: chatCompletion.choices[0].message.content,
    chatCompletion: chatCompletion,
  });
}
