export const getStatColor = (stat, gradient = false) => {
  if (gradient) {
    if (stat >= 120) return "from-green-400 to-green-600";
    if (stat >= 90) return "from-yellow-400 to-yellow-600";
    if (stat >= 60) return "from-orange-400 to-orange-600";
    return "from-red-400 to-red-600";
  } else {
    if (stat >= 120) return "text-green-600";
    if (stat >= 90) return "text-yellow-600";
    if (stat >= 60) return "text-orange-600";
    return "text-red-600";
  }
};
