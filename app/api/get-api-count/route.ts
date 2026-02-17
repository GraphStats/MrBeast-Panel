import { NextResponse } from "next/server";
import { ensureSchema, getSql } from "@/lib/db";

const SOURCE_URL =
  "https://backend.mixerno.space/api/youtube/estv3/UCX6OQ3DkcsbYNE6H8uQQuVA";
const CHANNEL_ID = "UCX6OQ3DkcsbYNE6H8uQQuVA";

type MixernoResponse = {
  items?: Array<{
    statistics?: {
      subscriberCount?: number;
      videoCount?: number;
      viewCount?: number;
    };
  }>;
};

export async function GET() {
  try {
    const upstreamResponse = await fetch(SOURCE_URL, {
      method: "GET",
      cache: "no-store"
    });

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        { success: false, error: `Upstream HTTP ${upstreamResponse.status}` },
        { status: 502 }
      );
    }

    const data = (await upstreamResponse.json()) as MixernoResponse;
    const stats = data.items?.[0]?.statistics;

    const subscriberCount = Number(stats?.subscriberCount);
    const videoCount = Number(stats?.videoCount);
    const viewCount = Number(stats?.viewCount);

    if (
      !Number.isFinite(subscriberCount) ||
      !Number.isFinite(videoCount) ||
      !Number.isFinite(viewCount)
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid statistics payload from source API." },
        { status: 502 }
      );
    }

    await ensureSchema();
    const sql = getSql();

    const inserted = await sql`
      INSERT INTO channel_stats (
        channel_id,
        subscriber_count,
        video_count,
        view_count
      )
      VALUES (
        ${CHANNEL_ID},
        ${Math.trunc(subscriberCount)},
        ${Math.trunc(videoCount)},
        ${Math.trunc(viewCount)}
      )
      RETURNING id, channel_id, subscriber_count, video_count, view_count, created_at;
    `;

    return NextResponse.json({
      success: true,
      source: SOURCE_URL,
      row: inserted[0]
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
