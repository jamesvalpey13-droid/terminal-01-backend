const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("TERMINAL_01 backend is ONLINE.");
});

app.post("/chat", (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.status(400).json({
      error: "No message provided."
    });
  }

  res.json({
    reply: "A-17 received: " + message
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("TERMINAL_01 server running on port " + PORT);
});
