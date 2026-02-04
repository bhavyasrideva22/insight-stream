import Header from '@/components/dashboard/Header';
import VideoFeed from '@/components/dashboard/VideoFeed';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import NarrativeSummary from '@/components/dashboard/NarrativeSummary';
import RiskIndicator from '@/components/dashboard/RiskIndicator';
import AlertPanel from '@/components/dashboard/AlertPanel';
import SystemArchitecture from '@/components/dashboard/SystemArchitecture';
import StatsCards from '@/components/dashboard/StatsCards';

const Index = () => {
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
            <VideoFeed />
            <RiskIndicator level="high" />
          </div>

          {/* Right Column - Timeline */}
          <div className="h-[500px]">
            <ActivityTimeline />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-[400px]">
            <NarrativeSummary />
          </div>
          <div className="h-[400px]">
            <AlertPanel />
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
