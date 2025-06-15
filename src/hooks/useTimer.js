import { useState, useEffect } from "react";

export function useTimer(initialTime = 15) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(initialTime);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsActive(false);
  };

  // Add this new function to reset and start in one go
  const restartTimer = () => {
    setTimeLeft(initialTime);
    setIsActive(true);
  };

  return {
    timeLeft,
    isActive,
    startTimer,
    stopTimer,
    resetTimer,
    restartTimer,
  };
}
