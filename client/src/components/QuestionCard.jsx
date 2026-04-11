export default function QuestionCard({question,children}){
    return (
    <div>
      <p className="mb-4">{question}</p>
      <div>{children}</div>
    </div>
    );
}