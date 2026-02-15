import React, { useEffect, useMemo, useState } from "react";

/**
 * QUICK CUSTOMIZATION:
 * - Replace avatarUrl + heroTattooingUrl + image URLs with your own.
 *   Easiest: put images in /public and use "/yourfile.jpg"
 * - Update name / location / IG / email in Header + Footer + Contact panel.
 */

const avatarUrl =
  "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=200&q=80";
const heroTattooingUrl =
  "https://images.unsplash.com/photo-1542728928-1413d1894ed1?auto=format&fit=crop&w=1400&q=80";

const carouselItems = [
  {
    title: "Fresh Flash",
    subtitle: "Latest designs",
    img: "https://images.unsplash.com/photo-1520975869018-0f66b9559d2b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Healed",
    subtitle: "Proof it lasts",
    img: "https://images.unsplash.com/photo-1520975693411-87a8b2a2f3ad?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Color",
    subtitle: "Bold & solid",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Linework",
    subtitle: "Clean & crisp",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
];

const styleCards = [
  {
    title: "Traditional",
    desc: "Bold lines, classic motifs, strong color.",
    img: "https://images.unsplash.com/photo-1542728928-1413d1894ed1?auto=format&fit=crop&w=1200&q=80",
    href: "#portfolio",
    accent: "bg-red",
  },
  {
    title: "Neo-Traditional",
    desc: "Classic foundation with modern detail.",
    img: "https://images.unsplash.com/photo-1520975869018-0f66b9559d2b?auto=format&fit=crop&w=1200&q=80",
    href: "#portfolio",
    accent: "bg-mustard",
  },
  {
    title: "Blackwork",
    desc: "Dark, graphic, and high contrast.",
    img: "https://images.unsplash.com/photo-1520975693411-87a8b2a2f3ad?auto=format&fit=crop&w=1200&q=80",
    href: "#portfolio",
    accent: "bg-teal",
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

function Badge({ children, tone = "red" }) {
  const toneMap = {
    red: "border-ink bg-red text-paper",
    teal: "border-ink bg-teal text-paper",
    mustard: "border-ink bg-mustard text-ink",
    ink: "border-ink bg-ink text-paper",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border-2 px-3 py-1 text-sm font-black tracking-wide shadow-flash",
        toneMap[tone] || toneMap.red
      )}
    >
      {children}
    </span>
  );
}

/**
 * SlidePanel:
 * - side="left": enters from left, exits to right (your requirement)
 * - side="right": enters from right, exits to left (your requirement)
 */
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
          "absolute inset-0 bg-ink/60 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0"
        )}
        aria-label="Close overlay"
      />

      <aside
        className={cx(
          "absolute top-0 h-full w-[92%] max-w-md paper-grain border-4 border-ink bg-paper shadow-flashSoft",
          "transition-transform duration-200 ease-out will-change-transform",
          side === "left" ? "left-0" : "right-0",
          panelTransform
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between border-b-4 border-ink p-4">
          <div className="flex items-center gap-3">
            <Badge tone={side === "left" ? "teal" : "red"}>
              {side === "left" ? "ABOUT" : "CONTACT"}
            </Badge>
            <h2 className="font-display text-xl font-black tracking-wide">
              {title}
            </h2>
          </div>
          <button
            onClick={startClose}
            className="rounded-flash border-2 border-ink bg-paper px-3 py-2 font-black shadow-flash hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
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
    "inline-flex items-center justify-center gap-2 rounded-flash border-[3px] border-ink px-5 py-3 font-black tracking-wide shadow-flash transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
  const styles =
    variant === "primary"
      ? "bg-red text-paper hover:bg-red/95"
      : variant === "ink"
      ? "bg-ink text-paper hover:bg-ink/95"
      : "bg-paper text-ink hover:bg-paper/80";
  const props = Comp === "a" ? { href } : { onClick };
  return (
    <Comp
      {...props}
      className={cx(
        base,
        styles,
        "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
      )}
    >
      {children}
      <IconArrow />
    </Comp>
  );
}

function SectionTitle({ kicker, title, tone = "mustard" }) {
  return (
    <div className="mb-5">
      <div className="mb-2">
        <Badge tone={tone}>{kicker}</Badge>
      </div>
      <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function HorizontalCarousel({ items }) {
  return (
    <div className="relative">
      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 pr-2"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((it, idx) => (
          <article
            key={idx}
            className="min-w-[230px] max-w-[260px] snap-start overflow-hidden rounded-flash border-4 border-ink bg-paper shadow-flash"
          >
            <div className="relative h-28 w-full">
              <img
                src={it.img}
                alt={it.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
            </div>
            <div className="p-3">
              <div className="font-display text-lg font-black">{it.title}</div>
              <div className="text-sm font-semibold opacity-80">
                {it.subtitle}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="text-xs font-semibold opacity-70">Swipe / scroll →</div>
    </div>
  );
}

function StyleCard({ title, desc, img, href, accent }) {
  return (
    <a
      href={href}
      className="group block overflow-hidden rounded-flash border-4 border-ink bg-paper shadow-flash transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
    >
      <div className="relative h-48 w-full">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
        <div
          className={cx(
            "absolute left-4 top-4 h-3 w-20 rounded-full border-2 border-ink",
            accent
          )}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-black">{title}</h3>
          <span className="rounded-full border-2 border-ink bg-paper px-3 py-1 text-sm font-black shadow-flash group-hover:shadow-none">
            View
          </span>
        </div>
        <p className="mt-2 text-sm font-semibold opacity-80">{desc}</p>
      </div>
    </a>
  );
}

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="paper-grain min-h-screen">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b-4 border-ink bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full border-4 border-ink shadow-flash">
              <img src={avatarUrl} alt="Artist portrait" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="font-display text-xl font-black leading-none">
                Sunshine Tattoo
              </div>
              <div className="text-xs font-semibold opacity-75">
                Traditional Tattoo • Your City (edit me)
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <a
              href="#portfolio"
              className="hidden rounded-flash border-2 border-ink bg-paper px-3 py-2 text-sm font-black shadow-flash hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none sm:inline-flex"
            >
              Portfolio
            </a>

            <button
              onClick={() => setAboutOpen(true)}
              className="rounded-flash border-2 border-ink bg-paper px-3 py-2 text-sm font-black shadow-flash hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
            >
              About
            </button>

            <button
              onClick={() => setContactOpen(true)}
              className="rounded-flash border-2 border-ink bg-red px-3 py-2 text-sm font-black text-paper shadow-flash hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* ABOUT PANEL */}
      <SlidePanel open={aboutOpen} onClose={() => setAboutOpen(false)} side="left" title="About the Artist">
        <div className="space-y-4">
          <p className="text-sm font-semibold leading-relaxed opacity-90">
            Drop your quick bio here: what you love tattooing, where you work,
            and how you book. Keep it punchy.
          </p>

          <div className="rounded-flash border-4 border-ink bg-paper p-4 shadow-flash">
            <div className="font-display text-lg font-black">Specialties</div>
            <ul className="mt-2 list-disc pl-5 text-sm font-semibold opacity-85">
              <li>American Traditional</li>
              <li>Flash + small bangers</li>
              <li>Custom classic motifs</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge tone="mustard">Bold</Badge>
            <Badge tone="teal">Clean</Badge>
            <Badge tone="red">Classic</Badge>
          </div>
        </div>
      </SlidePanel>

      {/* CONTACT PANEL */}
      <SlidePanel open={contactOpen} onClose={() => setContactOpen(false)} side="right" title="Booking / Contact">
        <div className="space-y-4">
          <div className="rounded-flash border-4 border-ink bg-paper p-4 shadow-flash">
            <div className="font-display text-lg font-black">Fast contact</div>
            <div className="mt-2 space-y-2 text-sm font-black">
              <div>
  Email: <span className="font-black">coming soon</span>
</div>
<div>
  Instagram: <span className="font-black">coming soon</span>
</div>

            </div>
          </div>

          <form
            className="rounded-flash border-4 border-ink bg-paper p-4 shadow-flash"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Next: wire this to Formspree/EmailJS 👍");
            }}
          >
            <div className="font-display text-lg font-black">Quick inquiry</div>
            <div className="mt-3 grid gap-3">
              <label className="grid gap-1 text-sm font-black">
                Name
                <input
                  className="rounded-flash border-2 border-ink bg-paper px-3 py-2 font-semibold outline-none focus:ring-4 focus:ring-teal/30"
                  placeholder="Your name"
                  required
                />
              </label>

              <label className="grid gap-1 text-sm font-black">
                Email
                <input
                  type="email"
                  className="rounded-flash border-2 border-ink bg-paper px-3 py-2 font-semibold outline-none focus:ring-4 focus:ring-teal/30"
                  placeholder="you@email.com"
                  required
                />
              </label>

              <label className="grid gap-1 text-sm font-black">
                What are you thinking?
                <textarea
                  className="min-h-[96px] rounded-flash border-2 border-ink bg-paper px-3 py-2 font-semibold outline-none focus:ring-4 focus:ring-teal/30"
                  placeholder="Placement, size, reference, budget, dates…"
                  required
                />
              </label>

              <button
                type="submit"
                className="rounded-flash border-[3px] border-ink bg-ink px-5 py-3 font-black text-paper shadow-flash hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                Send
              </button>
            </div>
          </form>

          <p className="text-xs font-semibold opacity-75">
            Pro move: add “Healed” photos + booking rules here.
          </p>
        </div>
      </SlidePanel>

      {/* MAIN */}
      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* HERO */}
        <section className="grid items-stretch gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-flash border-4 border-ink bg-paper shadow-flash">
            <div className="relative h-[360px] w-full sm:h-[420px]">
              <img src={heroTattooingUrl} alt="Tattooing in progress" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <Badge tone="ink">IN THE SHOP</Badge>
              </div>
            </div>
          </div>

          <div className="rounded-flash border-4 border-ink bg-paper p-6 shadow-flash">
            <div className="flex flex-wrap gap-2">
              <Badge tone="red">TRADITIONAL</Badge>
              <Badge tone="mustard">BOLD LINES</Badge>
              <Badge tone="teal">SOLID COLOR</Badge>
            </div>

            <h1 className="mt-4 font-display text-4xl font-black leading-tight sm:text-5xl">
              Bold tattoos built to last.
            </h1>

            <p className="mt-3 text-sm font-semibold leading-relaxed opacity-85">
              Quick intro: what you specialize in, where you tattoo, and what you
              love doing most. Keep it short so people hit the button.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button as="button" onClick={() => setContactOpen(true)} variant="primary">
                Book / Inquire
              </Button>
              <Button as="a" href="#portfolio" variant="secondary">
                View Work
              </Button>
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <div className="font-display text-xl font-black">Highlights</div>
                <span className="text-xs font-black opacity-70">swipe →</span>
              </div>
              <HorizontalCarousel items={carouselItems} />
            </div>
          </div>
        </section>

        {/* STYLE LINKS */}
        <section id="portfolio" className="mt-14">
          <SectionTitle kicker="PORTFOLIO" title="Pick a lane (or cruise them all)." tone="mustard" />
          <div className="grid gap-6 md:grid-cols-3">
            {styleCards.map((c) => (
              <StyleCard key={c.title} {...c} />
            ))}
          </div>

          <div className="mt-8 rounded-flash border-4 border-ink bg-paper p-5 shadow-flash">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-display text-2xl font-black">Want a full gallery?</div>
                <div className="text-sm font-semibold opacity-80">
                  Next we’ll add a real Portfolio page with categories + grid.
                </div>
              </div>
              <div className="flex gap-3">
                <button
  type="button"
  disabled
  className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-flash border-[3px] border-ink bg-ink/85 px-5 py-3 font-black tracking-wide text-paper opacity-60 shadow-flash"
  title="Coming soon"
>
  Instagram
  <IconArrow />
</button>

                <Button as="button" onClick={() => setContactOpen(true)} variant="primary">
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t-4 border-ink bg-paper">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
          <div className="space-y-2">
            <div className="font-display text-xl font-black">Sunshine Tattoo</div>
            <div className="text-sm font-semibold opacity-80">
              Tattooing at <span className="underline">Shop Name</span>
            </div>
            <div className="text-sm font-semibold opacity-80">City, State • By appointment</div>
          </div>

          <div className="space-y-2 sm:text-center">
            <div className="font-display text-xl font-black">Links</div>
           <div className="text-sm font-black">
  <span className="opacity-70">Instagram (coming soon)</span>
  {" • "}
  <span className="opacity-70">Email (coming soon)</span>
</div>

            <div className="text-xs font-semibold opacity-70">
              Add “Aftercare” + “Policies” when ready.
            </div>
          </div>

          <div className="space-y-3 sm:text-right">
            <div className="font-display text-xl font-black">Booking</div>
            <button
              onClick={() => setContactOpen(true)}
              className="inline-flex rounded-flash border-[3px] border-ink bg-red px-5 py-3 font-black text-paper shadow-flash hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Open Contact
            </button>
            <div className="text-xs font-semibold opacity-70">© {year} • All work belongs to the artist</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
