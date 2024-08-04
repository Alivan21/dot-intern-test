import { useEffect, useRef, useState } from "react";

interface TimerProps {
  time: number;
  onEnd: () => void;
  onTick: (timeLeft: number) => void;
}

export default function Timer({ time, onEnd, onTick }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(time);
  const onEndRef = useRef(onEnd);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1;
          onTickRef.current(newTime);
          return newTime;
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
