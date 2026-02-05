import { Bell, AlertTriangle, ShieldAlert, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'warning' | 'critical';
  timestamp: string;
  isNew: boolean;
}

const initialAlerts: Alert[] = [
  {
    id: '1',
    title: 'Unauthorized Access Detected',
    message: 'Individual accessed restricted zone without authorization at 02:10',
    severity: 'critical',
    timestamp: '2 min ago',
    isNew: true,
  },
  {
    id: '2',
    title: 'Theft Activity Confirmed',
    message: 'Object removal detected in monitored area. Security response initiated.',
    severity: 'critical',
    timestamp: '1 min ago',
    isNew: true,
  },
  {
    id: '3',
    title: 'Suspicious Loitering Pattern',
    message: 'Individual exhibited unusual behavior patterns near entrance',
    severity: 'warning',
    timestamp: '4 min ago',
    isNew: false,
  },
];

interface AlertPanelProps {
  alerts?: Alert[];
}

const AlertPanel = ({ alerts: externalAlerts }: AlertPanelProps) => {
  const [alerts, setAlerts] = useState<Alert[]>(externalAlerts ?? initialAlerts);

  useEffect(() => {
    if (externalAlerts) {
      setAlerts(externalAlerts);
    }
  }, [externalAlerts]);

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const newAlerts = alerts.filter(a => a.isNew).length;

  return (
    <div className="glass-card p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell className="w-5 h-5 text-primary" />
            {newAlerts > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                {newAlerts}
              </span>
            )}
          </div>
          <h3 className="font-semibold">Alert Notifications</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          Clear All
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-3">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <ShieldAlert className="w-12 h-12 mb-2 opacity-50" />
            <p className="text-sm">No active alerts</p>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={alert.id}
              className={cn(
                "relative p-3 rounded-lg border animate-slide-up",
                alert.severity === 'critical'
                  ? "bg-destructive/10 border-destructive/50"
                  : "bg-warning/10 border-warning/50",
                alert.isNew && "ring-1 ring-offset-1 ring-offset-background",
                alert.isNew && alert.severity === 'critical' && "ring-destructive",
                alert.isNew && alert.severity === 'warning' && "ring-warning"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {alert.isNew && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse" />
              )}

              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "p-2 rounded-lg shrink-0",
                    alert.severity === 'critical'
                      ? "bg-destructive/20 text-destructive"
                      : "bg-warning/20 text-warning"
                  )}
                >
                  <AlertTriangle className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{alert.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {alert.timestamp}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1">
                        <ExternalLink className="w-3 h-3" />
                        Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => dismissAlert(alert.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertPanel;
