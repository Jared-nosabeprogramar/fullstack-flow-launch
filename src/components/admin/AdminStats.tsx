import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Award } from "lucide-react";

export const AdminStats = () => {
  const stats = [
    { label: "Total Alumnos", value: "342", icon: Users, color: "text-blue-500" },
    { label: "Ingresos Mes", value: "$45,280", icon: DollarSign, color: "text-green-500" },
    { label: "Tasa Graduación", value: "89%", icon: Award, color: "text-purple-500" },
    { label: "Crecimiento", value: "+12%", icon: TrendingUp, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Donut Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estadísticas Generales</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="hsl(var(--primary))"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70 * 0.78} ${2 * Math.PI * 70}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">78%</span>
              <span className="text-sm text-muted-foreground">Completado</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Rendimiento global del sistema
          </p>
        </CardContent>
      </Card>

      {/* Data Grid Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Datos Clave</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <stat.icon className={`h-6 w-6 ${stat.color} mb-2`} />
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-xs text-muted-foreground text-center mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
