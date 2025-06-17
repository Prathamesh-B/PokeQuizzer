export const getStatColor = (stat) => {
    if (stat >= 120) return "from-green-400 to-green-600";
    if (stat >= 90) return "from-yellow-400 to-yellow-600";
    if (stat >= 60) return "from-orange-400 to-orange-600";
    return "from-red-400 to-red-600";
};
