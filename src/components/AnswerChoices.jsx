import { formatChoice } from "../utils/quizUtils";

const AnswerChoices = ({
  choices,
  onChoice,
  result,
  selectedChoice,
  answer,
  quizType,
}) => {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 gap-4 px-6">
      {choices.map((choice) => (
        <button
          key={choice}
          className={`h-14 rounded-xl border-2 text-base font-semibold shadow-md transition-all duration-200 ${
            result && choice === answer
              ? "scale-105 border-green-500 bg-green-500 text-white"
              : result && selectedChoice === choice && choice !== answer
                ? "border-red-500 bg-red-500 text-white"
                : result
                  ? "border-gray-300 bg-gray-100 text-gray-700 opacity-50"
                  : "border-gray-300 bg-white text-gray-700 hover:scale-102 hover:border-gray-400 hover:bg-gray-50"
          }`}
          onClick={() => !result && onChoice(choice)}
          disabled={!!result}
        >
          {formatChoice(choice, quizType)}
        </button>
      ))}
    </div>
  );
};

export default AnswerChoices;
