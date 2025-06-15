import PokemonDisplay from "./PokemonDisplay";
import QuestionText from "./QuestionText";
import AnswerChoices from "./AnswerChoices";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import ResultFeedback from "./ResultFeedback";

const QuizQuestion = ({
  question,
  choices,
  quizType,
  onChoice,
  result,
  selectedChoice,
  answer,
  questionNum,
  totalQuestions,
  score,
  streak,
  loading,
  timeLeft,
}) => {
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-poke-red-700 text-lg font-bold">
          Loading question...
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto px-3 pt-1 pb-4">
      <div className="mb-4 flex w-full max-w-2xl items-center justify-between">
        <ProgressBar
          questionNum={questionNum}
          totalQuestions={totalQuestions}
          score={score}
          streak={streak}
        />
        <Timer timeLeft={timeLeft} />
      </div>

      <PokemonDisplay question={question} quizType={quizType} result={result} />

      <QuestionText question={question} quizType={quizType} />

      <AnswerChoices
        choices={choices}
        onChoice={onChoice}
        result={result}
        selectedChoice={selectedChoice}
        answer={answer}
        quizType={quizType}
      />

      <ResultFeedback result={result} answer={answer} quizType={quizType} />
    </div>
  );
};

export default QuizQuestion;
