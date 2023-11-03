interface ToggleProps {
  playSound: () => void;
  breakMessage: boolean;
  setBreakMessage: any;
  setMinutes: any;
  setSeconds: any;
  setIsRunning: any;
  focusMinutes: number;
  breakMinutes: number;
}

export default function Toggle(props: ToggleProps) {
  const backgroundColor = props.breakMessage ? "#EF3340" : "#98B4D4";

  return (
    <label className="absolute left-7 top-7 items-center mr-5 cursor-pointer">
      <input
        type="checkbox"
        value=""
        checked={props.breakMessage}
        className="sr-only peer"
        onClick={() => {
          props.playSound();
          props.setBreakMessage(!props.breakMessage);
          props.setMinutes(
            props.breakMessage ? props.focusMinutes : props.breakMinutes
          );
          props.setSeconds(0);
          props.setIsRunning(false);
        }}
      />
      <div
        className={`w-[104px] h-[54px] border-2 border-white rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-[50px] after:w-[50px] after:transition-all`}
        style={{
          backgroundColor: props.breakMessage ? "#EF3340" : "#98B4D4",
          transition: "background 0.5s ease",
        }}
      ></div>
    </label>
  );
}
