"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [breakMessage, setBreakMessage] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [minutes, setMinutes] = useState(0);
  const secondsFormat = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const minutesFormat = minutes < 10 ? `0${minutes}` : `${minutes}`;

  useEffect(() => {
    let interval: any;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds == 0) {
          if (minutes != 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let minutes = breakMessage ? 24 : 5;
            let seconds = 0;

            setSeconds(seconds);
            setMinutes(minutes);
            setIsRunning(false);
            setBreakMessage(!breakMessage);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, seconds, minutes, breakMessage]);

  const handleStartStopClick = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setMinutes(35);
    setSeconds(0);
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24"
      style={{
        background: breakMessage ? "#EF3340" : "#98B4D4",
        transition: "background 0.5s ease",
      }}
    >
      <div className="flex flex-col items-center justify-center h-[350px] w-[300px] rounded-3xl bg-white shadow-xl drop-shadow-md">
        <div
          className="flex flex-col items-center justify-center h-52 w-52 gap-2 rounded-full bg-opacity-30"
          style={{
            background: breakMessage ? "#EF3340" : "#98B4D4",
            transition: "background 0.5s ease",
          }}
        >
          <span className="text-5xl text-white">
            {minutesFormat}:{secondsFormat}
          </span>
        </div>
        <div className="flex flex-row items-center justify-center w-full mt-7 gap-10">
          <button
            className="text-lg px-4 py-1 h-10 w-50 rounded-md bg-white hover:scale-110 hover:duration-150 transition-transform shadow-md drop-shadow-md"
            onClick={handleStartStopClick}
            style={{
              color: breakMessage ? "#EF3340" : "#98B4D4",
            }}
          >
            {isRunning ? "stop" : "start"}
          </button>
          <button
            className="text-lg px-4 py-1 h-10 w-50 rounded-md bg-white hover:scale-110 hover:duration-150 transition-transform shadow-md drop-shadow-md"
            onClick={handleReset}
            style={{
              color: breakMessage ? "#EF3340" : "#98B4D4",
            }}
          >
            reset
          </button>
        </div>
      </div>
    </main>
  );
}
