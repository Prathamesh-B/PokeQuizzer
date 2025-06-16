import TypeBadge from "./TypeBadge";

function PokemonDetails({ pokemon }) {
  const formatStatName = (statName) => {
    return statName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex h-full flex-col overflow-y-auto px-4 pt-4 pb-6">
      <div className="mx-auto w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="font-lexend text-3xl font-bold text-gray-800 capitalize">
            {pokemon.name}
          </h1>
          <p className="text-lg text-gray-500">
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
              Type
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
          <div className="rounded-xl bg-gray-50 p-4 shadow">
            <h4 className="font-lexend text-sm font-medium text-gray-500">
              Height
            </h4>
            <p className="text-xl font-bold text-gray-800">
              {pokemon.height / 10} m
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 shadow">
            <h4 className="font-lexend text-sm font-medium text-gray-500">
              Weight
            </h4>
            <p className="text-xl font-bold text-gray-800">
              {pokemon.weight / 10} kg
            </p>
          </div>
        </div>

        {/* Abilities */}
        <div className="mb-6">
          <h3 className="font-lexend mb-3 text-lg font-semibold text-gray-700">
            Abilities
          </h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability.ability.name}
                className={`rounded-lg px-3 py-1 text-sm font-medium capitalize shadow ${
                  ability.is_hidden
                    ? "border border-yellow-300 bg-yellow-100 text-yellow-800"
                    : "border border-blue-300 bg-blue-100 text-blue-800"
                }`}
              >
                {ability.ability.name.replace("-", " ")}
                {ability.is_hidden && " (Hidden)"}
              </span>
            ))}
          </div>
        </div>

        {/* Base Stats */}
        <div className="mb-6">
          <h3 className="font-lexend mb-3 text-lg font-semibold text-gray-700">
            Base Stats
          </h3>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="flex items-center gap-3">
                <div className="w-20 text-sm font-medium text-gray-600 capitalize">
                  {formatStatName(stat.stat.name)}
                </div>
                <div className="w-8 text-right text-sm font-bold text-gray-800">
                  {stat.base_stat}
                </div>
                <div className="h-2 flex-1 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-red-400 to-green-500 transition-all duration-300"
                    style={{
                      width: `${Math.min((stat.base_stat / 200) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Base Stats */}
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow">
          <div className="flex items-center justify-between">
            <span className="font-lexend font-semibold text-gray-700">
              Total Base Stats
            </span>
            <span className="text-xl font-bold text-indigo-600">
              {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
