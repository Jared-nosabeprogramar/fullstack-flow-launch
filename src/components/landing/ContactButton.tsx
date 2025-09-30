import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContactButton = () => {
  const handleContact = () => {
    // Abrir WhatsApp o formulario de contacto
    window.open("https://wa.me/1234567890?text=Hola,%20necesito%20ayuda%20con%20el%20programa%20Full%20Stack", "_blank");
  };

  return (
    <Button
      onClick={handleContact}
      size="lg"
      className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all animate-pulse hover:animate-none bg-tech-green hover:bg-tech-green/90 z-50"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </Button>
  );
};
