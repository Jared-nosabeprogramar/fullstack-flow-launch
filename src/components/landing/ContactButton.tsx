import { Ghost, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ContactButton = () => {
  const navigate = useNavigate();

  const handleContact = () => {
    navigate("/registro");
  };

  return (
    <Button
      onClick={handleContact}
      size="lg"
      className="fixed bottom-8 right-8 rounded-full w-20 h-20 shadow-glow-orange hover:shadow-float transition-all duration-300 bg-gradient-accent hover:scale-110 z-50 group animate-float"
      aria-label="Regístrate ahora"
    >
      <div className="relative">
        <Ghost className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
        <Sparkles className="w-4 h-4 text-halloween-orange-light absolute -top-1 -right-1 animate-pulse-glow" />
      </div>
    </Button>
  );
};
