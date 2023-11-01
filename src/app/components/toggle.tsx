export default function Toggle() {
  return (
    <label className="absolute left-7 top-7 items-center mr-5 cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="w-[104px] h-[54px] bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[50px] after:w-[50px] after:transition-all peer-checked:bg-teal-600 shadow-md drop-shadow-md"></div>
    </label>
  );
}