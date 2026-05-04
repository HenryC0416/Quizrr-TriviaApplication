import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

const API_URL = import.meta.env.VITE_API_URL;

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
  const [scores, setScores] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/quiz?category=${category}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (!user) return;

    const fetchScores = async () => {
      try {
        const res = await fetch(`${API_URL}/scores`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data.error);
          return;
        }

        setScores(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScores();
  }, [user]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* SIDEBAR */}
      <Sidebar />

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

              {scores.length === 0 ? (
                <p className="text-gray-500"> No scores yet</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {scores.slice(0, 5).map((score) => (
                    <div key={score.id}
                      className="border border-gray-200 rounded-xl p-4 flex justify-between items-center"
                    >
                      <div>
                        {score.category === "" ? (
                          <p className="capitalize font-semibold text-gray-700">
                            Any Category
                          </p>
                        ) : (
                          <p className="capitalize font-semibold text-gray-700">
                            {score.category.replaceAll("_", " ")}
                          </p>
                        )}

                        <p className="text-xs text-gray-400">
                          {new Date(score.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-xl font-bold text-indigo-600">
                        {score.value}/10
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

    
    </div>
  );
}