import { useEffect, useState } from "react";

interface TimerProps {
  time: number;
  onEnd: () => void;
}

export default function Timer({ time, onEnd }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        }
        clearInterval(interval);
        onEnd();
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onEnd]);

  return (
    <div className="flex justify-center mx-auto items-center rounded-md bg-primary px-2.5 py-1.5 text-lg font-semibold text-primary-foreground shadow transition-colors">
      Time: {Math.floor(timeRemaining / 60)}:
      {timeRemaining % 60 < 10 ? `0${timeRemaining % 60}` : timeRemaining % 60}
    </div>
  );
}
