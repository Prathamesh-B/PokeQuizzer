import React from "react";
import PokemonCard from "../components/PokemonCard";

const REGIONS = [
  { name: "All", offset: 0, limit: 1025 },
  { name: "Kanto", offset: 0, limit: 151 },
  { name: "Johto", offset: 151, limit: 100 },
  { name: "Hoenn", offset: 251, limit: 135 },
  { name: "Sinnoh", offset: 386, limit: 107 },
  { name: "Unova", offset: 493, limit: 156 },
  { name: "Kalos", offset: 649, limit: 72 },
  { name: "Alola", offset: 721, limit: 88 },
  { name: "Galar", offset: 809, limit: 96 },
];

function PokedexPage() {
  const [allPokemon, setAllPokemon] = React.useState([]);
  const [displayedPokemon, setDisplayedPokemon] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [region, setRegion] = React.useState(REGIONS[0]);
  const [hasMore, setHasMore] = React.useState(true);
  const [nextOffset, setNextOffset] = React.useState(0);

  // Helper function to check if pokemon belongs to selected region
  const isPokemonInRegion = (pokemonId, selectedRegion) => {
    if (selectedRegion.name === "All") return true;

    const regionStart = selectedRegion.offset + 1;
    const regionEnd = selectedRegion.offset + selectedRegion.limit;

    return pokemonId >= regionStart && pokemonId <= regionEnd;
  };

  // Filter and update displayed pokemon based on region and search
  const updateDisplayedPokemon = React.useCallback(() => {
    let filtered = allPokemon;

    // Filter by region first
    filtered = filtered.filter((pokemon) =>
      isPokemonInRegion(pokemon.id, region),
    );

    // Then filter by search if there's a search term
    if (search.trim()) {
      const searchTerm = search.toLowerCase().trim();
      filtered = filtered.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm) ||
          pokemon.id.toString().includes(searchTerm),
      );
    }

    setDisplayedPokemon(filtered);
  }, [allPokemon, region, search]);

  // Update displayed pokemon whenever allPokemon, region, or search changes
  React.useEffect(() => {
    updateDisplayedPokemon();
  }, [updateDisplayedPokemon]);

  // Reset and load pokemon when region changes
  React.useEffect(() => {
    setAllPokemon([]);
    setDisplayedPokemon([]);
    setNextOffset(region.offset);
    setHasMore(true);
    // DON'T clear search here - let user search in new region
  }, [region]);

  // Load initial data when component mounts or region changes
  React.useEffect(() => {
    if (allPokemon.length === 0 && hasMore) {
      fetchMore();
    }
  }, [region, allPokemon.length]);

  async function fetchMore() {
    if (!hasMore || loading) return;

    setLoading(true);
    const limit = 20;
    const offset = nextOffset;
    const maxOffset = region.offset + region.limit;
    const fetchLimit = Math.min(limit, maxOffset - offset);

    if (fetchLimit <= 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${fetchLimit}`,
      );
      const data = await res.json();

      const details = await Promise.all(
        data.results.map(async (p) => {
          const response = await fetch(p.url);
          return response.json();
        }),
      );

      setAllPokemon((prev) => [...prev, ...details]);
      setNextOffset(offset + fetchLimit);
      setHasMore(offset + fetchLimit < maxOffset);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  }

  // Load more pokemon if searching and we haven't loaded all region pokemon yet
  const loadMoreForSearch = React.useCallback(async () => {
    if (search.trim() && hasMore && !loading) {
      await fetchMore();
    }
  }, [search, hasMore, loading]);

  // When user searches, load more pokemon if needed
  React.useEffect(() => {
    if (search.trim() && allPokemon.length > 0) {
      // Check if we need to load more pokemon to find search results
      const currentRegionPokemon = allPokemon.filter((p) =>
        isPokemonInRegion(p.id, region),
      );
      const searchResults = currentRegionPokemon.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase().trim()) ||
          p.id.toString().includes(search.trim()),
      );

      // If no results found and we can load more, load more
      if (searchResults.length === 0 && hasMore && !loading) {
        loadMoreForSearch();
      }
    }
  }, [search, allPokemon, region, hasMore, loading, loadMoreForSearch]);

  // Infinite scroll - works for both normal browsing and search
  React.useEffect(() => {
    function onScroll(e) {
      const el = e.target;
      if (
        el.scrollHeight - el.scrollTop - el.clientHeight < 120 &&
        hasMore &&
        !loading
      ) {
        fetchMore();
      }
    }

    const grid = document.getElementById("pokedex-scroll");
    if (grid) {
      grid.addEventListener("scroll", onScroll);
      return () => grid.removeEventListener("scroll", onScroll);
    }
  }, [hasMore, loading]);

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
      <h3 className="text-poke-red-700 mt-2 mb-2 text-center text-3xl font-bold tracking-widest drop-shadow">
        Pokédex
      </h3>

      <div className="mb-2 flex gap-2">
        <input
          className="font-lexend focus:border-poke-red-400 flex-1 rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-base shadow focus:outline-none"
          placeholder={`Search in ${region.name}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="font-lexend focus:border-poke-red-400 rounded-xl border border-gray-300 bg-gray-50 px-2 py-2 text-base shadow focus:outline-none"
          value={region.name}
          onChange={(e) => {
            const selectedRegion = REGIONS.find(
              (r) => r.name === e.target.value,
            );
            setRegion(selectedRegion);
          }}
        >
          {REGIONS.map((r) => (
            <option key={r.name} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

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

        {getStatusMessage() && (
          <div className="py-2 text-center text-xs text-gray-400">
            {getStatusMessage()}
          </div>
        )}
      </div>
    </div>
  );
}

export default PokedexPage;
