import { NextRequest, NextResponse } from "next/server";
import { addLeaderboardEntry, getLeaderboard, isLeaderboardConfigured } from "@/lib/leaderboard";
import { scoreSubmitSchema } from "@/lib/validateScore";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

export async function GET() {
  try {
    const entries = await getLeaderboard();
    return NextResponse.json({
      entries,
      configured: isLeaderboardConfigured(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to load leaderboard" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = scoreSubmitSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid submission" },
        { status: 400 }
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const entry = await addLeaderboardEntry({
      name: parsed.data.name,
      elapsedMs: parsed.data.elapsedMs,
      glassBroken: parsed.data.glassBroken,
    });

    return NextResponse.json({ entry });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to save score";
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
