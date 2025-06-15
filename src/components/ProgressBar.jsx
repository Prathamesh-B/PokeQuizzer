const ProgressBar = ({ questionNum, totalQuestions, score, streak }) => {
  return (
    <>
      {/* Progress and Stats Bar */}
      <div className="mt-1 flex w-full max-w-2xl items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-md font-semibold text-gray-700">
            Question {questionNum}/{totalQuestions}
          </div>
          <div className="text-sm text-gray-600">Score: {score}</div>
          {streak > 1 && (
            <div className="text-sm font-semibold text-orange-600">
              🔥 {streak} streak
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {/* <div className="mb-6 w-full max-w-2xl">
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="bg-poke-red h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNum / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div> */}
    </>
  );
};

export default ProgressBar;
