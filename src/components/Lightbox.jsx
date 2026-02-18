import React, { useEffect } from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function IconChevron({ dir = "right" }) {
  const rotate = dir === "left" ? "rotate-180" : "";
  return (
    <svg
      viewBox="0 0 24 24"
      className={cx("h-6 w-6", rotate)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Lightbox({
  open,
  items,
  index,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };

    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  const item = items[index];

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        aria-label="Close lightbox"
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10 shadow-soft">
          {/* top bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-black text-chalk">
                {item?.title}
              </div>
              <div className="truncate text-xs font-semibold text-white/60">
                {item?.subtitle} • {index + 1}/{items.length}
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-chalk ring-1 ring-white/10 hover:bg-white/15"
            >
              Close
            </button>
          </div>

          {/* image */}
          <div className="relative">
            <img
              src={item?.src}
              alt={item?.title}
              className="block h-[70vh] min-h-[420px] w-full object-contain bg-black/30"
            />

            {/* nav buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev?.();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-chalk ring-1 ring-white/10 hover:bg-black/55"
              aria-label="Previous"
            >
              <IconChevron dir="left" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-chalk ring-1 ring-white/10 hover:bg-black/55"
              aria-label="Next"
            >
              <IconChevron dir="right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
