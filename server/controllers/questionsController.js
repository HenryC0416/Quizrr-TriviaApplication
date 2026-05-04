export const getQuestions = async (req, res) => {
  try {
    const category = req.query.category;

    const url = category
      ? `https://the-trivia-api.com/api/questions?categories=${category}&limit=10`
      : `https://the-trivia-api.com/api/questions?limit=10`;

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
};

function shuffleChoices(choices) {
  return choices.sort(() => Math.random() - 0.5);
}