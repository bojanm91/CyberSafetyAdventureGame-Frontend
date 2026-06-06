"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/auth-context";
import { apiGetProgress, type ProgressData } from "../../lib/api";

const DISCIPLINE_NAMES: Record<string, string> = {
  "password-base": "Password Base",
  "phishing-harbor": "Phishing Harbor",
  "privacy-zone": "Privacy Zone",
  "malware-lab": "Malware Lab",
  "social-engineering": "Social Engineering",
  "final-challenge": "Final Cyber Challenge",
};

const DISCIPLINE_ICONS: Record<string, string> = {
  "password-base": "⌘",
  "phishing-harbor": "✉",
  "privacy-zone": "◉",
  "malware-lab": "⚠",
  "social-engineering": "⌬",
  "final-challenge": "▣",
};

export default function ProfilePage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    apiGetProgress()
      .then(setProgress)
      .catch(console.error)
      .finally(() => setLoading(false));
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(139,92,246,0.08),transparent_30%)]" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#040816]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan/20 text-cyan shadow-glow">⛨</div>
            <span className="text-display text-base font-semibold text-white hidden sm:block">CyberSafety</span>
          </a>
          <nav className="flex items-center gap-5">
            <a href="/dashboard" className="text-sm text-slate-300 transition hover:text-white">Dashboard</a>
            <a href="/missions" className="text-sm text-slate-300 transition hover:text-white">Misije</a>
            <button
              onClick={logout}
              className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-slate-400 transition hover:border-white/20 hover:text-white"
            >
              Odjavi se
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Profile header */}
        <div className="glass-panel cyber-border mb-8 rounded-[2rem] p-7">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan/15 text-3xl">
              🛡️
            </div>
            <div className="flex-1">
              <p className="text-mono text-xs uppercase tracking-[0.35em] text-cyan/75">
                Cyber Agent
              </p>
              <h1 className="text-display mt-1 text-3xl font-bold text-white">
                {user.username}
              </h1>
              <p className="mt-1 text-slate-400">{p?.profile.email ?? user.email}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <span className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
                  {p?.profile.status ?? user.status}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                  Level {p?.profile.level ?? user.level}
                </span>
                <span className="rounded-full border border-amber/20 bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
                  🔥 {p?.profile.streak ?? user.streak} dana
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">
                {(p?.profile.points ?? user.points).toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 mt-1">ukupno bodova</p>
            </div>
          </div>

          {p && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>XP do Level {p.profile.level + 1}</span>
                <span className="text-white">{p.stats.xpPercentage}%</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan via-sky-400 to-violet"
                  style={{ width: `${p.stats.xpPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        {p && (
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Bodovi", value: p.profile.points.toLocaleString() },
              { label: "Bedževi", value: p.stats.badgesCount },
              { label: "Završeni", value: `${p.stats.completedQuests} / ${p.stats.totalQuests}` },
              { label: "Streak", value: `${p.profile.streak}d` },
            ].map((s) => (
              <div key={s.label} className="glass-panel cyber-border rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Discipline stats */}
        {p && Object.keys(p.disciplineStats).length > 0 && (
          <div className="mb-8">
            <h2 className="text-display mb-4 text-xl font-semibold text-white">Napredak po disciplinama</h2>
            <div className="space-y-3">
              {Object.entries(p.disciplineStats).map(([slug, stats]) => {
                const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
                return (
                  <div key={slug} className="glass-panel cyber-border rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{DISCIPLINE_ICONS[slug] ?? "◎"}</span>
                        <span className="text-sm font-medium text-white">
                          {DISCIPLINE_NAMES[slug] ?? slug}
                        </span>
                      </div>
                      <span className="text-sm text-slate-400">
                        {stats.completed} / {stats.total} · {stats.points} bodova
                      </span>
                    </div>
                    <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan to-violet"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Badges */}
        <div>
          <h2 className="text-display mb-4 text-xl font-semibold text-white">
            Bedževi ({p?.badges.length ?? 0})
          </h2>
          {p?.badges.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {p.badges.map((b) => (
                <div
                  key={b.id}
                  className="glass-panel cyber-border rounded-2xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{b.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{b.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{b.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel cyber-border rounded-2xl p-8 text-center">
              <p className="text-3xl mb-3">🏅</p>
              <p className="text-slate-400">Završi questove da osvoji bedževe.</p>
              <a
                href="/missions"
                className="mt-4 inline-block rounded-2xl bg-cyan px-5 py-2.5 text-sm font-semibold text-[#04111f] transition hover:bg-[#64e1ff]"
              >
                Idi na misije
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
