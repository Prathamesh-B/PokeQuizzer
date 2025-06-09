import React from "react";

function PokedexPage() {
  const [pokemon, setPokemon] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPokedex() {
      setLoading(true);
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await res.json();
      // Fetch details for each
      const details = await Promise.all(
        data.results.map((p) => fetch(p.url).then((r) => r.json())),
      );
      setPokemon(details);
      setLoading(false);
    }
    fetchPokedex();
  }, []);

  if (loading)
    return <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>;

  return (
    <>
      <h3 className="mb-6 text-center text-3xl font-bold tracking-widest text-red-700 drop-shadow">
        Pokedex
      </h3>
      <div className="grid max-h-96 grid-cols-1 gap-4 overflow-y-auto">
        {pokemon.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 rounded-lg border border-gray-300 bg-gray-100 p-3 shadow transition hover:bg-gray-200"
          >
            <img
              src={p.sprites.front_default}
              alt={p.name}
              className="h-16 w-16 rounded-full border-2 border-gray-300 bg-white shadow"
            />
            <div>
              <div className="text-lg font-bold tracking-wide text-gray-800">
                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
              </div>
              <div className="mt-1 flex gap-1 text-xs text-gray-500">
                {p.types.map((t) => (
                  <span
                    key={t.type.name}
                    className={`bg-opacity-80 rounded-full px-2 py-0.5 text-[11px] font-semibold text-white ${
                      t.type.name === "fire"
                        ? "bg-red-500"
                        : t.type.name === "water"
                          ? "bg-blue-500"
                          : t.type.name === "grass"
                            ? "bg-green-500"
                            : t.type.name === "electric"
                              ? "bg-yellow-400 text-yellow-900"
                              : t.type.name === "bug"
                                ? "bg-lime-600"
                                : t.type.name === "poison"
                                  ? "bg-purple-500"
                                  : t.type.name === "flying"
                                    ? "bg-sky-400"
                                    : t.type.name === "psychic"
                                      ? "bg-pink-500"
                                      : t.type.name === "rock"
                                        ? "bg-yellow-800"
                                        : t.type.name === "ground"
                                          ? "bg-yellow-700"
                                          : t.type.name === "fairy"
                                            ? "bg-pink-300 text-pink-900"
                                            : t.type.name === "ice"
                                              ? "bg-cyan-300 text-cyan-900"
                                              : t.type.name === "dragon"
                                                ? "bg-indigo-700"
                                                : t.type.name === "dark"
                                                  ? "bg-gray-800"
                                                  : t.type.name === "steel"
                                                    ? "bg-gray-400 text-gray-900"
                                                    : t.type.name === "ghost"
                                                      ? "bg-violet-700"
                                                      : "bg-gray-400"
                    }`}
                  >
                    {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PokedexPage;
