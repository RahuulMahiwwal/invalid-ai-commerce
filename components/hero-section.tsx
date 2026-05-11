'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden bg-[#1a1a1a]">
      {/* Background image via Pexels */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="INVALID Campaign"
          className="w-full h-full object-cover object-center opacity-70"
          style={{ transition: 'opacity 1.2s ease' }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pb-20 md:pb-28">
        <div className="max-w-2xl">
          {/* Pre-title */}
          <div
            className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="text-white/50 text-[10px] tracking-[0.35em] uppercase font-[400] block mb-8">
              New Season — 2026
            </span>
          </div>

          {/* Brand wordmark */}
          <div
            className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <h1
              className="text-white leading-none mb-6"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(72px, 10vw, 140px)',
                fontWeight: 300,
                letterSpacing: '0.08em',
              }}
            >
              INVALID
            </h1>
          </div>

          {/* Tagline */}
          <div
            className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <p
              className="text-white/90 mb-3"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(22px, 3vw, 36px)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '0.02em',
              }}
            >
              Breathe Confidence.
            </p>
          </div>

          {/* Subtext */}
          <div
            className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '750ms' }}
          >
            <p className="text-white/55 text-[13px] font-[300] tracking-[0.08em] mb-12 max-w-sm">
              Elevated essentials for modern confidence.
            </p>
          </div>

          {/* CTAs */}
          <div
            className={`flex items-center gap-5 flex-wrap transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '900ms' }}
          >
            <a
              href="#collection"
              className="group relative inline-flex items-center gap-3 bg-white text-stone-900 px-8 py-3.5 text-[11px] font-[400] tracking-[0.2em] uppercase hover:bg-stone-100 transition-all duration-300"
            >
              Discover Your Wardrobe
              <span className="block w-4 h-[1px] bg-stone-900 group-hover:w-6 transition-all duration-300" />
            </a>
            <a
              href="#editorial"
              className="group inline-flex items-center gap-3 text-white/80 text-[11px] font-[400] tracking-[0.2em] uppercase hover:text-white transition-colors duration-300 border-b border-white/30 hover:border-white/70 pb-0.5"
            >
              Explore Collection
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 z-10">
        <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase rotate-90 origin-center mb-3 block">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
