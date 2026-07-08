"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiAward, FiSend, FiX } from "react-icons/fi";
import { Str, Ty } from "@/components/ui/IdeSyntax";

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
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [storageReady, setStorageReady] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const [name, setName] = useState("");
  const [gameScore, setGameScore] = useState<{
    elapsedMs: number;
    glassBroken: number;
  } | null>(null);
  const [showScoreOverlay, setShowScoreOverlay] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const fetchLeaderboard = useCallback(async () => {
    setLoadingLeaderboard(true);
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setEntries(data.entries ?? []);
      setStorageReady(data.configured !== false);
    } catch {
      setEntries([]);
    } finally {
      setLoadingLeaderboard(false);
    }
  }, []);

  const sendGameStart = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage({ type: "bouncegame:start" }, "*");
    iframe.focus({ preventScroll: true });
  }, []);

  const closeScoreOverlay = useCallback(() => {
    setShowScoreOverlay(false);
    setSubmitError("");
    setSubmitSuccess(false);
    setName("");
    setGameScore(null);
    sendGameStart();
  }, [sendGameStart]);

  useEffect(() => {
    sendGameStart();
  }, [sendGameStart]);

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

      setGameScore({ elapsedMs, glassBroken: glass });
      setShowScoreOverlay(true);
      setSubmitSuccess(false);
      setSubmitError("");
      setName("");
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (showScoreOverlay && !submitSuccess) {
      const id = window.setTimeout(() => nameInputRef.current?.focus(), 200);
      return () => window.clearTimeout(id);
    }
  }, [showScoreOverlay, submitSuccess]);

  const openLeaderboard = () => {
    setShowLeaderboard(true);
    fetchLeaderboard();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gameScore) return;

    if (!name.trim()) {
      setSubmitError("Enter your name to save your score.");
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
          elapsedMs: gameScore.elapsedMs,
          glassBroken: gameScore.glassBroken,
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
            <Ty>challenge.nezar</Ty>
          </h2>
          <p className="mt-1 font-mono text-[11px] text-ide-syntax-comment">
            // Reach the goal. Beat my time.
          </p>
        </div>
        <button
          type="button"
          onClick={openLeaderboard}
          className="inline-flex items-center gap-2 rounded border border-ide-border bg-ide-tab-bg px-3 py-1.5 font-mono text-[11px] text-ide-property transition hover:border-ide-accent"
        >
          <FiAward className="h-3.5 w-3.5" />
          Top scores
        </button>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded border border-ide-border bg-ide-topbar">
        <iframe
          ref={iframeRef}
          src={GAME_URL}
          title="BounceGame"
          className="h-full w-full border-0"
          allow="fullscreen"
          tabIndex={0}
          onLoad={sendGameStart}
          sandbox="allow-scripts allow-same-origin allow-pointer-lock"
        />

        <AnimatePresence>
          {showScoreOverlay && gameScore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center bg-ide-bg/75 p-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="w-full max-w-sm rounded border border-ide-border bg-ide-sidebar shadow-2xl"
              >
                <div className="border-b border-ide-border px-5 py-4">
                  <p className="font-mono text-[11px] text-ide-syntax-comment">
                    // run complete
                  </p>
                  <h3 className="mt-1 font-mono text-xl font-bold text-ide-type">
                    GOAL!!!!
                  </h3>
                </div>

                {submitSuccess ? (
                  <div className="px-5 py-6 text-center">
                    <p className="font-mono text-[13px] text-ide-type">
                      Score saved, <Str>{name.trim()}</Str>!
                    </p>
                    <p className="mt-2 font-mono text-[11px] text-ide-syntax-comment">
                      {formatTime(gameScore.elapsedMs)} · {gameScore.glassBroken}
                      /10 glass
                    </p>
                    <div className="mt-5 flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={openLeaderboard}
                        className="w-full rounded border border-ide-muted bg-ide-tab-bg px-3 py-2.5 font-mono text-[11px] text-ide-property transition hover:border-ide-accent"
                      >
                        View top scores
                      </button>
                      <button
                        type="button"
                        onClick={closeScoreOverlay}
                        className="w-full rounded bg-ide-button-bg px-3 py-2.5 font-mono text-[11px] font-medium text-ide-button-text transition hover:opacity-90"
                      >
                        Play again
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="px-5 py-5">
                    <div className="mb-5 grid grid-cols-2 gap-3">
                      <div className="rounded border border-ide-muted bg-ide-bg px-3 py-3 text-center">
                        <p className="font-mono text-[10px] text-ide-syntax-comment">
                          Time
                        </p>
                        <p className="mt-1 font-mono text-lg font-bold text-ide-number">
                          {formatTime(gameScore.elapsedMs)}
                        </p>
                      </div>
                      <div className="rounded border border-ide-muted bg-ide-bg px-3 py-3 text-center">
                        <p className="font-mono text-[10px] text-ide-syntax-comment">
                          Glass broken
                        </p>
                        <p className="mt-1 font-mono text-lg font-bold text-ide-property">
                          {gameScore.glassBroken}
                          <span className="text-sm text-ide-syntax-comment">
                            /10
                          </span>
                        </p>
                      </div>
                    </div>

                    <label className="mb-1.5 block font-mono text-[10px] text-ide-syntax-comment">
                      Your name
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={20}
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="Enter your name"
                      className="mb-3 w-full rounded border border-ide-muted bg-ide-bg px-3 py-2.5 font-mono text-[13px] text-ide-text outline-none focus:border-ide-accent"
                      required
                    />

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

                    {!storageReady && (
                      <p className="mb-2 font-mono text-[10px] text-red-400">
                        Storage not configured — score may not persist.
                      </p>
                    )}

                    {submitError && (
                      <p className="mb-2 font-mono text-[10px] text-red-400">
                        {submitError}
                      </p>
                    )}

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={closeScoreOverlay}
                        className="rounded border border-ide-muted px-3 py-2.5 font-mono text-[11px] text-ide-syntax-comment transition hover:border-ide-accent hover:text-ide-text"
                      >
                        Skip
                      </button>
                      <button
                        type="submit"
                        disabled={submitting || !name.trim()}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded bg-ide-button-bg px-3 py-2.5 font-mono text-[11px] font-medium text-ide-button-text transition hover:opacity-90 disabled:opacity-50"
                      >
                        <FiSend className="h-3 w-3" />
                        {submitting ? "Saving..." : "Save score"}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ide-bg/60 p-4 backdrop-blur-sm"
            onClick={() => setShowLeaderboard(false)}
          >
            <motion.aside
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="flex max-h-[70vh] w-full max-w-md flex-col rounded border border-ide-border bg-ide-sidebar shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-ide-border px-4 py-3">
                <div>
                  <p className="font-mono text-[12px] font-semibold text-ide-property">
                    Top scores
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-ide-syntax-comment">
                    Fastest time · fewest glass breaks
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLeaderboard(false)}
                  className="rounded p-1 text-ide-syntax-comment transition hover:text-ide-text"
                  aria-label="Close leaderboard"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>

              <div className="editor-scroll min-h-0 flex-1 overflow-y-auto px-2 py-2">
                {loadingLeaderboard ? (
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
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
