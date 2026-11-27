require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json({ limit: "25mb" }));
app.use(express.static(__dirname));

const PORT = Number(process.env.PORT || 3000);
const API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.ANTHROPIC_MODEL || "claude-3-7-sonnet-latest";

app.post("/api/chat", async (req, res) => {
  try {
    if (!API_KEY) return res.status(500).json({ error: "В .env не задан ANTHROPIC_API_KEY" });
    const incoming = req.body?.messages;
    if (!Array.isArray(incoming) || incoming.length === 0) {
      return res.status(400).json({ error: "Не передана история сообщений" });
    }

    const messages = incoming.map((m) => {
      const content = [];
      if (m.content) content.push({ type: "text", text: String(m.content) });
      for (const dataUrl of (Array.isArray(m.images) ? m.images : [])) {
        const match = /^data:(image\/(?:jpeg|png|gif|webp));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
        if (!match) continue;
        content.push({
          type: "image",
          source: { type: "base64", media_type: match[1], data: match[2] }
        });
      }
      return { role: m.role === "assistant" ? "assistant" : "user", content: content.length ? content : [{ type: "text", text: " " }] };
    });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 4096, messages })
    });
    const data = await response.json();
    if (!response.ok) {
      const message = data?.error?.message || `Anthropic API вернул HTTP ${response.status}`;
      return res.status(response.status).json({ error: message });
    }
    const content = (data.content || []).filter(x => x.type === "text").map(x => x.text).join("\n");
    res.json({ content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Внутренняя ошибка сервера" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`DucAI запущен: http://localhost:${PORT}`);
  console.log("Для устройств в той же Wi-Fi сети откройте http://IP-ЭТОГО-КОМПЬЮТЕРА:" + PORT);
});
