"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/auth-context";
import { apiGetProgress, type ProgressData } from "../../lib/api";

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "Lako",
  medium: "Srednje",
  hard: "Teško",
};

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    apiGetProgress()
      .then(setProgress)
      .catch(() => setError("Nije moguće učitati podatke."));
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-slate-400">Učitavanje...</div>
      </div>
    );
  }

  const p = progress;

  return (
    <div className="cyber-shell min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_60%_10%,rgba(139,92,246,0.08),transparent_30%)]" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#040816]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan/20 text-cyan shadow-glow">⛨</div>
            <span className="text-display text-base font-semibold text-white hidden sm:block">CyberSafety</span>
          </a>
          <nav className="flex items-center gap-5">
            <a href="/missions" className="text-sm text-slate-300 transition hover:text-white">Misije</a>
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

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-2xl border border-rose/20 bg-rose/10 px-4 py-3 text-sm text-rose">
            {error}
          </div>
        )}

        {/* Welcome */}
        <div className="mb-8">
          <p className="text-mono text-xs uppercase tracking-[0.35em] text-cyan/75">Agent status</p>
          <h1 className="text-display mt-2 text-4xl font-bold text-white">
            Zdravo, {user.username} 👋
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            {p?.profile.status ?? user.status} · Level {p?.profile.level ?? user.level}
          </p>
        </div>

        {/* Stats grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Bodovi" value={(p?.profile.points ?? user.points).toLocaleString()} />
          <StatCard label="Streak" value={`${p?.profile.streak ?? user.streak}d`} />
          <StatCard label="Završeni questovi" value={`${p?.stats.completedQuests ?? 0} / ${p?.stats.totalQuests ?? 0}`} />
          <StatCard label="Bedževi" value={p?.stats.badgesCount ?? 0} />
        </div>

        {/* XP Bar */}
        <div className="mb-8 glass-panel cyber-border rounded-[1.8rem] p-5">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Progress do sljedećeg nivoa</span>
            <span className="text-white font-medium">{p?.stats.xpPercentage ?? 0}%</span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan via-sky-400 to-violet transition-all duration-700"
              style={{ width: `${p?.stats.xpPercentage ?? 0}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {p?.stats.xpToNextLevel ?? 0} XP do Level {(p?.profile.level ?? user.level) + 1}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Quick actions */}
          <div className="space-y-4">
            <h2 className="text-display text-xl font-semibold text-white">Brze akcije</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {p?.nextRecommended ? (
                <a
                  href={`/quest/${p.nextRecommended.id}`}
                  className="glass-panel cyber-border rounded-[1.6rem] p-5 transition hover:-translate-y-0.5 hover:border-cyan/30"
                >
                  <span className="text-mono text-xs uppercase tracking-[0.3em] text-cyan/70">
                    Nastavi
                  </span>
                  <p className="mt-2 text-lg font-semibold text-white">{p.nextRecommended.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{p.nextRecommended.discipline}</p>
                </a>
              ) : (
                <div className="glass-panel cyber-border rounded-[1.6rem] p-5">
                  <span className="text-mono text-xs uppercase tracking-[0.3em] text-green/70">Završeno</span>
                  <p className="mt-2 text-lg font-semibold text-white">Sve misije završene!</p>
                  <p className="mt-1 text-sm text-slate-400">Provjeri profil za statistike.</p>
                </div>
              )}

              <a
                href="/missions"
                className="glass-panel cyber-border rounded-[1.6rem] p-5 transition hover:-translate-y-0.5 hover:border-violet/30"
              >
                <span className="text-mono text-xs uppercase tracking-[0.3em] text-violet/70">Mapa</span>
                <p className="mt-2 text-lg font-semibold text-white">Sve misije</p>
                <p className="mt-1 text-sm text-slate-400">Pregled svih disciplina i questova.</p>
              </a>

              <a
                href="/profile"
                className="glass-panel cyber-border rounded-[1.6rem] p-5 transition hover:-translate-y-0.5 hover:border-amber/20"
              >
                <span className="text-mono text-xs uppercase tracking-[0.3em] text-amber/70">Profil</span>
                <p className="mt-2 text-lg font-semibold text-white">Moje statistike</p>
                <p className="mt-1 text-sm text-slate-400">Bedževi, napredak, rang.</p>
              </a>

              <div className="glass-panel cyber-border rounded-[1.6rem] p-5">
                <span className="text-mono text-xs uppercase tracking-[0.3em] text-rose/70">Izazov</span>
                <p className="mt-2 text-lg font-semibold text-white">Dnevni izazov</p>
                <p className="mt-1 text-sm text-slate-400">Uskoro dostupno.</p>
              </div>
            </div>
          </div>

          {/* Recent badges */}
          <div>
            <h2 className="text-display mb-4 text-xl font-semibold text-white">Bedževi</h2>
            {p?.badges.length ? (
              <div className="grid grid-cols-3 gap-3">
                {p.badges.map((b) => (
                  <div
                    key={b.id}
                    className="glass-panel cyber-border flex flex-col items-center rounded-2xl p-3 text-center"
                    title={b.description}
                  >
                    <span className="text-2xl">{b.icon}</span>
                    <p className="mt-1 text-xs font-medium text-white leading-tight">{b.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel cyber-border rounded-[1.6rem] p-6 text-center text-slate-400">
                <p className="text-3xl mb-2">🏅</p>
                <p className="text-sm">Završi questove da osvoji bedževe.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
