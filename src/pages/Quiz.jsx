
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
        if (showResult) return;
        // Fetch a random pokemon from pokeapi
        async function fetchQuestion() {
            setLoading(true);
            const id = Math.floor(Math.random() * 151) + 1; // Gen 1
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await res.json();
            setQuestion(data);
            // Get all types for choices
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
            // Shuffle and pick 3 wrong + 1 correct
            let wrong = allTypes.filter(
                (t) => !data.types.map((tp) => tp.type.name).includes(t)
            );
            wrong = wrong.sort(() => 0.5 - Math.random()).slice(0, 3);
            const correct = data.types[0].type.name;
            const options = [...wrong, correct].sort(() => 0.5 - Math.random());
            setChoices(options);
            setAnswer(correct);
            setResult(null);
            setLoading(false);
        }
        fetchQuestion();
    }, [questionNum, showResult]);

    function handleChoice(choice) {
        const isCorrect = choice === answer;
        setResult(isCorrect ? "correct" : "wrong");
        if (isCorrect) setScore((s) => s + 1);
        setTimeout(() => {
            if (questionNum < totalQuestions) {
                setQuestionNum((q) => q + 1);
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

    if (loading)
        return (
            <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>
        );
    if (!question) return null;

    if (showResult) {
        return (
            <div className="quiz-page" style={{ textAlign: "center" }}>
                <h2>Congratulations!</h2>
                <p style={{ margin: "24px 0" }}>
                    You've completed the Pokemon Type Quiz.
                    <br />
                    Here's your score:
                </p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 24,
                        marginBottom: 24,
                    }}
                >
                    <div
                        style={{
                            background: "#f8eaea",
                            borderRadius: 12,
                            padding: "16px 24px",
                        }}
                    >
                        <div style={{ fontSize: 18, fontWeight: "bold" }}>
                            Final Score
                        </div>
                        <div
                            style={{
                                fontSize: 24,
                                color: "#e53935",
                                fontWeight: "bold",
                            }}
                        >
                            {Math.round((score / totalQuestions) * 100)}%
                        </div>
                    </div>
                    <div
                        style={{
                            background: "#f8eaea",
                            borderRadius: 12,
                            padding: "16px 24px",
                        }}
                    >
                        <div style={{ fontSize: 18, fontWeight: "bold" }}>
                            Correct
                        </div>
                        <div
                            style={{
                                fontSize: 24,
                                color: "#43a047",
                                fontWeight: "bold",
                            }}
                        >
                            {score}/{totalQuestions}
                        </div>
                    </div>
                </div>
                <button className="primary-btn" onClick={handleRestart}>
                    Play Again
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-page">
            <div style={{ fontSize: 14, marginBottom: 8 }}>
                Question {questionNum}/{totalQuestions}
            </div>
            <h3>
                Which type is{" "}
                <span style={{ color: "#e53935" }}>
                    {question.name.charAt(0).toUpperCase() +
                        question.name.slice(1)}
                </span>
                ?
            </h3>
            <img
                src={question.sprites.front_default}
                alt={question.name}
                style={{ width: 96, display: "block", margin: "16px auto" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {choices.map((c) => (
                    <button
                        key={c}
                        className="primary-btn"
                        style={{
                            background:
                                result && c === answer ? "#43a047" : undefined,
                        }}
                        onClick={() => !result && handleChoice(c)}
                        disabled={!!result}
                    >
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                ))}
            </div>
            {result && (
                <div
                    style={{
                        marginTop: 24,
                        textAlign: "center",
                        color: result === "correct" ? "#43a047" : "#e53935",
                        fontWeight: "bold",
                    }}
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