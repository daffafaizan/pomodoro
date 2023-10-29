"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
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
            let minutes = displayMessage ? 24 : 4;
            let seconds = 59;

            setSeconds(seconds);
            setMinutes(minutes);
            setDisplayMessage(!displayMessage);
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
  }, [isRunning, seconds, minutes, displayMessage]);

  const handleStartStopClick = () => {
    setIsRunning(!isRunning);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#98B4D4]">
      <div className="flex flex-col items-center justify-center h-60 w-60 gap-2 rounded-full bg-slate-500 bg-opacity-30">
        <div>
          <span className="text-5xl text-white">
            {minutesFormat}:{secondsFormat}
          </span>
        </div>
        <div>
          <button className="text-lg px-4 py-1 rounded-md bg-white hover:scale-110 hover:duration-150 transition-transform"
          onClick={handleStartStopClick}>
            {isRunning ? 'stop' : 'start'}
          </button>
        </div>
      </div>
    </main>
  );
}
