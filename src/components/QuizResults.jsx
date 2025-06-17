const QuizResults = ({
  score,
  totalQuestions,
  maxStreak,
  onPlayAgain,
  onChangeSettings,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  let performance = "";
  if (percentage >= 90) performance = "Outstanding! 🏆";
  else if (percentage >= 70) performance = "Great job! 🌟";
  else if (percentage >= 50) performance = "Good effort! 👍";
  else performance = "Keep practicing! 💪";

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-3 pt-1 pb-4">
      <div className="text-center">
        <h2 className="text-poke-blue-700 font-poke mb-2 text-3xl">
          Quiz Complete!
        </h2>
        <p className="font-lexend text-xl text-gray-700">{performance}</p>
      </div>

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="space-y-4 text-center">
          <div>
            <div className="text-poke-red font-poke text-4xl">
              {score}/{totalQuestions}
            </div>
            <div className="font-lexend text-gray-600">Correct Answers</div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="font-poke text-2xl text-blue-600">
                {percentage}%
              </div>
              <div className="font-lexend text-sm text-gray-600">Accuracy</div>
            </div>
            <div>
              <div className="font-poke text-2xl text-green-600">
                {maxStreak}
              </div>
              <div className="font-lexend text-sm text-gray-600">
                Best Streak
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          className="font-lexend bg-poke-blue hover:bg-poke-blue-600 rounded-4xl px-6 py-3 text-white transition-colors"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
        <button
          className="font-lexend rounded-4xl bg-gray-500 px-6 py-3 text-white transition-colors hover:bg-gray-600"
          onClick={onChangeSettings}
        >
          Change Settings
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
