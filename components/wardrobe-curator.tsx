'use client';

import { useEffect, useRef, useState } from 'react';

type Mood = 'minimal' | 'editorial' | 'executive' | 'weekend' | 'travel';

const moods: { id: Mood; label: string; desc: string }[] = [
  { id: 'minimal', label: 'Minimal', desc: 'Clean lines, quiet confidence' },
  { id: 'editorial', label: 'Editorial', desc: 'Forward, considered, bold' },
  { id: 'executive', label: 'Executive', desc: 'Commanding, refined, precise' },
  { id: 'weekend', label: 'Weekend', desc: 'Ease with intention' },
  { id: 'travel', label: 'Travel', desc: 'Effortless, versatile, free' },
];

const wardrobes: Record<Mood, { pieces: string[]; note: string; image: string }> = {
  minimal: {
    pieces: ['Oversized Tee in Stone', 'Relaxed Trousers in Bone', 'Layering Jacket in Chalk'],
    note: 'A capsule of pure restraint. Three pieces that speak in the same quiet language.',
    image: 'https://images.pexels.com/photos/6311393/pexels-photo-6311393.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',
  },
  editorial: {
    pieces: ['Structured Shirt in Slate', 'Relaxed Trousers in Carbon', 'Signature Hoodie in Greige'],
    note: 'Volume and structure in dialogue. A wardrobe that photographs as well as it lives.',
    image: 'https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',
  },
  executive: {
    pieces: ['Structured Shirt in Chalk', 'Precision Trouser in Charcoal', 'Layering Jacket in Midnight'],
    note: 'Authority without announcement. Presence that requires no introduction.',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',
  },
  weekend: {
    pieces: ['Oversized Tee in Cloud', 'Relaxed Trousers in Stone', 'Signature Hoodie in Warm White'],
    note: 'Weekend ease elevated to an art form. Comfort that never compromises.',
    image: 'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',
  },
  travel: {
    pieces: ['Structured Shirt in Natural', 'Relaxed Trousers in Sand', 'Layering Jacket in Stone'],
    note: 'One carry-on, endless possibility. Designed to work harder than your itinerary.',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=900&q=85',
  },
};

export default function WardrobeCurator() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Mood>('minimal');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const wardrobe = wardrobes[selected];

  return (
    <section ref={ref} className="py-32 md:py-44 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-stone-400 text-[10px] tracking-[0.35em] uppercase block mb-5">Wardrobe Curator</span>
          </div>
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <h2
              className="text-stone-900 max-w-lg"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(36px, 4.5vw, 66px)',
                fontWeight: 300,
                lineHeight: 1.05,
              }}
            >
              Build your capsule around a mood.
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: mood selector */}
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex flex-col gap-1 mb-12">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelected(mood.id)}
                  className={`group flex items-center justify-between py-4 px-0 border-b transition-all duration-200 text-left ${
                    selected === mood.id
                      ? 'border-stone-900'
                      : 'border-stone-100 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-1 h-1 rounded-full transition-all duration-200 ${
                        selected === mood.id ? 'bg-stone-900 scale-150' : 'bg-stone-300'
                      }`}
                    />
                    <span
                      className={`transition-all duration-200 ${
                        selected === mood.id ? 'text-stone-900' : 'text-stone-500 group-hover:text-stone-700'
                      }`}
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: '22px',
                        fontWeight: selected === mood.id ? 400 : 300,
                      }}
                    >
                      {mood.label}
                    </span>
                  </div>
                  <span className="text-stone-400 text-[11px] font-[300] tracking-wide hidden md:block">
                    {mood.desc}
                  </span>
                </button>
              ))}
            </div>

            {/* Curated pieces */}
            <div className="bg-stone-50 p-8">
              <p className="text-stone-400 text-[10px] tracking-[0.25em] uppercase mb-6">Curated for you</p>
              <div className="flex flex-col gap-3 mb-6">
                {wardrobe.pieces.map((piece, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-stone-300 text-[11px] font-mono">0{i + 1}</span>
                    <span
                      className="text-stone-800"
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: '16px',
                        fontWeight: 300,
                      }}
                    >
                      {piece}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-stone-500 text-[12px] font-[300] leading-relaxed italic mb-6">
                &ldquo;{wardrobe.note}&rdquo;
              </p>
              <button className="text-[10px] tracking-[0.2em] uppercase font-[400] text-stone-900 border-b border-stone-900 pb-0.5 hover:text-stone-500 hover:border-stone-500 transition-all duration-200">
                Shop This Capsule
              </button>
            </div>
          </div>

          {/* Right: image */}
          <div
            className={`transition-all duration-900 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'}`}
            style={{ transitionDelay: '350ms' }}
          >
            <div className="relative overflow-hidden aspect-[3/4] bg-stone-100">
              <img
                key={selected}
                src={wardrobe.image}
                alt={selected}
                className="w-full h-full object-cover object-center animate-scale-in"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent p-8">
                <p
                  className="text-white/90 text-[20px] font-[300] italic"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  {moods.find((m) => m.id === selected)?.label} Capsule
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
