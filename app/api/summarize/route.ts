import { GPT_3_5_TURBO_0613 } from "@/constants/prompt";
import { openai } from "@/libs/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const chatCompletion = await openai.chat.completions.create({
      messages,
      model: GPT_3_5_TURBO_0613,
    });

    console.log(chatCompletion.choices[0].message);

    return NextResponse.json({
      status: 200,
      result: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "summarize fail",
      error,
    });
  }
}
