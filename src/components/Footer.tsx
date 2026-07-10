import React from "react";

interface FooterProps {
  scrollToId: (id: string) => void;
}

export default function Footer({ scrollToId }: FooterProps) {
  return (
    <footer className="bg-aussie-blue py-16 px-6 md:px-16 text-white/60 border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-2 space-y-6">
            <div 
              className="flex items-baseline gap-1 cursor-pointer select-none"
              onClick={() => scrollToId("hero")}
            >
              <span className="font-sans text-[24px] text-white font-extrabold tracking-tight">ASHFORD</span>
              <span className="font-sans text-[24px] text-white font-light tracking-tight">MIGRATION</span>
            </div>
            <p className="font-serif text-sm md:text-base text-white/70 max-w-sm leading-relaxed">
              Strategic migration counsel for complex Australian legal environments. Structural honesty applied to every application. Delivering certainty through legal excellence.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-sans text-xs md:text-sm font-bold text-white uppercase tracking-widest">
              Practice Areas
            </h4>
            <ul className="space-y-3 font-sans text-xs">
              <li>
                <button onClick={() => scrollToId("pathways")} className="hover:text-flag-red transition-colors text-left cursor-pointer">
                  Administrative Appeals
                </button>
              </li>
              <li>
                <button onClick={() => scrollToId("pathways")} className="hover:text-flag-red transition-colors text-left cursor-pointer">
                  Corporate Compliance
                </button>
              </li>
              <li>
                <button onClick={() => scrollToId("pathways")} className="hover:text-flag-red transition-colors text-left cursor-pointer">
                  Character Submissions
                </button>
              </li>
              <li>
                <button onClick={() => scrollToId("pathways")} className="hover:text-flag-red transition-colors text-left cursor-pointer">
                  Health Waivers
                </button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-sans text-xs md:text-sm font-bold text-white uppercase tracking-widest">
              Legal Registry
            </h4>
            <ul className="space-y-3 font-sans text-xs">
              <li>Solicitor: E. Ashford (#440122)</li>
              <li>OMARA Registered Firm</li>
              <li>
                <a href="#" className="hover:text-flag-red transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-flag-red transition-colors">Terms of Engagement</a>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-[10px] uppercase tracking-widest text-center md:text-left">
          <span>© 2024 ASHFORD MIGRATION LAW PARTNERS. ALL RIGHTS RESERVED.</span>
          <span>Liability limited by a scheme approved under Professional Standards Legislation.</span>
        </div>
        
      </div>
    </footer>
  );
}
