const Timer = ({ timeLeft }) => {
  return (
    <div
      className={`font-lexend rounded-full px-2 py-1 text-sm font-bold ${
        timeLeft <= 5 ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
      }`}
    >
      {timeLeft}s
    </div>
  );
};

export default Timer;
