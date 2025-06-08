import "./App.css";
import Header from "./components/Header";

function App() {
    // Phone-like container style
    return (
        <div className="app-bg">
            <div className="phone-container">
                {/* Navigation bar */}
                {/* <nav className="bottom-nav">
                    <button
                        onClick={() => setPage("home")}
                        className={page === "home" ? "active" : ""}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setPage("quiz")}
                        className={page === "quiz" ? "active" : ""}
                    >
                        Quiz
                    </button>
                    <button
                        onClick={() => setPage("pokedex")}
                        className={page === "pokedex" ? "active" : ""}
                    >
                        Pokedex
                    </button>
                    <button
                        onClick={() => setPage("settings")}
                        className={page === "settings" ? "active" : ""}
                    >
                        Settings
                    </button>
                </nav> */}
                {/* Main content */}
                <Header />
                <div className="main-content font-poke">
                    <div className="flex flex-col items-center justify-center h-full">
                        <h2 className="text-3xl text-center mb-4">
                            Pokemon Type Quiz
                        </h2>
                        <p className="text-center text-poke-red-700">
                            Test your knowledge of Pokemon types with this fun
                            quiz. Can you identify the type of each Pokemon?
                        </p>
                        <button className="bg-poke-red text-white px-6 py-3 w-full rounded-4xl mt-6 hover:bg-poke-red-600 transition-colors">
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
