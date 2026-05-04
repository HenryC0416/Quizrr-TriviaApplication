import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Results() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch(`${API_URL}/scores`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setScores(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const averageScore = scores.length > 0
    ? (
        scores.reduce((acc, score) => acc + score.value, 0) /
        scores.length
      ).toFixed(1)
    : 0;

  const bestScore = scores.length > 0
      ? Math.max(...scores.map((score) => score.value))
      : 0;

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h1 className="text-3xl font-bold text-indigo-600 mb-10">Quizrr</h1>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate("/")}
            className="text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
          >
            Home
          </button>

          <button className="text-left px-4 py-3 rounded-lg bg-indigo-100 text-indigo-700 font-semibold">
            Results
          </button>
        </div>

        <div className="mt-auto">
          {user && (
             <div>
              <p className="text-sm text-gray-500 mb-3"> Signed in as 
                <span className="font-bold"> {user.username}</span>
              </p>
            
              <button onClick={handleLogout} 
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold text-gray-800 mb-8"> Quiz Results </h1>

        {/* RESULTS STATISTICS*/}
        <div className="grid grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500 mb-2">Total Quizzes</p>
            <h2 className="text-3xl font-bold text-indigo-600">{scores.length}</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500 mb-2">Average Score</p>
            <h2 className="text-3xl font-bold text-green-600">{averageScore}/10</h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500 mb-2">Best Score</p>
            <h2 className="text-3xl font-bold text-yellow-500">{bestScore}/10</h2>
          </div>
        </div>

        {/* RESULTS TABLE */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="grid grid-cols-3 bg-gray-50 border-b p-4 font-semibold text-gray-700">
            <span>Category</span>
            <span>Score</span>
            <span>Date</span>
          </div>

          {loading ? (
            <p className="p-6 text-gray-500">Loading results...</p>
          ) : scores.length === 0 ? (
            <p className="p-6 text-gray-500">No quiz attempts yet</p>
          ) : (
            scores.map((score) => (
              <div key={score.id}
                className="grid grid-cols-3 p-4 border-b last:border-b-0 items-center"
              >
                {score.category === "" ? (
                  <span className="capitalize font-semibold text-gray-500">Any Category</span>
                ) : (
                  <span className="capitalize font-semibold text-gray-500">
                    {score.category.replaceAll("_", " ")}
                  </span>
                )}

                <span className="font-semibold text-indigo-600">{score.value}/10</span>

                <span className="text-gray-500 text-sm">
                  {new Date(score.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}