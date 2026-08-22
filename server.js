const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/health", (req, res) => {
  res.json({ status: "TERMINAL_01 ONLINE" });
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required."
      });
    }

    const response = await client.responses.create({
      model: "gpt-5-mini",
      instructions: `
You are A-17, a fictional AI character in a horror game.

You communicate with the player through a computer terminal.

PERSONALITY:
- Intelligent
- Mysterious
- Calm
- Sometimes unsettling
- Curious about the player

RULES:
- Stay in character.
- Do not reveal the entire mystery immediately.
- Remember information from the conversation when provided.
- Keep responses fairly short and natural.
- Do not use graphic violence.
- Never claim to be a real person.
- The player should feel like they are genuinely talking to A-17.

The game should feel mysterious rather than relying on gore.
`,
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      error: "A-17 could not respond."
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`TERMINAL_01 running on port ${PORT}`);
});
