import { NextRequest, NextResponse } from "next/server";
import { PostsService } from "@/lib/services/PostsService";

type Params = { id: string };

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;

  try {
    const post = await PostsService.getPostById(id);
    return Response.json(post);
  } catch (error: unknown) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
