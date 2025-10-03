import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2 } from "lucide-react";

const StudentRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Datos del estudiante
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    ciclo: "2024-2",
  });
  
  // Respuestas del test de personalidad
  const [personalityAnswers, setPersonalityAnswers] = useState({
    aprendizaje: "",
    estudio: "",
    memoria: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setIsLoading(true);

    try {
      // Determinar tipo de personalidad basado en respuestas
      let tipoPersonalidad = "Visual";
      let estiloAprendizaje = "Aprende mejor con diagramas y contenido visual";
      
      if (personalityAnswers.aprendizaje === "practico") {
        tipoPersonalidad = "Kinestésico";
        estiloAprendizaje = "Aprende mejor con práctica y ejercicios hands-on";
      } else if (personalityAnswers.aprendizaje === "auditivo") {
        tipoPersonalidad = "Auditivo";
        estiloAprendizaje = "Aprende mejor escuchando y discutiendo";
      }

      // Generar estadísticas aleatorias realistas
      const promedio = Math.floor(Math.random() * 5) + 14; // 14-19
      const tasaExito = Math.floor(Math.random() * 30) + 70; // 70-100
      const precio = 1500;

      // Insertar estudiante
      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .insert({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          ciclo: formData.ciclo,
          promedio_general: promedio,
          tasa_exito: tasaExito,
          precio: precio,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.nombre}`,
        })
        .select()
        .single();

      if (studentError) throw studentError;

      // Insertar personalidad
      await supabase.from('student_personalities').insert({
        student_id: studentData.id,
        tipo_personalidad: tipoPersonalidad,
        estilo_aprendizaje: estiloAprendizaje,
        descripcion: `Estudiante ${tipoPersonalidad.toLowerCase()} con buen potencial de desarrollo`,
      });

      // Insertar estadísticas (últimos 3 meses)
      const meses = ['Enero', 'Febrero', 'Marzo'];
      const statsPromises = meses.map((mes, index) => {
        const promedioMes = promedio + (Math.random() * 2 - 1);
        const asistencia = Math.floor(Math.random() * 20) + 80;
        const aprobadas = Math.floor(Math.random() * 2) + 4;
        const reprobadas = 5 - aprobadas;

        return supabase.from('student_stats').insert({
          student_id: studentData.id,
          mes,
          promedio: promedioMes,
          asistencia,
          aprobadas,
          reprobadas,
        });
      });

      await Promise.all(statsPromises);

      toast({
        title: "¡Registro exitoso!",
        description: "Tu perfil ha sido creado correctamente",
      });

      // Redirigir a la página principal después de 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error: any) {
      console.error('Error al registrar:', error);
      toast({
        title: "Error al registrar",
        description: error.message || "Ocurrió un error al procesar tu registro",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => step === 1 ? navigate("/") : setStep(1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {step === 1 ? "Volver al inicio" : "Atrás"}
        </Button>

        <Card className="shadow-glow">
          <CardHeader>
            <CardTitle className="text-3xl bg-gradient-primary bg-clip-text text-transparent">
              {step === 1 ? "Registro de Estudiante" : "Test de Personalidad"}
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? "Completa tus datos para comenzar tu viaje educativo con Naje" 
                : "Ayúdanos a conocer tu estilo de aprendizaje para personalizar tu experiencia"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        required
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="apellido">Apellido</Label>
                      <Input
                        id="apellido"
                        value={formData.apellido}
                        onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                        required
                        placeholder="Tu apellido"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ciclo">Ciclo Académico</Label>
                    <Input
                      id="ciclo"
                      value={formData.ciclo}
                      onChange={(e) => setFormData({ ...formData, ciclo: e.target.value })}
                      required
                      placeholder="2024-2"
                    />
                  </div>

                  <Button type="submit" className="w-full" variant="cta">
                    Continuar al Test
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        ¿Cómo prefieres aprender nuevos conceptos?
                      </Label>
                      <RadioGroup
                        value={personalityAnswers.aprendizaje}
                        onValueChange={(value) =>
                          setPersonalityAnswers({ ...personalityAnswers, aprendizaje: value })
                        }
                        required
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="visual" id="visual" />
                          <Label htmlFor="visual" className="font-normal cursor-pointer">
                            Con diagramas, imágenes y videos
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="auditivo" id="auditivo" />
                          <Label htmlFor="auditivo" className="font-normal cursor-pointer">
                            Escuchando explicaciones y discusiones
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="practico" id="practico" />
                          <Label htmlFor="practico" className="font-normal cursor-pointer">
                            Practicando y experimentando directamente
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        ¿Cuál es tu ambiente de estudio ideal?
                      </Label>
                      <RadioGroup
                        value={personalityAnswers.estudio}
                        onValueChange={(value) =>
                          setPersonalityAnswers({ ...personalityAnswers, estudio: value })
                        }
                        required
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="silencioso" id="silencioso" />
                          <Label htmlFor="silencioso" className="font-normal cursor-pointer">
                            Silencioso y sin distracciones
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="musica" id="musica" />
                          <Label htmlFor="musica" className="font-normal cursor-pointer">
                            Con música de fondo
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="grupo" id="grupo" />
                          <Label htmlFor="grupo" className="font-normal cursor-pointer">
                            En grupo con otros estudiantes
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold">
                        ¿Cómo memorizas mejor la información?
                      </Label>
                      <RadioGroup
                        value={personalityAnswers.memoria}
                        onValueChange={(value) =>
                          setPersonalityAnswers({ ...personalityAnswers, memoria: value })
                        }
                        required
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="escribiendo" id="escribiendo" />
                          <Label htmlFor="escribiendo" className="font-normal cursor-pointer">
                            Escribiendo y tomando notas
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="repitiendo" id="repitiendo" />
                          <Label htmlFor="repitiendo" className="font-normal cursor-pointer">
                            Repitiendo en voz alta
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="haciendo" id="haciendo" />
                          <Label htmlFor="haciendo" className="font-normal cursor-pointer">
                            Haciendo ejercicios prácticos
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    variant="cta"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      "Completar Registro"
                    )}
                  </Button>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistration;
