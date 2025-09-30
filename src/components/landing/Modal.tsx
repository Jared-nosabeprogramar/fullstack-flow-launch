import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, CheckCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ isOpen, onClose }: ModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor completa todos los campos"
      });
      return;
    }

    if (!formData.email.includes("@")) {
      toast({
        variant: "destructive", 
        title: "Error",
        description: "Por favor ingresa un email válido"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      toast({
        title: "¡Perfecto! 🎉",
        description: "Te contactaremos en las próximas 24 horas"
      });
      
      setIsSubmitting(false);
      setFormData({ name: "", email: "", phone: "" });
      onClose();
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-6xl max-h-[90vh] overflow-hidden bg-background border-border p-0">
        <div className="grid md:grid-cols-2 h-full">
          {/* Video Section */}
          <div className="relative h-full min-h-[400px] bg-black">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://cdn.pixabay.com/video/2022/10/24/136462-764468178_large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center justify-center">
              <div className="text-white text-center p-8">
                <Zap className="w-16 h-16 mx-auto mb-4 text-tech-orange" />
                <h3 className="text-3xl font-bold mb-2">¡Tu Futuro Te Espera!</h3>
                <p className="text-lg">Únete a los que ya transformaron sus vidas</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-2">
                ¡Asegura tu cupo ahora!
              </DialogTitle>
            </DialogHeader>

            {/* Urgency Banner */}
            <div className="bg-tech-orange/10 border border-tech-orange/20 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-tech-orange" />
                <div>
                  <p className="font-semibold text-tech-orange">¡Solo quedan 12 cupos!</p>
                  <p className="text-sm text-muted-foreground">El próximo grupo inicia en enero 2025</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nombre completo *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: María González"
                    className="mt-1 bg-card/50 border-border focus:border-tech-blue"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="maria@ejemplo.com"
                    className="mt-1 bg-card/50 border-border focus:border-tech-blue"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Teléfono (WhatsApp) *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+54 9 11 1234-5678"
                    className="mt-1 bg-card/50 border-border focus:border-tech-blue"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                variant="cta"
                className="w-full text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Asegurar Mi Cupo Ahora"}
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                <p>Al enviar este formulario aceptas recibir información sobre el programa.</p>
                <p>No compartimos tu información con terceros.</p>
              </div>
            </form>

            {/* Price & Payment */}
            <div className="bg-gradient-hero p-6 rounded-lg border border-border mt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Precio del programa completo:</p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-2xl line-through text-muted-foreground">$2,999</span>
                  <span className="text-4xl font-bold text-tech-green">$1,497</span>
                  <span className="bg-tech-orange text-white px-3 py-1 rounded-full text-sm font-semibold">-50%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  O desde <span className="font-semibold text-tech-blue">$125/mes</span> en 12 cuotas sin interés
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};