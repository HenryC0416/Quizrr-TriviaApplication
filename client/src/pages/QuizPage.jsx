import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(10);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const navigate = useNavigate();
  // Fetches Questions from server
  useEffect(() => {
    fetch(`http://localhost:3001/questions?category=${category}`)
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
  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setTime(10);
  };
 if (currentIndex >= questions.length) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md text-center">

        <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>

        <p className="mb-4 text-lg">
          Your score: {score} / {questions.length}
        </p>

        <button
          onClick={handleRestart}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
        >
          Play Again
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Home
        </button>

      </div>
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-bold mb-2" >Question {currentIndex + 1}</h2>
        <p className="mb-4">{currentQuestion.question}</p>
        <p className="mb-2 font-semibold">Time left: {time} Seconds</p>
        {currentQuestion.choices.map(choice => (
          <button
            disabled={selected !== null}
            key={choice}
            onClick={() => handleAnswer(choice)}
             className={`w-full p-2 mb-2 rounded border transition 
              ${getButtonColor(choice) === "green" ? "bg-green-400" : ""}
              ${getButtonColor(choice) === "red" ? "bg-red-400" : ""}
              ${getButtonColor(choice) === "white" ? "bg-gray-100 hover:bg-gray-200" : ""}
             `}>
            {choice}
          </button>
        ))}

        <p className="mt-4 font-semibold">Score: {score}</p>
      </div>
    </div>
  );
}