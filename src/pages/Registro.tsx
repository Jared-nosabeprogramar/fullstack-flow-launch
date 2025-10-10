import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2, Ghost, Sparkles, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import successStoryImg from "@/assets/success-story.jpg";
import mentoringImg from "@/assets/mentoring.jpg";

const Registro = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    ciclo: "2025-1",
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
    if (!formData.nombreCompleto || !formData.email || !formData.password) {
      toast({
        title: "⚠️ Campos incompletos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.password.length < 6) {
      toast({
        title: "⚠️ Contraseña débil",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }
    
    setStep(2);
  };

  const generateStudentStats = () => {
    return {
      promedio_general: 0,
      tasa_exito: 0,
      precio: 0,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.nombreCompleto}`,
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
        title: "⚠️ Selecciona tu estilo",
        description: "Por favor selecciona tu estilo de aprendizaje",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Separar nombre y apellido
      const nombreParts = formData.nombreCompleto.trim().split(' ');
      const nombre = nombreParts[0];
      const apellido = nombreParts.slice(1).join(' ') || nombreParts[0];

      // 1. Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/estudiante`,
          data: {
            full_name: formData.nombreCompleto,
          }
        }
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("No se pudo crear el usuario");
      }

      // Generar estadísticas automáticas
      const stats = generateStudentStats();
      
      // 2. Insertar estudiante en la tabla
      const { data: student, error: studentError } = await supabase
        .from('students')
        .insert({
          nombre: nombre,
          apellido: apellido,
          email: formData.email,
          ciclo: formData.ciclo,
          ...stats,
        })
        .select()
        .single();

      if (studentError) throw studentError;

      // 3. Insertar personalidad
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

      // 4. Insertar estadísticas mensuales iniciales
      const monthlyStats = generateMonthlyStats(student.id);
      const { error: statsError } = await supabase
        .from('student_stats')
        .insert(monthlyStats);

      if (statsError) throw statsError;

      toast({
        title: "🎉 ¡Registro exitoso!",
        description: "Tu cuenta ha sido creada. Redirigiendo a tu espacio...",
      });

      // Hacer login automático y redirigir
      setTimeout(async () => {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) {
          console.error('Error al hacer login:', signInError);
          navigate("/");
        } else {
          navigate("/estudiante");
        }
      }, 2000);

    } catch (error: any) {
      console.error('Error al registrar:', error);
      toast({
        title: "❌ Error al registrar",
        description: error.message || "Ocurrió un error durante el registro",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-halloween-purple/5 to-halloween-orange/5 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-halloween-purple/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-halloween-orange/10 rounded-full blur-3xl animate-float delay-1000" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 py-12">
        {/* Logo superior */}
        <div className="mb-8 animate-fade-in">
          <Logo />
        </div>

        {/* Imágenes decorativas laterales */}
        <div className="hidden lg:block absolute left-8 top-1/4 w-48 opacity-80 animate-fade-in">
          <img 
            src={successStoryImg} 
            alt="Historias de éxito" 
            className="rounded-2xl shadow-glow border border-halloween-purple/20"
          />
          <p className="text-center text-sm text-muted-foreground mt-2">
            <Ghost className="inline h-4 w-4 mr-1 text-halloween-orange" />
            +500 graduados empleados
          </p>
        </div>
        
        <div className="hidden lg:block absolute right-8 top-1/4 w-48 opacity-80 animate-fade-in">
          <img 
            src={mentoringImg} 
            alt="Mentoría personalizada" 
            className="rounded-2xl shadow-glow-orange border border-halloween-orange/20"
          />
          <p className="text-center text-sm text-muted-foreground mt-2">
            <Sparkles className="inline h-4 w-4 mr-1 text-halloween-purple" />
            Mentoría 1:1 con expertos
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <Button
            variant="ghost"
            onClick={() => step === 1 ? navigate("/") : setStep(1)}
            className="mb-4 border border-halloween-purple/30 hover:bg-halloween-purple/10 hover:shadow-glow"
          >
            <ArrowLeft className="h-4 w-4 mr-2 text-halloween-purple" />
            Volver
          </Button>

          <Card className="shadow-glow border-halloween-purple/20 bg-card/95 backdrop-blur-md">
            <CardHeader>
              <div className="flex items-center justify-center gap-3 mb-2">
                <Ghost className={`h-8 w-8 ${step === 1 ? 'text-halloween-orange' : 'text-halloween-purple'} animate-float`} />
                <CardTitle className="text-3xl bg-gradient-halloween bg-clip-text text-transparent">
                  {step === 1 ? "¡Únete a Naje!" : "Descubre tu Estilo"}
                </CardTitle>
                <Sparkles className={`h-8 w-8 ${step === 1 ? 'text-halloween-purple' : 'text-halloween-orange'} animate-pulse-glow`} />
              </div>
              <CardDescription className="text-center text-base">
                {step === 1 
                  ? "Completa tus datos para crear tu cuenta de estudiante" 
                  : "Selecciona tu estilo de aprendizaje para personalizar tu experiencia"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {step === 1 ? (
                <form onSubmit={handleBasicInfoSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombreCompleto" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-halloween-purple" />
                      Nombre Completo
                    </Label>
                    <Input
                      id="nombreCompleto"
                      placeholder="Juan Pérez García"
                      value={formData.nombreCompleto}
                      onChange={(e) => handleInputChange("nombreCompleto", e.target.value)}
                      className="border-halloween-purple/30 focus:border-halloween-orange focus:ring-halloween-orange"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-halloween-purple" />
                      Correo Electrónico
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-halloween-purple/30 focus:border-halloween-orange focus:ring-halloween-orange"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-halloween-purple" />
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mínimo 6 caracteres"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="border-halloween-purple/30 focus:border-halloween-orange focus:ring-halloween-orange pr-10"
                        required
                        minLength={6}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Usa esta contraseña para acceder a tu espacio de estudiante
                    </p>
                  </div>

                  <div className="bg-halloween-orange/10 border border-halloween-orange/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-halloween-orange flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold text-halloween-orange mb-1">✨ Lo que recibirás:</p>
                        <ul className="text-muted-foreground space-y-1">
                          <li>✅ Acceso a tu espacio personalizado de estudiante</li>
                          <li>✅ Test de personalidad para optimizar tu aprendizaje</li>
                          <li>✅ Seguimiento de tu progreso en tiempo real</li>
                          <li>✅ Recomendaciones personalizadas de cursos</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-halloween hover:shadow-glow-orange transition-all" 
                    size="lg"
                  >
                    <Ghost className="mr-2 h-5 w-5" />
                    Continuar al Test de Personalidad
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              ) : (
              <form onSubmit={handleFinalSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">🧠 ¿Cómo prefieres aprender?</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Selecciona el estilo que mejor se ajuste a tu forma de aprender. Esto nos ayudará a personalizar tu experiencia.
                  </p>
                  <RadioGroup
                    value={formData.personalidad}
                    onValueChange={(value) => handleInputChange("personalidad", value)}
                  >
                    {personalidadOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-start space-x-3 space-y-0 rounded-lg border-2 p-4 transition-all cursor-pointer ${
                          formData.personalidad === option.value
                            ? 'border-halloween-orange bg-halloween-orange/5 shadow-glow-orange'
                            : 'border-halloween-purple/20 hover:border-halloween-purple/40 hover:bg-halloween-purple/5'
                        }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <div className="space-y-1 leading-none flex-1">
                          <Label
                            htmlFor={option.value}
                            className="font-semibold cursor-pointer text-base"
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

                <div className="bg-halloween-purple/10 border border-halloween-purple/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Ghost className="h-5 w-5 text-halloween-purple flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-halloween-purple">📊 Nota:</strong> Basándonos en tu perfil de aprendizaje, 
                      generaremos automáticamente tu plan de estudios personalizado, recomendaciones de cursos 
                      y estrategias de aprendizaje optimizadas para tu estilo.
                    </p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-halloween hover:shadow-glow-orange transition-all" 
                  size="lg" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creando tu cuenta...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Completar Registro y Entrar
                      <Ghost className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className={`w-8 h-1 rounded-full ${step === 1 ? 'bg-halloween-orange' : 'bg-halloween-purple/30'}`} />
            <div className={`w-8 h-1 rounded-full ${step === 2 ? 'bg-halloween-orange' : 'bg-halloween-purple/30'}`} />
          </div>
          <p className="text-sm text-muted-foreground">
            Paso {step} de 2 - {step === 1 ? 'Datos de Registro' : 'Test de Personalidad'}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Registro;
