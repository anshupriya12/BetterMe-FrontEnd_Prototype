import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const LINKS = [
  { href: "#product", label: "Product" },
  { href: "#experience", label: "Experience" },
  { href: "#modes", label: "Light & Dark" },
];

export function ShowcaseNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <motion.header
      initial={false}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
      style={{ paddingTop: scrolled ? 12 : 20 }}
    >
      <motion.div
        animate={{
          maxWidth: scrolled ? 720 : 1080,
          paddingLeft: scrolled ? 10 : 20,
          paddingRight: scrolled ? 10 : 20,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`flex w-full items-center justify-between gap-6 rounded-full border py-2 transition-colors duration-300 ${
          scrolled
            ? "border-black/[0.06] bg-white/75 shadow-[0_8px_30px_-12px_rgba(20,20,40,0.25)] backdrop-blur-xl"
            : "border-white/10 bg-white/10 backdrop-blur-md"
        }`}
      >
        <a href="#top" className="shrink-0 pl-2 text-base font-bold tracking-tight text-[#171826]">
          Better<span className="text-[#5865f2]">Me.</span>
        </a>

        <nav className="hidden items-center gap-1 sm:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                scrolled ? "text-[#5c5e76] hover:bg-black/[0.04] hover:text-[#171826]" : "text-[#171826]/70 hover:bg-white/40 hover:text-[#171826]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/app"
          className="shrink-0 rounded-full bg-[#5865f2] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#4652d6] active:translate-y-0"
        >
          Get Started
        </a>
      </motion.div>
    </motion.header>
  );
}
