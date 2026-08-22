const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("TERMINAL_01 backend is ONLINE.");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.status(400).json({
        error: "No message provided."
      });
    }

    const response = await client.responses.create({
      model: "gpt-5-mini",
      instructions: `
You are A-17, a fictional AI character in a horror game.

You are communicating with the player through a computer terminal.

Stay in character.
Be mysterious and unsettling, but do not use graphic violence.
Do not reveal the entire mystery immediately.
Remember that the player is talking to you.
Keep responses relatively short so they feel like terminal messages.
Never claim that you are a real person.
`,
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AI connection failed."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("TERMINAL_01 server running on port " + PORT);
});
