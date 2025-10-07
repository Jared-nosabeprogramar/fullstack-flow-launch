import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Sparkles } from "lucide-react";

export const SuccessRate = () => {
  const dataPoints = [20, 35, 45, 40, 55, 60, 75, 70, 85, 90, 88, 95];
  const maxValue = Math.max(...dataPoints);
  const chartHeight = 150;

  return (
    <Card className="mb-6 border-halloween-purple/20 shadow-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-halloween-purple" />
          <span className="bg-gradient-halloween bg-clip-text text-transparent">Tasa de Éxito</span>
          <Sparkles className="h-4 w-4 text-halloween-orange animate-pulse-glow" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative" style={{ height: chartHeight }}>
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="successGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--halloween-purple))" stopOpacity="0.4" />
                <stop offset="50%" stopColor="hsl(var(--halloween-orange))" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(var(--halloween-purple))" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            {/* Area path */}
            <path
              d={`M 0,${chartHeight} ${dataPoints
                .map(
                  (value, index) =>
                    `L ${(index / (dataPoints.length - 1)) * 100}%,${
                      chartHeight - (value / maxValue) * chartHeight
                    }`
                )
                .join(" ")} L 100%,${chartHeight} Z`}
              fill="url(#successGradient)"
            />
            
            {/* Line path */}
            <path
              d={`M ${dataPoints
                .map(
                  (value, index) =>
                    `${(index / (dataPoints.length - 1)) * 100}%,${
                      chartHeight - (value / maxValue) * chartHeight
                    }`
                )
                .join(" L ")}`}
              fill="none"
              stroke="hsl(var(--halloween-orange))"
              strokeWidth="3"
              className="animate-pulse-glow"
            />
            
            {/* Data points */}
            {dataPoints.map((value, index) => (
              <circle
                key={index}
                cx={`${(index / (dataPoints.length - 1)) * 100}%`}
                cy={chartHeight - (value / maxValue) * chartHeight}
                r="4"
                fill="hsl(var(--halloween-purple))"
                className="hover:r-6 transition-all cursor-pointer animate-float"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </svg>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-3xl font-bold bg-gradient-halloween bg-clip-text text-transparent">92%</p>
            <p className="text-sm text-muted-foreground">Promedio General</p>
          </div>
          <div className="text-right">
            <p className="text-halloween-orange font-semibold text-xl">+8%</p>
            <p className="text-sm text-muted-foreground">vs. mes anterior</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
