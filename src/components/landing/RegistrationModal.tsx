import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Ghost, Sparkles, Mail, Phone, User, MessageSquare } from "lucide-react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.email || !formData.telefono) {
      toast({
        title: "⚠️ Campos incompletos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulación de envío
    setTimeout(() => {
      toast({
        title: "🎉 ¡Registro exitoso!",
        description: "Nos pondremos en contacto contigo muy pronto. ¡Bienvenido a la familia!",
      });
      setIsSubmitting(false);
      setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto border-halloween-purple/30 shadow-glow-orange bg-gradient-to-br from-card via-card to-halloween-purple/5">
        <DialogHeader>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Ghost className="h-8 w-8 text-halloween-orange animate-float" />
            <DialogTitle className="text-3xl font-bold bg-gradient-halloween bg-clip-text text-transparent">
              ¡Asegura tu Cupo Ahora!
            </DialogTitle>
            <Sparkles className="h-8 w-8 text-halloween-purple animate-pulse-glow" />
          </div>
          <DialogDescription className="text-center text-base">
            Solo quedan <span className="text-halloween-orange font-bold text-lg">12 cupos disponibles</span> en este grupo.
            <br />
            Completa el formulario y recibe información exclusiva sobre el programa.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-halloween-orange/10 border border-halloween-orange/30 rounded-lg p-4 mb-6 animate-fade-in">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-halloween-orange flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-halloween-orange mb-1">🎁 Beneficio Especial</h4>
              <p className="text-sm text-muted-foreground">
                Los primeros 20 registros reciben <span className="font-bold text-halloween-orange">15% de descuento</span> + 
                <span className="font-bold text-halloween-orange"> sesión gratuita con un mentor senior</span>
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="flex items-center gap-2">
              <User className="h-4 w-4 text-halloween-purple" />
              Nombre Completo *
            </Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Juan Pérez"
              className="border-halloween-purple/30 focus:border-halloween-orange focus:ring-halloween-orange"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-halloween-purple" />
              Correo Electrónico *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="juan@ejemplo.com"
              className="border-halloween-purple/30 focus:border-halloween-orange focus:ring-halloween-orange"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-halloween-purple" />
              WhatsApp / Teléfono *
            </Label>
            <Input
              id="telefono"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="+51 999 999 999"
              className="border-halloween-purple/30 focus:border-halloween-orange focus:ring-halloween-orange"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensaje" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-halloween-purple" />
              Cuéntanos sobre ti (Opcional)
            </Label>
            <Textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="¿Qué te motiva a convertirte en Full Stack Developer?"
              className="border-halloween-purple/30 focus:border-halloween-orange focus:ring-halloween-orange min-h-[100px]"
              rows={4}
            />
          </div>

          <div className="bg-halloween-purple/10 border border-halloween-purple/30 rounded-lg p-4">
            <h4 className="font-semibold mb-2 text-halloween-purple">📋 Qué sucede después:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✅ Recibes un correo de confirmación inmediato</li>
              <li>✅ Un asesor te contacta en 24h para resolver dudas</li>
              <li>✅ Accedes a información exclusiva sobre el programa</li>
              <li>✅ Te enviamos el plan de estudios completo</li>
            </ul>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-halloween hover:shadow-glow-orange transition-all text-lg py-6"
          >
            {isSubmitting ? (
              <>
                <Ghost className="mr-2 h-5 w-5 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Asegurar mi Cupo Ahora
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Al registrarte aceptas recibir información sobre nuestros programas. 
            Respetamos tu privacidad 🔒
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
