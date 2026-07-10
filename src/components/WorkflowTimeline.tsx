import React from "react";

const steps = [
  {
    num: "01",
    label: "Assessment",
    title: "Hard Audit",
    description: "We stress-test your eligibility parameters against current legislative instruments. If you do not qualify on the merits, we stop the process immediately."
  },
  {
    num: "02",
    label: "Strategy",
    title: "Risk Mitigation",
    description: "Identification of potential structural hurdles: health waivers (PIC 4007), character concerns, schedule 3 limitations, or GTE factors. Drafting the legal defense framework."
  },
  {
    num: "03",
    label: "Documentation",
    title: "Precision Collation",
    description: "Every payslip, reference letter, and financial instrument is audited for technical structural consistency. We do not accept approximate or speculative evidence."
  },
  {
    num: "04",
    label: "Lodgement",
    title: "Submission",
    description: "Formal lodgement with the Department of Home Affairs (DHA) accompanied by a comprehensive legal submission cover letter mapping arguments directly to statutory regulations."
  },
  {
    num: "05",
    label: "Outcome",
    title: "Decision",
    description: "Post-lodgement management, proactively handling Requests for Information (RFI) or administrative updates, culminating in secure grant notifications."
  }
];

export default function WorkflowTimeline() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const stepRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [lineHeight, setLineHeight] = React.useState<number>(0);
  const [activeSteps, setActiveSteps] = React.useState<boolean[]>([false, false, false, false, false]);

  React.useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Trigger point is 60% of viewport height (feels premium & natural)
      const triggerPoint = viewportHeight * 0.6;

      // Calculate how far down we have scrolled into the container
      const scrolled = triggerPoint - rect.top;
      
      // Clamp the height between 0 and total container height
      const totalHeight = rect.height;
      
      // Until the line hits the last red dot "Decision" (step index 4)
      // it should continue down to the end of the line
      const clampedHeight = Math.max(0, Math.min(totalHeight, scrolled));
      setLineHeight(clampedHeight);

      // Determine active steps based on line height reaching each dot's vertical offset
      const newActive = steps.map((_, index) => {
        const stepElement = stepRefs.current[index];
        if (!stepElement) return false;
        
        // Find dot vertical position relative to container's top
        // offsetTop is relative to the containerRef since the container is 'relative'
        const dotY = stepElement.offsetTop + 14; 
        
        return clampedHeight >= dotY;
      });

      setActiveSteps(newActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to initialize correct state
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="process" className="py-24 px-6 md:px-16 bg-white border-b border-outline-variant">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <span className="font-sans text-xs md:text-sm font-bold tracking-widest text-flag-red uppercase">Case Lifecycle</span>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-aussie-blue">
            Our Professional Workflow
          </h2>
          <p className="font-serif text-base md:text-lg text-aussie-blue/70 max-w-2xl mx-auto">
            Every step is managed with academic strictness. We map critical parameters in sequence to avoid preventable refusals.
          </p>
        </div>

        {/* Timeline Container */}
        <div 
          ref={containerRef} 
          className="relative space-y-16 pl-8 md:pl-12 max-w-3xl mx-auto"
        >
          {/* Grey background timeline line */}
          <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-aussie-blue/10 rounded-full" />
          
          {/* Animated red progress line */}
          <div 
            className="absolute left-[9px] top-2 w-[2px] bg-flag-red rounded-full transition-all duration-75 ease-out origin-top"
            style={{ height: `${lineHeight}px` }}
          />

          {steps.map((step, idx) => {
            const isActive = activeSteps[idx];
            return (
              <div 
                key={idx}
                ref={(el) => { stepRefs.current[idx] = el; }}
                className="relative group"
              >
                {/* Dot Container centered exactly on the timeline line */}
                <div className="absolute left-0 top-[5px] w-5 h-5 flex items-center justify-center z-20">
                  {/* Outer pulsating ring - starts to pulsate when hit by the red line */}
                  <div 
                    className={`absolute inset-0 rounded-full bg-flag-red/20 transition-all duration-500 ${
                      isActive ? "animate-pulse-ring" : "opacity-0 scale-50"
                    }`}
                  />
                  
                  {/* Central Red Dot */}
                  <div 
                    className={`w-3.5 h-3.5 rounded-full border-2 border-white transition-all duration-500 shadow-sm ${
                      isActive 
                        ? "bg-flag-red scale-110 shadow-md" 
                        : "bg-surface-variant group-hover:bg-flag-red/60 group-hover:scale-105"
                    }`}
                  />
                </div>

                <div className="pl-6 md:pl-8">
                  <span className={`font-sans text-[11px] font-bold block mb-2 uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? "text-flag-red" : "text-aussie-blue/40"
                  }`}>
                    {step.num} / {step.label}
                  </span>
                  <h3 className="font-sans text-xl md:text-2xl font-black text-aussie-blue mb-3">
                    {step.title}
                  </h3>
                  <p className="font-serif text-sm md:text-base text-aussie-blue/70 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
