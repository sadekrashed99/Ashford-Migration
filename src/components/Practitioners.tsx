import React from "react";
import { Search, ShieldCheck, Scale, Award, FileCheck } from "lucide-react";

export default function Practitioners() {
  const [filterStream, setFilterStream] = React.useState<string>("All");

  const practitioners = [
    {
      initials: "EA",
      name: "Elias Ashford",
      title: "Principal Solicitor | MARN 0852310",
      specialty: "ADMINISTRATIVE LAW",
      tenure: "16 YEARS"
    },
    {
      initials: "JW",
      name: "Juliet Whitmore",
      title: "Senior Associate | MARN 1466290",
      specialty: "EMPLOYER SPONSOR",
      tenure: "9 YEARS"
    },
    {
      initials: "WZ",
      name: "Wei Zhang",
      title: "Consultant | MARN 1912440",
      specialty: "INVESTOR VISAS",
      tenure: "5 YEARS"
    }
  ];

  const cases = [
    {
      ref: "Ref: 482-TX-902",
      stream: "Short-Term Skilled",
      exposure: "Schedule 3 Bar",
      outcome: "Full Waiver / 4Y Visa",
      category: "Employer Sponsored",
      detail: "Applied for a TSS 482 visa onshore while holding a Bridging Visa and subject to Section 48 bar and Schedule 3 hurdles. Prepared extensive compelling submission on Australian interest."
    },
    {
      ref: "Ref: 186-DE-110",
      stream: "Direct Entry PR",
      exposure: "Genuine Position Challenge",
      outcome: "PR Granted No RFI",
      category: "Employer Sponsored",
      detail: "Nomination was challenged under DHA guidelines regarding organizational necessity. Built a comprehensive commercial logic report proving technical operational need."
    },
    {
      ref: "Ref: 820-FAM-442",
      stream: "Partner (Onshore)",
      exposure: "Critical Health Waiver",
      outcome: "PIC 4007 Satisfied",
      category: "Family & Partner",
      detail: "Applicant had a high-cost chronic condition triggering health failure. Prepared a comprehensive PIC 4007 waiver mapping financial support and community contribution offsets."
    },
    {
      ref: "Ref: 189-SK-882",
      stream: "Skilled Independent",
      exposure: "Prior Refusal Audit",
      outcome: "PR Granted",
      category: "Skilled PR",
      detail: "Previous agent miscalculated points for work experience. Audited complete historical payslips and tax assessments to file a pristine EOI & pristine state lodgement."
    },
    {
      ref: "Ref: 309-FAM-012",
      stream: "Partner (Offshore)",
      exposure: "Separation History",
      outcome: "Granted in 5 Months",
      category: "Family & Partner",
      detail: "Couple resided in separate countries due to employment. Drafted rigorous communication timelines and financial interdependence proofs, satisfying Schedule 3."
    }
  ];

  const filteredCases = filterStream === "All" 
    ? cases 
    : cases.filter(c => c.category === filterStream);

  return (
    <div id="lawyers" className="bg-[#fcf9f8] border-b border-outline-variant">
      
      {/* SECTION: LEAD PRACTITIONERS */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-aussie-blue mb-12 border-b border-outline-variant pb-6">
          Lead Practitioners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {practitioners.map((p, i) => (
            <div key={i} className="bg-white p-8 rounded-xl border border-outline-variant shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="w-24 h-24 bg-aussie-blue text-white rounded-lg flex items-center justify-center font-sans text-3xl font-extrabold mb-6 select-none shadow-md">
                {p.initials}
              </div>
              <h3 className="font-sans text-xl md:text-2xl font-bold text-aussie-blue mb-1">
                {p.name}
              </h3>
              <p className="font-sans text-xs font-semibold text-flag-red mb-6 uppercase tracking-wider">
                {p.title}
              </p>
              
              <div className="space-y-3 border-t border-outline-variant/60 pt-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-aussie-blue/60 uppercase font-semibold">SPECIALTY</span>
                  <span className="font-sans text-aussie-blue font-bold">{p.specialty}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-aussie-blue/60 uppercase font-semibold">TENURE</span>
                  <span className="font-sans text-aussie-blue font-bold">{p.tenure}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: PRECEDENT LODGEMENTS (CASE STUDIES) WITH PARALLAX & COVER */}
      <section 
        id="cases"
        className="py-20 px-6 md:px-16 text-white relative overflow-hidden bg-cover bg-center" 
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 76, 0.9), rgba(0, 0, 76, 0.9)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtwpvps7VfC4H7wNqh-lvGyg4TOkHi0OKS-Necq8xW21xAHp_b3GDmsyTKzFrL0DYqPj7shDCFJemr5ojPlWW-gEC9x0kRRrI-qC9bykCsov9z5ACT5-JBgJJ3TZsQdiIg0aRq7RoC1OwXah4lqt2CFhREKfUZ9Bxb3yKN5kPp-Hv97sLWTUgLXH4owAu1A4C78-BG5hOslZPZI3he1v8keHeNa6jWwIswbmldeODG1-iYPBnDcWGSba6nXBeNf6Hq7v8bB3JCf9_c')" 
        }}
      >
        <div className="aus-watermark absolute inset-0 opacity-[0.04] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-6 gap-6">
            <div>
              <span className="font-sans text-xs font-bold text-flag-red uppercase tracking-widest block mb-2">Historical Records</span>
              <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
                Precedent Lodgements
              </h2>
            </div>
            
            {/* Lodgements Filters */}
            <div className="flex flex-wrap gap-2">
              {["All", "Employer Sponsored", "Family & Partner", "Skilled PR"].map((stream) => (
                <button
                  key={stream}
                  onClick={() => setFilterStream(stream)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold font-sans transition-all cursor-pointer ${
                    filterStream === stream
                      ? "bg-flag-red text-white shadow-lg"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  {stream}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((c, i) => (
              <div 
                key={i} 
                className="bg-white/5 border border-white/10 p-8 rounded-xl relative group hover:bg-white/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="absolute top-6 right-6 border border-flag-red text-flag-red font-sans text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    GRANTED
                  </div>
                  <h4 className="font-sans text-white/40 text-xs font-semibold mb-6 uppercase tracking-widest">
                    {c.ref}
                  </h4>
                  
                  <div className="space-y-4 font-sans text-sm mb-6">
                    <div className="flex flex-col">
                      <span className="text-white/40 text-[10px] uppercase font-semibold">Stream</span>
                      <span className="text-white font-medium">{c.stream}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/40 text-[10px] uppercase font-semibold">Exposure</span>
                      <span className="text-white font-medium">{c.exposure}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/40 text-[10px] uppercase font-semibold">Outcome</span>
                      <span className="text-flag-red font-bold">{c.outcome}</span>
                    </div>
                  </div>
                </div>

                <p className="font-serif text-xs text-white/70 border-t border-white/10 pt-4 mt-2 leading-relaxed italic">
                  "{c.detail}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
