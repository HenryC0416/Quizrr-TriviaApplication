import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Quizrr!</h1>
      <Link to="/quiz">Start Quiz</Link>
    </div>
  );
}