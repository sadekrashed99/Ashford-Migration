import React from "react";
import { ArrowRight, Scale, Users, Award, ShieldAlert } from "lucide-react";

interface PathwaysProps {
  onSelectPathway: (subclass: string) => void;
}

export default function Pathways({ onSelectPathway }: PathwaysProps) {
  const cards = [
    {
      num: "01",
      title: "Pathways to Residency",
      desc: "Strategic mapping for 189, 190, and 491 subclasses. We assess points-test viability with extreme skepticism to ensure lodgement safety.",
      actionLabel: "View Technical Requirements",
      subclassValue: "Skilled Permanent Residency (189/190)",
      icon: <Award className="text-flag-red" size={24} />
    },
    {
      num: "02",
      title: "Family & Partner Visas",
      desc: "Evidentiary reconstruction for 820/801 and 309/100 streams. Navigating schedule 3 requirements and complex relationship histories.",
      actionLabel: "Initiate Evidentiary Audit",
      subclassValue: "Partner / Family Visa (820/309)",
      icon: <Users className="text-flag-red" size={24} />
    },
    {
      num: "03",
      title: "Employer Sponsorship",
      desc: "482, 186, and 494 streams for Australian businesses. Labour market testing audits and genuine position justification reports.",
      actionLabel: "Corporate Compliance Review",
      subclassValue: "Employer Sponsored (482/186)",
      icon: <Scale className="text-flag-red" size={24} />
    }
  ];

  return (
    <section id="pathways" className="py-20 px-6 md:px-16 bg-white border-b border-outline-variant relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <span className="font-sans text-xs md:text-sm font-bold tracking-widest text-flag-red uppercase">Practice Strengths</span>
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-extrabold text-aussie-blue">
            Technical Legal Streams
          </h2>
          <p className="font-serif text-lg text-aussie-blue/70">
            Australian immigration is heavily codifed. We apply strict statutory logic rather than optimistic hope to prepare resilient applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div 
              key={i} 
              className="p-8 bg-white border border-outline-variant/80 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:border-flag-red/50"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-4xl text-flag-red/20 font-black tracking-tight block">
                    {card.num}
                  </span>
                  <div className="bg-flag-red/5 p-2 rounded-lg">
                    {card.icon}
                  </div>
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-bold text-aussie-blue mb-4">
                  {card.title}
                </h3>
                <p className="font-serif text-base text-aussie-blue/75 mb-8 leading-relaxed">
                  {card.desc}
                </p>
              </div>
              
              <button 
                onClick={() => card.subclassValue && onSelectPathway(card.subclassValue)}
                className="font-sans text-sm font-bold text-flag-red flex items-center gap-2 group-hover:gap-4 transition-all duration-300 cursor-pointer self-start border-b border-transparent hover:border-flag-red pb-0.5"
              >
                {card.actionLabel} <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
