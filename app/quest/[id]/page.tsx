"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/auth-context";
import {
  apiGetQuest,
  apiSubmitAnswer,
  type QuestDetail,
  type SubmitResult,
} from "../../../lib/api";

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "Lako",
  medium: "Srednje",
  hard: "Teško",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-green border-green/20 bg-green/10",
  medium: "text-amber border-amber/20 bg-amber/10",
  hard: "text-rose border-rose/20 bg-rose/10",
};

export default function QuestPage() {
  const { user, loading: authLoading, updateUser } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [quest, setQuest] = useState<QuestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user || !id) return;
    setLoading(true);
    apiGetQuest(id)
      .then((q) => {
        setQuest(q);
        if (q.userProgress) {
          setSelectedOptionId(q.userProgress.correctOptionId);
        }
      })
      .catch(() => setError("Quest nije pronađen."))
      .finally(() => setLoading(false));
  }, [user, id]);

  const handleHint = () => {
    setShowHint(true);
    setUsedHint(true);
  };

  const handleSubmit = async () => {
    if (!selectedOptionId || !quest || submitting) return;
    setSubmitting(true);
    try {
      const res = await apiSubmitAnswer(quest.id, selectedOptionId, usedHint);
      setResult(res);
      updateUser({
        id: user!.id,
        username: user!.username,
        email: user!.email,
        status: res.user.status,
        level: res.user.level,
        points: res.user.points,
        streak: res.user.streak,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška pri slanju odgovora.");
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-slate-400">Učitavanje...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-slate-400">Učitavanje questa...</div>
      </div>
    );
  }

  if (error || !quest) {
    return (
      <div className="flex min-h-screen items-center justify-center flex-col gap-4">
        <p className="text-rose">{error || "Quest nije pronađen."}</p>
        <a href="/missions" className="text-sm text-cyan hover:text-white">
          ← Nazad na misije
        </a>
      </div>
    );
  }

  const alreadyCompleted = !!quest.userProgress;
  const isAnswered = !!result || alreadyCompleted;
  const correctId = result?.correctOptionId ?? quest.userProgress?.correctOptionId ?? null;

  return (
    <div className="cyber-shell min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,rgba(55,214,255,0.06),transparent_28%)]" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#040816]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={() => router.push("/missions")}
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            ← Nazad
          </button>
          <div className="flex items-center gap-3">
            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${DIFFICULTY_COLORS[quest.difficulty] ?? ""}`}>
              {DIFFICULTY_LABELS[quest.difficulty] ?? quest.difficulty}
            </span>
            <span className="text-sm text-slate-400">{quest.discipline.name}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Quest info */}
        <div className="mb-8">
          <p className="text-mono text-xs uppercase tracking-[0.35em] text-violet/75">
            {quest.discipline.icon} {quest.discipline.name}
          </p>
          <h1 className="text-display mt-2 text-3xl font-bold text-white sm:text-4xl">
            {quest.title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Do {quest.basePoints + 25} bodova
          </p>
        </div>

        {/* Scenario */}
        <div className="glass-panel cyber-border mb-6 rounded-[1.8rem] p-6">
          <p className="text-mono mb-2 text-xs uppercase tracking-[0.3em] text-slate-500">Scenario</p>
          <p className="text-base leading-8 text-slate-300">{quest.scenario}</p>
        </div>

        {/* Task */}
        <div className="mb-6">
          <h2 className="text-display text-xl font-semibold text-white">{quest.taskText}</h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {quest.options
            .sort((a, b) => a.order - b.order)
            .map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isCorrect = correctId === opt.id;
              const isWrong = isAnswered && isSelected && !isCorrect;

              let style =
                "border-white/10 bg-white/5 hover:border-cyan/25 hover:bg-cyan/5 cursor-pointer";
              if (!isAnswered && isSelected) {
                style = "border-cyan/40 bg-cyan/10 cursor-pointer";
              } else if (isAnswered && isCorrect) {
                style = "border-green/40 bg-green/10 cursor-default";
              } else if (isWrong) {
                style = "border-rose/40 bg-rose/10 cursor-default";
              } else if (isAnswered) {
                style = "border-white/5 bg-white/[0.03] opacity-60 cursor-default";
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnswered}
                  onClick={() => !isAnswered && setSelectedOptionId(opt.id)}
                  className={`w-full rounded-2xl border p-4 text-left text-sm transition ${style}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                        isAnswered && isCorrect
                          ? "border-green bg-green text-[#04111f]"
                          : isWrong
                            ? "border-rose bg-rose text-white"
                            : isSelected
                              ? "border-cyan bg-cyan text-[#04111f]"
                              : "border-slate-600 text-slate-400"
                      }`}
                    >
                      {isAnswered && isCorrect ? "✓" : isWrong ? "✗" : String.fromCharCode(65 + quest.options.findIndex((o) => o.id === opt.id))}
                    </div>
                    <span className="text-slate-200">{opt.text}</span>
                  </div>
                </button>
              );
            })}
        </div>

        {/* Hint */}
        {!isAnswered && (
          <div className="mb-6">
            {showHint ? (
              <div className="rounded-2xl border border-amber/20 bg-amber/[0.07] px-4 py-3">
                <p className="text-mono mb-1 text-xs uppercase tracking-[0.3em] text-amber/70">Hint</p>
                <p className="text-sm text-slate-300">{quest.hintText}</p>
              </div>
            ) : (
              <button
                onClick={handleHint}
                className="rounded-2xl border border-amber/20 bg-amber/[0.05] px-4 py-2.5 text-sm text-amber/80 transition hover:border-amber/40 hover:text-amber"
              >
                💡 Prikaži hint (-10 bonus bodova)
              </button>
            )}
          </div>
        )}

        {/* Submit */}
        {!isAnswered && (
          <button
            disabled={!selectedOptionId || submitting}
            onClick={() => void handleSubmit()}
            className="w-full rounded-2xl bg-cyan py-3.5 text-sm font-semibold text-[#04111f] shadow-[0_12px_40px_rgba(55,214,255,0.2)] transition hover:bg-[#64e1ff] disabled:opacity-50"
          >
            {submitting ? "Provjeravanje..." : "Potvrdi odgovor"}
          </button>
        )}

        {/* Result */}
        {(result || alreadyCompleted) && (
          <div className={`mt-6 rounded-[1.8rem] border p-6 ${
            (result?.correct ?? true)
              ? "border-green/25 bg-green/[0.07]"
              : "border-rose/25 bg-rose/[0.07]"
          }`}>
            {result && (
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{result.correct ? "✅" : "❌"}</span>
                <div>
                  <p className="font-semibold text-white">
                    {result.correct ? "Tačno!" : "Netačno"}
                  </p>
                  <p className="text-sm text-slate-400">
                    {result.correct ? `+${result.score} bodova` : "0 bodova"}
                  </p>
                </div>
              </div>
            )}

            {alreadyCompleted && !result && (
              <div className="mb-4">
                <p className="font-semibold text-white">Quest već završen</p>
                <p className="text-sm text-slate-400">Pogledaj povratnu informaciju ispod.</p>
              </div>
            )}

            <div className="mb-4">
              <p className="text-mono mb-1 text-xs uppercase tracking-[0.3em] text-slate-500">Objašnjenje</p>
              <p className="text-sm leading-7 text-slate-300">
                {result?.feedbackCorrect ?? quest.feedbackCorrect ?? ""}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-mono mb-1 text-xs uppercase tracking-[0.3em] text-cyan/70">Zapamti</p>
              <p className="text-sm font-medium text-cyan">
                {result?.miniConclusion ?? quest.miniConclusion}
              </p>
            </div>

            {result?.earnedBadges.length ? (
              <div className="mt-4 rounded-xl border border-violet/20 bg-violet/10 px-4 py-3">
                <p className="text-mono mb-2 text-xs uppercase tracking-[0.3em] text-violet/70">
                  Novi bedževi!
                </p>
                <div className="flex gap-3">
                  {result.earnedBadges.map((b) => (
                    <div key={b.name} className="flex items-center gap-2">
                      <span>{b.icon}</span>
                      <span className="text-sm font-semibold text-white">{b.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-5 flex gap-3">
              <a
                href="/missions"
                className="flex-1 rounded-2xl border border-white/15 py-3 text-center text-sm font-medium text-slate-300 transition hover:border-white/30 hover:text-white"
              >
                ← Sve misije
              </a>
              <a
                href="/dashboard"
                className="flex-1 rounded-2xl bg-cyan py-3 text-center text-sm font-semibold text-[#04111f] transition hover:bg-[#64e1ff]"
              >
                Dashboard →
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
