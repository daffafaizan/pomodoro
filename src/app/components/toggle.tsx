interface ToggleProps {
    breakMessage: boolean;
  }

export default function Toggle(props: ToggleProps) {
    const backgroundColor = props.breakMessage ? "#EF3340" : "#98B4D4";
  
    return (
      <label className="absolute left-7 top-7 items-center mr-5 cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className={`w-[104px] h-[54px] bg-gray-200 rounded-full peer peer-checked:bg-${backgroundColor} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[50px] after:w-[50px] after:transition-all peer-checked:shadow-md peer-checked:drop-shadow-md`}></div>
      </label>
    );
  }