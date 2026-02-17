import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, getSql } from "@/lib/db";
import { ChannelSnapshot } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const limitParam = request.nextUrl.searchParams.get("limit");
    const parsedLimit = Number(limitParam ?? 100);
    const limit = Number.isFinite(parsedLimit)
      ? Math.max(1, Math.min(1000, Math.trunc(parsedLimit)))
      : 100;

    await ensureSchema();
    const sql = getSql();

    const rows = (await sql`
      SELECT id, channel_id, subscriber_count, video_count, view_count, created_at
      FROM channel_stats
      ORDER BY created_at DESC
      LIMIT ${limit};
    `) as ChannelSnapshot[];

    return NextResponse.json({
      success: true,
      count: rows.length,
      data: rows.reverse()
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
