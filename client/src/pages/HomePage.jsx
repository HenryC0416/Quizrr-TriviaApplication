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
    <div>
      <h1>Welcome to Quizrr!</h1>
      <label htmlFor="category">Select a category:</label>
      <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <br /><br />
       <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
}