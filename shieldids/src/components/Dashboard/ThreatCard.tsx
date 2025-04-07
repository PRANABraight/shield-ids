import { Card } from "@/components/ui/card";
import { Shield, AlertCircle } from "lucide-react";

interface ThreatCardProps {
  title: string;
  count: number;
  severity: "low" | "medium" | "high" | "critical";
  trend: "up" | "down" | "stable";
}

const ThreatCard = ({ title, count, severity, trend }: ThreatCardProps) => {
  const getSeverityColor = () => {
    switch (severity) {
      case "low":
        return "text-secondary";
      case "medium":
        return "text-primary";
      case "high":
        return "text-warning";
      case "critical":
        return "text-critical";
      default:
        return "text-secondary";
    }
  };

  return (
    <Card className="p-6 backdrop-blur-lg bg-card hover:bg-card/10 transition-all duration-300 border-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`${getSeverityColor()} animate-pulse`}>
            {severity === "critical" ? (
              <AlertCircle className="w-8 h-8" />
            ) : (
              <Shield className="w-8 h-8" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground/60">{title}</h3>
            <p className={`text-2xl font-bold ${getSeverityColor()}`}>{count}</p>
          </div>
        </div>
        <div className={`text-sm ${trend === "up" ? "text-critical" : "text-secondary"}`}>
          {trend === "up" ? "↑" : "↓"} {trend === "up" ? "+12%" : "-8%"}
        </div>
      </div>
    </Card>
  );
};

export default ThreatCard;