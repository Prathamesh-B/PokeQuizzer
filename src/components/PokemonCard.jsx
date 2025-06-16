import { useNavigate } from "@tanstack/react-router";
import TypeBadge from "./TypeBadge";

function PokemonCard({ pokemon }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: `/pokedex/${pokemon.id}` });
  };

  const getStatColor = (stat) => {
    if (stat >= 100) return "text-green-600";
    if (stat >= 70) return "text-yellow-600";
    return "text-red-500";
  };

  const totalStats = pokemon.stats.reduce(
    (sum, stat) => sum + stat.base_stat,
    0,
  );

  return (
    <div
      onClick={handleClick}
      className="group relative flex h-fit items-center gap-4 rounded-xl border border-gray-200 bg-gradient-to-r from-white to-gray-50 p-4 shadow-md hover:border-gray-300 hover:shadow-xl"
    >
      {/* Pokemon Image */}
      <div className="relative flex-shrink-0">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 p-2 shadow-lg">
          <img
            src={pokemon.sprites.front_default || pokemon.sprites.front_shiny}
            alt={pokemon.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="absolute -top-1 -right-1 rounded-full bg-white px-2 py-1 font-mono text-xs font-bold text-gray-600 shadow-md">
          #{pokemon.id.toString().padStart(3, "0")}
        </div>
      </div>

      {/* Pokemon Info */}
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="truncate text-xl font-bold text-gray-800 capitalize">
            {pokemon.name}
          </h3>
        </div>

        {/* Types */}
        <div className="mb-3 flex flex-wrap gap-1">
          {pokemon.types.map((t) => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </div>

        {/* Stats Preview */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-gray-500">HP:</span>
            <span
              className={`font-semibold ${getStatColor(pokemon.stats[0].base_stat)}`}
            >
              {pokemon.stats[0].base_stat}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">ATK:</span>
            <span
              className={`font-semibold ${getStatColor(pokemon.stats[1].base_stat)}`}
            >
              {pokemon.stats[1].base_stat}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Total:</span>
            <span className="font-semibold text-blue-600">{totalStats}</span>
          </div>
        </div>

        {/* Height & Weight */}
        <div className="mt-2 flex gap-4 text-xs text-gray-500">
          <span>Height: {(pokemon.height / 10).toFixed(1)}m</span>
          <span>Weight: {(pokemon.weight / 10).toFixed(1)}kg</span>
        </div>
      </div>

      {/* Hover Effect Indicator */}
      <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}

export default PokemonCard;
