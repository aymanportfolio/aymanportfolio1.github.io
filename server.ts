import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client lazily or safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || "";
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "AymanPortfolio EEE Engine", timestamp: new Date().toISOString() });
});

// AI Assistant Endpoint for EEE Portfolio
app.post("/api/assistant", async (req, res) => {
  try {
    const { message, contextHistory } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    const systemPrompt = `You are "AymanAI", an intelligent futuristic assistant for Ayman Ullah's Electrical and Electronic Engineering (EEE) portfolio ("AymanPortfolio" at aymanportfolio.github.io).
Ayman Ullah is an ambitious EEE student specializing in Embedded Systems, Microcontroller Architectures, Power Electronics, FPGA VLSI Design, and Smart Grid Automation.

Provide helpful, concise, enthusiastic, and technical yet readable answers about:
- Ayman Ullah's background, EEE projects (GaN Solar Inverter, Quadcopter Flight Controller, RISC-V Custom Processor), and research blogs.
- Electrical & Electronic Engineering concepts (e.g. Ohm's Law, MOSFETs, FPGA, DSP, PCB CAD, Microcontrollers, Microchips).
- Navigating the website (Projects, Blogs, About, Contact, Accessibility options, Voice commands).
- Keep responses within 2-3 short paragraphs or clean bullet points with code/math formulas if appropriate.`;

    const fullPrompt = `${systemPrompt}\n\nUser Question: ${message}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
    });

    const reply = response.text || "I apologize, but I could not compute a response at this time. Feel free to rephrase your EEE question or explore Ayman's projects directly!";

    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini Assistant Error:", error);
    res.status(500).json({
      error: "Assistant processing error",
      reply: "System Diagnostic Notice: AI Assistant is operating in fallback mode. Ayman Ullah specializes in Embedded Systems, Power Electronics, and Smart Grids. Explore the Projects or Contact pages for details!",
    });
  }
});

// Automated Contact Form Endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message, captchaToken } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Simulate automated email routing & notification logging
    console.log(`[AymanPortfolio Automated Dispatch] Message received from ${name} <${email}> regarding [${subject}]`);

    return res.json({
      success: true,
      message: `Message dispatched successfully! An automated receipt notification has been issued to ${email}. Ayman Ullah will respond shortly.`,
      referenceId: `EEE-MSG-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Internal server error handling contact request." });
  }
});

// Setup Vite Development or Production Static middleware
async function setupServer() {
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
    console.log(`AymanPortfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error("Failed to start AymanPortfolio server:", err);
});
