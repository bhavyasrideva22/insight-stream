import { useState } from 'react';
import Header from '@/components/dashboard/Header';
import VideoFeed from '@/components/dashboard/VideoFeed';
import ActivityTimeline, { Activity } from '@/components/dashboard/ActivityTimeline';
import NarrativeSummary from '@/components/dashboard/NarrativeSummary';
import RiskIndicator from '@/components/dashboard/RiskIndicator';
import AlertPanel, { Alert as DashboardAlert } from '@/components/dashboard/AlertPanel';
import SystemArchitecture from '@/components/dashboard/SystemArchitecture';
import StatsCards from '@/components/dashboard/StatsCards';
import { useToast } from '@/hooks/use-toast';

type BackendActivity = {
  timestamp: string;
  label: string;
  type: 'normal' | 'warning' | 'danger';
  confidence: number;
};

type BackendAlert = {
  id: string;
  title: string;
  message: string;
  severity: 'warning' | 'critical';
  timestamp: string;
  is_new: boolean;
};

interface AnalysisResult {
  video_duration_seconds: number;
  activities: BackendActivity[];
  narrative_summary: string;
  risk_level: 'low' | 'medium' | 'high';
  alerts: BackendAlert[];
}

const Index = () => {
  const { toast } = useToast();

  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [summary, setSummary] = useState<string | undefined>();
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('high');
  const [alerts, setAlerts] = useState<DashboardAlert[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    const mappedActivities: Activity[] = result.activities.map((a, index) => ({
      id: String(index + 1),
      timestamp: a.timestamp,
      label: a.label,
      type: a.type,
      confidence: a.confidence,
    }));

    const mappedAlerts: DashboardAlert[] = result.alerts.map((a) => ({
      id: a.id,
      title: a.title,
      message: a.message,
      severity: a.severity,
      timestamp: a.timestamp,
      isNew: a.is_new,
    }));

    setActivities(mappedActivities);
    setSummary(result.narrative_summary);
    setRiskLevel(result.risk_level);
    setAlerts(mappedAlerts);

    toast({
      title: 'Analysis complete',
      description: 'AI pipeline finished processing the CCTV video.',
    });
  };

  const handleAnalysisError = (error: Error) => {
    console.error(error);
    toast({
      title: 'Analysis failed',
      description: error.message,
      variant: 'destructive',
    });
  };

  const activityLabels = activities
    ? Array.from(new Set(activities.map((a) => a.label)))
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Row */}
        <StatsCards />

        {/* System Architecture */}
        <SystemArchitecture />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Video Feed */}
          <div className="lg:col-span-2 space-y-6">
            <VideoFeed
              onAnalysisComplete={handleAnalysisComplete}
              onAnalysisError={handleAnalysisError}
              onAnalyzingChange={setIsAnalyzing}
            />
            <RiskIndicator level={riskLevel} />
          </div>

          {/* Right Column - Timeline */}
          <div className="h-[500px]">
            <ActivityTimeline activities={activities ?? undefined} />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[400px]">
            <NarrativeSummary
              summary={summary}
              labels={activityLabels}
              isLoading={isAnalyzing}
            />
          </div>
          <div className="h-[400px]">
            <AlertPanel alerts={alerts ?? undefined} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-4 mt-8">
        <div className="container mx-auto px-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>AI Sentinel v1.0 • YOLO + LSTM + LLM Architecture</span>
          <span>© 2024 Surveillance Intelligence System</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
