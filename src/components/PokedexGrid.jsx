import PokemonCard from "./PokemonCard";

function PokedexGrid({
  displayedPokemon,
  loading,
  search,
  getEmptyMessage,
  getStatusMessage,
}) {
  return (
    <div
      id="pokedex-scroll"
      className="grid flex-1 grid-cols-1 gap-3 overflow-y-auto rounded-xl p-1 shadow-inner"
    >
      {displayedPokemon.length === 0 && (
        <div className="py-10 text-center text-gray-400">
          {getEmptyMessage()}
        </div>
      )}

      {displayedPokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}

      {loading && (
        <div className="text-poke-red-700 py-4 text-center font-bold">
          {search.trim() ? `Searching for "${search}"...` : "Loading..."}
        </div>
      )}

      {getStatusMessage && getStatusMessage() && (
        <div className="py-2 text-center text-xs text-gray-400">
          {getStatusMessage()}
        </div>
      )}
    </div>
  );
}

export default PokedexGrid;
