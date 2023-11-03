"use client";

import { useEffect, useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { FaUndoAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import SettingsModal from "./components/settings";
import clickSound from "./assets/sounds/button-push-chunky-plastic-button.mp3";
import settingsSound from "./assets/sounds/click-short-mouse-click.mp3";
import alarmSound from "./assets/sounds/scifi-alarm.mp3";
import errorSound from "./assets/sounds/negative-click.mp3";
import Toggle from "./components/toggle";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [breakMessage, setBreakMessage] = useState(false);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [focusMinutes, setFocusMinutes] = useState(35);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(35);
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const secondsFormat = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const minutesFormat = minutes < 10 ? `0${minutes}` : `${minutes}`;

  // // Create references to the audio elements
  // const clickAudioRef = useRef(new Audio(clickSound));
  // const settingsAudioRef = useRef(new Audio(settingsSound));
  // const alarmAudioRef = useRef(new Audio(alarmSound));
  // const errorAudioRef = useRef(new Audio(errorSound));

  // // Functions to play the sounds
  // const playClick = () => {
  //   const clickAudio = clickAudioRef.current;
  //   clickAudio.volume = 0.5; // Adjust the volume (1.0 is maximum)
  //   clickAudio.play();
  // };

  // const playAlarm = () => {
  //   const alarmAudio = alarmAudioRef.current;
  //   alarmAudio.volume = 0.5; // Adjust the volume (1.0 is maximum)
  //   alarmAudio.play();
  // };

  // const playSettings = () => {
  //   const settingsAudio = settingsAudioRef.current;
  //   settingsAudio.volume = 0.5;
  //   settingsAudio.play();
  // };

  // const playError = () => {
  //   const errorAudio = errorAudioRef.current;
  //   errorAudio.volume = 0.5;
  //   errorAudio.play()
  // }

  // Function to retrieve new time for focus or break
  const newTime = (newFocus: number, newBreak: number) => {
    setFocusMinutes(newFocus);
    setBreakMinutes(newBreak);
    breakMessage ? setMinutes(newBreak) : setMinutes(newFocus);
  };

  useEffect(() => {
    let interval: any;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds == 0) {
          if (minutes != 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            let displayMinutes = breakMessage ? focusMinutes : breakMinutes;
            let displaySeconds = 0;

            //playAlarm();
            setSeconds(displaySeconds);
            setMinutes(displayMinutes);
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
  }, [isRunning, seconds, minutes, breakMessage, breakMinutes, focusMinutes]);

  const handleStartStopClick = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    let displayMinutes = breakMessage ? breakMinutes : focusMinutes;
    let displaySeconds = 0;

    setMinutes(displayMinutes);
    setSeconds(displaySeconds);
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
        onClick={() => {
          setOpenModal("dismissible");
          //playSettings();
        }}
        style={{
          color: breakMessage ? "#EF3340" : "#98B4D4",
        }}
      >
        <IoSettingsSharp />
      </button>
      <Toggle
        //playSound={playSettings}
        breakMessage={breakMessage}
        setBreakMessage={setBreakMessage}
        setMinutes={setMinutes}
        setSeconds={setSeconds}
        setIsRunning={setIsRunning}
        focusMinutes={focusMinutes}
        breakMinutes={breakMinutes}
      />
      <SettingsModal
        openModal={openModal}
        breakMessage={breakMessage}
        setBreakMinutes={setBreakMinutes}
        breakMinutes={breakMinutes}
        newTime={newTime}
        onClose={() => setOpenModal(undefined)}
        //playSound={playSettings}
        //playError={playError}
        minutes={minutes}
      />
      <div className="flex flex-col items-center justify-center h-[380px] w-[300px] rounded-[40px] bg-[#f4f5f0] shadow-xl drop-shadow-md">
        <div
          className="flex flex-col items-center justify-center h-52 w-52 mt-3 gap-2 rounded-full bg-opacity-30"
          style={{
            background: breakMessage ? "#EF3340" : "#98B4D4",
            transition: "background 0.5s ease",
          }}
        >
          <span className="text-5xl text-[#f4f5f0] tracking-wider">
            {minutesFormat}:{secondsFormat}
          </span>
        </div>
        <div className="flex flex-row items-center justify-center w-full mt-7 gap-10">
          <button
            className="text-lg p-[14px] rounded-full bg-[#f4f5f0] hover:scale-110 hover:duration-150 transition-transform shadow-md drop-shadow-md"
            onClick={() => {
              handleStartStopClick();
              //playClick();
            }}
            style={{
              color: breakMessage ? "#EF3340" : "#98B4D4",
            }}
          >
            {isRunning ? <FaPause /> : <FaPlay />}
          </button>
          <button
            className="text-lg p-[14px] rounded-full bg-[#f4f5f0] hover:scale-110 hover:duration-150 transition-transform shadow-md drop-shadow-md"
            onClick={() => {
              handleReset();
              //playClick();
            }}
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
