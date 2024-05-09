import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Timer = () => {
  const { id } = useParams();
  const timeSaved = localStorage.getItem(`timers-${id}`);
  let timeStatic = { hours: 0, minutes: 0, seconds: 0 };
  if (timeSaved) {
    timeStatic = JSON.parse(timeSaved)
  }
  const [time, setTime] = useState(timeStatic);

  useEffect(() => {
    let interval = setInterval(() => {
      setTime((prevTime) => {
        let { hours, minutes, seconds } = prevTime;
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
            minutes = 0;
            hours++;
          }
        }
        return { hours, minutes, seconds };
      });
      localStorage.setItem(`timers-${id}`, JSON.stringify(time));
    }, 1000);

    return () => clearInterval(interval);
  }, [id, time]);

  return (
    <div className="flex">
      <div className="hour">{String(time.hours).padStart(2, "0")}</div>:
      <div className="minutes">{String(time.minutes).padStart(2, "0")}</div>:
      <div className="seconds">{String(time.seconds).padStart(2, "0")}</div>
    </div>
  );
};

export default Timer;
