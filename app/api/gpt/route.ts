import { openai } from "@/libs/gpt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { messages } = await request.json();
  console.log(messages);

  const chatCompletion = await openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });

  console.log(chatCompletion.choices[0].message.content);

  return NextResponse.json({
    status: 200,
    result: chatCompletion.choices[0].message.content,
    chatCompletion: chatCompletion,
  });
}
