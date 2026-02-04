import { useState, useEffect } from 'react';
import { Video, Camera, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Detection {
  id: string;
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const VideoFeed = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState("00:02:45");
  const [detections, setDetections] = useState<Detection[]>([
    { id: '1', label: 'Person', confidence: 0.94, x: 20, y: 30, width: 15, height: 35 },
    { id: '2', label: 'Person', confidence: 0.89, x: 55, y: 35, width: 12, height: 30 },
  ]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setDetections(prev => prev.map(d => ({
          ...d,
          x: d.x + (Math.random() - 0.5) * 2,
          y: d.y + (Math.random() - 0.5) * 1,
        })));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="glass-card p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Camera className="w-5 h-5 text-primary" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full status-pulse" />
          </div>
          <span className="font-medium">Camera 01 - Main Entrance</span>
          <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full font-medium">
            LIVE
          </span>
        </div>
        <span className="font-mono text-sm text-muted-foreground">{currentTime}</span>
      </div>

      <div className="relative flex-1 bg-secondary/50 rounded-lg overflow-hidden min-h-[300px]">
        {/* Simulated video background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-20 h-32 border border-muted-foreground/30 rounded" />
            <div className="absolute top-20 right-20 w-16 h-24 border border-muted-foreground/30 rounded" />
            <div className="absolute bottom-10 left-1/3 w-24 h-8 border border-muted-foreground/30 rounded" />
          </div>
        </div>

        {/* Detection bounding boxes */}
        {detections.map((detection) => (
          <div
            key={detection.id}
            className="absolute border-2 border-primary rounded transition-all duration-100"
            style={{
              left: `${detection.x}%`,
              top: `${detection.y}%`,
              width: `${detection.width}%`,
              height: `${detection.height}%`,
            }}
          >
            <div className="absolute -top-6 left-0 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded font-mono whitespace-nowrap">
              {detection.label} {(detection.confidence * 100).toFixed(0)}%
            </div>
            <div className="absolute inset-0 bg-primary/10" />
          </div>
        ))}

        {/* YOLO Processing indicator */}
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs font-mono">YOLO Processing</span>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Timestamp overlay */}
        <div className="absolute bottom-3 left-3 font-mono text-xs text-muted-foreground bg-background/60 px-2 py-1 rounded">
          2024-02-04 14:32:45 UTC
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Objects: {detections.length}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;
