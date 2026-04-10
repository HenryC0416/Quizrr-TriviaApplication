import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react"; 

export default function Home() {
  const [category, setCategory] = useState("");
    const categories = [
    " ",
    "music",
    "sport_and_leisure" ,
    "film_and_tv",
    "arts_and_literature",
    "history",
    "society_and_culture",
    "science",
    "geography",
    "food_and_drink",
    "general_knowledge",
  ];
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/quiz?category=${category}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Quizrr!</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <label className="block mb-2 font-semibold">Select Category:</label>

        <select value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded mb-4" 
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button onClick={startQuiz}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Start Quiz
        </button>
    </div>
  </div>
);
}