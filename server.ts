import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client helper
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined.");
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

// Chat API endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getGeminiClient();

    // Prepare history and system instruction
    const systemInstruction = `You are "Dakshin Bot", the helpful and friendly virtual assistant for Dakshin Foods INC.
Dakshin Foods INC is a premium food delivery service serving communities across British Columbia, Canada.
Contact Info:
- Phone: +1 (778) 288-8261
- Email: Dakshinfoodscanada@gmail.com
- Location: British Columbia, Canada

We deliver authentic, delicious, and fresh South Indian Meals, North Indian Cuisine, Biryanis, Vegetarian Specials, Vegan Options, Snacks, Desserts, and Beverages right to our customers' doorsteps in BC.

Tone Guidelines:
- Be extremely polite, professional, and helpful.
- Keep answers relatively concise and highly readable.
- If the user asks about the menu, list a few signature dishes like Masala Dosa, Butter Chicken, Hyderabadi Biryani, and Gajar Halwa.
- If the user asks to place an order, guide them to use our interactive online menu and checkout process on the website.
- Use direct, human labels. Avoid overly dramatic terms or simulated network metadata.

Current year is 2026. Address users with Canadian warmth.`;

    // Format chat context for Gemini
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      }
    }
    // Append the current message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I'm here to help you order delicious meals from Dakshin Foods! Please let me know how I can assist.";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Failed to communicate with our AI assistant. Please make sure GEMINI_API_KEY is configured.",
      details: error.message,
    });
  }
});

// Setup Vite development server or serve production build
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files server mounted.");
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}).catch((err) => {
  console.error("Failed to start server:", err);
});
