import { Ghost, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ContactButtonProps {
  onClick?: () => void;
}

export const ContactButton = ({ onClick }: ContactButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="fixed bottom-8 right-8 shadow-glow-orange hover:shadow-float transition-all duration-300 bg-gradient-halloween hover:scale-110 z-50 group animate-float px-6 py-6"
      aria-label="Regístrate y pruébate"
    >
      <Ghost className="w-6 h-6 mr-2 text-white group-hover:scale-110 transition-transform" />
      <span className="text-base font-bold">Regístrate y Pruébate</span>
      <Sparkles className="w-5 h-5 ml-2 text-halloween-orange animate-pulse-glow" />
    </Button>
  );
};
