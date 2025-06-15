import { QUIZ_TYPES, DIFFICULTY_LEVELS } from "../constants/quizConfig";

const QuizSetup = ({
  quizType,
  setQuizType,
  difficulty,
  setDifficulty,
  onStartQuiz,
}) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 overflow-y-auto px-3 pt-1 pb-4">
      {/* Quiz Type Selection */}
      <div className="w-full max-w-md">
        <h3 className="font-poke mb-3 text-lg text-gray-700">Quiz Type</h3>
        <div className="grid gap-2">
          {QUIZ_TYPES.map((type) => (
            <button
              key={type.id}
              className={`font-lexend rounded-lg border-2 p-3 text-left transition-all ${
                quizType === type.id
                  ? "border-poke-red-500 bg-poke-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setQuizType(type.id)}
            >
              <div className="font-semibold">{type.name}</div>
              <div className="text-sm text-gray-600">{type.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="w-full max-w-md">
        <h3 className="font-poke mb-3 text-lg text-gray-700">Difficulty</h3>
        <div className="grid grid-cols-3 gap-2">
          {DIFFICULTY_LEVELS.map((level) => (
            <button
              key={level.id}
              className={`font-lexend rounded-lg border-2 p-3 text-center transition-all ${
                difficulty === level.id
                  ? "border-poke-blue-500 bg-poke-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setDifficulty(level.id)}
            >
              <div className="font-semibold capitalize">{level.name}</div>
              <div className="text-xs text-gray-600">
                {level.questions} questions
              </div>
              <div className="text-xs text-gray-500">
                Pokémon #{level.range[0]}-{level.range[1]}
              </div>
            </button>
          ))}
        </div>
      </div>

      <button className="red-btn" onClick={onStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default QuizSetup;
