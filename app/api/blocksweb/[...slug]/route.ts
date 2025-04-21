// app/api/[...slug]/route.ts
import { NextResponse } from "next/server";

async function handler(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const uri = slug.join("/");
  const url = new URL(uri, "https://api.blocksweb.nl/");

  const init: RequestInit = {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.BLOCKSWEB_API_KEY as string,
    },
  };

  if (req.method === "POST" || req.method === "PUT") {
    const body = await req.json();
    init.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), init);
  const text = await response.text();
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  return NextResponse.json(data, { status: response.status });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
