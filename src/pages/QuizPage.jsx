import React from "react";
import screen from "../assets/screen_bg.svg";
import red_led from "../assets/red_led.svg";
import yellow_led from "../assets/yellow_led.svg";
import green_led from "../assets/green_led.svg";

const QUIZ_TYPES = [
  {
    id: "type",
    name: "Type Quiz",
    description: "Guess the Pokémon's primary type",
  },
  { id: "name", name: "Name Quiz", description: "Guess the Pokémon's name" },
  {
    id: "generation",
    name: "Generation Quiz",
    description: "Guess which generation this Pokémon is from",
  },
];

const DIFFICULTY_LEVELS = [
  { id: "easy", name: "Easy", range: [1, 151], questions: 5 },
  { id: "medium", name: "Medium", range: [1, 386], questions: 8 },
  { id: "hard", name: "Hard", range: [1, 809], questions: 10 },
];

const GENERATIONS = [
  { name: "Generation I (Kanto)", range: [1, 151] },
  { name: "Generation II (Johto)", range: [152, 251] },
  { name: "Generation III (Hoenn)", range: [252, 386] },
  { name: "Generation IV (Sinnoh)", range: [387, 493] },
  { name: "Generation V (Unova)", range: [494, 649] },
  { name: "Generation VI (Kalos)", range: [650, 721] },
  { name: "Generation VII (Alola)", range: [722, 809] },
];

function getDifficultyRange(difficulty, quizType) {
  const baseDifficulty = DIFFICULTY_LEVELS.find((d) => d.id === difficulty);

  if (quizType === "generation") {
    // For generation quiz, ensure we have multiple generations
    switch (difficulty) {
      case "easy":
        return [1, 251]; // Gen 1-2
      case "medium":
        return [1, 493]; // Gen 1-4
      case "hard":
        return [1, 809]; // All generations
    }
  }

  return baseDifficulty.range;
}

