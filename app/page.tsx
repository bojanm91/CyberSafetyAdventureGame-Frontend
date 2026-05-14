const features = [
  "Kratke misije",
  "Bodovi i bedževi",
  "Dnevni izazovi",
  "Sigurno okruženje",
];

const steps = [
  {
    number: "01",
    title: "Izaberi misiju",
    text: "Biraj između lozinki, phishinga, privatnosti i malware scenarija.",
    icon: "◎",
  },
  {
    number: "02",
    title: "Donosi odluke",
    text: "Analiziraj situaciju i odaberi najsigurniju reakciju.",
    icon: "▣",
  },
  {
    number: "03",
    title: "Dobij feedback",
    text: "Sistem objašnjava zašto je odgovor siguran ili rizičan.",
    icon: "✦",
  },
  {
    number: "04",
    title: "Napreduj",
    text: "Osvajaj bodove, bedževe i otključavaj nove nivoe.",
    icon: "⌁",
  },
];

const disciplines = [
  {
    category: "LOZINKE & 2FA",
    title: "Password Base",
    text: "Nauči kako da kreiraš jake lozinke, koristiš password manager i uključiš 2FA.",
    tone: "from-cyan/20 to-cyan/5 border-cyan/25",
    icon: "⌘",
  },
  {
    category: "SUMNJIVI MAILOVI",
    title: "Phishing Harbor",
    text: "Prepoznaj phishing emailove, lažne login stranice i sumnjive linkove.",
    tone: "from-violet/20 to-violet/5 border-violet/25",
    icon: "✉",
  },
  {
    category: "PRIVATNOST ONLINE",
    title: "Privacy Zone",
    text: "Zaštiti privatnost na društvenim mrežama i kontroliši šta dijeliš.",
    tone: "from-green/20 to-green/5 border-green/25",
    icon: "◉",
  },
  {
    category: "ZARAŽENI FAJLOVI",
    title: "Malware Lab",
    text: "Prepoznaj sumnjive priloge, USB uređaje i lažne aplikacije.",
    tone: "from-rose/20 to-rose/5 border-rose/25",
    icon: "⚠",
  },
  {
    category: "MANIPULACIJA",
    title: "Social Engineering Street",
    text: "Prepoznaj manipulaciju, lažne pozive i psihološke prevare.",
    tone: "from-amber/20 to-amber/5 border-amber/25",
    icon: "⌬",
  },
  {
    category: "ZAVRŠNI IZAZOV",
    title: "Final Cyber Challenge",
    text: "Kombinovani scenariji koji povezuju sve naučene oblasti.",
    tone: "from-fuchsia/20 to-fuchsia/5 border-fuchsia/25",
    icon: "▣",
  },
];

const dashboardCards = [
  {
    title: "Nastavi misiju",
    text: "Vrati se na posljednji nezavršeni quest i završi ga u par minuta.",
    label: "ACTIVE",
  },
  {
    title: "Dnevni izazov",
    text: "Kratki zadatak koji se mijenja svaki dan i gradi streak.",
    label: "TODAY",
  },
  {
    title: "Preporučeno za tebe",
    text: "Scenario iz oblasti gdje korisnik najviše griješi.",
    label: "SMART",
  },
  {
    title: "Mapa nivoa",
    text: "Pregled svih zona, questova i zaključanih oblasti.",
    label: "MAP",
  },
];

function NavLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="text-sm text-slate-300 transition hover:text-white"
    >
      {children}
    </a>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan/15 bg-cyan/10 text-xl text-cyan shadow-glow">
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="cyber-shell relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(55,214,255,0.08),transparent_28%)]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-violet/10 blur-3xl" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#040816]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan/20 text-cyan shadow-glow">
              ⛨
            </div>
            <div>
              <p className="text-display text-lg font-semibold tracking-wide text-white">
                CyberSafety
              </p>
              <p className="text-[11px] uppercase tracking-[0.32em] text-slate-500">
                Adventure Game
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            <NavLink href="#top">Početna</NavLink>
            <NavLink href="#how-it-works">Kako funkcioniše</NavLink>
            <NavLink href="#disciplines">Misije</NavLink>
            <NavLink href="#dashboard">Dashboard</NavLink>
            <NavLink href="#progress">Postignuća</NavLink>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#login"
              className="rounded-2xl border border-cyan/20 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan/45 hover:text-white"
            >
              Prijava
            </a>
            <a
              href="#start"
              className="rounded-2xl bg-cyan px-5 py-2.5 text-sm font-semibold text-[#04111f] shadow-[0_12px_40px_rgba(55,214,255,0.22)] transition hover:bg-[#64e1ff]"
            >
              Započni avanturu
            </a>
          </div>

          <details className="relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-2xl border border-cyan/15 px-4 py-2 text-sm text-slate-200">
              <span className="text-lg leading-none">☰</span>
              Meni
            </summary>
            <div className="glass-panel absolute right-0 mt-3 w-64 rounded-3xl p-4 shadow-2xl">
              <div className="flex flex-col gap-3">
                <NavLink href="#top">Početna</NavLink>
                <NavLink href="#how-it-works">Kako funkcioniše</NavLink>
                <NavLink href="#disciplines">Misije</NavLink>
                <NavLink href="#dashboard">Dashboard</NavLink>
                <NavLink href="#progress">Postignuća</NavLink>
              </div>
              <div className="mt-4 grid gap-3">
                <a
                  href="#login"
                  className="rounded-2xl border border-cyan/20 px-4 py-2 text-center text-sm text-slate-200"
                >
                  Prijava
                </a>
                <a
                  href="#start"
                  className="rounded-2xl bg-cyan px-4 py-2 text-center text-sm font-semibold text-[#04111f]"
                >
                  Započni avanturu
                </a>
              </div>
            </div>
          </details>
        </div>
      </header>

      <section
        id="top"
        className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20"
      >
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/[0.08] px-4 py-2 text-sm text-cyan">
            <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_rgba(55,214,255,0.9)]" />
            Nova edukativna cyber avantura
          </div>

          <h1 className="text-display max-w-4xl text-5xl font-bold leading-[0.96] text-white sm:text-6xl lg:text-[5.5rem]">
            Postani{" "}
            <span className="bg-gradient-to-r from-cyan via-sky-400 to-violet bg-clip-text text-transparent">
              cyber agent
            </span>{" "}
            i nauči kako da se zaštitiš online.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
            Rješavaj realne cyber scenarije, prepoznaj phishing, zaštiti naloge,
            osvajaj bodove i napreduj kroz digitalnu avanturu.
          </p>

          <div
            id="start"
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#dashboard"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-cyan px-6 py-4 text-base font-semibold text-[#05111f] shadow-[0_18px_50px_rgba(55,214,255,0.2)] transition hover:bg-[#63e1ff]"
            >
              Započni avanturu <span className="text-lg">→</span>
            </a>
            <a
              id="login"
              href="#progress"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-cyan/20 bg-cyan/5 px-6 py-4 text-base font-semibold text-cyan transition hover:border-cyan/50 hover:bg-cyan/10 hover:text-white"
            >
              Prijavi se
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="glass-panel cyber-border relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(55,214,255,0.12),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,0.13),transparent_24%)]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cyan/80">
                    Agent status
                  </p>
                  <h2 className="mt-2 text-display text-2xl font-semibold text-white">
                    Cyber Rookie
                  </h2>
                </div>
                <div className="rounded-2xl border border-green/20 bg-green/10 px-3 py-2 text-sm font-medium text-green">
                  Online
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#08111f]/90 p-5">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>XP to next level</span>
                  <span className="text-white">68%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-cyan via-sky-400 to-violet" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Points
                    </p>
                    <p className="mt-2 text-2xl font-bold text-white">1,240</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Streak
                    </p>
                    <p className="mt-2 text-2xl font-bold text-white">12d</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Badges
                    </p>
                    <p className="mt-2 text-2xl font-bold text-white">08</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-cyan/15 bg-cyan/[0.08] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan/70">
                    Next quest
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Phishing Harbor
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Prepoznaj lažnu login stranicu prije nego što uneseš podatke.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-violet/15 bg-violet/[0.08] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-violet/70">
                    Daily challenge
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Screenshot fraud
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Odluči da li je poruka pokušaj prevare ili legitimna obavijest.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-10 left-1/2 hidden -translate-x-1/2 rounded-full bg-cyan/15 px-6 py-3 text-xs uppercase tracking-[0.35em] text-cyan/80 blur-sm lg:block">
            Digital city map
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-display text-4xl font-semibold text-white sm:text-5xl">
            Kako funkcioniše
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Četiri jednostavna koraka od scenarija do nagrade.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.title}
              className="glass-panel cyber-border rounded-[1.8rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan/25"
            >
              <IconBadge>{step.icon}</IconBadge>
              <div className="mt-6">
                <p className="text-mono text-xs uppercase tracking-[0.32em] text-slate-500">
                  Step {step.number}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-400">
                  {step.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="disciplines"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-display text-4xl font-semibold text-white sm:text-5xl">
              Discipline
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-400">
              Šest oblasti kroz koje napreduješ kao cyber agent.
            </p>
          </div>
          <a
            href="#progress"
            className="inline-flex w-fit items-center gap-3 rounded-2xl border border-cyan/20 px-5 py-3 text-sm font-medium text-cyan transition hover:border-cyan/40 hover:bg-cyan/10 hover:text-white"
          >
            Otključaj sve <span className="text-lg">→</span>
          </a>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {disciplines.map((item) => (
            <article
              key={item.title}
              className={`glass-panel cyber-border rounded-[1.8rem] border bg-gradient-to-br ${item.tone} p-6 transition duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#08111f]/90 text-2xl text-cyan">
                  {item.icon}
                </div>
                <span className="text-mono text-xs uppercase tracking-[0.32em] text-slate-500">
                  {item.category}
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-400">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="dashboard"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-panel cyber-border rounded-[2rem] p-6 sm:p-8">
            <p className="text-mono text-sm uppercase tracking-[0.35em] text-cyan/75">
              Dashboard preview
            </p>
            <h2 className="mt-3 text-display text-3xl font-semibold text-white">
              Sve što treba odmah nakon prijave
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-400">
              Zdravo, Bojane. Vidjećeš svoj status, bodove, nivo, streak i
              preporučene misije bez nepotrebnog klikanja.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  Status
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  Junior Defender
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  Level
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">07</p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.4rem] border border-cyan/15 bg-cyan/[0.08] p-5">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Progress to next level</span>
                <span>68%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-cyan via-sky-400 to-violet" />
              </div>
            </div>
          </div>

          <div id="progress" className="grid gap-5 sm:grid-cols-2">
            {dashboardCards.map((card) => (
              <article
                key={card.title}
                className="glass-panel cyber-border rounded-[1.8rem] p-6 transition duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-white">
                    {card.title}
                  </h3>
                  <span className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-[11px] font-semibold tracking-[0.3em] text-cyan">
                    {card.label}
                  </span>
                </div>
                <p className="mt-4 text-base leading-7 text-slate-400">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 pb-20 sm:px-6 lg:px-8 lg:py-16">
        <div className="glass-panel cyber-border rounded-[2rem] px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-mono text-sm uppercase tracking-[0.35em] text-cyan/75">
                Build phase
              </p>
              <h2 className="mt-3 text-display text-3xl font-semibold text-white">
                Ovo je dobra osnova za kasnije proširenje
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-400">
                Frontend je postavljen kao landing + dashboard preview, a
                backend će uskoro moći da servira misije, progres i prijavu.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
              Nezavisna početna verzija
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
