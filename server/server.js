const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Quizrr backend is running!");
});


app.get("/questions", async (req, res) => {
  try {
    const category = req.query.category;
    let url = "https://the-trivia-api.com/api/questions?limit=10";
    if (category) {
      url = `https://the-trivia-api.com/api/questions?categories=${category}&limit=10`;
    }
    const response = await fetch(url);
    const data = await response.json();

    const formattedQuestions = data.map((q, index) => ({
      id: index,
      question: q.question,
      choices: [...q.incorrectAnswers, q.correctAnswer]
        .sort(() => Math.random() - 0.5),
      answer: q.correctAnswer,
    }));

    res.json(formattedQuestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});