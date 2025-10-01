import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Mail, Settings, BarChart3, ArrowLeft } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth) {
      navigate("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Panel de Administración - Naje
            </h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="messages">
              <Mail className="h-4 w-4 mr-2" />
              Mensajes
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Total Usuarios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,284</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +12% desde el mes pasado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Inscripciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">342</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +8% desde el mes pasado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Mensajes Nuevos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pendientes de respuesta
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Tasa de Conversión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">26.7%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +2.3% desde el mes pasado
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                  Últimas acciones en el sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                      JD
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Juan Pérez se registró</p>
                      <p className="text-sm text-muted-foreground">Hace 5 minutos</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                      MG
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">María García envió un mensaje</p>
                      <p className="text-sm text-muted-foreground">Hace 15 minutos</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                      CL
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Carlos López completó el curso</p>
                      <p className="text-sm text-muted-foreground">Hace 1 hora</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>
                  Administra los usuarios registrados en la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Contenido de gestión de usuarios...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Mensajes y Consultas</CardTitle>
                <CardDescription>
                  Gestiona los mensajes recibidos de los usuarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Contenido de mensajes...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Sistema</CardTitle>
                <CardDescription>
                  Ajusta la configuración de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Contenido de configuración...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