function QuizPage() {
  // Quiz configuration
  const [gameState, setGameState] = React.useState("setup"); // 'setup', 'playing', 'results'
  const [quizType, setQuizType] = React.useState("type");
  const [difficulty, setDifficulty] = React.useState("easy");

  // Quiz state
  const [loading, setLoading] = React.useState(false);
  const [question, setQuestion] = React.useState(null);
  const [choices, setChoices] = React.useState([]);
  const [answer, setAnswer] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [questionNum, setQuestionNum] = React.useState(1);
  const [streak, setStreak] = React.useState(0);
  const [maxStreak, setMaxStreak] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(15);
  const [isTimerActive, setIsTimerActive] = React.useState(false);
  const [selectedChoice, setSelectedChoice] = React.useState(null);

  const currentDifficulty = DIFFICULTY_LEVELS.find((d) => d.id === difficulty);
  const totalQuestions = currentDifficulty.questions;

  // Timer effect
  React.useEffect(() => {
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
  React.useEffect(() => {
    if (gameState === "playing") {
      fetchQuestion();
    }
  }, [questionNum, gameState]);

  async function fetchQuestion() {
    setLoading(true);
    setTimeLeft(15);
    setSelectedChoice(null);
    setResult(null); // Reset result state
    setIsTimerActive(false); // Stop timer during loading

    try {
      const [minId, maxId] = getDifficultyRange(difficulty, quizType);
      const id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setQuestion(data);

      if (quizType === "type") {
        await setupTypeQuestion(data);
      } else if (quizType === "name") {
        await setupNameQuestion(data);
      } else if (quizType === "generation") {
        await setupGenerationQuestion(data);
      }

      // Start timer after question is loaded
      setIsTimerActive(true);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
    setLoading(false);
  }

  async function setupTypeQuestion(pokemon) {
    const type = pokemon.types[0].type.name;
    setAnswer(type);

    const allTypes = [
      "normal",
      "fire",
      "water",
      "electric",
      "grass",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "steel",
      "fairy",
    ];

    let choicesSet = new Set([type]);
    while (choicesSet.size < 4) {
      const t = allTypes[Math.floor(Math.random() * allTypes.length)];
      choicesSet.add(t);
    }
    setChoices(Array.from(choicesSet).sort(() => Math.random() - 0.5));
  }

  async function setupNameQuestion(pokemon) {
    setAnswer(pokemon.name);

    // Fetch 3 other random Pokemon for wrong choices
    const wrongChoices = [];
    const [minId, maxId] = currentDifficulty.range;

    while (wrongChoices.length < 3) {
      const randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
      if (randomId !== pokemon.id) {
        try {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${randomId}`,
          );
          const data = await res.json();
          if (!wrongChoices.includes(data.name)) {
            wrongChoices.push(data.name);
          }
        } catch (error) {
          console.error("Error fetching wrong choice:", error);
        }
      }
    }

    const allChoices = [pokemon.name, ...wrongChoices];
    setChoices(allChoices.sort(() => Math.random() - 0.5));
  }

  async function setupGenerationQuestion(pokemon) {
    const generation = GENERATIONS.find(
      (gen) => pokemon.id >= gen.range[0] && pokemon.id <= gen.range[1],
    );
    setAnswer(generation.name);

    // Get 3 other random generations
    const wrongChoices = [];
    while (wrongChoices.length < 3) {
      const randomGen =
        GENERATIONS[Math.floor(Math.random() * GENERATIONS.length)];
      if (
        randomGen.name !== generation.name &&
        !wrongChoices.includes(randomGen.name)
      ) {
        wrongChoices.push(randomGen.name);
      }
    }

    const allChoices = [generation.name, ...wrongChoices];
    setChoices(allChoices.sort(() => Math.random() - 0.5));
  }

  function handleChoice(choice) {
    setIsTimerActive(false);
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
  }

  // Separate function to handle next question
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
    setGameState("playing");
  }

  function handleRestart() {
    setGameState("setup");
  }

  // Setup Screen
  if (gameState === "setup") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 px-3 pt-1 pb-4">
        {/* Quiz Type Selection */}
        <div className="w-full max-w-md">
          <h3 className="mb-3 text-lg font-semibold text-gray-700">
            Quiz Type
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {QUIZ_TYPES.map((type) => (
              <button
                key={type.id}
                className={`rounded-lg border-2 p-3 text-left transition-all ${
                  quizType === type.id
                    ? "border-poke-red-500 bg-poke-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setQuizType(type.id)}
              >
                <div className="font-semibold">{type.name}</div>
                {/* <div className="text-sm text-gray-600">{type.description}</div> */}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="w-full max-w-md">
          <h3 className="mb-3 text-lg font-semibold text-gray-700">
            Difficulty
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {DIFFICULTY_LEVELS.map((level) => (
              <button
                key={level.id}
                className={`rounded-lg border-2 p-3 text-center transition-all ${
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

        <button
          className="bg-poke-red hover:bg-poke-red-600 rounded-2xl px-8 py-3 text-lg font-bold text-white transition-colors"
          onClick={startQuiz}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-poke-red-700 text-lg font-bold">
          Loading question...
        </div>
      </div>
    );
  }

  // Results screen
  if (gameState === "results") {
    const percentage = Math.round((score / totalQuestions) * 100);
    let performance = "";
    if (percentage >= 90) performance = "Outstanding! 🏆";
    else if (percentage >= 70) performance = "Great job! 🌟";
    else if (percentage >= 50) performance = "Good effort! 👍";
    else performance = "Keep practicing! 💪";

    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 pt-1 pb-4 px-3">
        <div className="text-center">
          <h2 className="text-poke-blue-700 mb-2 text-3xl font-bold">
            Quiz Complete!
          </h2>
          <p className="text-xl text-gray-700">{performance}</p>
        </div>

        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
          <div className="space-y-4 text-center">
            <div>
              <div className="text-poke-red-700 text-4xl font-bold">
                {score}/{totalQuestions}
              </div>
              <div className="text-gray-600">Correct Answers</div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {percentage}%
                </div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {maxStreak}
                </div>
                <div className="text-sm text-gray-600">Best Streak</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="bg-poke-blue hover:bg-poke-blue-600 rounded-2xl px-6 py-3 font-bold text-white transition-colors"
            onClick={startQuiz}
          >
            Play Again
          </button>
          <button
            className="rounded-2xl bg-gray-500 px-6 py-3 font-bold text-white transition-colors hover:bg-gray-600"
            onClick={handleRestart}
          >
            Change Settings
          </button>
        </div>
      </div>
    );
  }

  // Quiz playing screen
  if (!question) return null;

  const getQuestionText = () => {
    const pokemonName =
      question.name.charAt(0).toUpperCase() + question.name.slice(1);
    switch (quizType) {
      case "type":
        return `What type is ${pokemonName}?`;
      case "name":
        return "What is this Pokémon's name?";
      case "generation":
        return `Which generation is ${pokemonName} from?`;
      default:
        return "";
    }
  };

  const formatChoice = (choice) => {
    if (quizType === "generation") {
      return choice;
    }
    return choice.charAt(0).toUpperCase() + choice.slice(1);
  };

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto px-3 pt-1 pb-4">
      {/* Progress and Stats Bar */}
      <div className="mb-4 flex w-full max-w-2xl items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm font-semibold text-gray-700">
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
      <div className="mb-6 w-full max-w-2xl">
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="bg-poke-red h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNum / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Pokemon Display */}
      <div className="relative mb-6 flex items-center justify-center">
        <img src={screen} alt="Quiz Screen" className="px-6" />
        <img
          src={
            quizType === "name"
              ? question.sprites.other?.["official-artwork"]?.front_default ||
                question.sprites.front_default
              : question.sprites.front_default
          }
          alt={quizType === "name" ? "Mystery Pokemon" : question.name}
          className={`absolute top-1/2 left-1/2 w-28 -translate-x-1/2 -translate-y-1/2 ${
            quizType === "name" && !result ? "brightness-0 filter" : ""
          }`}
        />
        <img
          src={
            result === null
              ? yellow_led
              : result === "correct"
                ? green_led
                : red_led
          }
          alt="Status LED"
          className="absolute bottom-4 left-21 h-10 w-10"
        />
        <div className="absolute right-11 bottom-4 mb-2 font-bold text-gray-700">
          #{question.id.toString().padStart(3, "0")}
        </div>
      </div>

      {/* Question */}
      <h3 className="mb-6 text-center text-xl font-bold">
        {getQuestionText()} {/* Timer */}
        <span
          className={`w-fit rounded-full px-3 py-1 text-lg font-bold ${
            timeLeft <= 5
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {timeLeft}s
        </span>
      </h3>

      {/* Answer Choices */}
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
            onClick={() => !result && handleChoice(choice)}
            disabled={!!result}
          >
            {formatChoice(choice)}
          </button>
        ))}
      </div>

      {/* Result Feedback */}
      {result && (
        <div className="mt-6 text-center">
          <div
            className={`mb-4 text-xl font-bold ${
              result === "correct" ? "text-green-600" : "text-red-600"
            }`}
          >
            {result === "correct"
              ? "✅ Correct!"
              : `❌ Wrong! It was ${formatChoice(answer)}`}
          </div>

          {/* Next Question Button */}
          <button
            className="bg-poke-blue hover:bg-poke-blue-600 rounded-xl px-6 py-2 font-bold text-white transition-colors"
            onClick={handleNextQuestion}
          >
            {questionNum < totalQuestions ? "Next Question" : "See Results"}
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
