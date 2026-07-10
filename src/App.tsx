import React from "react";
import { 
  ArrowRight, Scale, ShieldAlert, Mail, Phone, 
  MapPin, AlertTriangle, CheckSquare, Award, Users 
} from "lucide-react";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Pathways from "./components/Pathways";
import Practitioners from "./components/Practitioners";
import PricingTable from "./components/PricingTable";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Portal from "./components/Portal";
import WorkflowTimeline from "./components/WorkflowTimeline";

export default function App() {
  // Portal / Hub States
  const [portalOpen, setPortalOpen] = React.useState(false);
  const [selectedSubclass, setSelectedSubclass] = React.useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = React.useState("hero");

  // Bottom Form Local State
  const [intakeName, setIntakeName] = React.useState("");
  const [intakeEmail, setIntakeEmail] = React.useState("");
  const [intakeSubclass, setIntakeSubclass] = React.useState("Skilled Permanent Residency (189/190)");
  const [intakeSummary, setIntakeSummary] = React.useState("");

  // Quick helper to scroll to any HTML ID beautifully
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  // Launch Portal from Pathways select
  const handleSelectPathway = (subclassValue: string) => {
    setSelectedSubclass(subclassValue);
    setPortalOpen(true);
  };

  // Launch Portal from Bottom Intake form
  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intakeName || !intakeEmail || !intakeSummary) return;

    // Trigger Portal opening with pre-filled inputs
    // We can directly instantiate and load it. To do that, we set the preselected subclass,
    // and let the Portal handle the submit or populate. To make it seamless,
    // let's pass a custom subclass and open it, then the portal will let them trigger the audit.
    setSelectedSubclass(intakeSubclass);
    setPortalOpen(true);
  };

  // Monitor active scroll section for navbar highlight
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "pathways", "lawyers", "transparency"];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-serif bg-surface text-aussie-blue antialiased min-h-screen selection:bg-flag-red selection:text-white">
      
      {/* 1. NAVIGATION HEADER */}
      <Navbar 
        onOpenPortal={() => {
          setSelectedSubclass(undefined);
          setPortalOpen(true);
        }}
        activeSection={activeSection}
        scrollToId={scrollToId}
      />

      {/* 2. MAJESTIC HERO HEADER */}
      <Hero 
        onOpenPortal={() => {
          setSelectedSubclass(undefined);
          setPortalOpen(true);
        }}
        scrollToId={scrollToId}
      />

      {/* 3. INFINITE CREDIBILITY BAR TICKER */}
      <section className="h-[64px] bg-aussie-blue flex items-center overflow-hidden border-b border-outline-variant relative z-10 select-none shadow-md">
        <div className="flex-none flex items-center gap-16 animate-infinite-scroll py-2">
          {/* Ticker Block 1 */}
          <div className="flex items-center gap-16 text-white text-xs font-sans font-bold uppercase tracking-wider">
            <span>Corporate Migration Specialists</span>
            <div className="w-1 h-4 bg-white/20"></div>
            <span>High-Net-Worth Strategy</span>
            <div className="w-1 h-4 bg-white/20"></div>
            <span>Federal Circuit Court Appeals</span>
            <div className="w-1 h-4 bg-white/20"></div>
            <span>Ministerial Interventions</span>
            <div className="w-1 h-4 bg-white/20"></div>
            <span>OMARA Compliant Practice</span>
          </div>
          {/* Ticker Block 2 (duplicate for seamless loop) */}
          <div className="flex items-center gap-16 text-white text-xs font-sans font-bold uppercase tracking-wider">
            <span>Corporate Migration Specialists</span>
            <div className="w-1 h-4 bg-white/20"></div>
            <span>High-Net-Worth Strategy</span>
            <div className="w-1 h-4 bg-white/20"></div>
            <span>Federal Circuit Court Appeals</span>
            <div className="w-1 h-4 bg-white/20"></div>
            <span>Ministerial Interventions</span>
            <div className="w-1 h-4 bg-white/20"></div>
            <span>OMARA Compliant Practice</span>
          </div>
        </div>
      </section>

      {/* 4. CLINICAL PATHWAYS CLUSTER */}
      <Pathways onSelectPathway={handleSelectPathway} />

      {/* 5. LITIGATION REALITY CHECK SECTION */}
      <section 
        className="py-24 px-6 md:px-16 text-white relative overflow-hidden bg-cover bg-center select-none" 
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 76, 0.85), rgba(0, 0, 76, 0.85)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkOISMweEn7NmbG81q9Gp85uCquev37qNtaBtWUmz0AJkda-MKDedTU1ICql-mgjI849sUFXx1tNdUHw_6d-Bp6hM0dwK11fPhGm9Rzy5-L4bFwIDJvf3hoVv7_4Ugf-m8O8iuPaIqaDZACy5Xi2Nwwxoo1ThuFVWxM72ZxS5233X62x5lC6Y7HMqV8jR4X8d7TlYPHkrDrreF-aUEKqERpOo_EurmcnGaNdIe_skwjV2oja9lSzuO_rB4pKvWBk7NGbgBMRBsMezR')" 
        }}
      >
        <div className="aus-watermark absolute inset-0 opacity-[0.03] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto mb-16 relative z-10 text-center">
          <blockquote className="font-serif italic text-2xl md:text-4xl lg:text-5xl leading-snug text-white/90">
            "Migration is not a form-filling exercise; it is a litigious process against a Department incentivized to refuse."
          </blockquote>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10 border-t border-white/10 pt-16">
          <div className="space-y-2">
            <span className="font-sans font-black text-4xl md:text-5xl text-white block">$11,710</span>
            <p className="font-sans text-xs text-flag-red uppercase tracking-widest font-bold">Avg. financial loss on DIY refusals</p>
          </div>
          <div className="space-y-2">
            <span className="font-sans font-black text-4xl md:text-5xl text-white block">Section 48</span>
            <p className="font-sans text-xs text-flag-red uppercase tracking-widest font-bold">The most common preventable bar</p>
          </div>
          <div className="space-y-2">
            <span className="font-sans font-black text-4xl md:text-5xl text-white block">$47,435</span>
            <p className="font-sans text-xs text-flag-red uppercase tracking-widest font-bold">Corporate penalty for non-compliance</p>
          </div>
        </div>
      </section>

      {/* 6. TECHNICAL PROCESS ROADMAP TIMELINE */}
      <WorkflowTimeline />

      {/* 7. ATTORNEY REGISTRY & CASE HISTORIES */}
      <Practitioners />

      {/* 8. TABLE OF FEES & COST TRANSPARENCY */}
      <PricingTable />

      {/* 9. OMARA ETHICAL SCAM WARNING COMPLIANCE BANNER */}
      <section className="py-12 px-6 md:px-16 bg-white border-b border-outline-variant">
        <div className="max-w-7xl mx-auto bg-white border border-outline-variant rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
          <div className="max-w-2xl space-y-2">
            <h3 className="font-sans text-xs md:text-sm font-bold text-flag-red uppercase tracking-widest flex items-center gap-2">
              <ShieldAlert size={16} /> OMARA COMPLIANCE NOTICE
            </h3>
            <p className="font-serif text-sm md:text-base text-aussie-blue/70 leading-relaxed">
              Every year, over 2,400 complaints are filed in Australia against unregistered "ghost agents" operating illegally. Under the Migration Act, only OMARA registered practitioners can advise on visa strategy. Always verify your solicitor's active status on the official OMARA registry.
            </p>
          </div>
          
          <div className="flex gap-4 flex-shrink-0 select-none">
            <div className="bg-aussie-blue text-white p-5 rounded-xl font-sans text-[10px] font-bold text-center w-28 shadow-md border border-white/10 uppercase tracking-widest leading-normal">
              VERIFIED<br/>REGISTRY<br/>2024
            </div>
            <div className="border border-aussie-blue text-aussie-blue p-5 rounded-xl font-sans text-[10px] font-bold text-center w-28 uppercase tracking-widest bg-surface-variant/20 leading-normal">
              MARN<br/>ACTIVE<br/>STATUS
            </div>
          </div>
        </div>
      </section>

      {/* 10. TECHNICAL FAQ ACCORDION PANEL */}
      <FAQ />

      {/* 11. REVIEWS SECTION */}
      <section className="py-24 px-6 md:px-16 bg-white border-b border-outline-variant">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-surface-variant/15 p-8 rounded-2xl border-t-4 border-flag-red shadow-sm flex flex-col justify-between">
            <blockquote className="font-serif italic text-base md:text-lg text-aussie-blue/80 leading-relaxed mb-6">
              "After two devastating refusals with other agencies, Elias investigated a minor technical error in my initial skills assessment and fixed everything. Pure precision."
            </blockquote>
            <p className="font-sans text-xs text-aussie-blue/50 font-bold uppercase tracking-widest">— M.K., Software Engineer</p>
          </div>
          
          <div className="bg-surface-variant/15 p-8 rounded-2xl border-t-4 border-aussie-blue shadow-sm flex flex-col justify-between">
            <blockquote className="font-serif italic text-base md:text-lg text-aussie-blue/80 leading-relaxed mb-6">
              "Clinical strategy. They gave us realistic warnings that other agencies skipped, but those legal insights were exactly what got our Partner PR visa granted."
            </blockquote>
            <p className="font-sans text-xs text-aussie-blue/50 font-bold uppercase tracking-widest">— R. & F.A., Spouse Visa</p>
          </div>
          
          <div className="bg-surface-variant/15 p-8 rounded-2xl border-t-4 border-flag-red shadow-sm flex flex-col justify-between">
            <blockquote className="font-serif italic text-base md:text-lg text-aussie-blue/80 leading-relaxed mb-6">
              "The documentation audit was brutal. But it's infinitely better to be cross-examined by your legal counsel than questioned in an RFI by a DHA Case Officer."
            </blockquote>
            <p className="font-sans text-xs text-aussie-blue/50 font-bold uppercase tracking-widest">— J.L., Operations Manager</p>
          </div>

        </div>
      </section>

      {/* 12. INTEGRITY RISK WARNING BANNER */}
      <section className="bg-flag-red py-6 px-6 text-center select-none shadow-md">
        <p className="font-sans text-white text-sm md:text-base tracking-[0.15em] font-extrabold uppercase">
          Integrity Over Invoicing. We decline cases we do not believe in.
        </p>
      </section>

      {/* 13. CONCISE PRE-AUDIT ENTRY INTAKE FORM */}
      <section id="contact" className="py-24 px-6 md:px-16 relative overflow-hidden bg-gradient-to-br from-[#f2f7fc] to-white border-b border-outline-variant">
        <div className="aus-watermark absolute inset-0 opacity-[0.06] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-sans text-4xl md:text-5xl font-extrabold text-aussie-blue leading-none">
              Initiate <br/><span className="text-flag-red">Audit Workspace</span>
            </h2>
            <p className="font-serif text-lg text-aussie-blue/70">
              Provide your preliminary details here. Our legal team will conduct a direct conflict check and provision an automated pre-assessment workspace within 24 hours.
            </p>
            
            <div className="space-y-4 font-sans text-sm font-semibold text-aussie-blue/80">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-flag-red/5 flex items-center justify-center text-flag-red group-hover:bg-flag-red group-hover:text-white transition-all duration-300">
                  <Mail size={16} />
                </div>
                <span>counsel@ashfordmigration.com.au</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-aussie-blue/5 flex items-center justify-center text-aussie-blue group-hover:bg-aussie-blue group-hover:text-white transition-all duration-300">
                  <Phone size={16} />
                </div>
                <span>+61 (02) 8000 4400</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-aussie-blue/5 flex items-center justify-center text-aussie-blue group-hover:bg-aussie-blue group-hover:text-white transition-all duration-300">
                  <MapPin size={16} />
                </div>
                <span>Level 32, 1 Farrer Place, Sydney NSW 2000</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleIntakeSubmit} className="space-y-6 bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-outline-variant shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-bold text-aussie-blue uppercase tracking-wider opacity-60">Legal Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    value={intakeName}
                    onChange={(e) => setIntakeName(e.target.value)}
                    className="w-full bg-white border border-outline-variant rounded-lg p-3 text-sm focus:ring-2 focus:ring-flag-red/20 focus:border-flag-red focus:outline-none transition-all text-aussie-blue font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-bold text-aussie-blue uppercase tracking-wider opacity-60">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    value={intakeEmail}
                    onChange={(e) => setIntakeEmail(e.target.value)}
                    className="w-full bg-white border border-outline-variant rounded-lg p-3 text-sm focus:ring-2 focus:ring-flag-red/20 focus:border-flag-red focus:outline-none transition-all text-aussie-blue font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-aussie-blue uppercase tracking-wider opacity-60">Visa Subclass of Interest</label>
                <select 
                  value={intakeSubclass}
                  onChange={(e) => setIntakeSubclass(e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg p-3 text-sm focus:ring-2 focus:ring-flag-red/20 focus:border-flag-red focus:outline-none transition-all text-aussie-blue font-semibold"
                >
                  <option>Skilled Permanent Residency (189/190)</option>
                  <option>Partner / Family Visa (820/309)</option>
                  <option>Employer Sponsored (482/186)</option>
                  <option>Business / Investor (188)</option>
                  <option>Refusal / Appeal (AAT)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-aussie-blue uppercase tracking-wider opacity-60">Preliminary Case Summary</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Detail your experience, visa subclass goals, or history of any refusals or bars..."
                  value={intakeSummary}
                  onChange={(e) => setIntakeSummary(e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg p-3 text-sm focus:ring-2 focus:ring-flag-red/20 focus:border-flag-red focus:outline-none transition-all text-aussie-blue font-serif leading-relaxed"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-aussie-blue text-white font-sans text-sm font-bold py-4 rounded-lg hover:bg-flag-red transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] cursor-pointer"
              >
                Provision Attorney Audit Workspace
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 14. FOOTER */}
      <Footer scrollToId={scrollToId} />

      {/* 15. COHESIVE CLIENT WORKSPACE OVERLAY PORTAL */}
      {portalOpen && (
        <Portal 
          onClose={() => {
            setPortalOpen(false);
            setSelectedSubclass(undefined);
          }}
          preselectedSubclass={selectedSubclass}
        />
      )}

    </div>
  );
}
