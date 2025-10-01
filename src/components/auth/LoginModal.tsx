import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de login - en producción usarías Lovable Cloud
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al panel de administración",
        });
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        onClose();
        navigate("/admin");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Por favor ingresa email y contraseña",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Iniciar Sesión
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            variant="cta"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando..." : "Ingresar"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-4">
          ¿Olvidaste tu contraseña?{" "}
          <button className="text-primary hover:underline">
            Recuperar acceso
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
};
