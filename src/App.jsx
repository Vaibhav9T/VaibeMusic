import React, { useState, useEffect, useRef } from 'react';
import { FastAverageColor } from 'fast-average-color'; 
import { 
  PlayIcon, 
  PauseIcon, 
  ForwardIcon, 
  BackwardIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon 
} from '@heroicons/react/24/solid';
import logo from './assets/vb_dark.png';

function App() {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiHost, setApiHost] = useState(null);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const [bgColor, setBgColor] = useState('#171717'); 
  const [volume, setVolume] = useState(0.8); 
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchTrendingMusic = async () => {
      try {
        const hostResponse = await fetch('https://api.audius.co');
        const hostData = await hostResponse.json();
        const host = setApiHost(hostData.data[0]); 

        const musicResponse = await fetch(`${hostData.data[0]}/v1/tracks/trending`);
        const musicData = await musicResponse.json();
        
        setTracks(musicData.data.slice(0, 10)); 
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching music:", error);
        setIsLoading(false);
      }
    };

    fetchTrendingMusic();
  }, []);

  useEffect(() => {
    if (currentTrack?.artwork?.['480x480']) {
      const fac = new FastAverageColor();
      fac.getColorAsync(currentTrack.artwork['480x480'], { crossOrigin: 'anonymous' })
        .then(color => setBgColor(color.hex))
        .catch(() => setBgColor('#171717'));
    }
  }, [currentTrack]); 

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted, currentTrack]); 

  const handlePlayTrack = (track) => {
    if (currentTrack?.id === track.id) {
      togglePlayPause();
      return;
    }
    setCurrentTrack(track);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play();
    }, 50);
  };

  const togglePlayPause = () => {
    if (!currentTrack) return; 
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const skipTrack = (direction) => {
    if (!currentTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    let newIndex = direction === 'next' 
      ? (currentIndex + 1) % tracks.length 
      : (currentIndex - 1 + tracks.length) % tracks.length;

    setCurrentTrack(tracks[newIndex]);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play();
    }, 50);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      className="min-h-screen text-white flex flex-col font-sans transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `radial-gradient(circle at top left, ${bgColor}40 0%, #000000 80%)`,
        backgroundColor: '#000'
      }}
    >
      
      {currentTrack && apiHost && (
        <audio 
          ref={audioRef} 
          src={`${apiHost}/v1/tracks/${currentTrack.id}/stream?app_name=VaibeMusic`}
          onEnded={() => skipTrack('next')} 
          onTimeUpdate={handleTimeUpdate}          
          onLoadedMetadata={handleLoadedMetadata}  
        />
      )}

      {/* Responsive Header */}
      <header className="p-4 md:p-6 flex justify-between items-center z-10">
        <h1 className="text-2xl md:text-3xl tracking-tighter drop-shadow-md">
          <img src={logo} alt="Vaibe Music Logo" className="w-12 h-12 md:w-15 md:h-15 inline-block mr-2" />
          <span className="font-bold">Vaibe</span>
          <span className="font-light text-neutral-300">Music</span>
        </h1>
      </header>

      {/* Responsive Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-32 md:pb-36 z-10">
        <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 tracking-wide drop-shadow-md">Trending Now</h2>
        
        {/* Adjusted Grid for Mobile (cols-2) and Desktop (cols-5) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/10 animate-pulse"></div>
            ))
          ) : (
            tracks.map((track) => {
              const isThisTrackPlaying = currentTrack?.id === track.id && isPlaying;
              return (
                <div 
                  key={track.id} 
                  onClick={() => handlePlayTrack(track)}
                  className="group cursor-pointer flex flex-col gap-2 md:gap-3 hover:scale-105 transition-transform duration-300"
                >
                  <div className={`aspect-square rounded-2xl overflow-hidden shadow-2xl border relative transition-colors ${currentTrack?.id === track.id ? 'border-white' : 'border-white/10'}`}>
                    <img 
                      src={track.artwork?.['480x480'] || 'https://via.placeholder.com/480'} 
                      alt={track.title}
                      className={`w-full h-full object-cover transition-transform duration-700 ${isThisTrackPlaying ? 'scale-110' : ''}`}
                    />
                    
                    {/* Hover Overlay - Only shows on desktop hover or when active */}
                    <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${currentTrack?.id === track.id ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm text-black rounded-full flex items-center justify-center font-bold shadow-lg">
                        {isThisTrackPlaying ? <PauseIcon className="w-5 h-5 md:w-6 md:h-6" /> : <PlayIcon className="w-5 h-5 md:w-6 md:h-6 ml-1" />}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className={`text-xs md:text-sm font-semibold truncate drop-shadow-sm ${currentTrack?.id === track.id ? 'text-white' : 'text-neutral-200'}`}>{track.title}</h3>
                    <p className="text-[10px] md:text-xs text-neutral-400 truncate drop-shadow-sm">{track.user?.name}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Responsive Glass Player */}
      <footer className="fixed bottom-0 left-0 w-full bg-black/40 md:bg-black/20 backdrop-blur-3xl border-t border-white/10 z-20 flex flex-col md:flex-row items-center px-4 md:px-6 py-2 md:py-0 h-auto md:h-24 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] gap-2 md:gap-0">
        
        {/* Mobile Top Row: Info & Mobile Controls / Desktop Left Col: Info */}
        <div className="w-full md:flex-1 flex justify-between items-center">
           <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
             {currentTrack ? (
               <img src={currentTrack.artwork?.['150x150']} alt="cover" className="w-10 h-10 md:w-14 md:h-14 bg-neutral-800 rounded-lg shadow-lg object-cover border border-white/10 flex-shrink-0" />
             ) : (
               <div className="w-10 h-10 md:w-14 md:h-14 bg-white/5 rounded-lg border border-white/10 flex-shrink-0"></div>
             )}
             
             <div className="min-w-0">
               <h3 className="text-xs md:text-sm font-semibold truncate text-white">{currentTrack ? currentTrack.title : 'Select a Track'}</h3>
               <p className="text-[10px] md:text-xs text-neutral-400 truncate">{currentTrack ? currentTrack.user?.name : 'Artist'}</p>
             </div>
           </div>

           {/* Mobile-Only Controls (Play & Next) */}
           <div className="flex md:hidden items-center gap-3 flex-shrink-0">
              <button onClick={togglePlayPause} className="p-2 text-white">
                 {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
              </button>
              <button onClick={() => skipTrack('next')} className="p-2 text-neutral-400 hover:text-white">
                 <ForwardIcon className="w-6 h-6" />
              </button>
           </div>
        </div>

        {/* Desktop Controls & Universal Progress Bar */}
        <div className="w-full md:flex-1 flex flex-col items-center justify-center gap-1 md:gap-2 max-w-xl">
           
           {/* Desktop-Only Play Controls */}
           <div className="hidden md:flex items-center gap-6">
             <button onClick={() => skipTrack('prev')} className="text-neutral-400 hover:text-white transition-colors p-2">
                <BackwardIcon className="w-6 h-6" />
             </button>
             <button onClick={togglePlayPause} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                {isPlaying ? <PauseIcon className="w-7 h-7" /> : <PlayIcon className="w-7 h-7 ml-1" />}
             </button>
             <button onClick={() => skipTrack('next')} className="text-neutral-400 hover:text-white transition-colors p-2">
                <ForwardIcon className="w-6 h-6" />
             </button>
           </div>
           
           {/* Progress Bar (Visible on both, slightly thinner on mobile) */}
           <div className="w-full flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-neutral-400">
             <span className="w-6 md:w-8 text-right">{formatTime(currentTime)}</span>
             <input 
               type="range" 
               min="0" 
               max={duration || 100} 
               value={currentTime} 
               onChange={handleSeek}
               className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white hover:accent-neutral-200 transition-all"
             />
             <span className="w-6 md:w-8">{formatTime(duration)}</span>
           </div>
        </div>

        {/* Volume - Hidden on Mobile, Visible on Desktop */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-3">
           <button onClick={toggleMute} className="text-neutral-400 hover:text-white transition-colors">
             {isMuted || volume === 0 ? <SpeakerXMarkIcon className="w-5 h-5" /> : <SpeakerWaveIcon className="w-5 h-5" />}
           </button>
           <input 
             type="range" 
             min="0" max="1" step="0.01"
             value={isMuted ? 0 : volume} 
             onChange={handleVolumeChange}
             className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white hover:accent-neutral-200 transition-all"
           />
        </div>
      </footer>

    </div>
  );
}

export default App;