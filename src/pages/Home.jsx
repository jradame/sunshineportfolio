import React from "react";
import { Link } from "react-router-dom";
import heroTattooingUrl from "../images/hero.png";
import { CATEGORIES } from "../data/portfolio.js";

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

function Card({ title, desc, cover, to }) {
  return (
    <Link
      to={to}
      className="group block overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10 shadow-soft hover:bg-white/[0.08] transition"
    >
      <div className="relative h-52 w-full">
        <img src={cover} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-chalk">{title}</h3>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black ring-1 ring-white/10 text-chalk">
            View <IconArrow />
          </span>
        </div>
        <p className="mt-2 text-sm font-semibold text-white/70">{desc}</p>
      </div>
    </Link>
  );
}

export default function Home({ setContactOpen }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO (Option A: full image spanning) */}
      <section className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/[0.04] shadow-soft">
        <img
          src={heroTattooingUrl}
          alt="Tattooing in progress"
          className="h-[72vh] min-h-[520px] w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:pb-14">
            <div className="max-w-xl">
              <h1 className="font-display text-5xl font-black leading-[0.95] text-accent text-glow sm:text-6xl">
  TATTOOS THAT LAST
</h1>


              <p className="mt-4 text-sm font-semibold text-amber-100/75 sm:text-base">
  Traditional flash + custom classics. Bold lines, solid color, clean heals.
</p>


              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setContactOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-flash bg-primary px-5 py-3 font-black text-chalk hover:bg-primary/90 active:translate-y-[1px]"
                >
                  Book / Inquire <IconArrow />
                </button>

                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-flash bg-white/10 px-5 py-3 font-black text-chalk ring-1 ring-white/10 hover:bg-white/15 active:translate-y-[1px]"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("portfolio");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  View Portfolio <IconArrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="mt-14">
        <h2 className="font-display text-3xl font-black text-accent text-glow">Portfolio</h2>

        <p className="mt-2 text-sm font-semibold text-white/70">
          Tap a category to open its full gallery.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Card
              key={c.slug}
              title={c.title}
              desc={c.desc}
              cover={c.cover}
              to={`/portfolio/${c.slug}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
