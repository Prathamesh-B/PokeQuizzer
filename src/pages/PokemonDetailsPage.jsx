import { useEffect, useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import PokemonDetails from "../components/PokemonDetails";

function PokemonDetailsPage() {
  const { pokemonId } = useParams({ from: "/pokedex/$pokemonId" });
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
        );
        if (!response.ok) {
          throw new Error("Pokemon not found");
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [pokemonId]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="text-poke-red-700 mb-2 text-xl font-bold">
            Loading...
          </div>
          <div className="text-gray-500">Fetching Pokemon details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-2 text-xl font-bold text-red-600">Error</div>
          <div className="mb-4 text-gray-500">{error}</div>
          <button
            onClick={() => navigate({ to: "/pokedex" })}
            className="red-btn"
          >
            Back to Pokedex
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col px-3 pt-1 pb-4">
      {/* Back Button */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <button
          onClick={() => navigate({ to: "/pokedex" })}
          className="text-poke-red-600 hover:text-poke-red-700 flex items-center gap-2 font-medium transition-colors"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Pokedex
        </button>
      </div>

      {/* Pokemon Details */}
      <div className="flex-1 overflow-hidden">
        <PokemonDetails pokemon={pokemon} />
      </div>
    </div>
  );
}

export default PokemonDetailsPage;
