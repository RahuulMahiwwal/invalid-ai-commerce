'use client';

import { useEffect, useRef, useState } from 'react';

const editorials = [
  {
    title: 'The Quiet Authority',
    subtitle: 'SS26 Campaign',
    desc: 'Confidence is a posture, not a declaration. This season, we ask: what does it feel like to be fully, quietly, present?',
    img: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200&q=90',
    position: 'lg:col-span-2 lg:row-span-2',
    aspect: 'aspect-[4/5]',
  },
  {
    title: 'Architecture of Ease',
    subtitle: 'Feature',
    desc: 'The Relaxed Trouser, considered from every angle.',
    img: 'https://images.pexels.com/photos/6311393/pexels-photo-6311393.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
    position: '',
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'Monochrome Studies',
    subtitle: 'Editorial',
    desc: 'One colour. Infinite expression.',
    img: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
    position: '',
    aspect: 'aspect-[3/4]',
  },
];

const secondRow = [
  {
    title: 'The Essential Jacket',
    subtitle: 'Product Story',
    desc: 'Unstructured, uncompromising. The Layering Jacket reimagined.',
    img: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
  {
    title: 'Breath of Summer',
    subtitle: 'Season Preview',
    desc: 'The warmest months, dressed with the coolest intention.',
    img: 'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
  {
    title: 'Capsule No. 1',
    subtitle: 'The INVALID Edit',
    desc: 'Five pieces. One wardrobe. Infinite possibility.',
    img: 'https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
];

export default function EditorialLookbook() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="editorial" className="py-32 md:py-44 bg-[#f8f7f5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-stone-400 text-[10px] tracking-[0.35em] uppercase block mb-5">Lookbook</span>
            </div>
            <div
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <h2
                className="text-stone-900"
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(36px, 4.5vw, 66px)',
                  fontWeight: 300,
                  lineHeight: 1.05,
                }}
              >
                Editorial
              </h2>
            </div>
          </div>
          <div
            className={`hidden md:block transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <a href="#" className="text-stone-400 text-[11px] tracking-[0.2em] uppercase hover:text-stone-800 transition-colors duration-200 flex items-center gap-3">
              View Journal
              <span className="w-8 h-[1px] bg-stone-300" />
            </a>
          </div>
        </div>

        {/* Main editorial grid */}
        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
          {/* Hero editorial */}
          <div
            className={`lg:col-span-2 group cursor-pointer overflow-hidden bg-stone-100 relative transition-all duration-900 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="aspect-[16/10] lg:aspect-auto lg:h-[600px] overflow-hidden relative">
              <img
                src={editorials[0].img}
                alt={editorials[0].title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase block mb-3">{editorials[0].subtitle}</span>
                <h3
                  className="text-white mb-3"
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(24px, 3vw, 40px)',
                    fontWeight: 300,
                  }}
                >
                  {editorials[0].title}
                </h3>
                <p className="text-white/60 text-[13px] font-[300] max-w-sm leading-relaxed hidden md:block">
                  {editorials[0].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Two smaller editorials */}
          <div className="flex flex-col gap-4 md:gap-6">
            {[editorials[1], editorials[2]].map((item, i) => (
              <div
                key={i}
                className={`group cursor-pointer overflow-hidden bg-stone-100 relative flex-1 transition-all duration-700 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <div className="overflow-hidden relative" style={{ height: '284px' }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <span className="text-white/45 text-[9px] tracking-[0.3em] uppercase block mb-2">{item.subtitle}</span>
                    <h3
                      className="text-white"
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: '20px',
                        fontWeight: 300,
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second row */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {secondRow.map((item, i) => (
            <div
              key={i}
              className={`group cursor-pointer overflow-hidden bg-stone-100 relative transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${500 + i * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-white/45 text-[9px] tracking-[0.3em] uppercase block mb-2">{item.subtitle}</span>
                  <h3
                    className="text-white mb-1.5"
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: '18px',
                      fontWeight: 300,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-[11px] font-[300] hidden md:block">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
