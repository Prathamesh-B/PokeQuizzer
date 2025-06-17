import {
  DIFFICULTY_LEVELS,
  GENERATIONS,
  ALL_TYPES,
} from "../constants/quizConfig";

export function getDifficultyRange(difficulty, quizType) {
  const baseDifficulty = DIFFICULTY_LEVELS.find((d) => d.id === difficulty);

  if (quizType === "generation") {
    switch (difficulty) {
      case "easy":
        return [1, 251]; // Gen 1-2
      case "medium":
        return [1, 493]; // Gen 1-4
      case "hard":
        return [1, 809]; // All generations
    }
  }

  return baseDifficulty.range;
}

export function formatChoice(choice, quizType) {
  if (quizType === "generation") {
    return choice;
  }
  return choice.charAt(0).toUpperCase() + choice.slice(1);
}

export function getQuestionText(question, quizType) {
  const pokemonName =
    question.name.charAt(0).toUpperCase() + question.name.slice(1);
  switch (quizType) {
    case "type":
      return `What type is ${pokemonName}?`;
    case "name":
      return "What is this Pokémon's name?";
    case "generation":
      return `Which generation is ${pokemonName} from?`;
    default:
      return "";
  }
}

export async function setupTypeQuestion(pokemon) {
  const type = pokemon.types[0].type.name;

  let choicesSet = new Set([type]);
  while (choicesSet.size < 4) {
    const t = ALL_TYPES[Math.floor(Math.random() * ALL_TYPES.length)];
    choicesSet.add(t);
  }

  return {
    answer: type,
    choices: Array.from(choicesSet).sort(() => Math.random() - 0.5),
  };
}

export async function setupNameQuestion(pokemon, difficultyRange) {
  const wrongChoices = [];
  const [minId, maxId] = difficultyRange;

  while (wrongChoices.length < 3) {
    const randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    if (randomId !== pokemon.id) {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`,
        );
        const data = await res.json();
        if (!wrongChoices.includes(data.name)) {
          wrongChoices.push(data.name);
        }
      } catch (error) {
        console.error("Error fetching wrong choice:", error);
      }
    }
  }

  const allChoices = [pokemon.name, ...wrongChoices];

  return {
    answer: pokemon.name,
    choices: allChoices.sort(() => Math.random() - 0.5),
  };
}

export async function setupGenerationQuestion(pokemon) {
  const generation = GENERATIONS.find(
    (gen) => pokemon.id >= gen.range[0] && pokemon.id <= gen.range[1],
  );

  // Get 3 other random generations
  const wrongChoices = [];
  while (wrongChoices.length < 3) {
    const randomGen =
      GENERATIONS[Math.floor(Math.random() * GENERATIONS.length)];
    if (
      randomGen.name !== generation.name &&
      !wrongChoices.includes(randomGen.name)
    ) {
      wrongChoices.push(randomGen.name);
    }
  }

  const allChoices = [generation.name, ...wrongChoices];

  return {
    answer: generation.name,
    choices: allChoices.sort(() => Math.random() - 0.5),
  };
}
