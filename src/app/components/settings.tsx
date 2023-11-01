"use-client";

import { Button, Modal } from "flowbite-react";

interface SettingsModalProps {
  openModal: string | undefined;
  onClose: () => void;
  breakMessage: boolean;
}

export default function SettingsModal(props: SettingsModalProps) {
  return (
    <Modal
      dismissible
      show={props.openModal === "dismissible"}
      position="center"
      onClose={props.onClose}
    >
      <Modal.Header className="flex flex-row items-center justify-center">
        <span className="text-2xl">Settings</span>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-row space-x-3">
          <input
            id="minutes"
            className="h-8 w-24 rounded-md"
            style={{
              background: props.breakMessage ? "#EF3340" : "#98B4D4",
            }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onClose}>I accept</Button>
        <Button color="gray" onClick={props.onClose}>
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
