import React, { useEffect, useState, useCallback } from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
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

function Field({ label, error, children }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-white/85">
      <span className="font-black text-chalk">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </label>
  );
}

export default function BookingModal({ open, onClose, onToast }) {
  useLockBodyScroll(open);

  const [render, setRender] = useState(open);
  const [visible, setVisible] = useState(false);

  // ✅ useCallback so startClose is a stable reference for useEffect deps
  const startClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setRender(false);
      onClose();
    }, 300);
  }, [onClose]);

  // OPEN
  useEffect(() => {
    if (open) {
      setRender(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [open]);

  // CLOSE on open → false
  useEffect(() => {
    if (!open && render) startClose();
  }, [open, render, startClose]); // ✅ all deps declared

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") startClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, startClose]); // ✅ startClose now stable, safe to include

  // Form state
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
    await new Promise((r) => setTimeout(r, 650));
    setStatus("success");
    onToast?.({ type: "success", message: "Inquiry sent ✅" });
    setTimeout(() => {
      setStatus("idle");
      setValues({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      startClose();
    }, 900);
  };

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <button
        onClick={startClose}
        className={cx(
          "absolute inset-0 bg-black/70 transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0"
        )}
        aria-label="Close booking modal"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Booking / Contact"
        className={cx(
          "relative z-10 w-full rounded-t-3xl bg-[#0f0f14] ring-1 ring-white/10 shadow-soft",
          "max-h-[92dvh] overflow-y-auto",
          "transition-transform duration-300 ease-out will-change-transform",
          visible ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-black tracking-wide text-chalk">
            Booking / Contact
          </h2>
          <button
            onClick={startClose}
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-black text-chalk hover:bg-white/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pb-10 pt-5 space-y-5">
          <form onSubmit={onSubmit} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
            <div className="text-lg font-black text-chalk">Inquiry Form</div>
            <p className="mt-1 text-xs font-semibold text-white/60">
              Fill out the form and I'll get back to you shortly.
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
        </div>
      </div>
    </div>
  );
}
