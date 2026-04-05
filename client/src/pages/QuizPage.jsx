import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(10);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  // Fetches Questions from server
  useEffect(() => {
    fetch("http://localhost:3001/questions?category=${category}")
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error(err));
  }, [category]);

  // Sets Countdown timer
  useEffect(() => {
    if (selected) return;
      const timer = setInterval(() => {
      setTime(t => t-1);
    },1000);
    return () => clearInterval(timer);
  },[currentIndex,selected]);
  // Moves to next questions when timer runs out
  useEffect(() => {
    if (time === 0) {
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => {
      setSelected(null);
      setCurrentIndex(prev => prev + 1);
      setTime(10); 
  }, 1000);
    }
  }, [time]);

  
  const currentQuestion = questions[currentIndex];

  const handleAnswer = (choice) => {
    if (selected) {
      return;
    }
    setSelected(choice);
    if (choice === currentQuestion.answer) {
      setScore(score + 1);
    }
     setTimeout(() => {
      setSelected(null);
      setCurrentIndex(prev => prev + 1);
      setTime(10); 
    }, 1000);
  };

  if (currentIndex >= questions.length) {
    return (
      <div>
        <h2>Quiz Finished!</h2>
        <p>Your score: {score} / {questions.length}</p>
      </div>
    );
  }


  const getButtonColor = (choice) => {
    if (selected === null) return "white";
    if (choice === currentQuestion.answer) return "green";
    if (choice === selected) return "red";
    return "white";
  };

  return (
    <div>
      <h2>Question {currentIndex + 1}</h2>
      <p>{currentQuestion.question}</p>
      <p>Time left: {time}</p>
      {currentQuestion.choices.map(choice => (
        <button
          disabled={selected !== null}
          key={choice}
          onClick={() => handleAnswer(choice)}
          style={{
            display: "block",
            margin: "10px",
            padding: "10px",
            backgroundColor: getButtonColor(choice),
          }}
        >
          {choice}
        </button>
      ))}

      <p>Score: {score}</p>
    </div>
  );
}