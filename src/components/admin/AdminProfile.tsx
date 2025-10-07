import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Ghost } from "lucide-react";

export const AdminProfile = () => {
  const userEmail = localStorage.getItem("userEmail") || "admin@naje.com";

  return (
    <Card className="mb-6 border-halloween-purple/20 shadow-glow-orange">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 rounded-full bg-gradient-halloween flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-glow animate-float">
            <Ghost className="h-10 w-10 absolute animate-pulse-glow" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold bg-gradient-halloween bg-clip-text text-transparent">Administrador</h2>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Mail className="h-4 w-4 text-halloween-orange" />
              {userEmail}
            </p>
            <div className="flex gap-2 mt-3">
              <Button 
                size="sm" 
                variant="outline"
                className="border-halloween-purple/30 hover:bg-halloween-purple/10 hover:shadow-glow transition-all"
              >
                <Phone className="h-4 w-4 mr-2 text-halloween-purple" />
                Contactar
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-halloween-orange/30 hover:bg-halloween-orange/10 hover:shadow-glow-orange transition-all"
              >
                <MapPin className="h-4 w-4 mr-2 text-halloween-orange" />
                Ubicación
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
