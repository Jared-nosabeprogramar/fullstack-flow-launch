import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminProfile } from "@/components/admin/AdminProfile";
import { SuccessRate } from "@/components/admin/SuccessRate";
import { StudentsTable } from "@/components/admin/StudentsTable";

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card z-10">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Panel de Administración - Naje
            </h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </header>

      {/* Main Layout - 3 Column Grid */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-[80px_1fr_300px] xl:grid-cols-[80px_1fr_350px]">
          {/* Left Sidebar - Hidden on mobile, fixed on desktop */}
          <div className="hidden lg:block">
            <AdminSidebar />
          </div>

          {/* Center Content - Scrollable */}
          <div className="overflow-y-auto p-4 lg:p-6">
            <AdminProfile />
            <SuccessRate />
            <StudentsTable />
          </div>

          {/* Right Stats - Hidden on mobile, scrollable on desktop */}
          <div className="hidden lg:block overflow-y-auto p-6 bg-muted/20">
            <AdminStats />
          </div>
        </div>

        {/* Mobile Stats - Show on mobile only */}
        <div className="lg:hidden p-4 bg-muted/20">
          <AdminStats />
        </div>
      </main>
    </div>
  );
};

export default Admin;
