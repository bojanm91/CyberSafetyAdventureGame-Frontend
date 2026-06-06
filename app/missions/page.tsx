"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/auth-context";
import { apiGetQuests, type QuestSummary } from "../../lib/api";

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-green border-green/20 bg-green/10",
  medium: "text-amber border-amber/20 bg-amber/10",
  hard: "text-rose border-rose/20 bg-rose/10",
};

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "Lako",
  medium: "Srednje",
  hard: "Teško",
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  available: { label: "Dostupno", color: "text-cyan border-cyan/20 bg-cyan/10" },
  locked: { label: "Zaključano", color: "text-slate-500 border-white/10 bg-white/5" },
  completed: { label: "Završeno", color: "text-green border-green/20 bg-green/10" },
  mastered: { label: "Savladano", color: "text-violet border-violet/20 bg-violet/10" },
};

export default function MissionsPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [quests, setQuests] = useState<QuestSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    apiGetQuests()
      .then(setQuests)
      .catch(() => setError("Nije moguće učitati misije."))
      .finally(() => setLoading(false));
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-slate-400">Učitavanje...</div>
      </div>
    );
  }

  const disciplineMap = new Map<string, { info: QuestSummary["discipline"]; quests: QuestSummary[] }>();
  for (const q of quests) {
    if (!disciplineMap.has(q.discipline.slug)) {
      disciplineMap.set(q.discipline.slug, { info: q.discipline, quests: [] });
    }
    disciplineMap.get(q.discipline.slug)!.quests.push(q);
  }
  const disciplines = Array.from(disciplineMap.values());

  return (
    <div className="cyber-shell min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(55,214,255,0.06),transparent_30%)]" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#040816]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan/20 text-cyan shadow-glow">⛨</div>
            <span className="text-display text-base font-semibold text-white hidden sm:block">CyberSafety</span>
          </a>
          <nav className="flex items-center gap-5">
            <a href="/dashboard" className="text-sm text-slate-300 transition hover:text-white">Dashboard</a>
            <a href="/profile" className="text-sm text-slate-300 transition hover:text-white">Profil</a>
            <button
              onClick={logout}
              className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-slate-400 transition hover:border-white/20 hover:text-white"
            >
              Odjavi se
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-mono text-xs uppercase tracking-[0.35em] text-cyan/75">Mapa misija</p>
          <h1 className="text-display mt-2 text-4xl font-bold text-white sm:text-5xl">Discipline</h1>
          <p className="mt-3 text-lg text-slate-400">
            {quests.filter((q) => q.status === "completed" || q.status === "mastered").length} /{" "}
            {quests.length} misija završeno
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-rose/20 bg-rose/10 px-4 py-3 text-sm text-rose">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-slate-400">Učitavanje misija...</div>
        ) : (
          <div className="space-y-10">
            {disciplines.map(({ info, quests: dQuests }) => {
              const completed = dQuests.filter(
                (q) => q.status === "completed" || q.status === "mastered",
              ).length;
              return (
                <section key={info.slug}>
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
                      {info.icon}
                    </div>
                    <div>
                      <h2 className="text-display text-2xl font-semibold text-white">{info.name}</h2>
                      <p className="text-sm text-slate-400">
                        {completed} / {dQuests.length} završeno
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {dQuests
                      .sort((a, b) => a.orderInDiscipline - b.orderInDiscipline)
                      .map((q) => {
                        const isLocked = q.status === "locked";
                        const statusCfg = STATUS_CONFIG[q.status] ?? STATUS_CONFIG.locked;
                        const diffCfg = DIFFICULTY_COLORS[q.difficulty] ?? "";
                        return (
                          <article
                            key={q.id}
                            className={`glass-panel cyber-border relative rounded-[1.6rem] p-5 transition ${
                              isLocked
                                ? "opacity-50"
                                : "hover:-translate-y-0.5 hover:border-cyan/25 cursor-pointer"
                            }`}
                            onClick={() => {
                              if (!isLocked) router.push(`/quest/${q.id}`);
                            }}
                          >
                            {isLocked && (
                              <div className="absolute right-4 top-4 text-slate-500 text-lg">🔒</div>
                            )}
                            {(q.status === "completed" || q.status === "mastered") && (
                              <div className="absolute right-4 top-4 text-lg">
                                {q.status === "mastered" ? "⭐" : "✅"}
                              </div>
                            )}

                            <div className="mb-3 flex items-center gap-2">
                              <span
                                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${diffCfg}`}
                              >
                                {DIFFICULTY_LABELS[q.difficulty] ?? q.difficulty}
                              </span>
                              <span
                                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${statusCfg.color}`}
                              >
                                {statusCfg.label}
                              </span>
                            </div>

                            <h3 className="text-lg font-semibold text-white">{q.title}</h3>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-sm text-slate-400">
                                {q.score !== null ? `${q.score} bodova osvoje no` : `Do ${q.basePoints + 25} bodova`}
                              </span>
                              {!isLocked && (
                                <span className="text-sm font-medium text-cyan">
                                  {q.status === "completed" || q.status === "mastered"
                                    ? "Odigraj ponovo →"
                                    : "Igraj →"}
                                </span>
                              )}
                            </div>
                          </article>
                        );
                      })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
