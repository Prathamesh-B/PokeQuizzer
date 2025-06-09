import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import QuizPage from "../pages/QuizPage"

export const quizRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/quiz',
    component: QuizPage,
})