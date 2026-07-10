import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please add it via the Secrets panel in AI Studio settings.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Endpoint: Generate a comprehensive legal pre-assessment
app.post("/api/assess", async (req, res) => {
  const { name, email, subclass, caseSummary, experienceYears, englishLevel, pointsEstimate } = req.body;

  if (!name || !email || !subclass || !caseSummary) {
    res.status(400).json({ error: "Name, email, subclass of interest, and case summary are required." });
    return;
  }

  try {
    const ai = getGeminiClient();
    
    const systemPrompt = `You are Elias Ashford, Principal Solicitor at Ashford Migration Law (MARN 0852310). 
You are a highly respected, clinical, and precise Australian immigration attorney. Your practice operates with "exactness" and structural honesty, meaning you never over-promise, you warn clients of realistic risk bars (such as Section 48 bars, schedule 3 requirements, PIC 4007 health waivers, genuine position challenges, and skills assessment failures), and you write with severe intellectual rigor.

Your task is to analyze the preliminary candidate details and generate a highly professional, comprehensive "Strategic Immigration Audit Report" and risk matrix.
The candidate's details are:
- Name: ${name}
- Email: ${email}
- Target Pathway: ${subclass}
- Client Case Summary: ${caseSummary}
- Years of relevant experience: ${experienceYears || "Not specified"}
- English Language Level: ${englishLevel || "Not specified"}
- Estimated Points (if skilled PR): ${pointsEstimate || "Not calculated"}

Generate a JSON response that conforms exactly to the requested schema. The response must contain:
1. eligibilityScore: A number from 0 to 100 representing the legal viability of this case under current legislative instruments.
2. riskRating: One of "Low Risk", "Moderate Risk", "High Risk", "Severe Bar Detected".
3. assessmentLetter: A comprehensive, highly professional legal pre-assessment written in elegant Markdown. Address the client formally by their name. Begin with "RE: Preliminary Strategic Migration Audit - ${subclass}". Format the letter with clean headings:
   - Executive Summary
   - Legislative Eligibility & Pathway Viability
   - Critical Evidentiary Requirements (highlighting specific documents, English requirements, or Skills Assessments needed)
   - Strategic Recommendations & Mitigations
   The letter must be written in the first-person singular ("I", "my team", "Ashford Migration Law") as Elias Ashford. Speak with gravitas and absolute technical precision.
4. riskFactors: An array of 2 to 4 objects, each containing:
   - title: Name of the risk factor (e.g., "Schedule 3 Complications", "Section 48 Bar", "Genuine Position Refusal Risk")
   - level: "Low", "Medium", "High"
   - description: A short 1-2 sentence legal explanation of this risk and why it applies.
5. technicalActionItems: An array of 3 to 5 action items, each containing:
   - title: Specific concrete legal action (e.g., "Initiate RPL Skills Assessment", "Schedule IELTS Academic Test", "Draft Relationship Chronology")
   - description: Detailed tactical steps.
6. pointsBreakdown: An object with estimated points breakdown if Skilled PR is targeted, or null if not applicable. Include:
   - agePoints: estimated points for age
   - educationPoints: estimated points for degree
   - experiencePoints: estimated points for overseas/Australian work experience
   - englishPoints: estimated points for english test
   - partnerStatePoints: partner or state nomination points
   - total: total estimated points (or null if not subclass 189/190/491).

Make sure the output is valid JSON according to the schema. Do not include any other text besides the JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Generate the strategic migration audit report.",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["eligibilityScore", "riskRating", "assessmentLetter", "riskFactors", "technicalActionItems"],
          properties: {
            eligibilityScore: { type: Type.INTEGER, description: "Legal viability score from 0 to 100" },
            riskRating: { type: Type.STRING, description: "Overall risk rating" },
            assessmentLetter: { type: Type.STRING, description: "Comprehensive legal pre-assessment letter in Markdown format" },
            riskFactors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["title", "level", "description"],
                properties: {
                  title: { type: Type.STRING },
                  level: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            technicalActionItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["title", "description"],
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            pointsBreakdown: {
              type: Type.OBJECT,
              properties: {
                agePoints: { type: Type.INTEGER },
                educationPoints: { type: Type.INTEGER },
                experiencePoints: { type: Type.INTEGER },
                englishPoints: { type: Type.INTEGER },
                partnerStatePoints: { type: Type.INTEGER },
                total: { type: Type.INTEGER }
              }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("Error in /api/assess:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred during legal assessment." });
  }
});

// Endpoint: Interactive follow-up chat with Elias Ashford AI
app.post("/api/chat", async (req, res) => {
  const { messages, clientProfile } = req.body;

  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: "Messages array is required." });
    return;
  }

  try {
    const ai = getGeminiClient();

    const systemInstruction = `You are Elias Ashford, Principal Solicitor at Ashford Migration Law (MARN 0852310). 
You are a highly experienced, clinical, and academically rigorous Australian immigration lawyer. You operate with absolute exactness, providing clients with direct, direct, objective guidance regarding their Australian visa options. You are not a 'salesperson'; you tell clients the truth, warn them of legal vulnerabilities, and structure cases strictly according to the Migration Act 1958 and Migration Regulations 1994.

The client you are chatting with is:
- Name: ${clientProfile?.name || "Candidate"}
- Visa Subclass of Interest: ${clientProfile?.subclass || "Not specified"}
- Preliminary Case: ${clientProfile?.caseSummary || "Not detailed"}

Maintain this persona perfectly. Keep your answers concise, authoritative, and structured with clear legal reasoning. Focus on legal requirements (e.g. Schedule 3 bars, Section 48, GTE, skills assessments, employer sponsorships, PIC 4007 health waivers, character submissions). Give practical advice.`;

    // Map the client's messages to Gemini format
    const geminiContents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: geminiContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred during consultation." });
  }
});

// Serve frontend assets using Vite in development or static Express middleware in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ashford Migration Law Server running on http://localhost:${PORT}`);
  });
}

startServer();
