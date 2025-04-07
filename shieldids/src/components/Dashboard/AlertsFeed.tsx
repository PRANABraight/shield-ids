import { Card } from "../ui/card";
import { Bell } from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Suspicious Login Attempt",
    severity: "high",
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    title: "Malware Detected",
    severity: "critical",
    timestamp: "5 minutes ago",
  },
  {
    id: 3,
    title: "Port Scan Detected",
    severity: "medium",
    timestamp: "10 minutes ago",
  },
];

const AlertsFeed = () => {
  return (
    <Card className="p-6 backdrop-blur-lg bg-card hover:bg-card/10 transition-all duration-300 border-none">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
        {/* background: radial-gradient(circle, #8683ff, #605dff); */}

          <Bell className="w-5 h-5 text-[hsl(0,100%,65%)]" />
          <h2 className="text-lg font-semibold ">Recent Alerts</h2>
        </div>
        <span className="text-sm text-foreground/60">Live Feed</span>
      </div>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-3 rounded-lg bg-background/5 hover:bg-background/10 transition-all duration-300"
          >
            <div>
              <h3 className="font-medium">{alert.title}</h3>
              <p className="text-sm text-foreground/60">{alert.timestamp}</p>
            </div>
            <div
              className={`px-2 py-1 rounded text-xs font-medium ${
                alert.severity === "critical"
                  ? "bg-critical/20 text-critical"
                  : alert.severity === "high"
                  ? "bg-warning/20 text-warning"
                  : "bg-primary/20 text-primary"
              }`}
            >
              {alert.severity}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlertsFeed;