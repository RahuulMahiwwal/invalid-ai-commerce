'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#f8f7f5]/95 backdrop-blur-md border-b border-stone-200/60'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left nav */}
            <div className="hidden md:flex items-center gap-10">
              {['Collection', 'Editorial', 'About'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-[11px] font-[400] tracking-[0.18em] uppercase transition-all duration-300 hover:opacity-60 ${
                    scrolled ? 'text-stone-800' : 'text-white'
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Brand */}
            <Link href="/" className="flex items-center">
              <img
                src="/logo.jpg"
                alt="INVALID"
                className="h-10 md:h-12 w-auto"
              />              
            </Link>

            {/* Right nav */}
            <div className="hidden md:flex items-center gap-10">
              {['Concierge', 'Journal', 'Cart'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-[11px] font-[400] tracking-[0.18em] uppercase transition-all duration-300 hover:opacity-60 ${
                    scrolled ? 'text-stone-800' : 'text-white'
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden flex flex-col gap-[5px] p-2 transition-colors duration-300 ${
                scrolled ? 'text-stone-800' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-[1px] bg-current transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-[6px]' : ''
                }`}
              />
              <span
                className={`block w-5 h-[1px] bg-current transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-5 h-[1px] bg-current transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#1a1a1a] flex flex-col items-center justify-center transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-10">
          {['Collection', 'Editorial', 'Concierge', 'Journal', 'About', 'Cart'].map((item, i) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-white/90 text-[28px] font-[300] tracking-[0.2em] uppercase hover:text-white/60 transition-colors duration-200"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', animationDelay: `${i * 60}ms` }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
