import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      navigate("/");
      localStorage.setItem("user", JSON.stringify(data.user));
      const user = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const displayError = () =>
    `p-2 rounded-lg border ${
      error 
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-indigo-500"
    } focus:outline-none focus:ring-2`;
    
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[350px] p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-semibold mb-5">
          Welcome Back
        </h2>

        
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>  
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className={displayError()}
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(""); 
            }}
          />

          <input
            className={displayError()}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(""); 
            }}
          />

          <button
            className="p-2 rounded-lg bg-green-600 text-white mt-2 hover:bg-green-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {"Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}