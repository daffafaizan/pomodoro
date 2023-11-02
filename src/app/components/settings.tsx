"use-client";

import { Modal } from "flowbite-react";
import { PiTimerBold } from "react-icons/pi";
import { MdDone } from "react-icons/md";
import { useState } from "react";
import { error } from "console";

interface SettingsModalProps {
  openModal: string | undefined;
  breakMessage: boolean;
  minutes: number;
  breakMinutes: number;
  setBreakMinutes: any;
  newTime: (newFocus: number, newBreak: number) => void;
  onClose: () => void;
  playSound: () => void;
  playError: () => void;
}

export default function SettingsModal(props: SettingsModalProps) {
  const color = props.breakMessage ? "#EF3340" : "#98B4D4";
  const [newFocus, setNewFocus] = useState(props.minutes);
  const [newBreak, setNewBreak] = useState(props.breakMinutes);
  const [errorDetected, setErrorDetected] = useState(false);

  const handleChangeFocus = (event: any) => {
    if (
      Number.isInteger(parseInt(event.target.value)) ||
      event.target.value == ""
    ) {
      if (event.target.value == "") {
        setNewFocus(props.minutes);
      } else {
        setNewFocus(event.target.value);
      }
    } else {
      setNewFocus(props.minutes);
      setErrorDetected(true);
    }
  };
  const handleChangeBreak = (event: any) => {
    if (
      Number.isInteger(parseInt(event.target.value)) ||
      event.target.value == ""
    ) {
      if (event.target.value == "") {
        setNewBreak(props.breakMinutes);
      } else {
        setNewBreak(event.target.value);
      }
    } else {
      setNewBreak(props.breakMinutes);
      setErrorDetected(true);
    }
  };

  const submitChange = () => {
    if (errorDetected) {
      props.playError();
    } else {
      props.playSound();
      props.newTime(newFocus, newBreak);
      props.onClose();
    }
  };

  return (
    <Modal
      dismissible
      size="sm"
      show={props.openModal === "dismissible"}
      position="center"
      onClose={() => {
        props.onClose();
        props.playSound();
      }}
    >
      <Modal.Header className="flex flex-row items-center justify-center h-14"></Modal.Header>
      <Modal.Body>
        <div className="flex flex-col justify-start">
          <div className="flex flex-row items-center mb-4">
            <PiTimerBold
              className="h-5 w-5"
              style={{
                color: color,
              }}
            />
            <span
              className="text-sm tracking-wider ml-1"
              style={{
                color: color,
              }}
            >
              timer
            </span>
          </div>
          <div className="flex flex-row mb-6">
            <input
              id="focus"
              className="h-8 w-32 rounded-md text-sm tracking-wider pl-2 placeholder:text-sm focus:outline-none"
              placeholder="focus"
              onChange={handleChangeFocus}
              style={{
                color: color,
                borderWidth: "2px",
                borderColor: color,
              }}
            />
            <input
              id="break"
              className="h-8 w-32 ml-auto rounded-md text-sm tracking-wider pl-2 placeholder:text-sm focus:outline-none"
              placeholder="break"
              onChange={handleChangeBreak}
              style={{
                color: color,
                borderWidth: "2px",
                borderColor: color,
              }}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex flex-col w-full justify-center items-center -mt-3 -mb-2">
          <button
            className="text-lg p-[14px] rounded-full hover:scale-110 hover:duration-150 transition-transform shadow-md drop-shadow-md"
            onClick={submitChange}
            style={{
              color: props.breakMessage ? "#EF3340" : "#98B4D4",
            }}
          >
            <MdDone />
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
