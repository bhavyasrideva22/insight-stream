import { Box, Cpu, Brain, MessageSquare, ArrowDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessNode {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  status: 'active' | 'processing' | 'idle';
}

const nodes: ProcessNode[] = [
  {
    id: 'input',
    title: 'Video Input',
    subtitle: 'Frame Extraction',
    icon: <Box className="w-5 h-5" />,
    status: 'active',
  },
  {
    id: 'yolo',
    title: 'YOLO',
    subtitle: 'Object Detection',
    icon: <Cpu className="w-5 h-5" />,
    status: 'processing',
  },
  {
    id: 'lstm',
    title: 'LSTM',
    subtitle: 'Activity Recognition',
    icon: <Brain className="w-5 h-5" />,
    status: 'processing',
  },
  {
    id: 'llm',
    title: 'LLM',
    subtitle: 'Narrative Generation',
    icon: <MessageSquare className="w-5 h-5" />,
    status: 'active',
  },
];

const SystemArchitecture = () => {
  return (
    <div className="glass-card p-4">
      <h3 className="font-semibold mb-4 text-sm">System Pipeline</h3>

      <div className="flex items-center justify-between gap-2">
        {nodes.map((node, index) => (
          <div key={node.id} className="flex items-center">
            <div
              className={cn(
                "relative p-3 rounded-xl border transition-all",
                node.status === 'active' && "bg-primary/20 border-primary/50",
                node.status === 'processing' && "bg-success/20 border-success/50",
                node.status === 'idle' && "bg-secondary border-border"
              )}
            >
              {node.status === 'processing' && (
                <div className="absolute inset-0 rounded-xl bg-success/20 animate-pulse-glow" />
              )}

              <div className="relative flex flex-col items-center text-center">
                <div
                  className={cn(
                    "p-2 rounded-lg mb-2",
                    node.status === 'active' && "bg-primary/30 text-primary",
                    node.status === 'processing' && "bg-success/30 text-success",
                    node.status === 'idle' && "bg-muted text-muted-foreground"
                  )}
                >
                  {node.icon}
                </div>
                <span className="text-xs font-semibold">{node.title}</span>
                <span className="text-[10px] text-muted-foreground">{node.subtitle}</span>
              </div>
            </div>

            {index < nodes.length - 1 && (
              <ArrowRight className="w-4 h-4 text-muted-foreground mx-2 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
        <span>Processing Time: 45ms/frame</span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          All systems operational
        </span>
      </div>
    </div>
  );
};

export default SystemArchitecture;
