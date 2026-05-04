import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white shadow-md p-6 flex flex-col">
      <h1 className="text-3xl font-bold text-indigo-600 mb-10">Quizrr</h1>

      <div className="flex flex-col gap-2">
        <button onClick={() => navigate("/")}
          className="text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
        >
          Home
        </button>

        <button onClick={() => navigate("/results")}
          className="text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
        >
          Results
        </button>
      </div>

      <div className="mt-auto">
        {user ? (
          <>
            <p className="text-sm text-gray-500 mb-3">Signed in as</p>

            <p className="font-semibold mb-4">
              {user.username}
            </p>

            <button onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <button onClick={() => navigate("/login")}
              className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Login
            </button>

            <button onClick={() => navigate("/register")}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}