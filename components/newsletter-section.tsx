'use client';

import { useEffect, useRef, useState } from 'react';

export default function NewsletterSection() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section ref={ref} className="py-32 md:py-44 bg-white border-t border-stone-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="text-stone-400 text-[10px] tracking-[0.35em] uppercase block mb-10">Inner Circle</span>
          </div>

          <div
            className={`transition-all duration-900 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <h2
              className="text-stone-900 mb-6"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(38px, 5vw, 72px)',
                fontWeight: 300,
                lineHeight: 1.05,
              }}
            >
              Dressed for what comes next.
            </h2>
          </div>

          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <p className="text-stone-400 text-[14px] font-[300] leading-[1.9] mb-12 max-w-md mx-auto">
              Early access to new collections. Private editorial features. Invitations to events for those who move differently.
            </p>
          </div>

          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '450ms' }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 max-w-sm mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 border border-stone-200 bg-transparent text-stone-800 text-[13px] font-[300] px-5 py-4 placeholder:text-stone-300 focus:outline-none focus:border-stone-500 transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="bg-stone-900 text-white text-[10px] tracking-[0.2em] uppercase font-[400] px-7 py-4 hover:bg-stone-700 transition-colors duration-300 whitespace-nowrap"
                >
                  Join
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-8 h-[1px] bg-stone-300 mx-auto mb-6" />
                <p
                  className="text-stone-800 text-[20px] font-[300] italic mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Welcome.
                </p>
                <p className="text-stone-400 text-[13px] font-[300]">You are now part of the INVALID inner circle.</p>
              </div>
            )}

            <p className="text-stone-300 text-[11px] font-[300] mt-4">No noise. Only what matters.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
