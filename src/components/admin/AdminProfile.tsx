import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export const AdminProfile = () => {
  const userEmail = localStorage.getItem("userEmail") || "admin@naje.com";

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold flex-shrink-0">
            AD
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Administrador</h2>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Mail className="h-4 w-4" />
              {userEmail}
            </p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Contactar
              </Button>
              <Button size="sm" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Ubicación
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
