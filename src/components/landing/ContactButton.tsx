import { MessageCircle } from "lucide-react";
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
      className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all animate-pulse hover:animate-none bg-tech-green hover:bg-tech-green/90 z-50"
      aria-label="Regístrate ahora"
    >
      <MessageCircle className="w-8 h-8" />
    </Button>
  );
};
