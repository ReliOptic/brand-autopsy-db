import { NextResponse } from "next/server";
import { publicEnv } from "@/config/env";

interface RouteContext {
  params: Promise<{ ticker: string }>;
}

export async function GET(_request: Request, { params }: RouteContext): Promise<NextResponse> {
  const { ticker } = await params;
  const res = await fetch(`${publicEnv.apiUrl}/api/brands/${ticker.toUpperCase()}/design-md`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
