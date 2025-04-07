import { Card } from "@/components/ui/card";
import { Brain, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ThreatInsight {
  id: string;
  probability: number;
  severity: "low" | "medium" | "high" | "critical";
  source: string;
  explanation: string;
  timestamp: string;
}

// Simulated threat insights (replace with real API data later)
const threatInsights: ThreatInsight[] = [
  {
    id: "1",
    probability: 0.92,
    severity: "critical",
    source: "Network Traffic Analysis",
    explanation: "Unusual outbound data transfer patterns detected",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    probability: 0.75,
    severity: "high",
    source: "User Behavior Analysis",
    explanation: "Multiple failed login attempts from new IP",
    timestamp: "5 minutes ago",
  },
  {
    id: "3",
    probability: 0.45,
    severity: "medium",
    source: "System Log Analysis",
    explanation: "Unexpected system configuration changes",
    timestamp: "10 minutes ago",
  },
];

const ThreatPrediction = () => {
  const { toast } = useToast();

  const handleResponseAction = (threat: ThreatInsight) => {
    // Simulated automated response based on severity
    if (threat.severity === "low") {
      toast({
        title: "Automated Response Initiated",
        description: `Addressing ${threat.severity} severity threat automatically`,
        className: "bg-green-100 border-green-500 text-green-800 ",
      });
    } else {
      toast({
        title: "Manual Review Required",
        description: "Please review and approve response actions",
        variant: "destructive",
        className: "bg-red-200 border-red-500 text-red-900",
      });
    }
  };

  const getSeverityColor = (severity: ThreatInsight["severity"]) => {
    switch (severity) {
      case "critical":
        return "text-critical";
      case "high":
        return "text-warning";
      case "medium":
        return "text-primary";
      case "low":
        return "text-secondary";
    }
  };

  return (
    <Card className="p-6 backdrop-blur-lg bg-card hover:bg-card/10 transition-all duration-300 border-none">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-[hsl(66,100%,57%)]" />
          <h2 className="text-lg font-semibold">AI Threat Prediction</h2>
        </div>
        <span className="text-sm text-foreground/60">Real-time Analysis</span>
      </div>
      <div className="space-y-4">
        {threatInsights.map((threat) => (
          <div
            key={threat.id}
            className="p-4 rounded-lg bg-background/5 hover:bg-background/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle
                  className={`w-5 h-5 ${getSeverityColor(threat.severity)}`}
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`font-medium ${getSeverityColor(
                        threat.severity
                      )}`}
                    >
                      {(threat.probability * 100).toFixed(0)}% Probability
                    </span>
                    <span className="text-sm text-foreground/60">
                      {threat.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 mt-1">
                    {threat.explanation}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleResponseAction(threat)}
                className="px-3 py-1 text-xs rounded-full bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
              >
                Take Action
              </button>
            </div>
            <div className="text-xs text-foreground/60">
              Source: {threat.source}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ThreatPrediction;