import { GPT_3_5_TURBO_0613 } from "@/constants/prompt";
import { openai } from "@/libs/gpt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    console.log("Route 들어옴");

    const { messages } = await request.json();
    console.log(messages);

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

    const chatCompletion = await openai.chat.completions.create({
      messages,
      model: GPT_3_5_TURBO_0613,
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
