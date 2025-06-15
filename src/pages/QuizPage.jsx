import React from "react";
import QuizSetup from "../components/QuizSetup";
import QuizQuestion from "../components/QuizQuestion";
import QuizResults from "../components/QuizResults";
import { useQuizLogic } from "../hooks/useQuizLogic";

function QuizPage() {
  const {
    gameState,
    quizType,
    setQuizType,
    difficulty,
    setDifficulty,
    loading,
    question,
    choices,
    answer,
    result,
    score,
    questionNum,
    streak,
    maxStreak,
    selectedChoice,
    totalQuestions,
    timeLeft,
    handleChoice,
    startQuiz,
    handleRestart,
  } = useQuizLogic();

  if (gameState === "setup") {
    return (
      <QuizSetup
        quizType={quizType}
        setQuizType={setQuizType}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        onStartQuiz={startQuiz}
      />
    );
  }

  if (gameState === "results") {
    return (
      <QuizResults
        score={score}
        totalQuestions={totalQuestions}
        maxStreak={maxStreak}
        onPlayAgain={startQuiz}
        onChangeSettings={handleRestart}
      />
    );
  }

  return (
    <QuizQuestion
      question={question}
      choices={choices}
      quizType={quizType}
      onChoice={handleChoice}
      result={result}
      selectedChoice={selectedChoice}
      answer={answer}
      questionNum={questionNum}
      totalQuestions={totalQuestions}
      score={score}
      streak={streak}
      loading={loading}
      timeLeft={timeLeft}
    />
  );
}

export default QuizPage;
