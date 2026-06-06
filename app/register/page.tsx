"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/auth-context";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Lozinke se ne poklapaju.");
      return;
    }
    setLoading(true);
    try {
      await register(username, email, password, confirmPassword);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška pri registraciji.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="cyber-shell relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(55,214,255,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-violet/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <a href="/" className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/20 text-lg text-cyan shadow-glow">
            ⛨
          </div>
          <div>
            <p className="text-display text-base font-semibold text-white">CyberSafety</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Adventure Game</p>
          </div>
        </a>

        <div className="glass-panel cyber-border rounded-[2rem] p-7 sm:p-9">
          <div className="mb-7">
            <h1 className="text-display text-3xl font-bold text-white">Kreiraj profil</h1>
            <p className="mt-2 text-slate-400">
              Postani cyber agent i počni svoju avanturu.
            </p>
          </div>

          <div className="mb-5 rounded-2xl border border-cyan/15 bg-cyan/[0.06] px-4 py-3">
            <p className="text-xs text-slate-400">
              Nakon registracije dobićeš početni status{" "}
              <span className="font-semibold text-cyan">Cyber Rookie</span> i pristup
              prvim misijama.
            </p>
          </div>

          <form onSubmit={void handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.3em] text-slate-400">
                Korisničko ime
              </label>
              <input
                type="text"
                required
                minLength={2}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="cyber_agent_01"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan/40 focus:bg-cyan/5"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.3em] text-slate-400">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan/40 focus:bg-cyan/5"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.3em] text-slate-400">
                Lozinka
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan/40 focus:bg-cyan/5"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.3em] text-slate-400">
                Potvrda lozinke
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan/40 focus:bg-cyan/5"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-rose/20 bg-rose/10 px-4 py-3 text-sm text-rose">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-2xl bg-cyan py-3.5 text-sm font-semibold text-[#04111f] shadow-[0_12px_40px_rgba(55,214,255,0.22)] transition hover:bg-[#64e1ff] disabled:opacity-60"
            >
              {loading ? "Kreiranje profila..." : "Kreiraj nalog"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Već imaš nalog?{" "}
            <a href="/login" className="text-cyan transition hover:text-white">
              Prijavi se
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
