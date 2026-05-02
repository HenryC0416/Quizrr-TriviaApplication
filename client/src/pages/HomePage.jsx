import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



const categories = [
  { label: "Any category", value: "" },
  { label: "Music", value: "music" },
  { label: "Sport & Leisure", value: "sport_and_leisure" },
  { label: "Film & TV", value: "film_and_tv" },
  { label: "Arts & Literature", value: "arts_and_literature" },
  { label: "History", value: "history" },
  { label: "Society & Culture", value: "society_and_culture" },
  { label: "Science", value: "science" },
  { label: "Geography", value: "geography" },
  { label: "Food & Drink", value: "food_and_drink" },
  { label: "General Knowledge", value: "general_knowledge" },
];

export default function Home() {
  const [category, setCategory] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/quiz?category=${category}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-60 bg-white shadow-md p-6 flex flex-col">
        <h1 className="text-3xl font-bold text-indigo-600 mb-10">Quizrr</h1>

        <div className="flex flex-col gap-2">
          <button onClick={() => navigate("/")} className="text-left px-4 py-3 rounded-lg bg-indigo-100 text-indigo-700 font-semibold">
            Home
          </button>

          <button onClick={() => navigate("/results")} className="text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition font-medium">
            Results
          </button>
        </div>

        <div className="mt-auto">
          {user ? (
            <div>
              <p className="text-sm text-gray-500 mb-3"> Signed in as 
                <span className="font-bold"> {user.username}</span>
              </p>
              

              <button onClick={handleLogout} 
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                Logout
              </button>
            </div>
          ) : (

            <div className="flex flex-col gap-2">
              <button onClick={() => navigate("/login")} className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
                Login
              </button>

              <button onClick={() => navigate("/register")} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                Register
              </button>
            </div>
          )}

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center px-10">

        <h1 className="text-5xl font-bold mb-10 text-gray-800"> Welcome to Quizrr! </h1>
        <div className="flex items-start justify-center gap-20 w-full">

          {/* QUIZ CARD */}
          <div className="bg-white p-8 rounded-2xl shadow-md w-96">
            <label className="block mb-3 font-semibold text-gray-700">
              Select Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <button
              onClick={startQuiz}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold">
              Start Quiz
            </button>

            {!user && (<p className="text-xs text-gray-400 text-center mt-4"> Sign in to save your scores</p>)}
          </div>

          {/* RECENT SCORES */}
          {user && (
            <div className="bg-white p-8 rounded-2xl shadow-md w-96">
              <h2 className="text-2xl font-bold mb-5 text-gray-800"> Recent Scores </h2>
            </div>
          )}

        </div>
      </div>

    
    </div>
  );
}