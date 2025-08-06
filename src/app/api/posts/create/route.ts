import { PostsService } from "@/lib/services/PostsService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const result = await PostsService.createPost(body);
    return NextResponse.json(result);
  } catch (error: unknown) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
