import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Award, Target, Clock, Ghost, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface StudentStatsProps {
  studentData: any;
}

export const StudentStats = ({ studentData }: StudentStatsProps) => {
  const stats = [
    { label: "Promedio General", value: studentData?.promedio_general || 0, icon: TrendingUp, color: "text-halloween-purple", max: 100 },
    { label: "Tasa de Éxito", value: studentData?.tasa_exito || 0, icon: Award, color: "text-halloween-orange", max: 100 },
    { label: "Asistencia", value: 85, icon: Target, color: "text-halloween-ghost", max: 100 },
    { label: "Horas Estudio", value: 42, icon: Clock, color: "text-halloween-purple", max: 50 },
  ];

  const monthlyProgress = [
    { mes: 'Ene', promedio: 70, asistencia: 80 },
    { mes: 'Feb', promedio: 75, asistencia: 85 },
    { mes: 'Mar', promedio: 78, asistencia: 82 },
    { mes: 'Abr', promedio: 82, asistencia: 88 },
    { mes: 'May', promedio: studentData?.promedio_general || 85, asistencia: 85 },
  ];

  const skillsData = [
    { skill: 'Frontend', value: 85 },
    { skill: 'Backend', value: 70 },
    { skill: 'Database', value: 75 },
    { skill: 'DevOps', value: 60 },
    { skill: 'Testing', value: 65 },
    { skill: 'Soft Skills', value: 90 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="border-halloween-purple/20 shadow-glow-orange">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 rounded-full bg-gradient-halloween flex items-center justify-center text-white text-2xl font-bold shadow-glow animate-float">
              <Ghost className="h-10 w-10 absolute animate-pulse-glow" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-halloween bg-clip-text text-transparent">
                ¡Hola, {studentData?.nombre}!
              </h2>
              <p className="text-muted-foreground">Ciclo: {studentData?.ciclo || 'N/A'}</p>
              <p className="text-sm text-halloween-orange font-semibold mt-1">
                ¡Sigue así! Tu progreso es excelente 🎉
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-halloween-purple/20 shadow-glow hover:shadow-glow-orange transition-all hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                <span className="text-3xl font-bold bg-gradient-halloween bg-clip-text text-transparent">
                  {typeof stat.value === 'number' ? stat.value.toFixed(0) : stat.value}
                  {stat.max === 100 && '%'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <Progress value={(stat.value / stat.max) * 100} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Progress Line Chart */}
        <Card className="border-halloween-orange/20 shadow-glow-orange">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-halloween-purple" />
              Progreso Mensual
              <Sparkles className="h-4 w-4 text-halloween-orange animate-pulse-glow" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyProgress}>
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
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="promedio" 
                  stroke="hsl(var(--halloween-purple))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--halloween-purple))', r: 5 }}
                  activeDot={{ r: 8 }}
                  name="Promedio"
                />
                <Line 
                  type="monotone" 
                  dataKey="asistencia" 
                  stroke="hsl(var(--halloween-orange))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--halloween-orange))', r: 5 }}
                  activeDot={{ r: 8 }}
                  name="Asistencia"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skills Radar Chart */}
        <Card className="border-halloween-purple/20 shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-halloween-orange" />
              Habilidades Desarrolladas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillsData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="skill" stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                <Radar 
                  name="Nivel" 
                  dataKey="value" 
                  stroke="hsl(var(--halloween-purple))" 
                  fill="hsl(var(--halloween-orange))" 
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--halloween-orange) / 0.3)',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="border-halloween-orange/20 shadow-glow-orange">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ghost className="h-5 w-5 text-halloween-purple animate-float" />
            Nivel de Aprendizaje
            <span className="ml-auto text-halloween-orange">Nivel 5</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={75} className="h-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>750 / 1000 XP</span>
              <span>Próximo nivel: 250 XP restantes</span>
            </div>
            <p className="text-sm text-center bg-halloween-purple/10 p-3 rounded-lg border border-halloween-purple/20">
              🎯 <strong>Meta del mes:</strong> Completar 3 proyectos para subir al Nivel 6
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
