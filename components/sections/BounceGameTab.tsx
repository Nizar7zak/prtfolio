"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiAward, FiChevronDown, FiChevronUp, FiSend } from "react-icons/fi";
import { Num, Str, Ty } from "@/components/ui/IdeSyntax";

const GAME_ORIGINS = [
  "https://bounce-game-roan.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const GAME_URL =
  process.env.NEXT_PUBLIC_BOUNCEGAME_URL ??
  "https://bounce-game-roan.vercel.app/?embed=1";

interface LeaderboardEntry {
  id: string;
  name: string;
  elapsedMs: number;
  glassBroken: number;
  createdAt: string;
}

function formatTime(ms: number) {
  return (ms / 1000).toFixed(2) + "s";
}

export function BounceGameTab() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [leaderboardOpen, setLeaderboardOpen] = useState(true);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [storageReady, setStorageReady] = useState(true);

  const [name, setName] = useState("");
  const [timeSec, setTimeSec] = useState("");
  const [glassBroken, setGlassBroken] = useState("");
  const [autoFilled, setAutoFilled] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const fetchLeaderboard = useCallback(async () => {
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setEntries(data.entries ?? []);
      setStorageReady(data.configured !== false);
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const originOk =
        GAME_ORIGINS.some((o) => event.origin === o) ||
        event.origin.endsWith(".vercel.app");

      if (!originOk || event.data?.type !== "bouncegame:complete") return;

      const { elapsedMs, glassBroken: glass, blockCount } = event.data;
      if (
        typeof elapsedMs !== "number" ||
        typeof glass !== "number" ||
        blockCount !== 10
      ) {
        return;
      }

      setTimeSec((elapsedMs / 1000).toFixed(2));
      setGlassBroken(String(glass));
      setAutoFilled(true);
      setSubmitSuccess(false);
      setSubmitError("");
      setLeaderboardOpen(true);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const elapsedMs = Math.round(parseFloat(timeSec) * 1000);
    const glass = parseInt(glassBroken, 10);

    if (!name.trim() || Number.isNaN(elapsedMs) || Number.isNaN(glass)) {
      setSubmitError("Please fill in all fields correctly.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          elapsedMs,
          glassBroken: glass,
          blockCount: 10,
          website: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Failed to submit score");
        return;
      }

      setSubmitSuccess(true);
      setAutoFilled(false);
      setName("");
      setTimeSec("");
      setGlassBroken("");
      await fetchLeaderboard();
    } catch {
      setSubmitError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-mono text-lg font-bold">
            <Ty>BounceGame</Ty>
          </h2>
          <p className="mt-1 font-mono text-[11px] text-ide-syntax-comment">
            // Reach the goal. Submit your score to the leaderboard.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setLeaderboardOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded border border-ide-border bg-ide-tab-bg px-3 py-1.5 font-mono text-[11px] text-ide-property transition hover:border-ide-accent"
        >
          <FiAward className="h-3.5 w-3.5" />
          Leaderboard
          {leaderboardOpen ? (
            <FiChevronUp className="h-3 w-3" />
          ) : (
            <FiChevronDown className="h-3 w-3" />
          )}
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
        <div className="relative min-h-[420px] flex-1 overflow-hidden rounded border border-ide-border bg-ide-topbar lg:min-h-0">
          <iframe
            ref={iframeRef}
            src={GAME_URL}
            title="BounceGame"
            className="h-full w-full border-0"
            allow="fullscreen"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock"
          />
        </div>

        {leaderboardOpen && (
          <aside className="flex w-full shrink-0 flex-col rounded border border-ide-border bg-ide-sidebar lg:w-[300px]">
            <form
              onSubmit={handleSubmit}
              className="border-b border-ide-border bg-ide-card px-4 py-4"
            >
              <p className="mb-3 font-mono text-[12px] font-semibold text-ide-property">
                Submit your score
              </p>

              {autoFilled && (
                <p className="mb-2 font-mono text-[10px] text-ide-type">
                  Score detected from game!
                </p>
              )}

              {!storageReady && (
                <p className="mb-2 font-mono text-[10px] text-red-400">
                  Storage not configured on server. Scores won&apos;t persist in
                  production until Redis is added.
                </p>
              )}

              <label className="mb-1 block font-mono text-[10px] text-ide-syntax-comment">
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                autoComplete="off"
                spellCheck={false}
                placeholder="Player name"
                className="mb-2 w-full rounded border border-ide-muted bg-ide-bg px-3 py-2 font-mono text-[12px] text-ide-text outline-none focus:border-ide-accent"
                required
              />

              <div className="mb-2 grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block font-mono text-[10px] text-ide-syntax-comment">
                    Time (seconds)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={timeSec}
                    onChange={(e) => setTimeSec(e.target.value)}
                    placeholder="e.g. 4.52"
                    className="w-full rounded border border-ide-muted bg-ide-bg px-3 py-2 font-mono text-[12px] text-ide-text outline-none focus:border-ide-accent"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[10px] text-ide-syntax-comment">
                    Glass broken (0–10)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={glassBroken}
                    onChange={(e) => setGlassBroken(e.target.value)}
                    placeholder="0"
                    className="w-full rounded border border-ide-muted bg-ide-bg px-3 py-2 font-mono text-[12px] text-ide-text outline-none focus:border-ide-accent"
                    required
                  />
                </div>
              </div>

              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />

              {submitError && (
                <p className="mb-2 font-mono text-[10px] text-red-400">
                  {submitError}
                </p>
              )}
              {submitSuccess && (
                <p className="mb-2 font-mono text-[10px] text-ide-type">
                  Score saved!
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !name.trim() || !timeSec || !glassBroken}
                className="inline-flex w-full items-center justify-center gap-2 rounded bg-ide-button-bg px-3 py-2 font-mono text-[11px] font-medium text-ide-button-text transition hover:opacity-90 disabled:opacity-50"
              >
                <FiSend className="h-3 w-3" />
                {submitting ? "Saving..." : "Save to leaderboard"}
              </button>

              <p className="mt-2 font-mono text-[9px] text-ide-line-num">
                Tip: read time &amp; glass from the game HUD after GOAL!!!!
              </p>
            </form>

            <div className="border-b border-ide-border px-4 py-3">
              <p className="font-mono text-[12px] font-semibold text-ide-property">
                Top scores
              </p>
              <p className="mt-0.5 font-mono text-[10px] text-ide-syntax-comment">
                Fastest time · fewest glass breaks
              </p>
            </div>

            <div className="editor-scroll min-h-0 flex-1 overflow-y-auto px-2 py-2">
              {loading ? (
                <p className="px-2 py-4 font-mono text-[11px] text-ide-comment">
                  Loading...
                </p>
              ) : entries.length === 0 ? (
                <p className="px-2 py-4 font-mono text-[11px] text-ide-comment">
                  No scores yet. Be the first!
                </p>
              ) : (
                <ol className="space-y-1">
                  {entries.map((entry, i) => (
                    <li
                      key={entry.id}
                      className="flex items-center gap-2 rounded px-2 py-1.5 font-mono text-[11px] hover:bg-ide-card-hover"
                    >
                      <span className="w-5 shrink-0 text-ide-line-num">
                        {i + 1}
                      </span>
                      <span className="min-w-0 flex-1 truncate">
                        <Str>{entry.name}</Str>
                      </span>
                      <span className="shrink-0 text-ide-number">
                        {formatTime(entry.elapsedMs)}
                      </span>
                      <span className="shrink-0 text-ide-syntax-comment">
                        {entry.glassBroken}/10
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
