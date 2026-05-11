import Link from 'next/link';

const footerLinks = {
  'Shop': ['New Arrivals', 'Collection', 'Essentials', 'Outerwear', 'Accessories'],
  'Journal': ['Editorial', 'Campaign', 'Philosophy', 'Notes from INVALID'],
  'Support': ['Sizing & Fit', 'Shipping', 'Returns', 'Sustainability'],
  'Company': ['About', 'Contact', 'Stockists', 'Press'],
};

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Top: brand + links */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 md:gap-8 pb-20 border-b border-white/8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <p
              className="text-white text-[22px] font-[300] tracking-[0.4em] uppercase mb-5"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              INVALID
            </p>
            <p className="text-white/30 text-[12px] font-[300] leading-relaxed max-w-[200px]">
              Elevated essentials for modern confidence. London.
            </p>
            <div className="flex items-center gap-5 mt-8">
              {['Instagram', 'Pinterest', 'Twitter'].map((s) => (
                <Link
                  key={s}
                  href="#"
                  className="text-white/25 text-[10px] tracking-[0.2em] uppercase hover:text-white/60 transition-colors duration-200"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-white/25 text-[9px] tracking-[0.3em] uppercase mb-5">{category}</p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-white/45 text-[12px] font-[300] hover:text-white/75 transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-white/20 text-[10px] font-[300] tracking-wide">
            &copy; 2026 INVALID. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {['Privacy Policy', 'Terms of Service', 'Cookie Preferences'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-white/20 text-[10px] font-[300] tracking-wide hover:text-white/45 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
