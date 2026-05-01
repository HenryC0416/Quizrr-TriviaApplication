import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import AnswerButton from "../components/AnswerButtons";
import { fetchQuestions } from "../services/api";
import FinishScreen from "../components/FinishScreen";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(10);
  const [saved, setSaved] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();
  

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  
  useEffect(() => {
    fetchQuestions(category)
      .then(setQuestions)
      .catch(console.error);
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
      setSelected(null);
      setCurrentIndex(prev => prev + 1);
      setTime(10); 
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
  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setTime(10);
  };
 


  const getButtonColor = (choice) => {
    if (selected === null) return "white";
    if (choice === currentQuestion.answer) return "green";
    if (choice === selected) return "red";
    return "white";
  };

 const quizFinished = currentIndex >= questions.length && questions.length > 0;

  useEffect(() => {
    if (!quizFinished || !user || saved) return;

    const saveScore = async () => {
      try {
        setSaved(true);

        const res = await fetch("http://localhost:3001/scores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId: user.id,
            category,
            value: score,
          }),
        });

        const data = await res.json();
        
      } catch (err) {
        console.error("Failed to save score:", err);
      }
    };

    saveScore();

  }, [quizFinished, user, saved, category, score]);

  if (currentIndex >= questions.length) {
    return (
      <FinishScreen
        score={score}
        total={questions.length}
        onRestart={handleRestart}
        onHome={() => navigate("/")}
      />
    );
  }

  if (!questions.length) {
  return <div className="text-center mt-10">Loading questions...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-bold mb-2" >Question {currentIndex + 1}</h2>
        <p className="mb-4">{currentQuestion.question}</p>
        <p className="mb-2 font-semibold">Time left: {time} Seconds</p>
        <QuestionCard >
          {currentQuestion.choices.map(choice => (
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