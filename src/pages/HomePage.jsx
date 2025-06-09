import { Link } from "@tanstack/react-router";

const HomePage = () => {
    return (
        <div className="main-content font-poke">
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-3xl text-center mb-4">Pokemon Type Quiz</h2>
                <p className="text-center text-poke-red-700">
                    Test your knowledge of Pokemon types with this fun quiz. Can
                    you identify the type of each Pokemon?
                </p>
                <Link
                    to="/quiz"
                    className="bg-poke-red text-white px-6 py-3 w-full rounded-4xl mt-6 hover:bg-poke-red-600 transition-colors"
                >
                    <span className="w-full text-center">Start Quiz</span>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
