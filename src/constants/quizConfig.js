export const QUIZ_TYPES = [
  {
    id: "type",
    name: "Type Quiz",
    description: "Guess the Pokémon's primary type",
  },
  { id: "name", name: "Name Quiz", description: "Guess the Pokémon's name" },
  {
    id: "generation",
    name: "Generation Quiz",
    description: "Guess which generation this Pokémon is from",
  },
];

export const DIFFICULTY_LEVELS = [
  { id: "easy", name: "Easy", range: [1, 151], questions: 5 },
  { id: "medium", name: "Medium", range: [1, 386], questions: 8 },
  { id: "hard", name: "Hard", range: [1, 809], questions: 10 },
];

export const GENERATIONS = [
  { name: "Generation I (Kanto)", range: [1, 151] },
  { name: "Generation II (Johto)", range: [152, 251] },
  { name: "Generation III (Hoenn)", range: [252, 386] },
  { name: "Generation IV (Sinnoh)", range: [387, 493] },
  { name: "Generation V (Unova)", range: [494, 649] },
  { name: "Generation VI (Kalos)", range: [650, 721] },
  { name: "Generation VII (Alola)", range: [722, 809] },
];

export const ALL_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];
