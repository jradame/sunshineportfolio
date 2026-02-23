import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BookingModal from "./BookingModal.jsx";

const avatarUrl =
  "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=200&q=80";

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
         <Link to="/" className="block font-display text-2xl font-black text-accent text-glow hover:opacity-90">
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

      {/* BOOKING MODAL */}
      <BookingModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        onToast={(t) => setToast(t)}
      />

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
