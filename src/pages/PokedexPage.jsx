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
  const [pokemon, setPokemon] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [region, setRegion] = React.useState(REGIONS[0]);
  const [hasMore, setHasMore] = React.useState(true);
  const [nextOffset, setNextOffset] = React.useState(region.offset);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    // Reset when region changes
    setPokemon([]);
    setNextOffset(region.offset);
    setHasMore(true);
  }, [region]);

  React.useEffect(() => {
    fetchMore();
    // eslint-disable-next-line
  }, [region]);

  async function fetchMore() {
    if (!hasMore || isFetching) return;
    setIsFetching(true);
    setLoading(true);
    const limit = 20;
    const offset = nextOffset;
    const max = region.offset + region.limit;
    const fetchLimit = Math.min(limit, max - offset);
    if (fetchLimit <= 0) {
      setHasMore(false);
      setLoading(false);
      setIsFetching(false);
      return;
    }
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${fetchLimit}`,
    );
    const data = await res.json();
    const details = await Promise.all(
      data.results.map((p) => fetch(p.url).then((r) => r.json())),
    );
    setPokemon((prev) => [...prev, ...details]);
    setNextOffset(offset + fetchLimit);
    setHasMore(offset + fetchLimit < max);
    setLoading(false);
    setIsFetching(false);
  }

  // Infinite scroll
  React.useEffect(() => {
    function onScroll(e) {
      const el = e.target;
      if (
        el.scrollHeight - el.scrollTop - el.clientHeight < 120 &&
        hasMore &&
        !isFetching
      ) {
        fetchMore();
      }
    }
    const grid = document.getElementById("pokedex-scroll");
    if (grid) grid.addEventListener("scroll", onScroll);
    return () => grid && grid.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line
  }, [pokemon, hasMore, isFetching]);

  // Enhanced search: by name or ID
  const filtered = search
    ? pokemon.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.id.toString().includes(search.trim()),
      )
    : pokemon;

  return (
    <div className="flex h-full flex-col gap-2 px-3 pt-1 pb-2">
      <h3 className="text-poke-red-700 mt-2 mb-2 text-center text-3xl font-bold tracking-widest drop-shadow">
        Pokédex
      </h3>
      <div className="mb-2 flex gap-2"> 
        <input
          className="font-lexend focus:border-poke-red-400 flex-1 rounded-xl border border-gray-300 bg-gray-50 px-3 py-2 text-base shadow focus:outline-none"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="font-lexend focus:border-poke-red-400 rounded-xl border border-gray-300 bg-gray-50 px-2 py-2 text-base shadow focus:outline-none"
          value={region.name}
          onChange={(e) => {
            const r = REGIONS.find((r) => r.name === e.target.value);
            setRegion(r);
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
        {filtered.length === 0 && !loading && (
          <div className="py-10 text-center text-gray-400">
            No Pokémon found.
          </div>
        )}
        {filtered.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
        {loading && (
          <div className="text-poke-red-700 py-4 text-center font-bold">
            Loading...
          </div>
        )}
        {!hasMore && !loading && (
          <div className="py-2 text-center text-xs text-gray-400">
            All Pokémon loaded.
          </div>
        )}
      </div>
    </div>
  );
}

export default PokedexPage;
