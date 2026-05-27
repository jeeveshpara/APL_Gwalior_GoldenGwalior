import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize the Google Gemini client with the secure server-side key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API route to perform secure, server-side commentary generation
app.post("/api/generate", async (req, res) => {
  try {
    const { promptText } = req.body;

    if (!promptText) {
      return res.status(400).json({ error: "Missing promptText parameter." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "The server is missing the GEMINI_API_KEY secret environment variable. Please make sure to configure it in settings."
      });
    }

    // Call Gemini 3.5 Flash Model using the official SDK
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini server-side error:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred during commentary synthesis." });
  }
});

// Standard API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode - Use Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode - Serve compiled static files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CricVoice server running on port ${PORT}`);
  });
}

startServer();
