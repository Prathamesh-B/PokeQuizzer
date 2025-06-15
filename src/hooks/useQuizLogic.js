import { useState, useEffect } from "react";
import { DIFFICULTY_LEVELS } from "../constants/quizConfig";
import {
  getDifficultyRange,
  setupTypeQuestion,
  setupNameQuestion,
  setupGenerationQuestion,
} from "../utils/quizUtils";

export function useQuizLogic() {
  // Quiz configuration
  const [gameState, setGameState] = useState("setup");
  const [quizType, setQuizType] = useState("type");
  const [difficulty, setDifficulty] = useState("easy");

  // Quiz state
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(null);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [questionNum, setQuestionNum] = useState(1);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const currentDifficulty = DIFFICULTY_LEVELS.find((d) => d.id === difficulty);
  const totalQuestions = currentDifficulty.questions;

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0 && !result) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && !result) {
      handleChoice(null); // Time's up
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, result]);

  // Load question when questionNum changes or when starting
  useEffect(() => {
    if (gameState === "playing") {
      fetchQuestion();
    }
  }, [questionNum, gameState]);

  async function fetchQuestion() {
    setLoading(true);
    setTimeLeft(15); // Reset timer
    setSelectedChoice(null);
    setResult(null);
    setIsTimerActive(false); // Stop timer during loading

    try {
      const [minId, maxId] = getDifficultyRange(difficulty, quizType);
      const id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setQuestion(data);

      let questionData;
      if (quizType === "type") {
        questionData = await setupTypeQuestion(data);
      } else if (quizType === "name") {
        questionData = await setupNameQuestion(data, [minId, maxId]);
      } else if (quizType === "generation") {
        questionData = await setupGenerationQuestion(data);
      }

      setAnswer(questionData.answer);
      setChoices(questionData.choices);

      // Start timer after question is loaded
      setIsTimerActive(true);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
    setLoading(false);
  }

  function handleChoice(choice) {
    setIsTimerActive(false); // Stop timer immediately
    setSelectedChoice(choice);

    const isCorrect = choice === answer;
    setResult(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const newStreak = s + 1;
        setMaxStreak((max) => Math.max(max, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    // Automatically move to next question after 2 seconds
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  }

  function handleNextQuestion() {
    if (questionNum < totalQuestions) {
      setQuestionNum((n) => n + 1);
    } else {
      setGameState("results");
    }
  }

  function startQuiz() {
    setScore(0);
    setQuestionNum(1);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(15);
    setIsTimerActive(false);
    setGameState("playing");
  }

  function handleRestart() {
    setGameState("setup");
    setIsTimerActive(false);
  }

  return {
    // State
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

    // Methods
    handleChoice,
    startQuiz,
    handleRestart,
    fetchQuestion,
  };
}
