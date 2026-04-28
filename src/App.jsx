import React from 'react';

function App() {
  return (
    // Main Wrapper: Simulating the dark, ambient background
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-black text-white flex flex-col font-sans">

      {/* Top Navigation */}
      <header className="p-6 flex justify-between items-center z-10">
        <h1 className="text-3xl tracking-tighter">
          {/* Wordmark: Bold 'Vaibe', Light 'Music' */}
          <span className="font-bold">Vaibe</span>
          <span className="font-light text-neutral-400">Music</span>
        </h1>
      </header>

      {/* Main Content Area (Scrollable) */}
      <main className="flex-1 overflow-y-auto p-6 pb-32 z-10">
        <h2 className="text-xl font-semibold mb-6 tracking-wide">Trending Now</h2>
        
        {/* Placeholder Grid for Album Art / Tracks */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
           <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 animate-pulse"></div>
           <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 animate-pulse"></div>
           <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 animate-pulse"></div>
           <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 animate-pulse"></div>
        </div>
      </main>

      {/* Fixed Bottom Player (Glassmorphism) */}
      <footer className="fixed bottom-0 left-0 w-full h-24 bg-white/5 backdrop-blur-xl border-t border-white/10 z-20 flex items-center px-6">
        
        {/* 1. Track Info (Left) */}
        <div className="flex-1 flex items-center gap-4">
           <div className="w-14 h-14 bg-neutral-800 rounded-lg shadow-lg"></div> {/* Cover Art Placeholder */}
           <div>
             <h3 className="text-sm font-semibold truncate">Select a Track</h3>
             <p className="text-xs text-neutral-400 truncate">Artist</p>
           </div>
        </div>

        {/* 2. Playback Controls (Center) */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 max-w-xl">
           <div className="flex items-center gap-6">
             <button className="text-neutral-400 hover:text-white transition-colors">Prev</button>
             <button className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold hover:scale-105 transition-transform">
                Play
             </button>
             <button className="text-neutral-400 hover:text-white transition-colors">Next</button>
           </div>
           
           {/* Progress Bar Placeholder */}
           <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden cursor-pointer">
             <div className="w-1/3 h-full bg-white rounded-full"></div> 
           </div>
        </div>

        {/* 3. Extra Controls (Right - Volume, Options) */}
        <div className="flex-1 flex justify-end">
           {/* Placeholder for Volume Slider */}
           <div className="w-24 h-1.5 bg-neutral-800 rounded-full"></div>
        </div>
      </footer>

    </div>
  );
}

export default App;