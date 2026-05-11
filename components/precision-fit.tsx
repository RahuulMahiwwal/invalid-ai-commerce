'use client';

import { useEffect, useRef, useState } from 'react';

type Step = 'height' | 'build' | 'preference' | 'result';

const builds = ['Lean', 'Athletic', 'Regular', 'Broader'];
const preferences = ['Fitted', 'Relaxed', 'Oversized'];

const getSizeRecommendation = (height: string, build: string, pref: string) => {
  const h = parseInt(height);
  if (isNaN(h)) return { size: 'M', note: 'Our standard medium offers excellent versatility.' };

  let base = 'M';
  if (h < 168) base = 'XS/S';
  else if (h < 175) base = 'S';
  else if (h < 182) base = 'M';
  else if (h < 190) base = 'L';
  else base = 'XL';

  const buildMod = build === 'Broader' ? '+1' : build === 'Lean' ? '-1' : '';
  const prefNote = pref === 'Oversized' ? 'We suggest sizing up for your preferred silhouette.' :
    pref === 'Fitted' ? 'Our recommendation suits your preferred close fit.' :
    'A relaxed, considered fit for your proportions.';

  return {
    size: base,
    note: prefNote,
    buildNote: buildMod ? `Based on your build, consider one size ${buildMod === '+1' ? 'up' : 'down'}.` : null,
  };
};

