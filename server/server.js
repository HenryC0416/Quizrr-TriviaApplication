import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import scoreRoutes from "./routes/scoreRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/scores", scoreRoutes);
app.use("/", routes);
app.get("/", (req, res) => {
  res.send("Quizrr backend is running!");
});


app.get("/questions", async (req, res) => {
  try {
    const category = req.query.category;
    
    
    const url = `https://the-trivia-api.com/api/questions?categories=${category}&limit=10`;
  
    const response = await fetch(url);
    const data = await response.json();

    const formattedQuestions = data.map((q, index) => ({
      id: index,
      question: q.question,
      choices: shuffleChoices([...q.incorrectAnswers, q.correctAnswer]),
      answer: q.correctAnswer,
    }));

    res.json(formattedQuestions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function shuffleChoices(choices) {
  return choices.sort(() => Math.random() - 0.5);
}
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});