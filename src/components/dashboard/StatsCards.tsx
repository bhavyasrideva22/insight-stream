import { Users, AlertTriangle, Clock, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCard {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const stats: StatCard[] = [
  {
    title: 'Objects Detected',
    value: 24,
    subtitle: 'In current session',
    icon: <Users className="w-5 h-5" />,
    trend: 'up',
    trendValue: '+12%',
  },
  {
    title: 'Incidents',
    value: 3,
    subtitle: 'Requires attention',
    icon: <AlertTriangle className="w-5 h-5" />,
    trend: 'up',
    trendValue: '+2',
  },
  {
    title: 'Processing Time',
    value: '45ms',
    subtitle: 'Per frame average',
    icon: <Clock className="w-5 h-5" />,
    trend: 'down',
    trendValue: '-15%',
  },
  {
    title: 'Accuracy',
    value: '94.2%',
    subtitle: 'Detection confidence',
    icon: <Shield className="w-5 h-5" />,
    trend: 'neutral',
    trendValue: '±0.3%',
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="glass-card p-4 animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-start justify-between">
            <div className="p-2 bg-primary/20 rounded-lg text-primary">
              {stat.icon}
            </div>
            {stat.trend && (
              <span
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  stat.trend === 'up' && "bg-success/20 text-success",
                  stat.trend === 'down' && "bg-primary/20 text-primary",
                  stat.trend === 'neutral' && "bg-secondary text-muted-foreground"
                )}
              >
                {stat.trendValue}
              </span>
            )}
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold font-mono">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
