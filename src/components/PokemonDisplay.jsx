import screen from "../assets/screen_bg.svg";
import red_led from "../assets/red_led.svg";
import yellow_led from "../assets/yellow_led.svg";
import green_led from "../assets/green_led.svg";

const PokemonDisplay = ({ question, quizType, result }) => {
  if (!question) return null;

  return (
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
      <div className="absolute right-11 bottom-4 mb-2 font-mono font-bold text-gray-700">
        #{question.id.toString().padStart(3, "0")}
      </div>
    </div>
  );
};

export default PokemonDisplay;
