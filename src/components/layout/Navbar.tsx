import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface NavbarProps {
  onLoginClick: () => void;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export const Navbar = ({ onLoginClick, isAuthenticated, onLogout }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Naje
          </h1>
        </div>

        {/* Login Button */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
          ) : (
            <Button 
              variant="cta" 
              onClick={onLoginClick}
              className="shadow-glow"
            >
              Iniciar Sesión
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
