import React from "react";
import { ArrowRight, Play, CheckCircle } from "lucide-react";

interface HeroProps {
  onOpenPortal: () => void;
  scrollToId: (id: string) => void;
}

export default function Hero({ onOpenPortal, scrollToId }: HeroProps) {
  return (
    <header id="hero" className="pt-[110px] pb-16 min-h-screen relative overflow-hidden flex items-center border-b border-outline-variant bg-gradient-to-br from-[#f2f7fc] to-white">
      {/* Australian Watermark background layer */}
      <div className="aus-watermark absolute inset-0 opacity-[0.06] pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-6 md:px-16 relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left fade-in">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-flag-red animate-pulse"></span>
              <span className="font-sans text-xs md:text-sm font-bold tracking-widest text-flag-red uppercase">
                Commonwealth Strategic Counsel
              </span>
            </div>
            
            <h1 className="font-sans text-aussie-blue text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Migration handled with <br/>
              <span className="relative inline-block text-flag-red italic font-black tracking-tight mt-1">
                exactness.
                <svg className="absolute -bottom-3 left-0 w-full h-3 text-flag-red" preserveAspectRatio="none" viewBox="0 0 100 10">
                  <path d="M3 8 Q 30 2 50 5 T 97 7" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                </svg>
              </span>
            </h1>
            
            <p className="font-serif text-lg md:text-xl text-aussie-blue/80 max-w-xl leading-relaxed">
              A clinical approach to Australian immigration law. We replace uncertainty with architectural precision, managing complex caseloads through rigorous technical strategy.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={onOpenPortal}
                className="bg-aussie-blue text-white px-8 py-4 rounded-lg font-sans font-semibold text-sm hover:bg-flag-red hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                Begin Strategic Audit <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => scrollToId("lawyers")}
                className="border border-aussie-blue text-aussie-blue px-8 py-4 rounded-lg font-sans font-semibold text-sm hover:bg-aussie-blue hover:text-white transition-all duration-300 cursor-pointer"
              >
                Our Practice
              </button>
            </div>
          </div>
          
          {/* Right Column: Key Image and Processing Metrics */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant w-full max-w-[420px] aspect-[4/5]">
              {/* Australian Family Image */}
              <img 
                alt="Australian visa candidates and corporate partners smiling and hopeful" 
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover select-none" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClXXbKaWsTifvVNXaB1rPdLwbptftWZpqRaTTODWtwFXC6S2ubWRVJ4TQWXVkMc-sMoJ_29OgY-4bsUuyJ1pFjzJEc83VHLpoDRq0QHSrbtONotjofnsm2omVTFm9FwJPJlZ8j341mf6KV_dqcPQ7co_yCgF1fUR9FwIpYRuVtpU-yLlfUzUHP_lvFgF4JapDhUbRP9EyGFvmynmT711-NTvkdIzbSxEOL8jjhNnMHCtFnb6MYVJRY5jp2OZEXJAL1oZSDViq_K8Iw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aussie-blue/90 via-aussie-blue/20 to-transparent"></div>
              
              {/* Metrics overlay box */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-xl border border-white/20 shadow-xl">
                <h3 className="font-sans text-xs font-bold text-aussie-blue/60 mb-3 border-b border-outline-variant/50 pb-2 uppercase tracking-wider">
                  Internal Processing Metrics (Q3)
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-aussie-blue">
                    <span className="font-sans font-semibold text-xs tracking-wide uppercase opacity-75">STRATEGY PHASE</span>
                    <span className="font-sans font-black text-base tracking-tight text-right">14 DAYS</span>
                  </div>
                  <div className="flex justify-between items-center text-flag-red">
                    <span className="font-sans font-semibold text-xs tracking-wide uppercase">APPROVAL RATE</span>
                    <span className="font-sans font-black text-lg tracking-tight text-right">98.2%</span>
                  </div>
                  <div className="flex justify-between items-center text-green-700">
                    <span className="font-sans font-semibold text-xs tracking-wide uppercase">RFI RATE</span>
                    <span className="font-sans font-black text-base tracking-tight text-right">{"< 4%"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
}
