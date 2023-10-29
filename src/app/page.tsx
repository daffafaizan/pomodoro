import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#98B4D4]">
      <div className="flex flex-col items-center justify-center p-10 gap-2 rounded-lg bg-slate-500 bg-opacity-30">
        <div>
          <span className="text-4xl text-white">35:00</span>
        </div>
        <div>
          <button className="text-lg px-4 py-1 rounded-sm bg-white">
            START
          </button>
        </div>
      </div>
    </main>
  )
}
