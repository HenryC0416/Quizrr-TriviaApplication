import { useEffect, useState } from "react";

export default function Quiz() {
      const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/questions?category=science")
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Quiz</h2>
      {questions.map(q => (
        <div key={q.id}>
          <p>{q.question}</p>
          <ul>
            {q.choices.map(c => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}