export default function PrecisionFit() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>('height');
  const [height, setHeight] = useState('');
  const [build, setBuild] = useState('');
  const [preference, setPreference] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const result = step === 'result' ? getSizeRecommendation(height, build, preference) : null;

  const reset = () => {
    setStep('height');
    setHeight('');
    setBuild('');
    setPreference('');
  };

  return (
    <section ref={ref} className="py-32 md:py-44 bg-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Left */}
          <div
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="text-white/30 text-[10px] tracking-[0.35em] uppercase block mb-12">Sizing</span>
            <h2
              className="text-white leading-[1.05] mb-8"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(38px, 4.5vw, 68px)',
                fontWeight: 300,
              }}
            >
              Precision Fit.
              <br />
              <span className="italic text-white/60">Tailored to you.</span>
            </h2>
            <p className="text-white/45 text-[14px] font-[300] leading-[1.9] max-w-sm mb-12">
              No guesswork. Answer three questions, and we&apos;ll recommend the exact cut and size for your body and aesthetic preference.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Considered proportions', desc: 'Each piece engineered for its silhouette.' },
                { label: 'Material-specific sizing', desc: 'Different fabrics, different fits — we account for both.' },
                { label: 'Returns, always complimentary', desc: 'Confidence in your choice, guaranteed.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-1 h-1 bg-white/30 mt-2 shrink-0" />
                  <div>
                    <p className="text-white/70 text-[13px] font-[300] mb-0.5">{item.label}</p>
                    <p className="text-white/30 text-[12px] font-[300]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stepper */}
          <div
            className={`transition-all duration-900 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '250ms' }}
          >
            <div className="border border-white/10 p-8 md:p-10 bg-white/[0.03]">
              {/* Progress */}
              <div className="flex items-center gap-2 mb-10">
                {(['height', 'build', 'preference', 'result'] as Step[]).map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        step === s ? 'bg-white scale-150' :
                        (['height', 'build', 'preference', 'result'] as Step[]).indexOf(step) > i
                          ? 'bg-white/40' : 'bg-white/15'
                      }`}
                    />
                    {i < 3 && <div className="w-8 h-[1px] bg-white/10" />}
                  </div>
                ))}
              </div>

              {/* Steps */}
              {step === 'height' && (
                <div className="animate-fade-up">
                  <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-6">Step 01 / 03</p>
                  <p
                    className="text-white text-[24px] font-[300] mb-2"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    What is your height?
                  </p>
                  <p className="text-white/35 text-[12px] font-[300] mb-8">In centimetres, please.</p>
                  <div className="flex items-end gap-4 mb-8">
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="175"
                      min="150"
                      max="210"
                      className="w-24 bg-transparent border-b border-white/20 text-white text-[28px] font-[300] pb-2 focus:outline-none focus:border-white/50 placeholder:text-white/20 transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    />
                    <span className="text-white/30 text-[14px] font-[300] mb-2">cm</span>
                  </div>
                  <button
                    onClick={() => height && setStep('build')}
                    disabled={!height}
                    className="text-[10px] tracking-[0.2em] uppercase font-[400] text-white border border-white/20 px-6 py-3 hover:bg-white/5 hover:border-white/40 transition-all duration-200 disabled:opacity-30"
                  >
                    Continue
                  </button>
                </div>
              )}

              {step === 'build' && (
                <div className="animate-fade-up">
                  <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-6">Step 02 / 03</p>
                  <p
                    className="text-white text-[24px] font-[300] mb-8"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    How would you describe your build?
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {builds.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBuild(b)}
                        className={`py-3.5 px-4 text-[12px] font-[300] tracking-wide border transition-all duration-200 ${
                          build === b
                            ? 'border-white/60 text-white bg-white/8'
                            : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white/70'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('height')}
                      className="text-[10px] tracking-[0.2em] uppercase font-[400] text-white/40 hover:text-white/70 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => build && setStep('preference')}
                      disabled={!build}
                      className="text-[10px] tracking-[0.2em] uppercase font-[400] text-white border border-white/20 px-6 py-3 hover:bg-white/5 hover:border-white/40 transition-all duration-200 disabled:opacity-30"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 'preference' && (
                <div className="animate-fade-up">
                  <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-6">Step 03 / 03</p>
                  <p
                    className="text-white text-[24px] font-[300] mb-8"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    How do you prefer your clothes to fit?
                  </p>
                  <div className="flex flex-col gap-3 mb-8">
                    {preferences.map((p) => (
                      <button
                        key={p}
                        onClick={() => setPreference(p)}
                        className={`py-3.5 px-4 text-[13px] font-[300] border transition-all duration-200 text-left flex items-center gap-3 ${
                          preference === p
                            ? 'border-white/60 text-white bg-white/8'
                            : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white/70'
                        }`}
                      >
                        <span className={`w-1 h-1 rounded-full transition-all duration-200 ${preference === p ? 'bg-white' : 'bg-white/20'}`} />
                        {p}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('build')}
                      className="text-[10px] tracking-[0.2em] uppercase font-[400] text-white/40 hover:text-white/70 transition-colors duration-200"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => preference && setStep('result')}
                      disabled={!preference}
                      className="text-[10px] tracking-[0.2em] uppercase font-[400] text-white border border-white/20 px-6 py-3 hover:bg-white/5 hover:border-white/40 transition-all duration-200 disabled:opacity-30"
                    >
                      Get My Fit
                    </button>
                  </div>
                </div>
              )}

              {step === 'result' && result && (
                <div className="animate-fade-up">
                  <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-6">Your Recommendation</p>
                  <div className="mb-8">
                    <p className="text-white/30 text-[12px] font-[300] mb-2">Recommended size</p>
                    <p
                      className="text-white leading-none mb-4"
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: '64px',
                        fontWeight: 300,
                      }}
                    >
                      {result.size}
                    </p>
                    <p className="text-white/55 text-[13px] font-[300] leading-relaxed mb-2">{result.note}</p>
                    {result.buildNote && (
                      <p className="text-white/35 text-[12px] font-[300] leading-relaxed">{result.buildNote}</p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={reset}
                      className="text-[10px] tracking-[0.2em] uppercase font-[400] text-white/40 hover:text-white/70 transition-colors duration-200"
                    >
                      Start Over
                    </button>
                    <button className="text-[10px] tracking-[0.2em] uppercase font-[400] text-white border border-white/20 px-6 py-3 hover:bg-white/5 hover:border-white/40 transition-all duration-200">
                      Shop Size {result.size}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
