import { useCallback, useRef } from "react";
import alarmSrc from "../assets/sounds/alarm.wav";

export const useSound = (enabled = true) => {
  const audioRef = useRef(null);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(alarmSrc);
      audioRef.current.preload = "auto";
    }
    return audioRef.current;
  }, []);

  const play = useCallback(() => {
    if (!enabled) return;
    const audio = getAudio();
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Autoplay may be blocked; safe to ignore.
    });
  }, [enabled, getAudio]);

  return { play };
};
