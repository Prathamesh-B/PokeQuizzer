import { usePokedexLogic } from "../hooks/usePokedexLogic";
import RegionSelector from "../components/RegionSelector";
import SearchInput from "../components/SearchInput";
import PokedexGrid from "../components/PokedexGrid";

function PokedexPage() {
  const {
    allPokemon,
    displayedPokemon,
    loading,
    search,
    setSearch,
    region,
    setRegion,
    hasMore,
    isPokemonInRegion,
  } = usePokedexLogic();

  const getEmptyMessage = () => {
    if (loading) return "";
    if (search.trim()) {
      if (hasMore) {
        return `Searching for "${search}" in ${region.name}...`;
      }
      return `No Pokémon found matching "${search}" in ${region.name}`;
    }
    return `No Pokémon available in ${region.name}`;
  };

  const getStatusMessage = () => {
    if (search.trim() && displayedPokemon.length > 0) {
      const totalRegionPokemon = allPokemon.filter((p) =>
        isPokemonInRegion(p.id, region),
      ).length;
      return `Found ${displayedPokemon.length} Pokémon matching "${search}" (${totalRegionPokemon} total loaded)`;
    }
    if (!hasMore && !loading && displayedPokemon.length > 0 && !search.trim()) {
      return `All ${region.name} Pokémon loaded (${displayedPokemon.length} total)`;
    }
    return null;
  };

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto px-3 pt-1 pb-4">
      <div className="mb-2 flex gap-2">
        <SearchInput search={search} setSearch={setSearch} region={region} />
        <RegionSelector region={region} setRegion={setRegion} />
      </div>
      <PokedexGrid
        displayedPokemon={displayedPokemon}
        loading={loading}
        search={search}
        getEmptyMessage={getEmptyMessage}
        getStatusMessage={getStatusMessage}
      />
    </div>
  );
}

export default PokedexPage;
