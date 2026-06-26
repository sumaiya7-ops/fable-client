"use client";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0c16] font-sans overflow-hidden relative">
      
      {/* ─── BACKGROUND GLOW EFFECTS (NEXT-LEVEL VISUAL) ─── */}
      <div className="absolute w-[350px] h-[350px] bg-purple-600/10 blur-[100px] rounded-full top-1/4 left-1/4 animate-pulse"></div>
      <div className="absolute w-[350px] h-[350px] bg-indigo-600/10 blur-[100px] rounded-full bottom-1/4 right-1/4 animate-pulse [animation-duration:4s]"></div>

      {/* ─── PRO MAX COSMIC ORBIT LOADER ─── */}
      <div className="relative flex items-center justify-center w-28 h-28">
        
        {/* Outer Neon Ring */}
        <div className="absolute inset-0 border-2 border-dashed border-purple-500/20 rounded-full animate-spin [animation-duration:12s]"></div>
        
        {/* Middle Glowing Orbit */}
        <div className="absolute w-20 h-20 border-4 border-transparent border-t-indigo-500 border-b-purple-500 rounded-full animate-spin [animation-duration:2s] shadow-[0_0_20px_rgba(99,102,241,0.2)]"></div>
        
        {/* Inner Counter-Rotating Ring */}
        <div className="absolute w-14 h-14 border-4 border-transparent border-l-pink-500 border-r-cyan-400 rounded-full animate-spin [animation-duration:1s] [animation-direction:reverse]"></div>
        
        {/* Center Core Pulse */}
        <div className="absolute w-6 h-6 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-full animate-ping opacity-75"></div>
        <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff]"></div>
      </div>

      {/* ─── TYPOGRAPHY & ANIMATED SUBTITLE ─── */}
      <div className="mt-8 text-center space-y-2">
        <h2 className="text-xl font-bold text-white tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-purple-400">
          Fable
        </h2>
        
        <div className="flex items-center justify-center gap-1">
          <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest pl-1">
            Loading Universe
          </p>
          {/* Three Glowing Dots Animation */}
          <div className="flex gap-1 items-center mb-0.5">
            <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
            <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
            <span className="w-1 h-1 bg-purple-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
          </div>
        </div>
      </div>

    </div>
  );
}
