import { useEffect, useRef, useState } from "react";

interface TimerProps {
  time: number;
  onEnd: () => void;
}

export default function Timer({ time, onEnd }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(time);
  const onEndRef = useRef(onEnd);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        }
        clearInterval(interval);
        onEndRef.current();
        return 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center mx-auto items-center rounded-md bg-primary px-2.5 py-1.5 text-lg font-semibold text-primary-foreground shadow transition-colors">
      Time: {Math.floor(timeRemaining / 60)}:
      {timeRemaining % 60 < 10 ? `0${timeRemaining % 60}` : timeRemaining % 60}
    </div>
  );
}
