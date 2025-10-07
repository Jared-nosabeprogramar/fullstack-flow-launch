import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, Ghost, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { StudentStats } from "@/components/student/StudentStats";
import { StudentCourses } from "@/components/student/StudentCourses";
import { StudentChat } from "@/components/student/StudentChat";
import { StudentGames } from "@/components/student/StudentGames";
import { StudentTips } from "@/components/student/StudentTips";

const Student = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/");
        return;
      }

      // Obtener datos del estudiante
      const { data: student, error } = await supabase
        .from('students')
        .select('*')
        .eq('email', user.email)
        .maybeSingle();

      if (error || !student) {
        toast({
          title: "Error",
          description: "No se encontró información del estudiante",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setStudentData(student);
      setIsLoading(false);
    } catch (error) {
      console.error('Auth check error:', error);
      navigate("/");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Ghost className="h-16 w-16 text-halloween-purple animate-float" />
          <p className="text-lg text-muted-foreground">Cargando tu espacio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-halloween-purple/20 bg-card/80 backdrop-blur-lg shadow-glow-orange">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="hover:bg-halloween-purple/10 hover:shadow-glow"
            >
              <ArrowLeft className="h-5 w-5 text-halloween-purple" />
            </Button>
            <div className="flex items-center gap-2">
              <Ghost className="h-6 w-6 text-halloween-orange animate-float" />
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-halloween bg-clip-text text-transparent">
                Mi Espacio - {studentData?.nombre}
              </h1>
              <Sparkles className="h-5 w-5 text-halloween-purple animate-pulse-glow" />
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-halloween-orange/30 hover:bg-halloween-orange/10 hover:shadow-glow-orange"
          >
            <LogOut className="h-4 w-4 mr-2 text-halloween-orange" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-card border border-halloween-purple/20 shadow-glow">
            <TabsTrigger 
              value="stats"
              className="data-[state=active]:bg-gradient-halloween data-[state=active]:text-white"
            >
              📊 Estadísticas
            </TabsTrigger>
            <TabsTrigger 
              value="courses"
              className="data-[state=active]:bg-gradient-halloween data-[state=active]:text-white"
            >
              📚 Cursos
            </TabsTrigger>
            <TabsTrigger 
              value="chat"
              className="data-[state=active]:bg-gradient-halloween data-[state=active]:text-white"
            >
              💬 Chat
            </TabsTrigger>
            <TabsTrigger 
              value="games"
              className="data-[state=active]:bg-gradient-halloween data-[state=active]:text-white"
            >
              🕹️ Juegos
            </TabsTrigger>
            <TabsTrigger 
              value="tips"
              className="data-[state=active]:bg-gradient-halloween data-[state=active]:text-white"
            >
              🧠 Consejos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="animate-fade-in">
            <StudentStats studentData={studentData} />
          </TabsContent>

          <TabsContent value="courses" className="animate-fade-in">
            <StudentCourses studentId={studentData?.id} />
          </TabsContent>

          <TabsContent value="chat" className="animate-fade-in">
            <StudentChat studentId={studentData?.id} studentName={studentData?.nombre} />
          </TabsContent>

          <TabsContent value="games" className="animate-fade-in">
            <StudentGames />
          </TabsContent>

          <TabsContent value="tips" className="animate-fade-in">
            <StudentTips studentId={studentData?.id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Student;
