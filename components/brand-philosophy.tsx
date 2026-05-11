'use client';

import { useEffect, useRef, useState } from 'react';

const statements = [
  { text: 'Style should never shout.', sub: 'The most powerful statements are made in silence.' },
  { text: 'Confidence should never ask permission.', sub: 'Wear what you are, not what is expected.' },
  { text: 'Quality is the only detail that matters.', sub: 'Every stitch, considered. Every fabric, chosen with intent.' },
];

export default function BrandPhilosophy() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-32 md:py-44 bg-[#f8f7f5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section label */}
        <div
          className={`mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="text-stone-400 text-[10px] tracking-[0.35em] uppercase">Philosophy</span>
        </div>

        {/* Main manifesto */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-start mb-28">
          <div
            className={`transition-all duration-900 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <h2
              className="text-stone-900 leading-[1.05] mb-8"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(42px, 5.5vw, 80px)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
              }}
            >
              Designed for those who know who they are.
            </h2>
          </div>

          <div
            className={`transition-all duration-900 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <p className="text-stone-500 text-[15px] font-[300] leading-[1.9] mb-8 max-w-md">
              INVALID was born from a belief: that true confidence needs no embellishment. We create elevated essentials for modern individuals who understand that the most sophisticated expression is the one that feels entirely, effortlessly you.
            </p>
            <p className="text-stone-400 text-[13px] font-[300] leading-[1.9] max-w-md">
              Each piece is conceived at the intersection of precision tailoring and contemporary sensibility — built to move with you through the architecture of modern life.
            </p>
          </div>
        </div>

        {/* Three statements */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 pt-16 border-t border-stone-200/60">
          {statements.map((s, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${400 + i * 150}ms` }}
            >
              <div className="w-6 h-[1px] bg-stone-300 mb-8" />
              <p
                className="text-stone-900 mb-4 leading-snug"
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '22px',
                  fontWeight: 300,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{s.text}&rdquo;
              </p>
              <p className="text-stone-400 text-[12px] font-[300] leading-relaxed">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
