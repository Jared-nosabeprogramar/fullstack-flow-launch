import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Target, Clock, Heart, Ghost, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface StudentTipsProps {
  studentId: string;
}

export const StudentTips = ({ studentId }: StudentTipsProps) => {
  const [tips, setTips] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTips();
  }, [studentId]);

  const loadTips = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_tips')
        .select('*')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTips(data || []);
    } catch (error: any) {
      console.error('Error loading tips:', error);
      toast({
        title: "Error",
        description: "Error al cargar los consejos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const motivationalMessages = [
    {
      icon: Brain,
      color: "halloween-purple",
      title: "Enfoque Mental",
      message: "Tu cerebro necesita descansos regulares. Aplica la técnica Pomodoro: 25 minutos de estudio intenso, 5 minutos de descanso.",
    },
    {
      icon: Target,
      color: "halloween-orange",
      title: "Meta del Día",
      message: "¡Excelente trabajo! Has completado el 80% de tu meta diaria. Solo te quedan 2 ejercicios más.",
    },
    {
      icon: Heart,
      color: "halloween-ghost",
      title: "Bienestar",
      message: "Recuerda hidratarte y estirarte cada hora. Un cuerpo sano es clave para un aprendizaje efectivo.",
    },
    {
      icon: TrendingUp,
      color: "halloween-purple",
      title: "Progreso",
      message: "¡Vas genial! Tu promedio ha subido 5 puntos este mes. Sigue así y alcanzarás tus objetivos.",
    },
  ];

  const groupedTips = tips.reduce((acc: any, tip: any) => {
    if (!acc[tip.categoria]) {
      acc[tip.categoria] = [];
    }
    acc[tip.categoria].push(tip);
    return acc;
  }, {});

  const categoryIcons: any = {
    'Concentración': Target,
    'Técnicas de Estudio': Brain,
    'Gestión del Tiempo': Clock,
  };

  const categoryColors: any = {
    'Concentración': 'halloween-purple',
    'Técnicas de Estudio': 'halloween-orange',
    'Gestión del Tiempo': 'halloween-ghost',
  };

  return (
    <div className="space-y-6">
      {/* Daily Motivational Card */}
      <Card className="border-halloween-orange/20 shadow-glow-orange">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full bg-gradient-halloween flex items-center justify-center text-white shadow-glow animate-float">
              <Ghost className="h-8 w-8 absolute animate-pulse-glow" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-halloween bg-clip-text text-transparent">
                Mensaje del Día
              </h2>
              <p className="text-muted-foreground mt-1">
                ✨ "El éxito es la suma de pequeños esfuerzos repetidos día tras día." - Robert Collier
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivational Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {motivationalMessages.map((msg, index) => {
          const Icon = msg.icon;
          return (
            <Card
              key={index}
              className={`border-${msg.color}/20 shadow-glow hover:shadow-glow-orange transition-all hover:scale-105`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 text-${msg.color}`} />
                  <span className="text-lg">{msg.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{msg.message}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Generated Tips */}
      {isLoading ? (
        <Card className="border-halloween-purple/20 shadow-glow">
          <CardContent className="p-12 text-center">
            <Sparkles className="h-12 w-12 mx-auto text-halloween-purple animate-pulse-glow mb-4" />
            <p className="text-muted-foreground">Cargando tus consejos personalizados...</p>
          </CardContent>
        </Card>
      ) : tips.length === 0 ? (
        <Card className="border-halloween-purple/20 shadow-glow">
          <CardContent className="p-12 text-center">
            <Brain className="h-16 w-16 mx-auto text-halloween-orange mb-4 animate-float" />
            <h3 className="text-xl font-bold mb-2 bg-gradient-halloween bg-clip-text text-transparent">
              No hay consejos personalizados aún
            </h3>
            <p className="text-muted-foreground mb-6">
              Tu perfil cognitivo aún no ha sido configurado por el administrador.
              Una vez completado, recibirás consejos personalizados basados en IA.
            </p>
            <Button className="bg-gradient-halloween hover:shadow-glow-orange">
              <Sparkles className="h-4 w-4 mr-2" />
              Solicitar Evaluación
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {Object.keys(groupedTips).map((categoria) => {
            const Icon = categoryIcons[categoria] || Brain;
            const color = categoryColors[categoria] || 'halloween-purple';
            
            return (
              <Card key={categoria} className={`border-${color}/20 shadow-glow`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 text-${color}`} />
                    {categoria}
                    <Badge variant="secondary" className="ml-auto bg-halloween-purple/10">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Generado por IA
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {groupedTips[categoria].map((tip: any, index: number) => (
                      <div
                        key={tip.id}
                        className="p-4 rounded-lg bg-muted/50 border border-halloween-purple/20 hover:bg-muted transition-all hover:shadow-glow"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-${color}/20 flex items-center justify-center text-sm font-bold text-${color}`}>
                            {index + 1}
                          </div>
                          <p className="text-sm flex-1">{tip.contenido}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </>
      )}
    </div>
  );
};
