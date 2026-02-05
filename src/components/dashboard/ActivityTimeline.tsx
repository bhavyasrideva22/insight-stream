import { Clock, User, ShieldAlert, Eye, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Activity {
  id: string;
  timestamp: string;
  label: string;
  type: 'normal' | 'warning' | 'danger';
  confidence: number;
}

interface ActivityTimelineProps {
  activities?: Activity[];
}

const defaultActivities: Activity[] = [
  {
    id: '1',
    timestamp: '00:00',
    label: 'Person enters building',
    type: 'normal',
    confidence: 0.94,
  },
  {
    id: '2',
    timestamp: '00:45',
    label: 'Loitering detected near entrance',
    type: 'warning',
    confidence: 0.87,
  },
  {
    id: '3',
    timestamp: '02:10',
    label: 'Unauthorized access attempt',
    type: 'danger',
    confidence: 0.92,
  },
  {
    id: '4',
    timestamp: '03:00',
    label: 'Theft detected - Object removed',
    type: 'danger',
    confidence: 0.89,
  },
  {
    id: '5',
    timestamp: '04:30',
    label: 'Person exits building',
    type: 'normal',
    confidence: 0.96,
  },
];

const getActivityIcon = (activity: Activity) => {
  const label = activity.label.toLowerCase();
  if (label.includes('theft') || label.includes('object')) {
    return <Package className="w-4 h-4" />;
  }
  if (label.includes('unauthorized') || label.includes('access')) {
    return <ShieldAlert className="w-4 h-4" />;
  }
  if (label.includes('loiter')) {
    return <Eye className="w-4 h-4" />;
  }
  return <User className="w-4 h-4" />;
};

const ActivityTimeline = ({ activities = defaultActivities }: ActivityTimelineProps) => {
  return (
    <div className="glass-card p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Activity Timeline</h3>
        <span className="ml-auto text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground">
          {activities.length} events
        </span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-1">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              "relative pl-6 py-3 rounded-lg transition-colors animate-slide-up",
              activity.type === 'danger' && "bg-destructive/10",
              activity.type === 'warning' && "bg-warning/10",
              activity.type === 'normal' && "hover:bg-secondary/50"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Timeline line */}
            {index < activities.length - 1 && (
              <div className="absolute left-[11px] top-10 w-0.5 h-[calc(100%-16px)] bg-border" />
            )}

            {/* Timeline dot */}
            <div
              className={cn(
                "absolute left-1 top-4 w-4 h-4 rounded-full flex items-center justify-center",
                activity.type === 'danger' && "bg-destructive",
                activity.type === 'warning' && "bg-warning",
                activity.type === 'normal' && "bg-primary"
              )}
            >
              <div className="w-2 h-2 bg-background rounded-full" />
            </div>

            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  activity.type === 'danger' && "bg-destructive/20 text-destructive",
                  activity.type === 'warning' && "bg-warning/20 text-warning",
                  activity.type === 'normal' && "bg-primary/20 text-primary"
                )}
              >
                {getActivityIcon(activity)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                  {activity.type !== 'normal' && (
                    <span
                      className={cn(
                        "text-xs px-1.5 py-0.5 rounded font-medium",
                        activity.type === 'danger' && "bg-destructive/20 text-destructive",
                        activity.type === 'warning' && "bg-warning/20 text-warning"
                      )}
                    >
                      {activity.type === 'danger' ? 'ALERT' : 'CAUTION'}
                    </span>
                  )}
                </div>
                <p className="text-sm mt-0.5">{activity.label}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Confidence: {(activity.confidence * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
