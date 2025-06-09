import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout";
import { quizRoute } from "./quiz.route";
import { homeRoute } from "./home.route";
import { pokedexRoute } from "./pokedex.route";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

export const routeTree = rootRoute.addChildren([
  quizRoute,
  homeRoute,
  pokedexRoute,
]);
