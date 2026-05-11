'use client';

import { useEffect, useRef, useState } from 'react';

const products = [
  {
    name: 'Oversized Tee',
    subtitle: 'Essential Relaxed Fit',
    price: '£85',
    tag: 'Bestseller',
    color: 'Stone / Chalk / Carbon',
    img: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
  {
    name: 'Structured Shirt',
    subtitle: 'Precision Tailored',
    price: '£165',
    tag: 'New',
    color: 'Chalk / Slate / Midnight',
    img: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
  {
    name: 'Relaxed Trousers',
    subtitle: 'Fluid Drape Silhouette',
    price: '£195',
    tag: null,
    color: 'Stone / Charcoal / Bone',
    img: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
  {
    name: 'Signature Hoodie',
    subtitle: 'Heavyweight French Terry',
    price: '£175',
    tag: 'New',
    color: 'Greige / Cloud / Carbon',
    img: 'https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
  {
    name: 'Layering Jacket',
    subtitle: 'Unstructured Drape',
    price: '£345',
    tag: 'Limited',
    color: 'Bone / Slate / Black',
    img: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  },
];

export default function FeaturedCollection() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
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
    <section ref={ref} id="collection" className="py-32 md:py-44 bg-[#f8f7f5]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <div
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span className="text-stone-400 text-[10px] tracking-[0.35em] uppercase block mb-5">Collection</span>
            </div>
            <div
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <h2
                className="text-stone-900 leading-none"
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(36px, 4.5vw, 66px)',
                  fontWeight: 300,
                }}
              >
                The Essentials
              </h2>
            </div>
          </div>
          <div
            className={`hidden md:block transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <a
              href="#"
              className="text-stone-500 text-[11px] tracking-[0.2em] uppercase hover:text-stone-900 transition-colors duration-200 flex items-center gap-3"
            >
              View All
              <span className="w-8 h-[1px] bg-stone-400" />
            </a>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product, i) => (
            <div
              key={i}
              className={`group cursor-pointer transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-stone-100 mb-4 aspect-[3/4]">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Tag */}
                {product.tag && (
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] tracking-[0.2em] uppercase font-[400] bg-white/90 text-stone-700 px-2 py-1">
                      {product.tag}
                    </span>
                  </div>
                )}
                {/* Quick add overlay */}
                <div
                  className={`absolute inset-x-0 bottom-0 bg-white/95 px-4 py-3 transition-all duration-300 ${
                    hovered === i ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
                >
                  <button className="w-full text-[10px] tracking-[0.2em] uppercase font-[400] text-stone-900 hover:text-stone-600 transition-colors duration-200 text-center">
                    Add to Wardrobe
                  </button>
                </div>
              </div>

              {/* Info */}
              <div>
                <p
                  className="text-stone-900 mb-0.5 group-hover:text-stone-600 transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                  }}
                >
                  {product.name}
                </p>
                <p className="text-stone-400 text-[11px] font-[300] tracking-wide mb-2">{product.subtitle}</p>
                <div className="flex items-center justify-between">
                  <span className="text-stone-700 text-[13px] font-[300] tracking-wide">{product.price}</span>
                  <span className="text-stone-300 text-[10px] font-[300]">{product.color.split(' / ')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="mt-12 md:hidden text-center">
          <a
            href="#"
            className="text-stone-500 text-[11px] tracking-[0.2em] uppercase border-b border-stone-300 pb-0.5 hover:text-stone-900 hover:border-stone-600 transition-all duration-200"
          >
            View All Pieces
          </a>
        </div>
      </div>
    </section>
  );
}
