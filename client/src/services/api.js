export const fetchQuestions = async (category) => {
    const res = await fetch(`http://localhost:3001/questions?category=${category}`);
    const data = await res.json();
    return data;
};