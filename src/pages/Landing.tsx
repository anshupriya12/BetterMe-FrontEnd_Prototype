import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Moon,
  PlayCircle,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
} from "lucide-react";
import { ShowcaseNav } from "../components/showcase/ShowcaseNav";
import { DeviceFrame } from "../components/showcase/DeviceFrame";
import { ShowcaseDashboard } from "../components/showcase/ShowcaseDashboard";
import { ShowcaseCategories } from "../components/showcase/ShowcaseCategories";
import { ShowcaseTimeline } from "../components/showcase/ShowcaseTimeline";
import { ShowcaseWeekly } from "../components/showcase/ShowcaseWeekly";
import { ShowcaseCalendar } from "../components/showcase/ShowcaseCalendar";
import { MiniPreview } from "../components/showcase/MiniPreview";
import { Reveal } from "../components/showcase/Reveal";
import { MoodSelector } from "../components/mood/MoodSelector";
import { todayISO } from "../utils/date";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5865f2] shadow-sm backdrop-blur">
      <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
      {children}
    </span>
  );
}

function StatementLine({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <p className="mx-auto max-w-3xl text-center text-[clamp(1.9rem,4.6vw,3.4rem)] font-bold leading-[1.12] tracking-tight text-[#171826]">
        {children}
      </p>
    </Reveal>
  );
}

