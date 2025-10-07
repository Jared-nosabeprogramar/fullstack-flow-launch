import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Award, Ghost, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export const AdminStats = () => {
  const stats = [
    { label: "Total Alumnos", value: "342", icon: Users, color: "text-halloween-purple" },
    { label: "Ingresos Mes", value: "$45,280", icon: DollarSign, color: "text-halloween-orange" },
    { label: "Tasa Graduación", value: "89%", icon: Award, color: "text-halloween-ghost" },
    { label: "Crecimiento", value: "+12%", icon: TrendingUp, color: "text-halloween-purple" },
  ];

  const monthlyData = [
    { mes: 'Ene', alumnos: 285 },
    { mes: 'Feb', alumnos: 298 },
    { mes: 'Mar', alumnos: 310 },
    { mes: 'Abr', alumnos: 325 },
    { mes: 'May', alumnos: 342 },
  ];

  const performanceData = [
    { name: 'Excelente', value: 45, color: 'hsl(var(--halloween-purple))' },
    { name: 'Bueno', value: 30, color: 'hsl(var(--halloween-orange))' },
    { name: 'Regular', value: 20, color: 'hsl(var(--halloween-ghost))' },
    { name: 'Necesita Apoyo', value: 5, color: 'hsl(var(--muted))' },
  ];

  return (
    <div className="space-y-6">
      {/* Donut Chart Card */}
      <Card className="border-halloween-purple/20 shadow-glow">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Ghost className="h-5 w-5 text-halloween-orange animate-float" />
            Estadísticas Generales
          </CardTitle>
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
                stroke="hsl(var(--halloween-purple))"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70 * 0.78} ${2 * Math.PI * 70}`}
                className="transition-all duration-1000 animate-pulse-glow"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold bg-gradient-halloween bg-clip-text text-transparent">78%</span>
              <span className="text-sm text-muted-foreground">Completado</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Rendimiento global del sistema
          </p>
        </CardContent>
      </Card>

      {/* Data Grid Card */}
      <Card className="border-halloween-orange/20 shadow-glow-orange">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-halloween-purple animate-pulse-glow" />
            Datos Clave
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all hover:shadow-glow hover:scale-105"
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

      {/* Bar Chart - Monthly Growth */}
      <Card className="border-halloween-purple/20 shadow-glow">
        <CardHeader>
          <CardTitle className="text-lg">Crecimiento Mensual</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--halloween-purple) / 0.3)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="alumnos" fill="hsl(var(--halloween-purple))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart - Performance Distribution */}
      <Card className="border-halloween-orange/20 shadow-glow-orange">
        <CardHeader>
          <CardTitle className="text-lg">Distribución de Rendimiento</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--halloween-orange) / 0.3)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {performanceData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
