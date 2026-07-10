import React from "react";
import { 
  X, Check, AlertTriangle, Send, FileText, Download, 
  HelpCircle, MessageSquare, Loader2, CheckSquare, Upload, 
  FileCheck, ShieldAlert, Award, Calculator, Clock, Scale
} from "lucide-react";
import { AuditRequest, AuditResult, ChatMessage, RiskFactor, TechnicalActionItem } from "../types";

interface PortalProps {
  onClose: () => void;
  preselectedSubclass?: string;
}

export default function Portal({ onClose, preselectedSubclass }: PortalProps) {
  // Form State
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subclass, setSubclass] = React.useState(preselectedSubclass || "Skilled Permanent Residency (189/190)");
  const [caseSummary, setCaseSummary] = React.useState("");
  const [experienceYears, setExperienceYears] = React.useState<number>(3);
  const [englishLevel, setEnglishLevel] = React.useState("Superior English (IELTS 8+ / PTE 79+)");
  
  // Skilled Points Estimator state (rendered dynamically if Skilled PR is chosen)
  const [ageRange, setAgeRange] = React.useState("25-32"); // 30 points
  const [education, setEducation] = React.useState("Bachelor"); // 15 points
  const [partnerState, setPartnerState] = React.useState("Single"); // 10 points

  // Loading & Flow State
  const [loading, setLoading] = React.useState(false);
  const [loadingStep, setLoadingStep] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [auditResult, setAuditResult] = React.useState<AuditResult | null>(null);
  const [activeTab, setActiveTab] = React.useState<"letter" | "risks" | "actions" | "chat">("letter");

  // Document Checklist states
  const [checkedActions, setCheckedActions] = React.useState<Record<number, boolean>>({});
  const [uploadedDocs, setUploadedDocs] = React.useState<Record<string, string>>({});
  const [uploadingDoc, setUploadingDoc] = React.useState<string | null>(null);

  // Chat State
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = React.useState("");
  const [chatLoading, setChatLoading] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // Auto-select subclass if preselected changes
  React.useEffect(() => {
    if (preselectedSubclass) {
      setSubclass(preselectedSubclass);
    }
  }, [preselectedSubclass]);

  // Scroll to bottom of chat
  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // Calculate points on the fly for UI feedback
  const calculateEstimatedPoints = () => {
    let agePts = 0;
    if (ageRange === "18-24") agePts = 25;
    else if (ageRange === "25-32") agePts = 30;
    else if (ageRange === "33-39") agePts = 25;
    else if (ageRange === "40-44") agePts = 15;

    let eduPts = 15;
    if (education === "Doctorate") eduPts = 20;
    else if (education === "Bachelor" || education === "Master") eduPts = 15;
    else if (education === "Diploma") eduPts = 10;

    let engPts = 20;
    if (englishLevel.includes("Superior")) engPts = 20;
    else if (englishLevel.includes("Proficient")) engPts = 10;
    else engPts = 0;

    let expPts = 5;
    if (experienceYears >= 8) expPts = 15;
    else if (experienceYears >= 5) expPts = 10;
    else if (experienceYears >= 3) expPts = 5;

    let partnerPts = 10;
    if (partnerState === "Single" || partnerState === "SkilledPartner") partnerPts = 10;
    else if (partnerState === "CompetentPartner") partnerPts = 5;
    else partnerPts = 0;

    return agePts + eduPts + engPts + expPts + partnerPts;
  };

  const estimatedPointsTotal = calculateEstimatedPoints();

  // Reassuring messages during the long-running AI pre-assessment
  const loadingSteps = [
    "Conflict checking and registering client case...",
    "Stress-testing case against Migration Regulations 1994...",
    "Evaluating skills assessment and point schedule limits...",
    "Elias Ashford AI drafting detailed Strategy Cover Letter...",
    "Formulating clinical risk matrix and tactical action items..."
  ];

  const handleAssessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !caseSummary) {
      setError("Please fill out Name, Email, and Case Summary.");
      return;
    }

    setLoading(true);
    setError(null);
    
    // Cycle through loading steps to reassure client
    let stepIdx = 0;
    setLoadingStep(loadingSteps[0]);
    const interval = setInterval(() => {
      stepIdx = (stepIdx + 1) % loadingSteps.length;
      setLoadingStep(loadingSteps[stepIdx]);
    }, 4500);

    try {
      const response = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subclass,
          caseSummary,
          experienceYears,
          englishLevel,
          pointsEstimate: subclass.includes("Skilled") ? estimatedPointsTotal : undefined
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to complete immigration assessment.");
      }

      const data: AuditResult = await response.json();
      setAuditResult(data);
      clearInterval(interval);
      setLoading(false);
      setActiveTab("letter");

      // Initialize consultation chat with Elias Ashford's response
      setChatMessages([
        {
          role: "model",
          content: `Formal greeting, ${name}. I have compiled your Strategic Migration Audit for the ${subclass} pathway. You can review the risk evaluation and technical action list. What specific legal details can I clarify for you regarding this assessment or any regulatory bars?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

    } catch (err: any) {
      clearInterval(interval);
      setLoading(false);
      setError(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || chatLoading) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setUserInput("");
    setChatLoading(true);

    try {
      const chatHistory = [...chatMessages, userMsg];
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chatHistory,
          clientProfile: { name, subclass, caseSummary }
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to submit message to legal counsel.");
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, {
        role: "model",
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err: any) {
      setChatMessages(prev => [...prev, {
        role: "model",
        content: `Error: ${err.message || "An error occurred. Communication link severed. Please retry."}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Mock Document Upload simulation
  const handleUploadDocument = (docName: string) => {
    setUploadingDoc(docName);
    setTimeout(() => {
      setUploadedDocs(prev => ({
        ...prev,
        [docName]: `DHA-FORMAT_VERIFIED_${docName.toUpperCase().replace(/\s+/g, "_")}.pdf`
      }));
      setUploadingDoc(null);
    }, 1500);
  };

  // Simple elegant helper to parse markdown strings into styled React nodes safely
  const renderMarkdown = (mdString: string) => {
    if (!mdString) return null;
    return mdString.split("\n").map((line, i) => {
      if (line.startsWith("### ")) {
        return <h4 key={i} className="font-sans text-base font-bold text-aussie-blue mt-4 mb-2 uppercase tracking-wide">{line.replace("### ", "")}</h4>;
      }
      if (line.startsWith("## ")) {
        return <h3 key={i} className="font-sans text-lg font-extrabold text-aussie-blue border-b border-outline-variant/40 pb-1 mt-6 mb-3 uppercase tracking-wider">{line.replace("## ", "")}</h3>;
      }
      if (line.startsWith("# ")) {
        return <h2 key={i} className="font-sans text-xl font-black text-flag-red mt-8 mb-4 uppercase tracking-wider">{line.replace("# ", "")}</h2>;
      }
      if (line.startsWith("- ") || line.startsWith("* ")) {
        const boldParsed = line.replace(/^[-*]\s+/, "").split("**");
        return (
          <li key={i} className="ml-5 list-disc font-serif text-sm md:text-base text-aussie-blue/80 mb-2 leading-relaxed">
            {boldParsed.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-aussie-blue">{part}</strong> : part)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={i} className="h-2"></div>;
      }
      
      // Inline Bold formatting
      const boldParsed = line.split("**");
      return (
        <p key={i} className="font-serif text-sm md:text-base text-aussie-blue/85 mb-3 leading-relaxed">
          {boldParsed.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-aussie-blue">{part}</strong> : part)}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-aussie-blue/40 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl border border-outline-variant relative overflow-hidden fade-in">
        
        {/* Header bar */}
        <div className="bg-aussie-blue text-white px-6 py-4 flex justify-between items-center border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <Scale className="text-flag-red" size={24} />
            <div>
              <h2 className="font-sans text-base font-bold tracking-tight">Commonwealth Strategic Client Hub</h2>
              <p className="text-[10px] text-white/60 uppercase tracking-widest font-sans font-semibold">MARN 0852310 | OMARA Verified</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Outer background watermark */}
        <div className="aus-watermark absolute inset-0 opacity-[0.02] pointer-events-none"></div>

        {/* Main Workspace Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          
          {/* STATE 1: LOADING SPINNER WITH REASSURING PROCESS LOGS */}
          {loading && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-8 text-center space-y-6 fade-in">
              <div className="relative">
                <Loader2 className="animate-spin text-flag-red" size={56} />
                <Scale className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-aussie-blue" size={20} />
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="font-sans text-xl font-bold text-aussie-blue">Running Strategic Legal Simulation</h3>
                <p className="font-serif text-sm text-aussie-blue/70 italic min-h-[40px] transition-all duration-500">
                  "{loadingStep}"
                </p>
              </div>
              <div className="text-xs font-sans text-aussie-blue/40 uppercase tracking-widest border border-outline-variant p-3 rounded-lg">
                Statutory audit complies with Migration Act 1958
              </div>
            </div>
          )}

          {/* STATE 2: AUDIT NOT COMMENCED -> RENDER THE ASSESSMENT INTAKE FORM */}
          {!auditResult ? (
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <span className="font-sans text-[11px] font-bold text-flag-red uppercase tracking-widest bg-flag-red/5 px-3 py-1 rounded-full">
                  Phase 1 / Preliminary Assessment
                </span>
                <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-aussie-blue">Initiate Strategic Legal Audit</h3>
                <p className="font-serif text-sm md:text-base text-aussie-blue/70">
                  Provide your profile metrics below. Elias Ashford AI will perform a clinical stress-test on your eligibility parameters.
                </p>
              </div>

              {error && (
                <div className="bg-flag-red/5 border border-flag-red p-4 rounded-xl flex items-start gap-3 text-flag-red text-sm">
                  <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-sans font-bold">Audit Error:</span> {error}
                  </div>
                </div>
              )}

              <form onSubmit={handleAssessSubmit} className="space-y-6 bg-surface-variant/10 p-6 md:p-8 rounded-xl border border-outline-variant">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-bold text-aussie-blue/70 uppercase tracking-wider block">Legal Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-outline-variant rounded-lg p-3 text-sm focus:ring-2 focus:ring-flag-red/20 focus:border-flag-red focus:outline-none transition-all text-aussie-blue font-semibold"
                    />
                  </div>
                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-bold text-aussie-blue/70 uppercase tracking-wider block">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-outline-variant rounded-lg p-3 text-sm focus:ring-2 focus:ring-flag-red/20 focus:border-flag-red focus:outline-none transition-all text-aussie-blue font-semibold"
                    />
                  </div>
                </div>

                {/* Subclass Selection dropdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="font-sans text-xs font-bold text-aussie-blue/70 uppercase tracking-wider block">Visa Subclass of Interest</label>
                    <select 
                      value={subclass}
                      onChange={(e) => setSubclass(e.target.value)}
                      className="w-full bg-white border border-outline-variant rounded-lg p-3 text-sm focus:ring-2 focus:ring-flag-red/20 focus:border-flag-red focus:outline-none transition-all text-aussie-blue font-semibold"
                    >
                      <option>Skilled Permanent Residency (189/190)</option>
                      <option>Partner / Family Visa (820/309)</option>
                      <option>Employer Sponsored (482/186)</option>
                      <option>Business / Investor (188)</option>
                      <option>Refusal / Appeal (AAT)</option>
                    </select>
                  </div>

                  {/* Experience counter */}
                  <div className="space-y-1.5">
                    <label className="font-sans text-xs font-bold text-aussie-blue/70 uppercase tracking-wider block">Years of Experience</label>
                    <input 
                      type="number" 
                      min="0"
                      max="30"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-white border border-outline-variant rounded-lg p-3 text-sm focus:ring-2 focus:ring-flag-red/20 focus:border-flag-red focus:outline-none transition-all text-aussie-blue font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-bold text-aussie-blue/70 uppercase tracking-wider block">English Proficiency Level</label>
                  <select 
                    value={englishLevel}
                    onChange={(e) => setEnglishLevel(e.target.value)}
                    className="w-full bg-white border border-outline-variant rounded-lg p-3 text-sm focus:ring-2 focus:ring-flag-red/20 focus:border-flag-red focus:outline-none transition-all text-aussie-blue font-semibold"
                  >
                    <option>Superior English (IELTS 8+ / PTE 79+)</option>
                    <option>Proficient English (IELTS 7+ / PTE 65+)</option>
                    <option>Competent English (IELTS 6+ / PTE 50+)</option>
                    <option>Functional or Lower English</option>
                  </select>
                </div>

                {/* SKILLED PR POINTS ESTIMATOR CARD - Rendered dynamically if subclass is Skilled */}
                {subclass.includes("Skilled") && (
                  <div className="bg-aussie-blue/5 border border-aussie-blue/10 rounded-xl p-5 space-y-4 fade-in">
                    <div className="flex items-center justify-between border-b border-outline-variant/50 pb-2">
                      <span className="font-sans text-xs font-bold text-aussie-blue uppercase tracking-wider flex items-center gap-1.5">
                        <Calculator size={14} className="text-flag-red" />
                        Interactive Points Estimate Parameters
                      </span>
                      <span className="font-sans text-xs font-black text-flag-red bg-white border border-outline-variant px-2.5 py-0.5 rounded-full shadow-sm">
                        Total Points: {estimatedPointsTotal}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="font-sans font-bold text-aussie-blue/60 uppercase">Age Points Range</label>
                        <select 
                          value={ageRange}
                          onChange={(e) => setAgeRange(e.target.value)}
                          className="w-full bg-white border border-outline-variant/70 rounded-lg p-2 text-aussie-blue font-semibold focus:outline-none"
                        >
                          <option value="18-24">18-24 (25 pts)</option>
                          <option value="25-32">25-32 (30 pts)</option>
                          <option value="33-39">33-39 (25 pts)</option>
                          <option value="40-44">40-44 (15 pts)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-sans font-bold text-aussie-blue/60 uppercase">Highest Education Degree</label>
                        <select 
                          value={education}
                          onChange={(e) => setEducation(e.target.value)}
                          className="w-full bg-white border border-outline-variant/70 rounded-lg p-2 text-aussie-blue font-semibold focus:outline-none"
                        >
                          <option value="Doctorate">Doctorate Degree (20 pts)</option>
                          <option value="Bachelor">Bachelor or Master (15 pts)</option>
                          <option value="Diploma">Diploma / Trade Cert (10 pts)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-sans font-bold text-aussie-blue/60 uppercase">Partner Status Points</label>
                        <select 
                          value={partnerState}
                          onChange={(e) => setPartnerState(e.target.value)}
                          className="w-full bg-white border border-outline-variant/70 rounded-lg p-2 text-aussie-blue font-semibold focus:outline-none"
                        >
                          <option value="Single">Single Applicant (10 pts)</option>
                          <option value="SkilledPartner">Partner has Skills + English (10 pts)</option>
                          <option value="CompetentPartner">Partner has competent English (5 pts)</option>
                          <option value="UnskilledPartner">Partner has no skills or english (0 pts)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Case Summary input */}
                <div className="space-y-1.5">
                  <label className="font-sans text-xs font-bold text-aussie-blue/70 uppercase tracking-wider block">Candidate Case Summary</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Briefly describe your situation, your visa history, details of any prior refusals, visa bars, your relationship timeline (for spouse streams), or business background. The more detail you provide, the more precise the technical audit will be..."
                    value={caseSummary}
                    onChange={(e) => setCaseSummary(e.target.value)}
                    className="w-full bg-white border border-outline-variant rounded-lg p-3 text-sm focus:ring-2 focus:ring-flag-red/20 focus:border-flag-red focus:outline-none transition-all text-aussie-blue font-serif leading-relaxed"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-aussie-blue text-white font-sans text-sm font-bold py-4 rounded-lg hover:bg-flag-red transition-all duration-300 shadow-md hover:shadow-xl active:scale-[0.99] cursor-pointer"
                >
                  Submit Profile for Attorney Pre-Assessment
                </button>
              </form>
            </div>
          ) : (
            
            /* STATE 3: AUDIT RESULT RECEIVED -> RENDER PORTAL CLUSTERS */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Side Controls and Performance Gauge */}
              <div className="lg:col-span-4 space-y-6 flex flex-col">
                
                {/* Gauge Box */}
                <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col items-center text-center space-y-4">
                  <span className="font-sans text-xs font-bold text-aussie-blue/50 uppercase tracking-widest">
                    Viability Estimate
                  </span>
                  
                  {/* Gauge indicator */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle 
                        cx="72" cy="72" r="60" 
                        stroke="#e5e2e1" strokeWidth="10" fill="transparent" 
                      />
                      <circle 
                        cx="72" cy="72" r="60" 
                        stroke={
                          auditResult.eligibilityScore >= 75 ? "#16a34a" :
                          auditResult.eligibilityScore >= 50 ? "#ea580c" : "#dc2626"
                        } 
                        strokeWidth="10" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 60}
                        strokeDashoffset={2 * Math.PI * 60 * (1 - auditResult.eligibilityScore / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="font-sans text-3xl font-black text-aussie-blue">
                        {auditResult.eligibilityScore}%
                      </span>
                      <span className="text-[10px] text-aussie-blue/50 font-bold uppercase tracking-wider">
                        VIABILITY
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className={`font-sans text-sm font-black uppercase px-4 py-1.5 rounded-full ${
                      auditResult.riskRating.includes("Low") ? "bg-green-50 text-green-700 border border-green-200" :
                      auditResult.riskRating.includes("Moderate") ? "bg-orange-50 text-orange-700 border border-orange-200" :
                      "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {auditResult.riskRating}
                    </div>
                  </div>
                </div>

                {/* Tab Navigation Menu */}
                <div className="bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col divide-y divide-outline-variant/60">
                  <button 
                    onClick={() => setActiveTab("letter")}
                    className={`px-5 py-4 font-sans text-sm font-bold flex items-center gap-3 transition-colors text-left cursor-pointer ${
                      activeTab === "letter" ? "bg-aussie-blue text-white" : "text-aussie-blue hover:bg-surface-variant/20"
                    }`}
                  >
                    <FileText size={18} />
                    Audit Statement Letter
                  </button>
                  <button 
                    onClick={() => setActiveTab("risks")}
                    className={`px-5 py-4 font-sans text-sm font-bold flex items-center gap-3 transition-colors text-left cursor-pointer ${
                      activeTab === "risks" ? "bg-aussie-blue text-white" : "text-aussie-blue hover:bg-surface-variant/20"
                    }`}
                  >
                    <ShieldAlert size={18} />
                    Critical Risk Matrix
                    <span className="ml-auto bg-flag-red text-white text-[10px] px-2 py-0.5 rounded-full">
                      {auditResult.riskFactors.length}
                    </span>
                  </button>
                  <button 
                    onClick={() => setActiveTab("actions")}
                    className={`px-5 py-4 font-sans text-sm font-bold flex items-center gap-3 transition-colors text-left cursor-pointer ${
                      activeTab === "actions" ? "bg-aussie-blue text-white" : "text-aussie-blue hover:bg-surface-variant/20"
                    }`}
                  >
                    <CheckSquare size={18} />
                    Technical Action Checklist
                  </button>
                  <button 
                    onClick={() => setActiveTab("chat")}
                    className={`px-5 py-4 font-sans text-sm font-bold flex items-center gap-3 transition-colors text-left cursor-pointer ${
                      activeTab === "chat" ? "bg-aussie-blue text-white" : "text-aussie-blue hover:bg-surface-variant/20"
                    }`}
                  >
                    <MessageSquare size={18} />
                    Attorney Consultation Chat
                  </button>
                </div>

                <div className="bg-flag-red/5 border border-flag-red/20 rounded-xl p-5 text-xs space-y-2 text-aussie-blue/80">
                  <span className="font-sans font-bold text-flag-red uppercase tracking-widest block">Trust Account Notice</span>
                  <p className="font-serif leading-relaxed">
                    Under the OMARA Code of Conduct, any prospective fees are placed securely in our escrow legal trust account and only drawn as agreed milestones are achieved.
                  </p>
                </div>

              </div>

              {/* Right Column: Display Active Tab Panel */}
              <div className="lg:col-span-8 bg-white border border-outline-variant rounded-xl shadow-sm min-h-[550px] flex flex-col overflow-hidden">
                
                {/* TAB 1: PRE-ASSESSMENT STATEMENT LETTER */}
                {activeTab === "letter" && (
                  <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 relative flex flex-col justify-between">
                    <div className="space-y-4 prose prose-slate">
                      {/* PDF Header style */}
                      <div className="border-b-4 border-aussie-blue pb-4 flex justify-between items-baseline">
                        <div className="flex flex-col">
                          <span className="font-sans text-lg font-extrabold text-aussie-blue tracking-tight">ASHFORD MIGRATION LAW</span>
                          <span className="text-[9px] font-sans text-aussie-blue/60 tracking-wider">MARN 0852310 | SOLICITOR ENROLMENT NO. 440122</span>
                        </div>
                        <span className="font-sans text-xs text-aussie-blue/50 font-bold">{new Date().toLocaleDateString()}</span>
                      </div>
                      
                      {/* Markdown Letter text */}
                      <div className="pt-2">
                        {renderMarkdown(auditResult.assessmentLetter)}
                      </div>
                    </div>

                    <div className="border-t border-outline-variant pt-6 mt-8 flex justify-between items-center bg-[#fcf9f8] -mx-8 -mb-8 p-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-aussie-blue text-white flex items-center justify-center font-sans text-xs font-bold">EA</div>
                        <div className="flex flex-col text-[10px] text-aussie-blue">
                          <span className="font-bold">Elias Ashford</span>
                          <span className="opacity-60">Principal Solicitor</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => window.print()}
                        className="bg-aussie-blue hover:bg-flag-red text-white text-xs font-sans font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Download size={14} /> Export Audit
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: CRITICAL RISK MATRIX */}
                {activeTab === "risks" && (
                  <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
                    <div className="border-b border-outline-variant/60 pb-4">
                      <h3 className="font-sans text-lg font-bold text-aussie-blue">Stress-Test Risk Evaluation Matrix</h3>
                      <p className="font-serif text-sm text-aussie-blue/60">
                        The regulatory matrix evaluates statutory thresholds. Issues identified represent key criteria Case Officers inspect for refusal triggers.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {auditResult.riskFactors.map((risk, index) => (
                        <div 
                          key={index} 
                          className={`p-5 rounded-xl border flex gap-4 items-start ${
                            risk.level === "High" ? "bg-red-50 border-red-200 text-red-950" :
                            risk.level === "Medium" ? "bg-orange-50 border-orange-200 text-orange-950" :
                            "bg-blue-50 border-blue-200 text-blue-950"
                          }`}
                        >
                          <AlertTriangle className={`flex-shrink-0 mt-0.5 ${
                            risk.level === "High" ? "text-red-600" :
                            risk.level === "Medium" ? "text-orange-600" :
                            "text-blue-600"
                          }`} size={20} />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-sans font-extrabold text-sm uppercase">{risk.title}</span>
                              <span className={`font-sans text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                risk.level === "High" ? "bg-red-200 text-red-800" :
                                risk.level === "Medium" ? "bg-orange-200 text-orange-800" :
                                "bg-blue-200 text-blue-800"
                              }`}>
                                {risk.level} Severity
                              </span>
                            </div>
                            <p className="font-serif text-xs md:text-sm leading-relaxed opacity-90">
                              {risk.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: TECHNICAL ACTION CHECKLIST & DOCUMENT SIMULATOR */}
                {activeTab === "actions" && (
                  <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="border-b border-outline-variant/60 pb-4">
                        <h3 className="font-sans text-lg font-bold text-aussie-blue">Tactical Action List</h3>
                        <p className="font-serif text-sm text-aussie-blue/60">
                          Complete these milestones to prepare a legally bulletproof lodgement case dossier.
                        </p>
                      </div>

                      {/* Action items checklist */}
                      <div className="space-y-4">
                        {auditResult.technicalActionItems.map((item, index) => {
                          const isChecked = !!checkedActions[index];
                          return (
                            <div 
                              key={index} 
                              className={`p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                                isChecked ? "bg-green-50/50 border-green-200" : "bg-white border-outline-variant"
                              }`}
                              onClick={() => setCheckedActions(prev => ({ ...prev, [index]: !prev[index] }))}
                            >
                              <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all ${
                                isChecked ? "bg-green-600 border-green-600 text-white" : "border-outline"
                              }`}>
                                {isChecked && <Check size={14} />}
                              </div>
                              <div className="space-y-1 select-none">
                                <span className={`font-sans text-sm font-bold ${isChecked ? "text-green-800 line-through opacity-70" : "text-aussie-blue"}`}>
                                  {item.title}
                                </span>
                                <p className={`font-serif text-xs leading-relaxed ${isChecked ? "text-green-700/60 opacity-70" : "text-aussie-blue/70"}`}>
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Document Checklist simulator */}
                      <div className="border-t border-outline-variant/60 pt-6 space-y-4">
                        <h4 className="font-sans text-sm font-bold text-aussie-blue uppercase tracking-wide flex items-center gap-1.5">
                          <Upload size={16} className="text-flag-red" />
                          Preliminary Document Verification Portal
                        </h4>
                        <p className="font-serif text-xs text-aussie-blue/60">
                          Upload preliminary credential copies below. The simulated legal system audits documents for formatting compliance automatically.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {["Skills Assessment Certificate", "English Test Scores (IELTS/PTE)", "Relationship Evidence Dossier"].map((docName) => {
                            const isUploaded = !!uploadedDocs[docName];
                            return (
                              <div key={docName} className="border border-outline-variant rounded-xl p-4 flex justify-between items-center bg-surface-variant/20">
                                <div className="flex items-center gap-3">
                                  {isUploaded ? <FileCheck className="text-green-600" size={24} /> : <FileText className="text-aussie-blue/40" size={24} />}
                                  <div className="flex flex-col text-xs">
                                    <span className="font-sans font-bold text-aussie-blue">{docName}</span>
                                    <span className="font-mono text-[9px] text-aussie-blue/50">
                                      {isUploaded ? uploadedDocs[docName] : "Awaiting PDF..."}
                                    </span>
                                  </div>
                                </div>

                                <button
                                  disabled={uploadingDoc === docName}
                                  onClick={() => handleUploadDocument(docName)}
                                  className={`text-xs font-sans font-bold px-3 py-1.5 rounded-lg border cursor-pointer flex items-center gap-1.5 transition-all ${
                                    isUploaded 
                                      ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100" 
                                      : "bg-white border-aussie-blue text-aussie-blue hover:bg-aussie-blue hover:text-white"
                                  }`}
                                >
                                  {uploadingDoc === docName ? (
                                    <Loader2 className="animate-spin" size={12} />
                                  ) : isUploaded ? (
                                    "Replace"
                                  ) : (
                                    "Upload PDF"
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: INTERACTIVE ATTORNEY CONSULTATION CHAT */}
                {activeTab === "chat" && (
                  <div className="flex-1 flex flex-col h-full overflow-hidden">
                    {/* Chat messages viewport */}
                    <div className="flex-1 p-6 overflow-y-auto space-y-4">
                      {chatMessages.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[85%] rounded-xl p-4 relative ${
                            msg.role === "user" 
                              ? "bg-aussie-blue text-white rounded-br-none" 
                              : "bg-surface-variant/40 text-aussie-blue rounded-bl-none border border-outline-variant/50"
                          }`}>
                            
                            {/* Author label */}
                            <span className="block text-[9px] uppercase font-sans font-bold opacity-50 mb-1">
                              {msg.role === "user" ? "Candidate" : "Elias Ashford MARN 0852310"}
                            </span>
                            
                            {/* Content */}
                            <p className="font-serif text-sm leading-relaxed whitespace-pre-wrap select-text">
                              {msg.content}
                            </p>
                            
                            {/* Timestamp */}
                            <span className="block text-[8px] opacity-40 text-right mt-2 font-mono">
                              {msg.timestamp}
                            </span>
                          </div>
                        </div>
                      ))}
                      
                      {chatLoading && (
                        <div className="flex justify-start">
                          <div className="bg-surface-variant/40 text-aussie-blue rounded-xl rounded-bl-none p-4 border border-outline-variant/50 flex items-center gap-2">
                            <Loader2 className="animate-spin text-flag-red" size={16} />
                            <span className="font-sans text-xs tracking-wide italic text-aussie-blue/60 font-semibold">Elias Ashford drafting legal response...</span>
                          </div>
                        </div>
                      )}
                      
                      <div ref={chatEndRef} />
                    </div>

                    {/* Chat Input form footer */}
                    <form onSubmit={handleChatSubmit} className="p-4 border-t border-outline-variant/60 bg-surface-variant/20 flex gap-2">
                      <input 
                        type="text"
                        placeholder="Ask Elias Ashford about your assessment, Section 48 bars, or Relationship proofs..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="flex-1 bg-white border border-outline-variant rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-flag-red text-aussie-blue font-semibold"
                      />
                      <button 
                        type="submit"
                        disabled={chatLoading || !userInput.trim()}
                        className="bg-aussie-blue hover:bg-flag-red text-white p-3 rounded-lg transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
                      >
                        <Send size={18} />
                      </button>
                    </form>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
