import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import AnswerButton from "../components/AnswerButtons";
import { fetchQuestions } from "../services/api";
import FinishScreen from "../components/FinishScreen";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(10);
  const [saved, setSaved] = useState(false);

  const { user, token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  useEffect(() => {
    fetchQuestions(category).then(setQuestions).catch(console.error);
  }, [category]);

  // Countdown timer
  useEffect(() => {
    if (selected) return;
    const timer = setInterval(() => {
      setTime((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex, selected]);

  // Auto-advance when timer hits 0
  useEffect(() => {
    if (time === 0) {
      setSelected(null);
      setCurrentIndex((prev) => prev + 1);
      setTime(10);
    }
  }, [time]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (choice) => {
    if (selected) return;
    setSelected(choice);
    if (choice === currentQuestion.answer) {
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      setSelected(null);
      setCurrentIndex((prev) => prev + 1);
      setTime(10);
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setTime(10);
    setSaved(false);
  };

  const getButtonColor = (choice) => {
    if (selected === null) return "white";
    if (choice === currentQuestion.answer) return "green";
    if (choice === selected) return "red";
    return "white";
  };

 const quizFinished = currentIndex >= questions.length && questions.length > 0;

  useEffect(() => {
    if (!quizFinished || !user || !token || saved) return;

    const saveScore = async () => {
      try {
        setSaved(true);
        await fetch(`${API_URL}/scores`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: user.id, category, value: score }),
        });
      } catch (err) {
        console.error("Failed to save score:", err);
      }
    };

    saveScore();
  }, [quizFinished, user, token, saved, category, score]);

 
  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">Loading questions...</p>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <FinishScreen
        score={score}
        total={questions.length}
        onRestart={handleRestart}
        onHome={() => navigate("/")}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-bold mb-2">
          Question {currentIndex + 1} / {questions.length}
        </h2>
        <p className="mb-4">{currentQuestion.question}</p>
        <p className="mb-2 font-semibold">
          Time left:
          <span className={time <= 3 ? "text-red-500" : ""}> {time}s</span>
        </p>
        <QuestionCard>
          {currentQuestion.choices.map((choice) => (
            <AnswerButton
              key={choice}
              choice={choice}
              onClick={() => handleAnswer(choice)}
              disabled={selected !== null}
              color={getButtonColor(choice)}
            />
          ))}
        </QuestionCard>
        <p className="mt-4 font-semibold">Score: {score}</p>
      </div>
    </div>
  );
}