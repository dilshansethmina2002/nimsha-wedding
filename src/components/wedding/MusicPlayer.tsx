import { useEffect, useRef, useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";

const TRACK = "/bgmusic1.mp3";



// Create the audio instance outside the component (if in browser).
// මේකෙන් site එක load වෙච්ච ගමන්ම music එකත් download වෙන්න පටන් ගන්නවා.
let globalAudio: HTMLAudioElement | null = null;
if (typeof window !== "undefined") {
  globalAudio = new Audio(TRACK);
  globalAudio.preload = "auto";
  globalAudio.loop = true;
  globalAudio.volume = 0.45;
  globalAudio.playbackRate = 0.9;
}

interface Props {
  shouldPlay: boolean;
}

export const MusicPlayer = ({ shouldPlay }: Props) => {
  // Use the pre-loaded global audio instance
  const audioRef = useRef<HTMLAudioElement | null>(globalAudio);
  const [muted, setMuted] = useState(false);

  // Handle normal play/pause based on state
  useEffect(() => {
    if (!audioRef.current) return;

    if (shouldPlay && !muted) {
      // Play immediately without waiting to load
      audioRef.current.play().catch(() => {
        // Handle auto-play restrictions if user hasn't clicked anything yet
      });
    } else {
      audioRef.current.pause();
    }
    
    // Optional: Only pause on unmount, don't destroy, so it can resume fast if needed
    return () => { 
      audioRef.current?.pause(); 
    };
  }, [shouldPlay, muted]);

  // ADDED: Handle Browser Tab Visibility (Pause when hidden/minimized)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.hidden) {
        // Tab එකෙන් එළියට ගියාම හෝ minimize කළාම pause වෙනවා
        audioRef.current.pause();
      } else {
        // ආපහු Tab එකට ආවාම, mute වෙලා නැත්නම් විතරක් play වෙනවා
        if (shouldPlay && !muted) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    // Event listener එක add කිරීම
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Component එක unmount වෙද්දී event listener එක අයින් කිරීම
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [shouldPlay, muted]);

  if (!shouldPlay) return null;

  return (
    <button
      onClick={() => setMuted((m) => !m)}
      aria-label={muted ? "Unmute music" : "Mute music"}
      className=" fixed bottom-6 z-[99] right-6 z-40 h-12 w-12 rounded-full bg-gold-gradient text-primary-foreground shadow-elegant hover:shadow-glow grid place-items-center hover:scale-110 transition-all"
    >
      {muted ? <HiVolumeOff className="w-5 h-5" /> : <HiVolumeUp className="w-5 h-5" />}
    </button>
  );
};