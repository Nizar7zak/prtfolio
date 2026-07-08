import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";

export interface LeaderboardEntry {
  id: string;
  name: string;
  elapsedMs: number;
  glassBroken: number;
  createdAt: string;
}

const KEY = "bouncegame:leaderboard";
const MAX_ENTRIES = 50;
const LOCAL_FILE = path.join(process.cwd(), ".data", "leaderboard.json");

function getRedis(): Redis | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;
  return new Redis({ url, token });
}

const redis = getRedis();

/** Dev/local file fallback */
async function readLocal(): Promise<LeaderboardEntry[]> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf-8");
    return JSON.parse(raw) as LeaderboardEntry[];
  } catch {
    return [];
  }
}

async function writeLocal(entries: LeaderboardEntry[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

function sortEntries(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (a.elapsedMs !== b.elapsedMs) return a.elapsedMs - b.elapsedMs;
    return a.glassBroken - b.glassBroken;
  });
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  if (redis) {
    const entries = await redis.get<LeaderboardEntry[]>(KEY);
    return sortEntries(entries ?? []).slice(0, MAX_ENTRIES);
  }

  if (process.env.NODE_ENV === "development") {
    return sortEntries(await readLocal()).slice(0, MAX_ENTRIES);
  }

  return [];
}

export async function addLeaderboardEntry(
  entry: Omit<LeaderboardEntry, "id" | "createdAt">
): Promise<LeaderboardEntry> {
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  if (redis) {
    const existing = (await redis.get<LeaderboardEntry[]>(KEY)) ?? [];
    const updated = sortEntries([...existing, newEntry]).slice(0, MAX_ENTRIES);
    await redis.set(KEY, updated);
    return newEntry;
  }

  if (process.env.NODE_ENV === "development") {
    const existing = await readLocal();
    const updated = sortEntries([...existing, newEntry]).slice(0, MAX_ENTRIES);
    await writeLocal(updated);
    return newEntry;
  }

  throw new Error(
    "Leaderboard storage not configured. Add Upstash Redis to Vercel."
  );
}

export function isLeaderboardConfigured(): boolean {
  return Boolean(redis) || process.env.NODE_ENV === "development";
}
