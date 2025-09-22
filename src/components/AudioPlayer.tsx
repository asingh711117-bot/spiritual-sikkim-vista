import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  title: string;
  isActive: boolean;
  onToggle: () => void;
}

const AudioPlayer = ({ src, title, isActive, onToggle }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  useEffect(() => {
    if (isActive && !isPlaying) {
      setIsPlaying(true);
      audioRef.current?.play().catch(() => {
        // Mock audio playing for demo
        console.log("Mock audio playing:", title);
      });
    } else if (!isActive && isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
    }
  }, [isActive, isPlaying, title]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch(() => {
        // Mock audio playing for demo
        console.log("Mock audio playing:", title);
      });
      setIsPlaying(true);
    }
    onToggle();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="bg-background border rounded-lg p-4 space-y-4">
      <audio
        ref={audioRef}
        src={src}
        muted={isMuted}
      />
      
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">
          {formatTime(currentTime)} / {formatTime(duration || 180)} {/* Mock 3min duration */}
        </div>
      </div>

      <Slider
        value={[duration ? (currentTime / duration) * 100 : 0]}
        onValueChange={handleSeek}
        max={100}
        step={1}
        className="w-full"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="ghost">
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button size="sm" onClick={togglePlay} className="h-10 w-10 rounded-full">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Button size="sm" variant="ghost">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button size="sm" variant="ghost" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          
          <div className="w-20">
            <Slider
              value={[isMuted ? 0 : volume * 100]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;