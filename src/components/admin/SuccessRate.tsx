import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export const SuccessRate = () => {
  const dataPoints = [20, 35, 45, 40, 55, 60, 75, 70, 85, 90, 88, 95];
  const maxValue = Math.max(...dataPoints);
  const chartHeight = 150;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Tasa de Éxito
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative" style={{ height: chartHeight }}>
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="successGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
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
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />
            
            {/* Data points */}
            {dataPoints.map((value, index) => (
              <circle
                key={index}
                cx={`${(index / (dataPoints.length - 1)) * 100}%`}
                cy={chartHeight - (value / maxValue) * chartHeight}
                r="3"
                fill="hsl(var(--primary))"
                className="hover:r-5 transition-all cursor-pointer"
              />
            ))}
          </svg>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-3xl font-bold">92%</p>
            <p className="text-sm text-muted-foreground">Promedio General</p>
          </div>
          <div className="text-right">
            <p className="text-green-500 font-semibold">+8%</p>
            <p className="text-sm text-muted-foreground">vs. mes anterior</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
