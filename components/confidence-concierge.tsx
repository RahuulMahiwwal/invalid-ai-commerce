'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'concierge';
  content: string;
}

const suggestions = [
  'Dress me for a leadership dinner',
  'Build a monochrome airport look',
  'Minimal summer wardrobe for a creative',
  'Confident casual for client meetings',
  'Understated weekend dressing',
];

const responses: Record<string, string> = {
  default: `A refined selection has been curated for you. I'd suggest beginning with our Structured Shirt in Chalk — a piece that commands the room without effort. Pair it with the Relaxed Trousers in Slate, and finish with the Layering Jacket in Bone. This ensemble speaks with quiet authority.`,
  dinner: `For a leadership dinner, presence begins with restraint. Consider our Signature Shirt — clean lines, luxurious weight — paired with the Precision Trouser in Charcoal. The Layering Jacket in Midnight adds considered depth. Understated confidence, fully realized.`,
  airport: `The monochrome airport look is an art form. Begin with the Oversized Tee in Stone, layer our Relaxed Trousers in off-white, and anchor the look with the Signature Hoodie in Chalk. Minimal, cohesive, unmistakably considered.`,
  summer: `Your minimal summer wardrobe: three essentials that do the work of twelve. The Linen Shirt in Cloud, the Relaxed Trouser in Natural, and our Lightweight Tee in Bone. Everything coordinates, nothing competes. Pure, seasonal ease.`,
  casual: `Client meetings deserve quiet polish. Our Structured Shirt in Ivory, the Relaxed Trouser in Stone, and clean minimal footwear. The kind of look that says everything without announcing it.`,
  weekend: `Weekend dressing refined: the Oversized Tee in Warm White layered beneath the Signature Hoodie in Greige. Paired with our Relaxed Trouser in Stone. Ease, with intention.`,
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('dinner') || lower.includes('leadership')) return responses.dinner;
  if (lower.includes('airport') || lower.includes('monochrome')) return responses.airport;
  if (lower.includes('summer') || lower.includes('wardrobe')) return responses.summer;
  if (lower.includes('casual') || lower.includes('client') || lower.includes('meeting')) return responses.casual;
  if (lower.includes('weekend') || lower.includes('casual')) return responses.weekend;
  return responses.default;
}

export default function ConfidenceConcierge() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'concierge',
      content: 'Welcome. I am here to guide you toward the wardrobe that speaks for you. Tell me the occasion, the feeling, or simply the version of yourself you wish to present today.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [visible, setVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const userInput = text || input.trim();
    if (!userInput) return;

    setMessages((prev) => [...prev, { role: 'user', content: userInput }]);
    setInput('');
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1400));

    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      { role: 'concierge', content: getResponse(userInput) },
    ]);
  };

  return (
    <section ref={sectionRef} id="concierge" className="py-32 md:py-44 bg-[#1a1a1a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: intro */}
          <div>
            <div
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <span className="text-white/30 text-[10px] tracking-[0.35em] uppercase block mb-12">Styling Service</span>
              <h2
                className="text-white leading-[1.05] mb-8"
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(38px, 4.5vw, 68px)',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                }}
              >
                Your Confidence Concierge
              </h2>
              <p className="text-white/45 text-[14px] font-[300] leading-[1.9] mb-12 max-w-sm">
                A private styling experience. Share your occasion, mood, or aesthetic intention — and receive a curated recommendation from our collection, considered just for you.
              </p>
            </div>

            {/* Suggestion prompts */}
            <div
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-5">Try asking</p>
              <div className="flex flex-col gap-3">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s)}
                    className="group text-left text-white/50 text-[12px] font-[300] tracking-wide hover:text-white/80 transition-all duration-200 flex items-center gap-3"
                  >
                    <span className="w-4 h-[1px] bg-white/20 group-hover:bg-white/50 group-hover:w-6 transition-all duration-300 shrink-0" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: chat interface */}
          <div
            className={`transition-all duration-900 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="border border-white/10 bg-white/[0.03] backdrop-blur-sm">
              {/* Messages */}
              <div className="h-72 overflow-y-auto p-6 flex flex-col gap-5 scrollbar-hide">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'concierge' && (
                      <div className="flex gap-3 max-w-[85%]">
                        <div className="w-5 h-5 shrink-0 mt-0.5 border border-white/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white/40" />
                        </div>
                        <p className="text-white/70 text-[13px] font-[300] leading-[1.8]">{msg.content}</p>
                      </div>
                    )}
                    {msg.role === 'user' && (
                      <div className="bg-white/8 border border-white/10 px-4 py-3 max-w-[80%]">
                        <p className="text-white/90 text-[13px] font-[300] leading-relaxed">{msg.content}</p>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-5 h-5 shrink-0 mt-0.5 border border-white/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white/40" />
                    </div>
                    <div className="flex items-center gap-1.5 py-2">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1 h-1 bg-white/30 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 200}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-white/10 p-4 flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Describe your occasion or aesthetic..."
                  className="flex-1 bg-transparent text-white/80 text-[13px] font-[300] placeholder:text-white/25 outline-none tracking-wide"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim()}
                  className="shrink-0 w-8 h-8 border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all duration-200 disabled:opacity-30"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white/70">
                    <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"/>
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-white/20 text-[10px] tracking-[0.15em] mt-4 pl-1">
              Personalized recommendations from the INVALID collection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
