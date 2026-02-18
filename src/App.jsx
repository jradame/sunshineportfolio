import React, { useEffect, useMemo, useState } from "react";

import heroTattooingUrl from "./images/hero.png";
import traditionalImg from "./images/eye.png";
import neoTraditionalImg from "./images/japanese.png";
import blackworkImg from "./images/blackskull.png";

const avatarUrl =
  "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=200&q=80";

const styleCards = [
  {
    title: "Traditional",
    desc: "Bold lines, classic motifs, strong color.",
    img: traditionalImg,
    href: "#portfolio",
  },
  {
    title: "Neo-Traditional",
    desc: "Classic foundation with modern detail.",
    img: neoTraditionalImg,
    href: "#portfolio",
  },
  {
    title: "Blackwork",
    desc: "Dark, graphic, and high contrast.",
    img: blackworkImg,
    href: "#portfolio",
  },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M5 12h12m-5-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SlidePanel({ open, onClose, side = "left", title, children }) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const [render, setRender] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) setRender(true);
  }, [open]);

  const exitTransform =
    side === "left" ? "translate-x-[110%]" : "translate-x-[-110%]";
  const enterTransform =
    side === "left" ? "translate-x-[-110%]" : "translate-x-[110%]";

  const panelTransform = open
    ? "translate-x-0"
    : closing
    ? exitTransform
    : enterTransform;

  const startClose = () => {
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      setRender(false);
      onClose();
    }, 240);
  };

  useEffect(() => {
    if (!open && render) startClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        onClick={startClose}
        className={cx(
          "absolute inset-0 bg-black/70 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0"
        )}
        aria-label="Close overlay"
      />

      <aside
        className={cx(
          "absolute top-0 h-full w-[92%] max-w-md bg-ink text-chalk",
          "border-white/10 shadow-soft",
          "transition-transform duration-200 ease-out will-change-transform",
          side === "left" ? "left-0 border-r" : "right-0 border-l",
          panelTransform
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="font-display text-2xl font-black tracking-wide">
            {title}
          </h2>
          <button
            onClick={startClose}
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-black hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="p-5">{children}</div>
      </aside>
    </div>
  );
}

function Button({ as = "button", href, onClick, children, variant = "primary" }) {
  const Comp = as;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-flash px-5 py-3 font-black transition active:translate-y-[1px]";

  const styles =
    variant === "primary"
      ? "bg-primary text-chalk hover:bg-primary/90 shadow-soft"
      : "bg-white/10 text-chalk border border-white/10 hover:bg-white/15";

  const props = Comp === "a" ? { href } : { onClick };

  return (
    <Comp {...props} className={cx(base, styles)}>
      {children}
      <IconArrow />
    </Comp>
  );
}

function StyleCard({ title, desc, img, href }) {
  return (
    <a
      href={href}
      className="group block overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10 shadow-soft hover:bg-white/[0.08] transition"
    >
      <div className="relative h-52 w-full">
        <img src={img} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-black text-chalk">
            {title}
          </h3>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black ring-1 ring-white/10 text-chalk">
            View
          </span>
        </div>
        <p className="mt-2 text-sm font-semibold text-white/70">{desc}</p>
      </div>
    </a>
  );
}

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    // ✅ Body font (IBM Plex Sans) applied globally
    <div className="font-body min-h-screen text-chalk">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-night/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full ring-1 ring-white/15">
              <img
                src={avatarUrl}
                alt="Artist portrait"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <div className="font-display text-3xl font-black text-glow">
                Sunshine Tattoo
              </div>
              <div className="text-xs font-semibold text-white/70">
                Traditional Tattoo • Your City (edit me)
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <a
              href="#portfolio"
              className="hidden rounded-flash bg-white/10 px-3 py-2 text-sm font-black ring-1 ring-white/10 hover:bg-white/15 sm:inline-flex"
            >
              Portfolio
            </a>

            <button
              onClick={() => setAboutOpen(true)}
              className="rounded-flash bg-white/10 px-3 py-2 text-sm font-black ring-1 ring-white/10 hover:bg-white/15"
            >
              About
            </button>

            <button
              onClick={() => setContactOpen(true)}
              className="rounded-flash bg-primary px-3 py-2 text-sm font-black text-chalk hover:bg-primary/90"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* ABOUT PANEL */}
      <SlidePanel
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        side="left"
        title="About the Artist"
      >
        <div className="space-y-4 text-sm font-semibold text-white/85">
          <p>
            Drop your quick bio here: what you love tattooing, where you work,
            and how you book.
          </p>

          <ul className="list-disc pl-5 text-white/75">
            <li>American Traditional</li>
            <li>Flash + small bangers</li>
            <li>Custom classic motifs</li>
          </ul>
        </div>
      </SlidePanel>

      {/* CONTACT PANEL */}
      <SlidePanel
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        side="right"
        title="Booking / Contact"
      >
        <div className="space-y-3 text-sm font-semibold text-white/85">
          <div>Email: coming soon</div>
          <div>Instagram: coming soon</div>
          <div className="pt-2 text-xs text-white/60">
            When you’re ready, we’ll wire this into a real booking form.
          </div>
        </div>
      </SlidePanel>

      {/* MAIN */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* HERO */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10 shadow-soft">
            <img
              src={heroTattooingUrl}
              alt="Tattooing in progress"
              className="block h-auto w-full object-cover"
            />
          </div>

          <div className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10 shadow-soft">
            <h1 className="font-display text-5xl font-black leading-tight text-glow">
              TATTOOS THAT LAST
            </h1>

            <p className="mt-3 text-sm font-semibold text-white/75">
              Quick intro: what you specialize in, where you tattoo, and what
              you love doing most.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                as="button"
                onClick={() => setContactOpen(true)}
                variant="primary"
              >
                Book / Inquire
              </Button>

              <Button as="a" href="#portfolio" variant="secondary">
                View Portfolio
              </Button>
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="mt-14">
          <h2 className="font-display text-4xl font-black text-glow">
            Portfolio
          </h2>
          <p className="mt-2 text-sm font-semibold text-white/70">
            Placeholders for now — we’ll replace with your real work next.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {styleCards.map((c) => (
              <StyleCard key={c.title} {...c} />
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-white/10 bg-black/30">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <div className="font-display text-2xl font-black">
                Sunshine Tattoo
              </div>
              <div className="mt-2 text-sm font-semibold text-white/70">
                Tattooing at <span className="underline">Shop Name</span>
              </div>
              <div className="text-sm font-semibold text-white/70">
                City, State • By appointment
              </div>
            </div>

            <div className="sm:text-center">
              <div className="text-lg font-black">Links</div>
              <div className="mt-2 text-sm font-semibold text-white/70">
                Instagram (coming soon) • Email (coming soon)
              </div>
            </div>

            <div className="sm:text-right">
              <button
                onClick={() => setContactOpen(true)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-flash bg-primary px-5 py-3 font-black text-chalk hover:bg-primary/90 active:translate-y-[1px]"
              >
                BOOKING <IconArrow />
              </button>
              <div className="mt-4 text-xs font-semibold text-white/50">
                © {year} • All work belongs to the artist
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
