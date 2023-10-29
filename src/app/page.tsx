"use client";

import { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { FaUndoAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [breakMessage, setBreakMessage] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(35);
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
    let minutes = breakMessage ? 5 : 35;
    let seconds = 0;

    setMinutes(minutes);
    setSeconds(seconds);
    setIsRunning(false);
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24"
      style={{
        background: breakMessage ? "#EF3340" : "#98B4D4",
        transition: "background 0.5s ease",
      }}
    >
      <button
        className="absolute right-7 top-7 text-2xl p-[14px] rounded-full bg-[#f4f5f0] hover:scale-110 hover:duration-150 transition-transform shadow-md drop-shadow-md"
        style={{
          color: breakMessage ? "#EF3340" : "#98B4D4",
        }}
      >
        <IoSettingsSharp />
      </button>
      <div className="flex flex-col items-center justify-center h-[380px] w-[300px] rounded-[40px] bg-[#f4f5f0] shadow-xl drop-shadow-md">
        <div
          className="flex flex-col items-center justify-center h-52 w-52 mt-3 gap-2 rounded-full bg-opacity-30"
          style={{
            background: breakMessage ? "#EF3340" : "#98B4D4",
            transition: "background 0.5s ease",
          }}
        >
          <span className="text-5xl text-[#f4f5f0]">
            {minutesFormat}:{secondsFormat}
          </span>
        </div>
        <div className="flex flex-row items-center justify-center w-full mt-7 gap-10">
          <button
            className="text-lg p-[14px] rounded-full bg-[#f4f5f0] hover:scale-110 hover:duration-150 transition-transform shadow-md drop-shadow-md"
            onClick={handleStartStopClick}
            style={{
              color: breakMessage ? "#EF3340" : "#98B4D4",
            }}
          >
            {isRunning ? <FaPause /> : <FaPlay />}
          </button>
          <button
            className="text-lg p-[14px] rounded-full bg-[#f4f5f0] hover:scale-110 hover:duration-150 transition-transform shadow-md drop-shadow-md"
            onClick={handleReset}
            style={{
              color: breakMessage ? "#EF3340" : "#98B4D4",
            }}
          >
            <FaUndoAlt />
          </button>
        </div>
      </div>
    </main>
  );
}
