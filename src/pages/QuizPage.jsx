import React from "react";
import screen from "../assets/screen_bg.svg";
import red_led from "../assets/red_led.svg";
import yellow_led from "../assets/yellow_led.svg";
import green_led from "../assets/green_led.svg";


function QuizPage() {
    // Quiz state
    const [loading, setLoading] = React.useState(true);
    const [question, setQuestion] = React.useState(null);
    const [choices, setChoices] = React.useState([]);
    const [answer, setAnswer] = React.useState(null);
    const [result, setResult] = React.useState(null);
    const [score, setScore] = React.useState(0);
    const [questionNum, setQuestionNum] = React.useState(1);
    const [showResult, setShowResult] = React.useState(false);
    const totalQuestions = 5;

    React.useEffect(() => {
        if (!showResult) {
            async function fetchQuestion() {
                setLoading(true);
                // Fetch a random pokemon
                const id = Math.floor(Math.random() * 151) + 1;
                const res = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${id}`
                );
                const data = await res.json();
                setQuestion(data);
                // Get type
                const type = data.types[0].type.name;
                setAnswer(type);
                // Generate choices
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
                    const t =
                        allTypes[Math.floor(Math.random() * allTypes.length)];
                    choicesSet.add(t);
                }
                const choicesArr = Array.from(choicesSet).sort(
                    () => Math.random() - 0.5
                );
                setChoices(choicesArr);
                setResult(null);
                setLoading(false);
            }
            fetchQuestion();
        }
    }, [questionNum, showResult]);

    function handleChoice(choice) {
        const isCorrect = choice === answer;
        setResult(isCorrect ? "correct" : "wrong");
        if (isCorrect) {
            setScore((s) => s + 1);
        }
        setTimeout(() => {
            if (questionNum < totalQuestions) {
                setQuestionNum((n) => n + 1);
            } else {
                setShowResult(true);
            }
        }, 900);
    }

    function handleRestart() {
        setScore(0);
        setQuestionNum(1);
        setShowResult(false);
    }

    if (loading) {
        return (
            <div className="text-center mt-10 text-lg text-poke-red-700 font-bold">
                Loading...
            </div>
        );
    }

    if (!question) {
        return null;
    }

    if (showResult) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className="text-2xl font-bold text-poke-blue-700">
                    Quiz Complete!
                </div>
                <div className="text-lg text-poke-red-700">
                    Your score:{" "}
                    <span className="font-bold">
                        {score}/{totalQuestions}
                    </span>
                </div>
                <button
                    className="bg-poke-red text-white px-6 py-3 rounded-2xl mt-4 hover:bg-poke-red-600 transition-colors"
                    onClick={handleRestart}
                >
                    Restart Quiz
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-page flex flex-col items-center justify-center h-full">
            
            <div className="relative mb-4 pt-2 flex items-center justify-center">
                <img src={screen} alt="Quiz Screen" className="px-6" />
                <img
                    src={question.sprites.front_default}
                    alt={question.name}
                    className="w-44 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
                <img
                    src={
                        result === null
                            ? yellow_led
                            : result === "correct"
                            ? green_led
                            : red_led
                    }
                    alt={
                        result === null
                            ? "Pending"
                            : result === "correct"
                            ? "Correct"
                            : "Wrong"
                    }
                    className="w-10 h-10 absolute left-21 bottom-4"
                />
                <div className="absolute right-11 bottom-4 text-md mb-2 font-bold font-lexend text-gray-700">
                    Question {questionNum}/{totalQuestions}
                </div>
            </div>
            <h3 className="text-xl font-bold mb-2">
                Which type is{" "}
                <span className="text-poke-red">
                    {question.name.charAt(0).toUpperCase() +
                        question.name.slice(1)}
                </span>
                ?
            </h3>
            <div className="grid grid-cols-2 gap-4 w-full p-6">
                {choices.map((c) => (
                    <button
                        key={c}
                        className={`h-12 rounded-md font-semibold text-gray-700 bg-gray-200 border border-gray-300 shadow-sm transition-colors text-base ${
                            result && c === answer
                                ? "bg-green-400 text-white border-green-500"
                                : result
                                ? "opacity-70"
                                : "hover:bg-gray-300"
                        }`}
                        onClick={() => !result && handleChoice(c)}
                        disabled={!!result}
                    >
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuizPage;
