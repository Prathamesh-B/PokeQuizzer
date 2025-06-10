import React from "react";

const TYPE_COLORS = {
  normal: "bg-gray-400 text-gray-900 border-gray-400",
  fire: "bg-red-500 text-white border-red-500",
  water: "bg-blue-500 text-white border-blue-500",
  grass: "bg-green-500 text-white border-green-500",
  electric: "bg-yellow-400 text-yellow-900 border-yellow-400",
  bug: "bg-lime-600 text-white border-lime-600",
  poison: "bg-purple-500 text-white border-purple-500",
  flying: "bg-sky-400 text-white border-sky-400",
  psychic: "bg-pink-500 text-white border-pink-500",
  rock: "bg-yellow-800 text-white border-yellow-800",
  ground: "bg-yellow-700 text-white border-yellow-700",
  fairy: "bg-pink-300 text-pink-900 border-pink-300",
  ice: "bg-cyan-300 text-cyan-900 border-cyan-300",
  dragon: "bg-indigo-700 text-white border-indigo-700",
  dark: "bg-gray-800 text-white border-gray-800",
  steel: "bg-gray-400 text-gray-900 border-gray-400",
  ghost: "bg-violet-700 text-white border-violet-700",
};

function TypeBadge({ type }) {
  const iconSrc = `./src/assets/types/${type}-icon.svg`;
  const colorClass =
    TYPE_COLORS[type] || "bg-gray-300 text-gray-900 border-gray-300";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold shadow-sm ${colorClass}`}
      title={type.charAt(0).toUpperCase() + type.slice(1)}
    >
      <img src={iconSrc} alt={type} className="h-4 w-4" />
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}

export default TypeBadge;
