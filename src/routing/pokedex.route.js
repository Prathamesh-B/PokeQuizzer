import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import PokedexPage from "../pages/PokedexPage"

export const pokedexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/pokedex',
    component: PokedexPage,
})