import { useState, useEffect, useRef } from 'react';
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

interface AnalysisActivity {
  timestamp: string;
  label: string;
  type: 'normal' | 'warning' | 'danger';
  confidence: number;
}

interface AnalysisAlert {
  id: string;
  title: string;
  message: string;
  severity: 'warning' | 'critical';
  timestamp: string;
  is_new: boolean;
}

interface AnalysisResponse {
  video_duration_seconds: number;
  activities: AnalysisActivity[];
  narrative_summary: string;
  risk_level: 'low' | 'medium' | 'high';
  alerts: AnalysisAlert[];
}

interface VideoFeedProps {
  onAnalysisComplete?: (result: AnalysisResponse) => void;
  onAnalysisError?: (error: Error) => void;
  onAnalyzingChange?: (isAnalyzing: boolean) => void;
}

const VideoFeed = ({ onAnalysisComplete, onAnalysisError, onAnalyzingChange }: VideoFeedProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState("00:02:45");
  const [detections, setDetections] = useState<Detection[]>([
    { id: '1', label: 'Person', confidence: 0.94, x: 20, y: 30, width: 15, height: 35 },
    { id: '2', label: 'Person', confidence: 0.89, x: 55, y: 35, width: 12, height: 30 },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      onAnalysisError?.(new Error('Please select a valid video file'));
      e.target.value = '';
      return;
    }

    setIsUploading(true);
    onAnalyzingChange?.(true);

    try {
      // First, check if backend is reachable
      try {
        const healthCheck = await fetch('http://localhost:8000/health', {
          method: 'GET',
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });
        if (!healthCheck.ok) {
          throw new Error(`Backend health check failed (${healthCheck.status}). Make sure the backend is running on port 8000.`);
        }
      } catch (healthErr) {
        if (healthErr instanceof Error) {
          if (healthErr.name === 'AbortError') {
            throw new Error('Backend connection timeout. Make sure the FastAPI backend is running on http://localhost:8000. Run: uvicorn app:app --reload --host 0.0.0.0 --port 8000');
          }
          if (healthErr.message.includes('Failed to fetch') || healthErr.message.includes('NetworkError')) {
            throw new Error('Cannot reach backend. Start it first:\n\nEASIEST: Double-click START-BACKEND.bat in your project folder.\n\nOr in PowerShell (project folder):\n  python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000\n\nKeep that window open, wait ~10 sec, then refresh this page and try again.');
          }
        }
        throw new Error(`Cannot reach backend: ${healthErr instanceof Error ? healthErr.message : 'Unknown error'}. Make sure the backend is running on http://localhost:8000`);
      }

      // Prepare form data
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading video:', file.name, 'Size:', file.size, 'bytes', 'Type:', file.type);

      // Upload and analyze
      const response = await fetch('http://localhost:8000/analyze-video', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser will set it with boundary for multipart/form-data
      });

      console.log('Response status:', response.status, response.statusText);

      if (!response.ok) {
        let errorMessage = `Backend error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.detail) {
            errorMessage = `Backend error: ${errorData.detail}`;
          }
        } catch {
          // If response is not JSON, use the status text
          const text = await response.text();
          if (text) {
            errorMessage = `Backend error: ${text}`;
          }
        }
        throw new Error(errorMessage);
      }

      const data: AnalysisResponse = await response.json();
      console.log('Analysis complete:', data);
      onAnalysisComplete?.(data);
    } catch (err) {
      console.error('Video analysis failed', err);
      const error = err instanceof Error 
        ? err 
        : new Error(`Unknown error: ${String(err)}`);
      onAnalysisError?.(error);
    } finally {
      setIsUploading(false);
      onAnalyzingChange?.(false);
      // Reset the input so the same file can be selected again if needed
      e.target.value = '';
    }
  };

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
          <div
            className={`w-2 h-2 rounded-full ${
              isUploading ? 'bg-success animate-pulse' : 'bg-muted-foreground'
            }`}
          />
          <span className="text-xs font-mono">
            {isUploading ? 'Analyzing video (YOLO + LSTM + LLM)' : 'YOLO Standby'}
          </span>
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
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="video/*"
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Video className="w-4 h-4" />
            {isUploading ? 'Analyzing...' : 'Upload & Analyze'}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;
