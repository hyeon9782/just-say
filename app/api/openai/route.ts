import { GPT_3_5_TURBO_0613 } from "@/constants/prompt";
import { SUGGESTION } from "@/constants/suggestion";
import { SUMMARIZE } from "@/constants/summarize";
import { openai } from "@/libs/openai";
import { initGPT } from "@/services/talk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("Route 들어옴");

    const { messages, type } = await request.json();
    console.log(messages);
    console.log(type);

    // const functions = [
    //   {
    //     name: "get_suggested_answers",
    //     description:
    //       "Get three suggested answers that fit the answer you are talking about.",
    //     parameters: {
    //       type: "object",
    //       properties: {
    //         suggested: {
    //           type: "string",
    //           description:
    //             "Get three suggested answers that fit the answer you are talking about.",
    //         },
    //         answer: {
    //           type: "string",
    //           description:
    //             "Give the right answer to the question the user asked you",
    //         },
    //       },
    //       required: ["suggested", "answer"],
    //     },
    //   },
    // ];

    let system = "";

    switch (type) {
      case "rolePlaying":
        system = initGPT({ type: "cafe", lang: "English" });
        break;
      case "suggestion":
        system = SUGGESTION;
        break;
      case "summarize":
        system = SUMMARIZE;
        break;
    }

    console.log(system);

    const chatCompletion = await openai.chat.completions.create({
      model: GPT_3_5_TURBO_0613,
      messages: [
        {
          role: "system",
          content: system,
        },
        ...messages,
      ],
      // functions,
      // function_call: "auto",
    });

    return NextResponse.json({
      status: 200,
      result: chatCompletion.choices[0].message.content,
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
