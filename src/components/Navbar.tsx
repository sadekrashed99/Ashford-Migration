import React from "react";
import { Scale, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenPortal: () => void;
  activeSection: string;
  scrollToId: (id: string) => void;
}

export default function Navbar({ onOpenPortal, activeSection, scrollToId }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: "Pathways", id: "pathways" },
    { label: "Our Lawyers", id: "lawyers" },
    { label: "The Process", id: "process" },
    { label: "Transparency", id: "transparency" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-[72px] bg-white/95 backdrop-blur-md z-[100] flex items-center justify-between px-6 md:px-16 border-b border-outline-variant shadow-sm transition-all duration-300">
      <div 
        className="flex items-baseline gap-1 cursor-pointer select-none"
        onClick={() => scrollToId("hero")}
      >
        <span className="font-sans text-[20px] text-aussie-blue font-extrabold tracking-tight">ASHFORD</span>
        <span className="font-sans text-[20px] text-aussie-blue font-light tracking-tight">MIGRATION</span>
      </div>

      {/* Desktop navigation links */}
      <div className="hidden md:flex flex-1 justify-center gap-10">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToId(link.id)}
            className={`font-sans text-sm font-semibold tracking-wide uppercase transition-colors duration-200 cursor-pointer ${
              activeSection === link.id
                ? "text-flag-red border-b-2 border-flag-red pb-1 mt-[2px]"
                : "text-aussie-blue hover:text-flag-red"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Action CTA buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenPortal}
          className="bg-flag-red text-white font-sans text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-aussie-blue hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.98]"
        >
          Request Assessment
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-aussie-blue hover:text-flag-red transition-colors cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-white border-b border-outline-variant py-6 px-8 flex flex-col gap-4 shadow-xl md:hidden fade-in">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                scrollToId(link.id);
                setMobileMenuOpen(false);
              }}
              className="text-left font-sans text-base font-semibold text-aussie-blue hover:text-flag-red transition-colors py-2 border-b border-surface-variant/50"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenPortal();
              setMobileMenuOpen(false);
            }}
            className="w-full bg-aussie-blue text-white font-sans text-sm font-semibold py-3 rounded-lg hover:bg-flag-red text-center transition-colors"
          >
            Strategic Audit Hub
          </button>
        </div>
      )}
    </nav>
  );
}
