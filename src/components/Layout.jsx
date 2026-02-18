import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const avatarUrl =
  "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=200&q=80";

// Keep not-live for now
const CONTACT_LIVE = false;
const CALENDLY_URL = "https://calendly.com/yourname/consult";

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

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(onClose, 2400);
    return () => window.clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  const tone =
    toast.type === "success"
      ? "bg-emerald-500/15 ring-1 ring-emerald-400/20 text-emerald-100"
      : "bg-red-500/15 ring-1 ring-red-400/20 text-red-100";

  return (
    <div className="fixed bottom-5 left-1/2 z-[60] w-[92%] max-w-md -translate-x-1/2">
      <div className={cx("rounded-2xl px-4 py-3 shadow-soft backdrop-blur", tone)}>
        <div className="flex items-start justify-between gap-3">
          <div className="text-sm font-semibold">{toast.message}</div>
          <button
            onClick={onClose}
            className="rounded-lg bg-white/10 px-2 py-1 text-xs font-black text-chalk hover:bg-white/15"
          >
            Close
          </button>
        </div>
      </div>
    </div>
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
          <h2 className="text-lg font-black tracking-wide">{title}</h2>
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

function DisabledCTA({ children, title = "Coming soon" }) {
  return (
    <button
      type="button"
      disabled
      title={title}
      className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-flash bg-white/10 px-5 py-3 font-black text-white/70 ring-1 ring-white/10 opacity-60"
    >
      {children}
      <IconArrow />
    </button>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-white/85">
      <span className="font-black text-chalk">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </label>
  );
}

function ContactForm({ live = false, onToast }) {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState("idle");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim());
  const nameOk = values.name.trim().length >= 2;
  const msgOk = values.message.trim().length >= 10;
  const formValid = nameOk && emailOk && msgOk;

  const errors = {
    name: touched.name && !nameOk ? "Name must be at least 2 characters." : "",
    email: touched.email && !emailOk ? "Enter a valid email address." : "",
    message: touched.message && !msgOk ? "Message must be at least 10 characters." : "",
  };

  const onChange = (key) => (e) => setValues((p) => ({ ...p, [key]: e.target.value }));
  const onBlur = (key) => () => setTouched((p) => ({ ...p, [key]: true }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!formValid) return;

    setStatus("submitting");

    // For now: demo submit always
    await new Promise((r) => setTimeout(r, 650));

    setStatus("success");
    onToast?.({ type: "success", message: live ? "Inquiry sent ✅" : "Inquiry (demo) sent ✅" });

    setTimeout(() => {
      setStatus("idle");
      setValues({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
    }, 1100);
  };

  return (
    <form onSubmit={onSubmit} className="mt-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
      <div className="text-lg font-black text-chalk">Inquiry Form</div>
      <p className="mt-1 text-xs font-semibold text-white/60">
        Portfolio-ready UX now ✅ — backend later.
      </p>

      <div className="mt-4 grid gap-3">
        <Field label="Name" error={errors.name}>
          <input
            value={values.name}
            onChange={onChange("name")}
            onBlur={onBlur("name")}
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold text-chalk outline-none focus:border-white/25 focus:ring-4 focus:ring-primary/20"
            placeholder="Your name"
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            value={values.email}
            onChange={onChange("email")}
            onBlur={onBlur("email")}
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold text-chalk outline-none focus:border-white/25 focus:ring-4 focus:ring-primary/20"
            placeholder="you@email.com"
            type="email"
          />
        </Field>

        <Field label="What are you thinking?" error={errors.message}>
          <textarea
            value={values.message}
            onChange={onChange("message")}
            onBlur={onBlur("message")}
            className="min-h-[120px] rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold text-chalk outline-none focus:border-white/25 focus:ring-4 focus:ring-primary/20"
            placeholder="Placement, size, reference, budget, dates…"
          />
        </Field>

        <button
          type="submit"
          disabled={!formValid || status === "submitting"}
          className={cx(
            "mt-2 inline-flex items-center justify-center gap-2 rounded-flash px-5 py-3 font-black transition active:translate-y-[1px]",
            !formValid || status === "submitting"
              ? "cursor-not-allowed bg-white/10 text-white/60 ring-1 ring-white/10 opacity-80"
              : "bg-primary text-chalk hover:bg-primary/90 shadow-soft"
          )}
        >
          {status === "submitting" ? "Sending..." : status === "success" ? "Sent ✔️" : "Send Inquiry"}
          <IconArrow />
        </button>
      </div>
    </form>
  );
}

export default function Layout({
  children,
  aboutOpen,
  setAboutOpen,
  contactOpen,
  setContactOpen,
  toast,
  setToast,
  year,
}) {
  const location = useLocation();

  // optional: close panels on route change
  useEffect(() => {
    setAboutOpen(false);
    setContactOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className="min-h-screen text-chalk font-body bg-night">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-night/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full ring-1 ring-white/15">
              <img src={avatarUrl} alt="Artist portrait" className="h-full w-full object-cover" />
            </div>

            <div>
              <Link to="/" className="block font-display text-2xl font-black text-glow hover:opacity-90">
                SUNSHINE
              </Link>
              <div className="text-xs font-semibold text-white/70">
                Traditional Tattoo • Your City (edit me)
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              to="/#portfolio"
              className="hidden rounded-flash bg-white/10 px-3 py-2 text-sm font-black ring-1 ring-white/10 hover:bg-white/15 sm:inline-flex"
              onClick={(e) => {
                // keep same-page anchor behavior when already home
                if (location.pathname !== "/") return;
                e.preventDefault();
                const el = document.getElementById("portfolio");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Portfolio
            </Link>

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
      <SlidePanel open={aboutOpen} onClose={() => setAboutOpen(false)} side="left" title="About the Artist">
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
      <SlidePanel open={contactOpen} onClose={() => setContactOpen(false)} side="right" title="Booking / Contact">
        <div className="space-y-4">
          <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
            <div className="text-lg font-black text-chalk">Quick actions</div>
            <p className="mt-1 text-xs font-semibold text-white/60">
              Not live yet — but ready to flip on anytime.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {CONTACT_LIVE ? (
                <Button as="a" href={CALENDLY_URL} variant="secondary">
                  Book a Consult
                </Button>
              ) : (
                <DisabledCTA title="Add your Calendly link when ready">
                  Book a Consult
                </DisabledCTA>
              )}

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-flash bg-white/10 px-5 py-3 font-black text-chalk ring-1 ring-white/10 hover:bg-white/15"
              >
                View Home <IconArrow />
              </Link>
            </div>
          </div>

          <ContactForm live={CONTACT_LIVE} onToast={(t) => setToast(t)} />
        </div>
      </SlidePanel>

      {/* PAGE */}
      {children}

      {/* FOOTER */}
      <footer className="mt-16 border-t border-white/10 bg-black/30">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <Link to="/" className="text-lg font-black hover:opacity-90">
                SUNSHINE
              </Link>
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
