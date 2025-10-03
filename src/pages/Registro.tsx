import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2 } from "lucide-react";

const Registro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    ciclo: "2024-2",
    personalidad: "",
  });

  const personalidadOptions = [
    { value: "Visual", label: "Visual", description: "Aprendo mejor con diagramas y mapas conceptuales" },
    { value: "Auditivo", label: "Auditivo", description: "Aprendo mejor escuchando y en discusiones" },
    { value: "Kinestésico", label: "Kinestésico", description: "Aprendo mejor con práctica y ejercicios" },
    { value: "Visual-Kinestésico", label: "Visual-Kinestésico", description: "Combino diagramas con práctica" },
    { value: "Auditivo-Visual", label: "Auditivo-Visual", description: "Combino lectura con audio" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBasicInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellido || !formData.email) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const generateStudentStats = () => {
    const promedio = (Math.random() * 6 + 12).toFixed(1); // 12-18
    const tasaExito = (Math.random() * 30 + 65).toFixed(1); // 65-95
    const precio = Math.random() > 0.5 ? 1500 : 1800;
    
    return {
      promedio_general: parseFloat(promedio),
      tasa_exito: parseFloat(tasaExito),
      precio: precio,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.nombre}`,
    };
  };

  const generateMonthlyStats = (studentId: string) => {
    const months = ['Enero', 'Febrero', 'Marzo'];
    return months.map(mes => {
      const promedio = (Math.random() * 6 + 12).toFixed(1);
      const asistencia = (Math.random() * 20 + 80).toFixed(1);
      const aprobadas = Math.floor(Math.random() * 3 + 3); // 3-5
      const reprobadas = Math.floor(Math.random() * 3); // 0-2
      
      return {
        student_id: studentId,
        mes,
        promedio: parseFloat(promedio),
        asistencia: parseFloat(asistencia),
        aprobadas,
        reprobadas,
      };
    });
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.personalidad) {
      toast({
        title: "Error",
        description: "Por favor selecciona tu estilo de aprendizaje",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Generar estadísticas automáticas
      const stats = generateStudentStats();
      
      // 1. Insertar estudiante
      const { data: student, error: studentError } = await supabase
        .from('students')
        .insert({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          ciclo: formData.ciclo,
          ...stats,
        })
        .select()
        .single();

      if (studentError) throw studentError;

      // 2. Insertar personalidad
      const personalityOption = personalidadOptions.find(p => p.value === formData.personalidad);
      const { error: personalityError } = await supabase
        .from('student_personalities')
        .insert({
          student_id: student.id,
          tipo_personalidad: formData.personalidad,
          estilo_aprendizaje: personalityOption?.description || '',
          descripcion: `Estudiante ${formData.personalidad.toLowerCase()} con interés en desarrollo full-stack`,
        });

      if (personalityError) throw personalityError;

      // 3. Insertar estadísticas mensuales
      const monthlyStats = generateMonthlyStats(student.id);
      const { error: statsError } = await supabase
        .from('student_stats')
        .insert(monthlyStats);

      if (statsError) throw statsError;

      toast({
        title: "¡Registro exitoso!",
        description: "Tu perfil ha sido creado. Redirigiendo...",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error: any) {
      console.error('Error al registrar:', error);
      toast({
        title: "Error al registrar",
        description: error.message || "Ocurrió un error durante el registro",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => step === 1 ? navigate("/") : setStep(1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl bg-gradient-primary bg-clip-text text-transparent">
              {step === 1 ? "Regístrate en Naje" : "Test de Personalidad"}
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? "Completa tus datos básicos para comenzar" 
                : "Selecciona tu estilo de aprendizaje preferido"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {step === 1 ? (
              <form onSubmit={handleBasicInfoSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input
                      id="apellido"
                      placeholder="Tu apellido"
                      value={formData.apellido}
                      onChange={(e) => handleInputChange("apellido", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ciclo">Ciclo Académico</Label>
                  <Input
                    id="ciclo"
                    placeholder="Ej: 2024-2"
                    value={formData.ciclo}
                    onChange={(e) => handleInputChange("ciclo", e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Continuar al Test
                </Button>
              </form>
            ) : (
              <form onSubmit={handleFinalSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label>¿Cómo prefieres aprender?</Label>
                  <RadioGroup
                    value={formData.personalidad}
                    onValueChange={(value) => handleInputChange("personalidad", value)}
                  >
                    {personalidadOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-accent transition-colors"
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <div className="space-y-1 leading-none">
                          <Label
                            htmlFor={option.value}
                            className="font-semibold cursor-pointer"
                          >
                            {option.label}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Nota:</strong> Basándonos en tu perfil, generaremos automáticamente
                    tus estadísticas iniciales, cursos recomendados y plan de estudios personalizado.
                  </p>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando registro...
                    </>
                  ) : (
                    "Completar Registro"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Paso {step} de 2
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
