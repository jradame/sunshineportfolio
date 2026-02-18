import React, { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { CATEGORIES, makePlaceholders } from "../data/portfolio.js";
import Lightbox from "../components/Lightbox.jsx";

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

function GalleryTile({ src, title, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10 shadow-soft hover:bg-white/[0.08] transition text-left"
    >
      <div className="relative h-[170px] w-full">
        <img src={src} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-90" />
      </div>

      <div className="p-4">
        <div className="text-xs font-black text-white/60">Tap to view</div>
        <div className="mt-1 text-sm font-black text-chalk">{title}</div>
        <div className="text-xs font-semibold text-white/60">{subtitle}</div>
      </div>

      {/* glow pop */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -inset-12 bg-[radial-gradient(circle_at_30%_20%,rgba(201,162,39,0.22),transparent_45%)]" />
      </div>
    </button>
  );
}

export default function Category() {
  const { category } = useParams();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const cat = useMemo(
    () => CATEGORIES.find((c) => c.slug === category),
    [category]
  );

  if (!cat) return <Navigate to="/" replace />;

  const items = useMemo(() => makePlaceholders(cat.slug), [cat.slug]);

  const openAt = (i) => {
    setActiveIndex(i);
    setLightboxOpen(true);
  };

  const prev = () => setActiveIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setActiveIndex((i) => (i + 1) % items.length);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Lightbox
        open={lightboxOpen}
        items={items}
        index={activeIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={prev}
        onNext={next}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-black text-white/60">Portfolio Category</div>
          <h1 className="font-display text-4xl font-black text-glow">
            {cat.title}
          </h1>
          <p className="mt-2 text-sm font-semibold text-white/70">
            Real-looking placeholders + click-to-view lightbox (Arrow keys work).
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-flash bg-white/10 px-5 py-3 font-black text-chalk ring-1 ring-white/10 hover:bg-white/15 active:translate-y-[1px]"
          >
            Back Home <IconArrow />
          </Link>

          <a
            href="#grid"
            className="inline-flex items-center justify-center gap-2 rounded-flash bg-primary px-5 py-3 font-black text-chalk hover:bg-primary/90 active:translate-y-[1px]"
          >
            View Grid <IconArrow />
          </a>
        </div>
      </div>

      {/* cover */}
      <section className="mt-8 overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10 shadow-soft">
        <div className="relative h-[240px] sm:h-[300px]">
          <img
            src={cat.cover}
            alt={cat.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          <div className="absolute bottom-5 left-5">
            <div className="text-xs font-black text-white/70">Category</div>
            <div className="text-2xl font-black text-chalk">{cat.title}</div>
          </div>
        </div>
      </section>

      {/* 4x3 grid */}
      <section id="grid" className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-black text-glow">
            Gallery Grid
          </h2>
          <div className="text-xs font-semibold text-white/55">4 × 3</div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t, idx) => (
            <GalleryTile
              key={t.id}
              src={t.src}
              title={t.title}
              subtitle={t.subtitle}
              onClick={() => openAt(idx)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
