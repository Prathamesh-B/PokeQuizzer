import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import PokemonDetailsPage from "../pages/PokemonDetailsPage";

export const pokemonDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pokedex/$pokemonId",
  component: PokemonDetailsPage,
});
