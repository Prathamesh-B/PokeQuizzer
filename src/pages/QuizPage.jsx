import React from "react";

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
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
            <div className="text-sm mb-2 text-poke-blue-700 font-semibold">
                Question {questionNum}/{totalQuestions}
            </div>
            <h3 className="text-xl font-bold mb-2">
                Which type is{" "}
                <span className="text-poke-red">
                    {question.name.charAt(0).toUpperCase() + question.name.slice(1)}
                </span>
                ?
            </h3>
            <img
                src={question.sprites.front_default}
                alt={question.name}
                className="w-24 mx-auto my-4"
            />
            <div className="flex flex-col gap-4 w-full max-w-xs">
                {choices.map((c) => (
                    <button
                        key={c}
                        className={`primary-btn px-4 py-2 rounded-xl font-semibold border border-poke-blue-200 shadow-sm transition-colors ${
                            result && c === answer
                                ? "bg-poke-green-500 text-white"
                                : "bg-white hover:bg-poke-blue-50"
                        } ${result ? "opacity-70" : ""}`}
                        onClick={() => !result && handleChoice(c)}
                        disabled={!!result}
                    >
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                ))}
            </div>
            {result && (
                <div
                    className={`mt-6 text-center font-bold ${
                        result === "correct"
                            ? "text-poke-green-600"
                            : "text-poke-red-600"
                    }`}
                >
                    {result === "correct"
                        ? "Correct!"
                        : `Wrong! Answer: ${
                              answer.charAt(0).toUpperCase() + answer.slice(1)
                          }`}
                </div>
            )}
        </div>
    );
}

export default QuizPage;