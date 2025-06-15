import { Link } from "@tanstack/react-router";

const HomePage = () => {
  return (
    <div className="px-3 pt-1 pb-4">
      <div className="flex h-full flex-col items-center justify-around gap-2">
        <img src="./Home_img.png" className="size-64" />
        <p className="font-poke text-center">
          Test your knowledge of Pokemon types with this fun quiz. Can you
          identify the type of each Pokemon?
        </p>
        <Link to="/quiz" className="red-btn">
          Start Quiz
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
