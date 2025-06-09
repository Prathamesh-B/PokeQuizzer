import React from "react";

function PokedexPage() {
    const [pokemon, setPokemon] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchPokedex() {
            setLoading(true);
            const res = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=20"
            );
            const data = await res.json();
            // Fetch details for each
            const details = await Promise.all(
                data.results.map((p) => fetch(p.url).then((r) => r.json()))
            );
            setPokemon(details);
            setLoading(false);
        }
        fetchPokedex();
    }, []);

    if (loading)
        return (
            <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>
        );

    return (
        <>
            <h3 className="text-3xl font-bold text-center text-red-700 mb-6 tracking-widest drop-shadow">
                Pokedex
            </h3>
            <div className="max-h-96 overflow-y-auto grid grid-cols-1 gap-4">
                {pokemon.map((p) => (
                    <div
                        key={p.id}
                        className="flex items-center gap-4 bg-gray-100 rounded-lg shadow p-3 border border-gray-300 hover:bg-gray-200 transition"
                    >
                        <img
                            src={p.sprites.front_default}
                            alt={p.name}
                            className="w-16 h-16 bg-white rounded-full border-2 border-gray-300 shadow"
                        />
                        <div>
                            <div className="font-bold text-lg text-gray-800 tracking-wide">
                                {p.name.charAt(0).toUpperCase() +
                                    p.name.slice(1)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 flex gap-1">
                                {p.types.map((t) => (
                                    <span
                                        key={t.type.name}
                                        className={`px-2 py-0.5 rounded-full font-semibold bg-opacity-80 text-white text-[11px] ${
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
                                        {t.type.name.charAt(0).toUpperCase() +
                                            t.type.name.slice(1)}
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
