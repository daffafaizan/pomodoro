"use client";

import { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { FaUndoAlt } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { Button, Modal } from "flowbite-react";
import clickSound from "../sounds/light-switch.mp3";

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [breakMessage, setBreakMessage] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(35);
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const secondsFormat = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const minutesFormat = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const clickAudio = new Audio(clickSound);

  const playClick = () => {
    clickAudio.play();
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
        onClick={() => props.setOpenModal("default")}
        style={{
          color: breakMessage ? "#EF3340" : "#98B4D4",
        }}
      >
        <IoSettingsSharp />
      </button>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>
            I accept
          </Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
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
            onClick={() => {
              handleStartStopClick();
              playClick();
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
              playClick();
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
