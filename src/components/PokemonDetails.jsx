import {
  FaChartBar,
  FaEye,
  FaEyeSlash,
  FaRuler,
  FaShieldAlt,
  FaTrophy,
  FaWeight,
} from "react-icons/fa";
import TypeBadge from "./TypeBadge";
import { GiHeartPlus, GiMagicSwirl, GiShield, GiSpeedometer, GiSwordBrandish } from "react-icons/gi";
import { getStatColor } from "../utils/colorUtils";

function PokemonDetails({ pokemon }) {
  const formatStatName = (statName) => {
    return statName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getStatIcon = (statName) => {
    const iconMap = {
      hp: <GiHeartPlus className="h-4 w-4 text-red-500" />,
      attack: <GiSwordBrandish className="h-4 w-4 text-orange-500" />,
      defense: <GiShield className="h-4 w-4 text-blue-500" />,
      "special-attack": <GiMagicSwirl className="h-4 w-4 text-purple-500" />,
      "special-defense": <FaShieldAlt className="h-4 w-4 text-indigo-500" />,
      speed: <GiSpeedometer className="h-4 w-4 text-green-500" />,
    };
    return (
      iconMap[statName] || <FaChartBar className="h-4 w-4 text-gray-500" />
    );
  };


  return (
    <div className="flex h-full flex-col overflow-y-auto px-4 pt-4 pb-6">
      <div className="mx-auto w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <h1 className="font-poke text-3xl text-gray-800 capitalize">
              {pokemon.name}
            </h1>
          </div>
          <p className="font-mono text-lg text-gray-500">
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
        </div>

        {/* Pokemon Image */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 p-6 shadow-lg">
            <img
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="h-48 w-48 object-contain"
            />
          </div>
        </div>

        {/* Types */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <h3 className="font-lexend text-lg font-semibold text-gray-700">
              Type:
            </h3>
          </div>
          <div className="flex justify-center gap-2">
            {pokemon.types.map((type) => (
              <TypeBadge key={type.type.name} type={type.type.name} />
            ))}
          </div>
        </div>

        {/* Physical Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4 shadow">
            <div className="mb-1 flex items-center gap-2">
              <FaRuler className="h-4 w-4 text-blue-600" />
              <h4 className="font-lexend text-sm font-medium text-blue-700">
                Height
              </h4>
            </div>
            <p className="text-xl font-bold text-blue-800">
              {pokemon.height / 10} m
            </p>
          </div>
          <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-4 shadow">
            <div className="mb-1 flex items-center gap-2">
              <FaWeight className="h-4 w-4 text-green-600" />
              <h4 className="font-lexend text-sm font-medium text-green-700">
                Weight
              </h4>
            </div>
            <p className="text-xl font-bold text-green-800">
              {pokemon.weight / 10} kg
            </p>
          </div>
        </div>

        {/* Abilities */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <h3 className="font-lexend text-lg font-semibold text-gray-700">
              Abilities:
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability.ability.name}
                className={`inline-flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-medium capitalize shadow transition-all ${
                  ability.is_hidden
                    ? "border-yellow-300 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800"
                    : "border-blue-300 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800"
                }`}
              >
                {ability.is_hidden ? (
                  <FaEyeSlash className="h-3 w-3" />
                ) : (
                  <FaEye className="h-3 w-3" />
                )}
                {ability.ability.name.replace("-", " ")}
                {ability.is_hidden && " (Hidden)"}
              </span>
            ))}
          </div>
        </div>

        {/* Base Stats */}
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-2">
            <h3 className="font-lexend text-lg font-semibold text-gray-700">
              Base Stats:
            </h3>
          </div>
          <div className="space-y-2">
            {pokemon.stats.map((stat) => (
              <div
                key={stat.stat.name}
                className="rounded-lg border border-blue-200 bg-white p-2 shadow"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatIcon(stat.stat.name)}
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {formatStatName(stat.stat.name)}
                    </span>
                  </div>
                  <span className="rounded bg-gray-100 px-2 py-1 text-lg font-bold text-gray-800">
                    {stat.base_stat}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`bg-gradient-to-r ${getStatColor(stat.base_stat)} h-3 rounded-full shadow-sm transition-all duration-500 ease-out`}
                    style={{
                      width: `${Math.min((stat.base_stat / 200) * 100, 100)}%`,
                      animation: "slideIn 0.8s ease-out",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Total Base Stats */}
        <div className="rounded-xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaTrophy className="h-5 w-5 text-indigo-600" />
              <span className="font-lexend font-semibold text-indigo-700">
                Total Base Stats
              </span>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-2xl font-bold text-indigo-600 shadow">
              {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PokemonDetails;
