import { Link } from "@tanstack/react-router";

const HomePage = () => {
    return (
        <div className="p-6 overflow-auto">
            <div className="flex flex-col items-center justify-around h-full">
                <img src="./Home_img.png" className="size-64" />
                <p className="font-poke text-center">
                    Test your knowledge of Pokemon types with this fun quiz. Can
                    you identify the type of each Pokemon?
                </p>
                <Link
                    to="/quiz"
                    className="bg-[#E82933] text-white flex px-6 py-3 w-full rounded-4xl mt-6 hover:bg-poke-red-600 transition-colors"
                >
                    <span className="w-full text-center font-lexend">
                        Start Quiz
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
