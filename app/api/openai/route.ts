import { GPT_3_5_TURBO_0613 } from "@/constants/prompt";
import { SUMMARIZE } from "@/constants/summarize";
import { openai } from "@/libs/openai";
import { initGPT } from "@/services/talk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { messages, type, suggested } = await request.json();

    const suggestedFunctions = {
      type: "object",
      properties: {
        suggested: {
          type: "object",
          properties: {
            suggested_a: {
              type: "string",
              description: "suggested answer A",
            },
            suggested_b: {
              type: "string",
              description: "suggested answer B",
            },
            suggested_c: {
              type: "string",
              description: "suggested answer C",
            },
            suggested_d: {
              type: "string",
              description: "suggested answer D",
            },
          },
          required: [
            "suggested_a",
            "suggested_b",
            "suggested_c",
            "suggested_d",
          ],
        },
        answer: {
          type: "string",
          description:
            "Give the right answer to the question the user asked you",
        },
      },
      required: ["suggested", "answer"],
    };

    const basicFunctions = {
      type: "object",
      properties: {
        answer: {
          type: "string",
          description:
            "Give the right answer to the question the user asked you",
        },
      },
      required: ["answer"],
    };

    let system = "";

    switch (type) {
      case "rolePlaying":
        system = initGPT({ type: "cafe", lang: "English", suggested });
        break;
      case "summarize":
        system = SUMMARIZE;
        break;
    }

    const chatCompletion = await openai.chat.completions.create({
      model: GPT_3_5_TURBO_0613,
      messages: [
        {
          role: "system",
          content: system,
        },
        ...messages,
      ],
      functions: [
        {
          name: "get_suggested_answers",
          description:
            "Get four suggested answers that fit the answer you are talking about.",
          parameters: suggested ? suggestedFunctions : basicFunctions,
        },
      ],
      function_call: {
        name: "get_suggested_answers",
      },
    });

    return NextResponse.json({
      status: 200,
      result: chatCompletion.choices[0].message.function_call?.arguments,
      token: chatCompletion.usage?.total_tokens,
      chatCompletion: chatCompletion,
    });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: "GPT Fail",
      err,
    });
  }
}
