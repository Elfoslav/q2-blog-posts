import { NextResponse } from "next/server";
import { PostsService } from "@/lib/services/PostsService";

export async function GET() {
  try {
    const posts = await PostsService.getPosts();
    return Response.json(posts);
  } catch (error: unknown) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
