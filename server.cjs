var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server/server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var app = (0, import_express.default)();
var PORT = 3e3;
app.use((0, import_cors.default)());
app.use(import_express.default.json());
var GEMINI_API_KEY = process.env.GEMINI_API_KEY;
var ai = new import_genai.GoogleGenAI({
  apiKey: GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
app.get("/api/stock/price", async (req, res) => {
  const { symbol } = req.query;
  if (!symbol || typeof symbol !== "string") {
    res.status(400).json({ error: "Stock symbol is required" });
    return;
  }
  if (!GEMINI_API_KEY) {
    res.status(500).json({
      error: "Gemini API key is not configured. Please add it via Settings > Secrets."
    });
    return;
  }
  const prompt = `
    Act as a real-time stock price provider. For the Indian stock with the NSE symbol "${symbol}", find the absolute latest, up-to-the-minute market price.
    If the market is currently open, provide the live trading price. If it is closed, provide the most recent closing price.
    Respond with only a valid JSON object. Do not include any text, explanations, or markdown formatting outside of the JSON object.

    The JSON schema should be:
    {
      "price": "number" // The latest known market price in INR.
    }
  `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            price: { type: import_genai.Type.NUMBER, description: "The latest known market price in INR" }
          },
          required: ["price"]
        }
      }
    });
    const jsonText = response.text ? response.text.trim() : "";
    const data = JSON.parse(jsonText);
    if (typeof data.price !== "number" || data.price <= 0) {
      throw new Error("Invalid price received from Gemini.");
    }
    res.json({ price: data.price });
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    res.status(500).json({
      error: `Failed to fetch price for ${symbol}. Please enter it manually or ensure your API key is correct.`
    });
  }
});
app.post("/api/stock/recommendations", async (req, res) => {
  const { lossAmount } = req.body;
  if (typeof lossAmount !== "number") {
    res.status(400).json({ error: "lossAmount is required and must be a number" });
    return;
  }
  if (!GEMINI_API_KEY) {
    res.status(500).json({
      error: "Gemini API key is not configured. Please add it via Settings > Secrets."
    });
    return;
  }
  const prompt = `
    You are an expert financial analyst for the Indian stock market. A user is holding a stock with an unrealized loss of ${Math.abs(lossAmount).toFixed(2)} INR.

    Your task is to recommend 3 to 5 Indian stocks that present a potential recovery opportunity. Use the Relative Strength Index (RSI) strategy to identify these stocks from the National Stock Exchange (NSE).
    - For 'Oversold' opportunities (potential to buy), find stocks with a 14-day RSI below 30.
    - For 'Overbought' opportunities (potential to watch for a pullback or avoid), find stocks with a 14-day RSI above 70.

    For each recommended stock, provide the following information in a valid JSON array. Do not include any text, explanations, or markdown formatting outside of the JSON array. Use real-time or the most recent data available.

    The JSON schema for each object in the array should be:
    {
      "stock_symbol": "string", // The NSE stock symbol (e.g., "RELIANCE.NS")
      "company_name": "string", // The full company name
      "current_price": "number", // The latest known market price in INR
      "rsi_value": "number", // The current 14-day RSI value
      "strategy": "string", // Either "Oversold" or "Overbought"
      "recommendation_reason": "string" // A brief explanation of why this stock is a potential opportunity based on its RSI and fundamentals.
    }
  `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.ARRAY,
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              stock_symbol: { type: import_genai.Type.STRING, description: "The NSE stock symbol" },
              company_name: { type: import_genai.Type.STRING, description: "The full company name" },
              current_price: { type: import_genai.Type.NUMBER, description: "The latest known market price in INR" },
              rsi_value: { type: import_genai.Type.NUMBER, description: "The current 14-day RSI value" },
              strategy: { type: import_genai.Type.STRING, description: "Either 'Oversold' or 'Overbought'" },
              recommendation_reason: { type: import_genai.Type.STRING, description: "Brief explanation for the recommendation" }
            },
            required: [
              "stock_symbol",
              "company_name",
              "current_price",
              "rsi_value",
              "strategy",
              "recommendation_reason"
            ]
          }
        }
      }
    });
    const jsonText = response.text ? response.text.trim() : "";
    const recommendations = JSON.parse(jsonText);
    res.json(recommendations);
  } catch (error) {
    console.error("Error fetching stock recommendations:", error);
    res.status(500).json({ error: "Failed to fetch stock recommendations from Gemini API." });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
