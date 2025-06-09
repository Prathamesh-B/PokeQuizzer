import { Link } from "@tanstack/react-router";

const HomePage = () => {
  return (
    <div className="overflow-auto p-6">
      <div className="flex h-full flex-col items-center justify-around">
        <img src="./Home_img.png" className="size-64" />
        <p className="font-poke text-center">
          Test your knowledge of Pokemon types with this fun quiz. Can you
          identify the type of each Pokemon?
        </p>
        <Link
          to="/quiz"
          className="hover:bg-poke-red-600 mt-6 flex w-full rounded-4xl bg-[#E82933] px-6 py-3 text-white transition-colors"
        >
          <span className="font-lexend w-full text-center">Start Quiz</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
