const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Interview Coach backend is running!",
  });
});
app.post("/api/evaluate", (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({
      message: "Question and answer are required.",
    });
  }

  const evaluation = {
    relevance: 8,
    clarity: 7,
    technicalAccuracy: 8,
    communication: 7,
    overallScore: 7.5,
    feedback:
      "Good answer. Your response is relevant and understandable. Try adding a specific example to make your answer stronger.",
  };

  res.json(evaluation);
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});