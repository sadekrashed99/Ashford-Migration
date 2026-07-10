import React from "react";
import { DollarSign, ShieldCheck, HelpCircle } from "lucide-react";

export default function PricingTable() {
  const [selectedStream, setSelectedStream] = React.useState<string>("189");
  const [partnerIncluded, setPartnerIncluded] = React.useState<boolean>(false);
  const [childrenCount, setChildrenCount] = React.useState<number>(0);

  // Dynamic estimate based on official 2024 pricing
  const calculateFees = () => {
    let baseDha = 0;
    let baseAshford = 0;
    let partnerDha = 0;
    let partnerAshford = 1500;
    let childDha = 0;
    let childAshford = 750;

    switch (selectedStream) {
      case "189": // Skilled PR
        baseDha = 4640;
        baseAshford = 5500;
        partnerDha = 2320;
        childDha = 1160;
        break;
      case "820": // Partner Visa
        baseDha = 8850;
        baseAshford = 4800;
        partnerDha = 0; // Partner is already the main applicant
        partnerAshford = 0;
        childDha = 2215;
        break;
      case "482": // TSS Short
        baseDha = 1455;
        baseAshford = 3200;
        partnerDha = 1455;
        childDha = 365;
        break;
      case "aat": // AAT Appeals
        baseDha = 3374;
        baseAshford = 7500;
        partnerDha = 0;
        partnerAshford = 0;
        childDha = 0;
        break;
    }

    const totalDha = baseDha + (partnerIncluded ? partnerDha : 0) + (childrenCount * childDha);
    const totalAshford = baseAshford + (partnerIncluded ? partnerAshford : 0) + (childrenCount * childAshford);

    return {
      baseDha,
      baseAshford,
      totalDha,
      totalAshford,
      total: totalDha + totalAshford
    };
  };

  const fees = calculateFees();

  return (
    <section id="transparency" className="py-20 px-6 md:px-16 bg-white border-b border-outline-variant">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Descriptions and Quote */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-sans text-xs md:text-sm font-bold tracking-widest text-flag-red uppercase">Financial Transparency</span>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-aussie-blue leading-tight">
              Honest Pricing
            </h2>
            <p className="font-serif text-lg text-aussie-blue/70">
              We separate government disbursements from professional fees. No hidden margins on DHA charges. You receive a structured invoice with absolute clarity.
            </p>
            
            <div className="bg-aussie-blue p-8 rounded-xl text-white shadow-lg relative overflow-hidden">
              <div className="aus-watermark absolute inset-0 opacity-10 pointer-events-none"></div>
              <blockquote className="font-sans italic text-2xl mb-3 relative z-10 font-bold">
                "The quoted fee is the final fee."
              </blockquote>
              <p className="font-sans text-xs text-flag-red relative z-10 font-bold uppercase tracking-widest">
                Fixed-price engagement only.
              </p>
            </div>
          </div>
          
          {/* Right Column: Pricing Table & Estimator */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm">
              <table className="w-full font-sans text-left text-sm">
                <thead className="bg-surface-variant/30 border-b border-outline-variant">
                  <tr>
                    <th className="p-6 uppercase text-[11px] tracking-widest text-aussie-blue/60 font-bold">Stream Type</th>
                    <th className="p-6 uppercase text-[11px] tracking-widest text-aussie-blue/60 font-bold">DHA Fee</th>
                    <th className="p-6 uppercase text-[11px] tracking-widest text-aussie-blue/60 font-bold">Ashford Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className="hover:bg-surface-variant/10 transition-colors">
                    <td className="p-6 font-semibold">Skilled PR (189/190)</td>
                    <td className="p-6 text-aussie-blue/60">$4,640+</td>
                    <td className="p-6 text-flag-red font-bold">$5,500+</td>
                  </tr>
                  <tr className="hover:bg-surface-variant/10 transition-colors">
                    <td className="p-6 font-semibold">Partner Visa (820)</td>
                    <td className="p-6 text-aussie-blue/60">$8,850</td>
                    <td className="p-6 text-flag-red font-bold">$4,800+</td>
                  </tr>
                  <tr className="hover:bg-surface-variant/10 transition-colors">
                    <td className="p-6 font-semibold">TSS (482) Short</td>
                    <td className="p-6 text-aussie-blue/60">$1,455</td>
                    <td className="p-6 text-flag-red font-bold">$3,200</td>
                  </tr>
                  <tr className="hover:bg-surface-variant/10 transition-colors">
                    <td className="p-6 font-semibold">AAT Appeals</td>
                    <td className="p-6 text-aussie-blue/60">$3,374</td>
                    <td className="p-6 text-flag-red font-bold">$7,500+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DHA & Professional Fee Estimator Widget */}
            <div className="bg-surface-variant/30 border border-outline-variant rounded-xl p-6 space-y-6">
              <h3 className="font-sans text-base font-bold text-aussie-blue flex items-center gap-2">
                <DollarSign size={18} className="text-flag-red" />
                DHA Fee & Professional Estimate Calculator
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-aussie-blue/60 uppercase">Select Stream</label>
                  <select 
                    value={selectedStream}
                    onChange={(e) => {
                      setSelectedStream(e.target.value);
                      if (e.target.value === "820") setPartnerIncluded(false); // Partner is main applicant for 820
                    }}
                    className="w-full bg-white border border-outline-variant rounded-lg p-2.5 text-sm text-aussie-blue font-semibold focus:outline-none focus:ring-1 focus:ring-flag-red"
                  >
                    <option value="189">Skilled PR (189/190)</option>
                    <option value="820">Partner Visa (820)</option>
                    <option value="482">TSS Sponsor (482)</option>
                    <option value="aat">AAT Appeal</option>
                  </select>
                </div>
                
                <div className="flex items-end pb-3">
                  <label className="flex items-center gap-2 text-sm text-aussie-blue font-semibold cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      disabled={selectedStream === "820" || selectedStream === "aat"}
                      checked={partnerIncluded}
                      onChange={(e) => setPartnerIncluded(e.target.checked)}
                      className="rounded border-outline text-flag-red focus:ring-flag-red h-4 w-4"
                    />
                    Include Partner / Spouse
                  </label>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-aussie-blue/60 uppercase">Dependent Children</label>
                  <input 
                    type="number"
                    min="0"
                    max="6"
                    disabled={selectedStream === "aat"}
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-white border border-outline-variant rounded-lg p-2.5 text-sm text-aussie-blue font-semibold focus:outline-none focus:ring-1 focus:ring-flag-red"
                  />
                </div>
              </div>

              {/* Live Cost Breakdown Output */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-outline-variant/60 text-xs">
                <div>
                  <span className="text-aussie-blue/60 font-semibold block uppercase">Est. Department Fee</span>
                  <span className="text-base font-black text-aussie-blue">${fees.totalDha.toLocaleString()} AUD</span>
                </div>
                <div>
                  <span className="text-aussie-blue/60 font-semibold block uppercase">Est. Ashford Fee</span>
                  <span className="text-base font-black text-flag-red">${fees.totalAshford.toLocaleString()} AUD</span>
                </div>
                <div className="col-span-2 bg-aussie-blue/5 p-3 rounded-lg border border-aussie-blue/10 flex flex-col justify-center">
                  <span className="text-aussie-blue/80 font-bold block">Total Est. Cost</span>
                  <span className="text-lg font-black text-aussie-blue">${fees.total.toLocaleString()} AUD</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
