import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

interface ProcessCardProps {
  title: string;
  process: {
    id: string;
    name: string;
    running_time_formatted: string;
    memory_in_bytes: number;
  };
}

const ProcessCard: React.FC<ProcessCardProps> = ({
  title,
  process,
}: ProcessCardProps) => {
  return (
    <Card className="w-[350px] hover:shadow-lg transition-all duration-300 bg-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Process Information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Process Name</span>
            <span className="text-sm text-muted-foreground">
              {process.name}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Process ID</span>
            <span className="text-sm text-muted-foreground">{process.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Running Time</span>
            <span className="text-sm text-muted-foreground">
              {process.running_time_formatted}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Memory Usage</span>
            <span className="text-sm text-muted-foreground">
              {process.memory_in_bytes} MB
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessCard;
