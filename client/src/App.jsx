import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/HomePage";
import Quiz from "./pages/QuizPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Results from "./pages/ResultsPage";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz" element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              }
          />
          <Route path="/results" element={
              <ProtectedRoute>
                  <Results />
                </ProtectedRoute>
              }
         />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;