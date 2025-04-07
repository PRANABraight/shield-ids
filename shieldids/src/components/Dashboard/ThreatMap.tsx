import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";

const ThreatMap = () => {
  return (
    <Card className="p-6 backdrop-blur-lg bg-card hover:bg-card/10 transition-all duration-300 border-none h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-[hsl(107,81%,56%)]" />
          <h2 className="text-lg font-semibold">Global Threat Map</h2>
        </div>
        <span className="text-sm text-foreground/60">Live Updates</span>
      </div>
      <div className="relative h-full flex items-center justify-center">
        <div className="text-foreground/40">
          Interactive map visualization coming soon...
        </div>
      </div>
    </Card>
  );
};

export default ThreatMap;