export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const today = todayISO();

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroRotate = useTransform(heroProgress, [0, 1], [reduceMotion ? 0 : 10, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.92]);
  const heroY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : 60]);
  const heroTextY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : -80]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  return (
    <div id="top" className="overflow-x-hidden bg-white font-sans text-[#171826]">
      <ShowcaseNav />

      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col items-center overflow-hidden pb-24 pt-36 sm:pt-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% 0%, #dfe4ff 0%, transparent 55%), radial-gradient(ellipse 70% 55% at 100% 10%, #ffd9e8 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 50% 100%, #ffe9cf 0%, transparent 55%), #f3f4fc",
        }}
      >
        {/* atmospheric blobs */}
        <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#8c6ff0]/20 blur-3xl sm:h-96 sm:w-96" />
        <div className="pointer-events-none absolute -right-16 top-40 h-64 w-64 rounded-full bg-[#f4548c]/20 blur-3xl sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#f5a623]/15 blur-3xl" />

        <motion.div style={{ y: heroTextY, opacity: heroTextOpacity }} className="relative z-10 flex flex-col items-center px-4 text-center">
          <Reveal>
            <Eyebrow>Meet BetterMe</Eyebrow>
          </Reveal>

          <Reveal delay={0.08} y={36}>
            <h1 className="mt-7 text-[clamp(2.75rem,8.5vw,7rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">
              Your life.
              <br />
              <span className="bg-gradient-to-r from-[#5865f2] via-[#8c6ff0] to-[#f4548c] bg-clip-text text-transparent">
                Better organized.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-balance text-base text-[#4b4d63] sm:text-lg">
              A calmer way to plan your days, track your progress, and make space for what matters.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#product"
                className="group inline-flex items-center gap-2 rounded-full bg-[#171826] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_32px_-12px_rgba(23,24,38,0.45)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore BetterMe
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#experience"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#171826] backdrop-blur transition-colors duration-200 hover:bg-white"
              >
                <PlayCircle className="h-4 w-4" />
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-[#6b6d85]">
              <span>Simple</span>
              <span className="h-1 w-1 rounded-full bg-[#c7c9dd]" />
              <span>Beautiful</span>
              <span className="h-1 w-1 rounded-full bg-[#c7c9dd]" />
              <span>Built for you</span>
            </div>
          </Reveal>
        </motion.div>

        <motion.div
          style={{
            rotateX: heroRotate,
            scale: heroScale,
            y: heroY,
            transformPerspective: 1600,
          }}
          className="relative z-10 mt-16 w-full max-w-5xl px-4 sm:px-6"
        >
          <div className="rounded-[24px] ring-1 ring-black/[0.04]" style={{ boxShadow: "0 60px 120px -40px rgba(88,101,242,0.35)" }}>
            <DeviceFrame theme="light" url="betterme.app/dashboard">
              <ShowcaseDashboard />
            </DeviceFrame>
          </div>
        </motion.div>
      </section>

      {/* ================= STATEMENT 1 ================= */}
      <section className="relative overflow-hidden px-4 py-28 sm:py-36">
        <CalendarDays aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-[#eef0fe] sm:h-72 sm:w-72" strokeWidth={1} />
        <StatementLine>
          Plan less.
          <br />
          <span className="text-[#5865f2]">Live more.</span>
        </StatementLine>
      </section>

      {/* ================= DASHBOARD SHOWCASE ================= */}
      <section id="product" className="relative bg-[#f5f6ff] py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <Eyebrow>Your day, at a glance</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-[clamp(2.1rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-[#171826]">
                Everything you need.
                <br />
                Nothing you don't.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-md text-[#5c5e76]">
                One dashboard for your progress, your schedule, and how the week is really going.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} y={48} className="relative mt-16">
            <div className="pointer-events-none absolute -inset-x-6 -top-10 -z-10 h-[420px] rounded-[40px] bg-gradient-to-b from-[#e4e7fd] to-transparent blur-2xl" />
            <DeviceFrame theme="light" url="betterme.app/dashboard" className="mx-auto max-w-5xl">
              <ShowcaseDashboard />
            </DeviceFrame>
          </Reveal>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: TrendingUp, label: "Progress at a glance", color: "text-[#5865f2]", bg: "bg-[#eef0fe]" },
              { icon: Clock, label: "What's next, always visible", color: "text-[#f4548c]", bg: "bg-[#fde5ee]" },
              { icon: Sparkles, label: "A week you can actually see", color: "text-[#8c6ff0]", bg: "bg-[#ece7fd]" },
            ].map((f) => (
              <Reveal key={f.label} delay={0.1}>
                <div className="flex items-center gap-3 rounded-2xl border border-black/[0.05] bg-white px-4 py-3.5">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${f.bg} ${f.color}`}>
                    <f.icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                  </span>
                  <span className="text-sm font-medium text-[#171826]">{f.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TASK CATEGORIES ================= */}
      <section className="relative bg-white py-24 sm:py-32">
        <CheckCircle2 aria-hidden="true" className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 text-[#fde5ee] sm:h-80 sm:w-80" strokeWidth={1} />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Reveal>
                <Eyebrow>Turn chaos into clarity</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-[#171826]">
                  Your day,
                  <br />
                  without the chaos.
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 max-w-sm text-[#5c5e76]">
                  Health, Design, Video, Socials — every task finds its place automatically, so your day
                  reads like a plan instead of a list.
                </p>
              </Reveal>
            </div>

            <div data-theme="light" className="relative">
              <ShowcaseCategories />
            </div>
          </div>
        </div>
      </section>

      {/* ================= MOOD ================= */}
      <MoodSection />

      {/* ================= STATEMENT 2 ================= */}
      <section className="relative overflow-hidden bg-white px-4 py-28 sm:py-36">
        <Clock aria-hidden="true" className="pointer-events-none absolute -left-10 -bottom-10 h-56 w-56 text-[#e1f5fd] sm:h-72 sm:w-72" strokeWidth={1} />
        <StatementLine>
          See where your
          <br />
          <span className="text-[#34b9f0]">time</span> goes.
        </StatementLine>
      </section>

      {/* ================= TIME VIEW (dark) ================= */}
      <section id="experience" className="relative overflow-hidden bg-[#0d0e13] py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(88,101,242,0.35), transparent 60%)" }} />
        <Clock aria-hidden="true" className="pointer-events-none absolute -right-14 top-10 h-72 w-72 text-white/[0.04]" strokeWidth={1} />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>See your time</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-[clamp(2.1rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-white">
                Watch the day
                <br />
                fill up.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md text-white/60">
                Every task, in order, exactly when it happens — so you always know what's now and what's next.
              </p>
            </Reveal>
          </div>

          <div data-theme="dark" className="mt-14 rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 sm:p-10">
            <ShowcaseTimeline />
          </div>
        </div>
      </section>

      {/* ================= WEEKLY VIEW ================= */}
      <section className="relative bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <Reveal>
              <Eyebrow>Plan the whole week</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-[clamp(2.1rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#171826]">
                Monday to Sunday.
                <br />
                One clear picture.
              </h2>
            </Reveal>
          </div>

          <div data-theme="light" className="mt-14">
            <ShowcaseWeekly />
          </div>
        </div>
      </section>

      {/* ================= CALENDAR ================= */}
      <CalendarSection today={today} />

      {/* ================= LIGHT / DARK ================= */}
      <ModesSection />

      {/* ================= STAT BAND ================= */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-4 text-center sm:grid-cols-3">
          {[
            ["10K+", "Active users"],
            ["4.9/5", "User rating"],
            ["90%", "Feel more productive"],
          ].map(([stat, label]) => (
            <Reveal key={label}>
              <p className="text-4xl font-extrabold tracking-tight text-[#171826] sm:text-5xl">{stat}</p>
              <p className="mt-2 text-sm font-medium text-[#6b6d85]">{label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section
        className="relative overflow-hidden px-4 py-28 sm:py-36"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 0%, #e0e3ff 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 100% 100%, #ffe4ef 0%, transparent 55%), #f3f4fc",
        }}
      >
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-[clamp(2.3rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#171826]">
              Make room for
              <br />
              <span className="bg-gradient-to-r from-[#5865f2] via-[#8c6ff0] to-[#f4548c] bg-clip-text text-transparent">
                a better day.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-[#5c5e76]">
              Everything you need to organize your time, track your progress, and understand your days.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <a
              href="/app"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-[#171826] px-7 py-4 text-sm font-semibold text-white shadow-[0_20px_40px_-16px_rgba(23,24,38,0.5)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Start with BetterMe
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.24} y={60} className="relative mx-auto mt-20 max-w-4xl px-2">
          <div className="rounded-[24px]" style={{ boxShadow: "0 60px 120px -40px rgba(88,101,242,0.3)" }}>
            <DeviceFrame theme="light" url="betterme.app/weekly">
              <div data-theme="light" className="p-5 sm:p-7">
                <ShowcaseWeekly />
              </div>
            </DeviceFrame>
          </div>
        </Reveal>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-black/[0.06] bg-white px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
          <span className="text-base font-bold tracking-tight text-[#171826]">
            Better<span className="text-[#5865f2]">Me.</span>
          </span>
          <nav className="flex items-center gap-6 text-sm text-[#6b6d85]">
            <a href="#product" className="hover:text-[#171826]">Product</a>
            <a href="#experience" className="hover:text-[#171826]">Experience</a>
            <a href="/app" className="hover:text-[#171826]">Open app</a>
          </nav>
          <p className="text-xs text-[#9294ab]">© {new Date().getFullYear()} BetterMe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function MoodSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.85", "start 0.25"] });
  const stars = [0, 1, 2, 3, 4];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#fff8ee] py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#f5a623]/15 blur-3xl" />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <Eyebrow>Track how you feel</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 text-[clamp(2.1rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#171826]">
            Progress isn't
            <br />
            just a number.
          </h2>
        </Reveal>

        <div className="mt-12 flex items-center justify-center gap-2.5 sm:gap-4">
          {stars.map((i) => (
            <StarIcon key={i} progress={scrollYProgress} index={i} />
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-sm text-[#5c5e76]">
            A quick daily check-in ties directly into your productivity graph — see how you feel, next to
            what you got done.
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mx-auto mt-12 max-w-sm">
          <div data-theme="light">
            <MoodSelector date={todayISO()} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StarIcon({ progress, index }: { progress: import("framer-motion").MotionValue<number>; index: number }) {
  const start = 0.08 + index * 0.14;
  const fill = useTransform(progress, [start, start + 0.16], [0, 1]);
  const scale = useTransform(fill, [0, 1], [0.7, 1]);
  return (
    <motion.div style={{ scale }} className="relative">
      <Star className="h-10 w-10 text-[#e7e2f7] sm:h-14 sm:w-14" strokeWidth={1.6} />
      <motion.div style={{ opacity: fill }} className="absolute inset-0">
        <Star className="h-10 w-10 fill-[#8c6ff0] text-[#8c6ff0] sm:h-14 sm:w-14" strokeWidth={1.6} />
      </motion.div>
    </motion.div>
  );
}

function CalendarSection({ today }: { today: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.9", "start 0.35"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 1 : 0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f5f6ff] py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <Eyebrow>Look back. Move forward.</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-[clamp(2.1rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#171826]">
              A month you can
              <br />
              actually see.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-sm text-[#5c5e76]">
              Every date carries its own story — mood, tasks, and how the day went, all in one glance.
            </p>
          </Reveal>
        </div>

        <motion.div style={{ scale, opacity }} className="relative mt-14">
          <div className="rounded-[24px]" style={{ boxShadow: "0 50px 100px -36px rgba(88,101,242,0.3)" }}>
            <DeviceFrame theme="light" url={`betterme.app/calendar?d=${today}`} className="mx-auto max-w-2xl">
              <ShowcaseCalendar />
            </DeviceFrame>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ModesSection() {
  return (
    <section id="modes" className="relative overflow-hidden bg-[#0d0e13] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: "radial-gradient(ellipse 60% 50% at 15% 10%, rgba(88,101,242,0.3), transparent 60%), radial-gradient(ellipse 55% 45% at 90% 90%, rgba(244,84,140,0.22), transparent 60%)" }} />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
            <Moon className="h-3.5 w-3.5" />
            Beautiful and powerful
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-[clamp(2.1rem,5.5vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            Made for every
            <br />
            kind of day.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-md text-white/55">
            Light for focus, dark for late nights — BetterMe adapts, right down to every card and chart.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[22px] border border-white/[0.08] bg-white shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)]">
              <MiniPreview theme="light" />
              <div className="flex items-center gap-2 border-t border-black/[0.06] px-4 py-3 text-[#171826]">
                <Sun className="h-4 w-4 text-[#f5a623]" />
                <span className="text-xs font-semibold">Light mode</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#16171f] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)]">
              <MiniPreview theme="dark" />
              <div className="flex items-center gap-2 border-t border-white/[0.08] px-4 py-3 text-white">
                <Moon className="h-4 w-4 text-[#7b87ff]" />
                <span className="text-xs font-semibold">Dark mode</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
