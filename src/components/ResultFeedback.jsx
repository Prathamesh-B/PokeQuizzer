import { formatChoice } from "../utils/quizUtils";

const ResultFeedback = ({ result, answer, quizType }) => {
  if (!result) return null;

  return (
    <div className="mt-6 text-center">
      <div
        className={`mb-4 text-xl font-bold ${
          result === "correct" ? "text-green-600" : "text-red-600"
        }`}
      >
        {result === "correct"
          ? "✅ Correct!"
          : `❌ Wrong! It was ${formatChoice(answer, quizType)}`}
      </div>
    </div>
  );
};

export default ResultFeedback;
