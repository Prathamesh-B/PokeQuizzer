import { useCallback, useEffect, useState } from "react";
import { REGIONS } from "../constants/pokedexConfig";

export function usePokedexLogic() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState(REGIONS[0]);
  const [hasMore, setHasMore] = useState(true);
  const [nextOffset, setNextOffset] = useState(0);

  const isPokemonInRegion = (pokemonId, selectedRegion) => {
    if (selectedRegion.name === "All") return true;
    const regionStart = selectedRegion.offset + 1;
    const regionEnd = selectedRegion.offset + selectedRegion.limit;
    return pokemonId >= regionStart && pokemonId <= regionEnd;
  };

  const updateDisplayedPokemon = useCallback(() => {
    let filtered = allPokemon;
    filtered = filtered.filter((pokemon) => isPokemonInRegion(pokemon.id, region));
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

  useEffect(() => {
    updateDisplayedPokemon();
  }, [updateDisplayedPokemon]);

  useEffect(() => {
    setAllPokemon([]);
    setDisplayedPokemon([]);
    setNextOffset(region.offset);
    setHasMore(true);
  }, [region]);

  useEffect(() => {
    if (allPokemon.length === 0 && hasMore) {
      fetchMore();
    }
    // eslint-disable-next-line
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

  const loadMoreForSearch = useCallback(async () => {
    if (search.trim() && hasMore && !loading) {
      await fetchMore();
    }
  }, [search, hasMore, loading]);

  useEffect(() => {
    if (search.trim() && allPokemon.length > 0) {
      const currentRegionPokemon = allPokemon.filter((p) => isPokemonInRegion(p.id, region));
      const searchResults = currentRegionPokemon.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase().trim()) ||
          p.id.toString().includes(search.trim()),
      );
      if (searchResults.length === 0 && hasMore && !loading) {
        loadMoreForSearch();
      }
    }
  }, [search, allPokemon, region, hasMore, loading, loadMoreForSearch]);

  useEffect(() => {
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

  return {
    allPokemon,
    displayedPokemon,
    loading,
    search,
    setSearch,
    region,
    setRegion,
    hasMore,
    nextOffset,
    fetchMore,
    isPokemonInRegion,
  };
}
