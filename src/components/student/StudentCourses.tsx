import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, CheckCircle2, PlayCircle, Sparkles } from "lucide-react";

interface StudentCoursesProps {
  studentId: string;
}

export const StudentCourses = ({ studentId }: StudentCoursesProps) => {
  const courses = [
    {
      id: 1,
      title: "Módulo 1: Fundamentos de Frontend",
      description: "HTML, CSS, JavaScript básico",
      progress: 100,
      status: "completed",
      duration: "40 horas",
      modules: 12,
      completedModules: 12,
      color: "halloween-purple",
    },
    {
      id: 2,
      title: "Módulo 2: React Avanzado",
      description: "Hooks, Context API, React Router",
      progress: 75,
      status: "in-progress",
      duration: "50 horas",
      modules: 15,
      completedModules: 11,
      color: "halloween-orange",
    },
    {
      id: 3,
      title: "Módulo 3: Backend con Node.js",
      description: "Express, APIs REST, Autenticación",
      progress: 45,
      status: "in-progress",
      duration: "45 horas",
      modules: 14,
      completedModules: 6,
      color: "halloween-ghost",
    },
    {
      id: 4,
      title: "Módulo 4: Bases de Datos",
      description: "SQL, PostgreSQL, Supabase",
      progress: 0,
      status: "locked",
      duration: "35 horas",
      modules: 10,
      completedModules: 0,
      color: "halloween-purple",
    },
  ];

  const tips = [
    "📌 Recordatorio: Completa el proyecto de React antes del viernes",
    "💡 Tip: Practica con ejercicios diarios para mejorar tu lógica",
    "🎯 Meta semanal: 10 horas de estudio completadas (8/10)",
  ];

  return (
    <div className="space-y-6">
      {/* Tips Section */}
      <Card className="border-halloween-orange/20 shadow-glow-orange">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-halloween-orange animate-pulse-glow" />
            Tips Personalizados y Recordatorios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg bg-muted/50 border border-halloween-purple/20 hover:bg-muted transition-all hover:shadow-glow"
              >
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card 
            key={course.id}
            className={`border-${course.color}/20 shadow-glow ${course.status === 'locked' ? 'opacity-60' : ''} hover:shadow-glow-orange transition-all hover:scale-105`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 bg-gradient-halloween bg-clip-text text-transparent">
                    {course.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                </div>
                <Badge 
                  variant={course.status === 'completed' ? 'default' : course.status === 'in-progress' ? 'secondary' : 'outline'}
                  className={course.status === 'completed' ? 'bg-halloween-purple' : course.status === 'in-progress' ? 'bg-halloween-orange' : ''}
                >
                  {course.status === 'completed' && '✅ Completado'}
                  {course.status === 'in-progress' && '⏳ En Progreso'}
                  {course.status === 'locked' && '🔒 Bloqueado'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-semibold bg-gradient-halloween bg-clip-text text-transparent">
                    {course.progress}%
                  </span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-halloween-purple" />
                  <span className="text-sm text-muted-foreground">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-halloween-orange" />
                  <span className="text-sm text-muted-foreground">
                    {course.completedModules}/{course.modules} módulos
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className={`w-full ${
                  course.status === 'completed' 
                    ? 'bg-halloween-purple hover:bg-halloween-purple/90' 
                    : course.status === 'in-progress'
                    ? 'bg-gradient-halloween hover:shadow-glow-orange'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={course.status === 'locked'}
              >
                {course.status === 'completed' && (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Revisar Contenido
                  </>
                )}
                {course.status === 'in-progress' && (
                  <>
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Continuar Aprendiendo
                  </>
                )}
                {course.status === 'locked' && '🔒 Desbloquea completando módulos anteriores'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
