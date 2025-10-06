import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Logo } from "./Logo";

interface NavbarProps {
  onLoginClick: () => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export const Navbar = ({ onLoginClick, isAuthenticated, onLogout }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border shadow-card">
      <div className="container mx-auto px-6 h-20 flex items-center justify-center relative">
        {/* Centered Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo />
        </div>

        {/* Login Button - Right Side */}
        <div className="ml-auto flex items-center gap-4">
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="gap-2 border-halloween-purple hover:bg-halloween-purple/10 transition-all duration-300"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          ) : (
            <Button 
              variant="cta" 
              onClick={onLoginClick}
              className="shadow-glow hover:shadow-glow-orange transition-all duration-300"
            >
              Iniciar Sesión
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
