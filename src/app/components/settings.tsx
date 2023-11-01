"use-client";

import { Modal } from "flowbite-react";
import { PiTimerBold } from "react-icons/pi";
import { MdDone } from "react-icons/md";

interface SettingsModalProps {
  openModal: string | undefined;
  onClose: () => void;
  breakMessage: boolean;
  newTime: (newFocus: number, newBreak: number) => void;
}

export default function SettingsModal(props: SettingsModalProps) {
  const color = props.breakMessage ? "#EF3340" : "#98B4D4";
  return (
    <Modal
      dismissible
      show={props.openModal === "dismissible"}
      position="center"
      onClose={props.onClose}
    >
      <Modal.Header className="flex flex-row items-center justify-center h-14"></Modal.Header>
      <Modal.Body>
        <div>
          <label className="relative inline-flex items-center mr-5 cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer"/>
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>
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
              id="minutes"
              className="h-8 w-32 rounded-md text-sm tracking-wider pl-2 placeholder:text-sm focus:outline-none"
              placeholder="focus"
              style={{
                color: color,
                borderWidth: "2px",
                borderColor: color,
              }}
            />
            <input
              id="minutes"
              className="h-8 w-32 ml-auto rounded-md text-sm tracking-wider pl-2 placeholder:text-sm focus:outline-none"
              placeholder="break"
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
        {/* <div className="flex flex-col w-full justify-center items-center -mt-2 -mt-1">
          <button
            onClick={props.onClose}
            className="text-sm text-white tracking-wider px-3 py-1 rounded-lg hover:scale-110 hover:duration-150 transition-transform shadow-md drop-shadow-md"
            style={{
              background: props.breakMessage ? "#EF3340" : "#98B4D4",
            }}
          >
            okay
          </button>
        </div> */}
        <div className="flex flex-col w-full justify-center items-center -mt-2 -mb-1">
          <button
            className="text-lg p-[14px] rounded-full hover:scale-110 hover:duration-150 transition-transform shadow-md drop-shadow-md"
            onClick={props.onClose}
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
