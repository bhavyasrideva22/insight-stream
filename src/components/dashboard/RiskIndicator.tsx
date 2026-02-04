import { Shield, AlertTriangle, AlertOctagon, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type RiskLevel = 'low' | 'medium' | 'high';

interface RiskIndicatorProps {
  level?: RiskLevel;
}

const riskConfig = {
  low: {
    label: 'Low Risk',
    icon: CheckCircle,
    color: 'text-success',
    bgColor: 'bg-success/20',
    borderColor: 'border-success/50',
    percentage: 25,
  },
  medium: {
    label: 'Medium Risk',
    icon: AlertTriangle,
    color: 'text-warning',
    bgColor: 'bg-warning/20',
    borderColor: 'border-warning/50',
    percentage: 55,
  },
  high: {
    label: 'High Risk',
    icon: AlertOctagon,
    color: 'text-destructive',
    bgColor: 'bg-destructive/20',
    borderColor: 'border-destructive/50',
    percentage: 87,
  },
};

const RiskIndicator = ({ level = 'high' }: RiskIndicatorProps) => {
  const config = riskConfig[level];
  const Icon = config.icon;

  return (
    <div className={cn("glass-card p-4 border", config.borderColor)}>
      <div className="flex items-center gap-3">
        <div className={cn("p-3 rounded-xl", config.bgColor)}>
          <Icon className={cn("w-6 h-6", config.color)} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Risk Assessment</span>
            <span className={cn("text-lg font-bold font-mono", config.color)}>
              {config.percentage}%
            </span>
          </div>
          
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                level === 'low' && "bg-success",
                level === 'medium' && "bg-warning",
                level === 'high' && "bg-destructive"
              )}
              style={{ width: `${config.percentage}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className={cn("text-sm font-semibold", config.color)}>
              {config.label}
            </span>
            <span className="text-xs text-muted-foreground">
              Immediate action required
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskIndicator;
