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

// API route to search and fetch the live running/recent cricket match of India / IPL
app.post("/api/live-match", async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "The server is missing the GEMINI_API_KEY. Please make sure to configure it."
      });
    }

    // Call Gemini with search grounding to find real running/most recent Tata IPL / Indian Cricket Match scorecard.
    const currentDate = "Sunday, May 31, 2026";
    const contentsText = `
You are a live cricket data researcher. Today's date is ${currentDate}.
Using Google Search, search for any ACTIVE live cricket match today (TATA IPL 2026, India national cricket team, or bilateral series). 
If there is no active live match playing right now on ${currentDate}, search for the most recently completed/concluded actual major match of India (Men's or Women's international, or TATA IPL 2026 playoffs/final) that was played today or in the last few days in late May 2026.
Retrieve real, authentic scorecard details including:
- Tournament name (like 'TATA IPL 2026' or 'ICC World Test Championship')
- Real team names (like CSK, RCB, KKR, MI, SRH, RR, India, or opponent nation)
- Current batting team and bowling team
- Scores and overs of both teams (e.g. scoreA: "182/4", oversA: "18.3")
- If the match is concluded or live, set isLive to true if playing now, or false if finished.
- Real player names of active batsmen on crease (e.g. Virat Kohli, etc.) with their real runs, balls faced, and strike rates.
- Real bowler name of the current over (e.g. Bumrah, Starc, etc.) with real overs bowled, runs conceded, wickets taken, and economy.
- The precise match situation or win/chase equation (e.g. "KKR won by 8 wickets with 57 balls remaining", or "RCB need 22 runs in 12 balls to win and qualify").
- Short, dramatic summary of the last ball action.
- The last 6 ball outcomes in the current over (like ["1", "4", "W", "2", "6", "1"]).

Return the parsed current state of this match strictly in the requested JSON structure. Do NOT use fake placeholder team names (such as "India IPL Team A") or generic players. Use real current matches and real actual player stats.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contentsText,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            tournament: { type: "STRING" },
            teamA: { type: "STRING" },
            teamB: { type: "STRING" },
            battingTeam: { type: "STRING" },
            bowlingTeam: { type: "STRING" },
            scoreA: { type: "STRING" },
            oversA: { type: "STRING" },
            scoreB: { type: "STRING" },
            oversB: { type: "STRING" },
            isLive: { type: "BOOLEAN" },
            batter1: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING" },
                runs: { type: "INTEGER" },
                balls: { type: "INTEGER" },
                sr: { type: "NUMBER" }
              }
            },
            batter2: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING" },
                runs: { type: "INTEGER" },
                balls: { type: "INTEGER" },
                sr: { type: "NUMBER" }
              }
            },
            bowler: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING" },
                overs: { type: "NUMBER" },
                runsAdded: { type: "INTEGER" },
                wickets: { type: "INTEGER" },
                econ: { type: "NUMBER" }
              }
            },
            situation: { type: "STRING" },
            lastBallEvent: { type: "STRING" },
            recentBalls: {
              type: "ARRAY",
              items: { type: "STRING" }
            }
          },
          required: ["tournament", "teamA", "teamB", "battingTeam", "bowlingTeam", "scoreA", "oversA", "scoreB", "oversB", "isLive", "batter1", "batter2", "bowler", "situation", "lastBallEvent", "recentBalls"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Live match fetch error:", error);
    res.status(500).json({ error: error.message || "Failed to retrieve live cricket scorecard." });
  }
});

// API route to procedurally simulate the next ball in real-time based on game context (infinite simulator)
app.post("/api/live-next-ball", async (req, res) => {
  try {
    const { gameState } = req.body;
    if (!gameState) {
      return res.status(400).json({ error: "Missing gameState parameter." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY." });
    }

    const prompt = `
You are a real-time live cricket sports simulator. Based on the current match state, dynamically generate the NEXT single delivery (1 ball) of this over.
Do not use pre-defined text/scenarios. Make it highly realistic, situational, and dramatic.

Game Context:
Tournament: ${gameState.tournament}
Matchup: ${gameState.teamA} vs ${gameState.teamB}
Current Batting Team: ${gameState.battingTeam} is currently at: ${gameState.scoreCurrent} in ${gameState.oversCurrent} overs.
Batter 1 (Facing): ${gameState.batter1.name} (${gameState.batter1.runs} runs off ${gameState.batter1.balls} balls)
Batter 2 (Non-facing): ${gameState.batter2.name} (${gameState.batter2.runs} runs off ${gameState.batter2.balls} balls)
Bowler Bowling: ${gameState.bowler.name} (${gameState.bowler.overs} overs, ${gameState.bowler.runsAdded} runs, ${gameState.bowler.wickets} wickets)
Situation Description: ${gameState.situation}
Recent balls in this over so far: ${JSON.stringify(gameState.recentBalls)}

Your tasks:
1. Decide the outcome of this ball (e.g., 0 runs, 1 run, 2 runs, 4 runs boundary, 6 runs boundaries, a Wide, an extra No-Ball, or a Wicket such as Caught, Bowled, LBW, Run Out). Make it fit the match pressure situation!
2. Write a detailed, exciting, and high-energy live commentary action detailing that single ball (e.g. "Bumrah fires in a scorching yorker at 145 clicks! Dhoni swings, gets a thick inside edge that flies down past short fine leg for a quick boundary!"). Keep it in English and under 220 characters.
3. Update the scorecard scores:
   - If it's a legal delivery, advance oversCurrent by 0.1 (e.g. from 18.2 to 18.3. Note: if ball is the 6th delivery e.g. .5, it rolls over to next whole number .0, e.g. 18.5 -> 19.0).
   - If it's a Wide ('wd') or No-Ball ('nb'), add +1 run (and any runs scored on it) to scoreCurrent, and add to bowler.runsAdded, but DO NOT advance oversCurrent ball count.
   - Update batsman stats (adds runs and balls faced). Note: If batsmen score odd runs (1, 3) or it is over-end (.0), swap facing/non-facing batsmen in the batting team context.
   - Update bowler stats adding balls (+1 ball if legal), runsAdded, and wickets (if wicket fell and was not a run-out).
   - Update the situation to reflect new runs/balls needed if chasing, or general scorecard pressure.
   - Append ballOutcome code to recentBalls (e.g. "0", "1", "2", "4", "6", "W", "wd"). If an over concluded, reset recentBalls to a new empty list or start of the new over of balls.

Return the brand-new, updated game state scorecard strictly in the requested JSON structure.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            scoreCurrent: { type: "STRING" },
            oversCurrent: { type: "STRING" },
            batter1: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING" },
                runs: { type: "INTEGER" },
                balls: { type: "INTEGER" },
                sr: { type: "NUMBER" }
              }
            },
            batter2: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING" },
                runs: { type: "INTEGER" },
                balls: { type: "INTEGER" },
                sr: { type: "NUMBER" }
              }
            },
            bowler: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING" },
                overs: { type: "NUMBER" },
                runsAdded: { type: "INTEGER" },
                wickets: { type: "INTEGER" },
                econ: { type: "NUMBER" }
              }
            },
            situation: { type: "STRING" },
            lastBallEvent: { type: "STRING" },
            recentBalls: {
              type: "ARRAY",
              items: { type: "STRING" }
            },
            ballOutcome: { type: "STRING" }
          },
          required: ["scoreCurrent", "oversCurrent", "batter1", "batter2", "bowler", "situation", "lastBallEvent", "recentBalls", "ballOutcome"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Procedural ball simulation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate next delivery snapshot." });
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
