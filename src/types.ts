export interface AuditRequest {
  name: string;
  email: string;
  subclass: string;
  caseSummary: string;
  experienceYears?: number;
  englishLevel?: string;
  pointsEstimate?: number;
}

export interface RiskFactor {
  title: string;
  level: "Low" | "Medium" | "High";
  description: string;
}

export interface TechnicalActionItem {
  title: string;
  description: string;
}

export interface PointsBreakdown {
  agePoints?: number;
  educationPoints?: number;
  experiencePoints?: number;
  englishPoints?: number;
  partnerStatePoints?: number;
  total?: number;
}

export interface AuditResult {
  eligibilityScore: number;
  riskRating: string;
  assessmentLetter: string;
  riskFactors: RiskFactor[];
  technicalActionItems: TechnicalActionItem[];
  pointsBreakdown?: PointsBreakdown | null;
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
  timestamp: string;
}
