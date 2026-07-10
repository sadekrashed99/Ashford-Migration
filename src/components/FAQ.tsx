import React from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      q: "How long does an assessment take?",
      a: "Formal written assessments are delivered within 48 hours. We do not provide 'on-the-spot' verbal clearances as they lack the necessary evidentiary rigor required for legal reliance."
    },
    {
      q: "Do you guarantee visa outcomes?",
      a: "No. Per the OMARA Code of Conduct, guaranteeing a positive result is strictly illegal. We guarantee a technically perfect lodgement that eliminates all controllable risk and stands up to strict Case Officer auditing."
    },
    {
      q: "What happens if my visa is refused?",
      a: "We transition to the Appeals phase immediately. Our strategy includes pre-emptive planning for AAT (Administrative Appeals Tribunal) lodgement if a case is identified as high-risk from the outset."
    },
    {
      q: "Are professional fees refundable?",
      a: "Fees are held in a secure legal Trust Account and drawn only as milestone work is completed. Refund terms for unearned fees are clearly defined in our Terms of Engagement under OMARA rules."
    }
  ];

  return (
    <section id="faq" className="py-20 px-6 md:px-16 bg-surface-variant/20 border-b border-outline-variant">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <span className="font-sans text-xs md:text-sm font-bold tracking-widest text-flag-red uppercase">Clarity First</span>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-aussie-blue">
            Technical FAQ
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left font-sans text-base md:text-lg font-bold text-aussie-blue flex justify-between items-center hover:bg-surface-variant/10 transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-flag-red flex-shrink-0 ml-4 transition-transform duration-300">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 font-serif text-sm md:text-base text-aussie-blue/80 leading-relaxed border-t border-outline-variant/10 pt-4 bg-[#fcf9f8]/30 fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
