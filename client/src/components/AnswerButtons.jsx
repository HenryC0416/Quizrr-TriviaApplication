export default function AnswerButton({choice,onClick,disabled,color}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-2 mb-2 rounded border
        ${color === "green" ? "bg-green-400" : ""}
        ${color === "red" ? "bg-red-400" : ""}
        ${color === "white" ? "bg-gray-100 hover:bg-gray-200" : ""}
      `}>
      {choice}
    </button>
  );
}