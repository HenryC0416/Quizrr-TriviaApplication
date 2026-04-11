export default function FinishScreen({ score, total, onRestart, onHome }) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
      <p className="mb-4"> Your score: {score} / {total}  </p>

      <button onClick={onRestart} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        Play Again
      </button>

      <button onClick={onHome} className="bg-gray-500 text-white px-4 py-2 rounded">
        Home
      </button>
    </div>
  );
}