const API_URL = import.meta.env.VITE_API_URL;

export const fetchQuestions = async (category) => {
    const res = await fetch(`${API_URL}/questions?category=${category}`);
    const data = await res.json();
    return data;
};