import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Ghost, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  onUpdate: () => void;
}

export const EditStudentModal = ({ isOpen, onClose, studentId, onUpdate }: EditStudentModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    ciclo: "",
    precio: 0,
    promedio_general: 0,
    tasa_exito: 0,
    avatar: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && studentId) {
      loadStudentData();
    }
  }, [isOpen, studentId]);

  const loadStudentData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', studentId)
        .single();

      if (error) throw error;

      setFormData({
        nombre: data.nombre || "",
        apellido: data.apellido || "",
        email: data.email || "",
        ciclo: data.ciclo || "",
        precio: data.precio || 0,
        promedio_general: data.promedio_general || 0,
        tasa_exito: data.tasa_exito || 0,
        avatar: data.avatar || "",
      });
    } catch (error: any) {
      console.error('Error loading student:', error);
      toast({
        title: "Error",
        description: "Error al cargar los datos del alumno",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from('students')
        .update({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          ciclo: formData.ciclo,
          precio: parseFloat(formData.precio.toString()),
          promedio_general: parseFloat(formData.promedio_general.toString()),
          tasa_exito: parseFloat(formData.tasa_exito.toString()),
          avatar: formData.avatar || null,
        })
        .eq('id', studentId);

      if (error) throw error;

      toast({
        title: "✅ Alumno actualizado",
        description: "Los datos se han guardado correctamente",
      });

      onUpdate();
      onClose();
    } catch (error: any) {
      console.error('Error updating student:', error);
      toast({
        title: "Error",
        description: error.message || "Error al actualizar el alumno",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto border-halloween-purple/20 shadow-glow-orange">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2 bg-gradient-halloween bg-clip-text text-transparent">
            <Ghost className="h-6 w-6 text-halloween-orange animate-float" />
            Editar Alumno
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-halloween-purple" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Preview */}
            <div className="flex justify-center">
              <Avatar className="h-24 w-24 border-2 border-halloween-purple shadow-glow">
                <AvatarImage src={formData.avatar} alt={formData.nombre} />
                <AvatarFallback className="bg-gradient-halloween text-white text-2xl">
                  {formData.nombre[0]}{formData.apellido[0]}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                  className="border-halloween-purple/30 focus:border-halloween-orange"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido *</Label>
                <Input
                  id="apellido"
                  value={formData.apellido}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  required
                  className="border-halloween-purple/30 focus:border-halloween-orange"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border-halloween-purple/30 focus:border-halloween-orange"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ciclo">Ciclo</Label>
                <Select value={formData.ciclo} onValueChange={(value) => setFormData({ ...formData, ciclo: value })}>
                  <SelectTrigger className="border-halloween-purple/30 focus:border-halloween-orange">
                    <SelectValue placeholder="Selecciona el ciclo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-1">2024-1</SelectItem>
                    <SelectItem value="2024-2">2024-2</SelectItem>
                    <SelectItem value="2025-1">2025-1</SelectItem>
                    <SelectItem value="2025-2">2025-2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="precio">Precio Mensual</Label>
                <Input
                  id="precio"
                  type="number"
                  step="0.01"
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) || 0 })}
                  className="border-halloween-purple/30 focus:border-halloween-orange"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="promedio">Promedio General</Label>
                <Input
                  id="promedio"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.promedio_general}
                  onChange={(e) => setFormData({ ...formData, promedio_general: parseFloat(e.target.value) || 0 })}
                  className="border-halloween-purple/30 focus:border-halloween-orange"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tasa_exito">Tasa de Éxito (%)</Label>
                <Input
                  id="tasa_exito"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.tasa_exito}
                  onChange={(e) => setFormData({ ...formData, tasa_exito: parseFloat(e.target.value) || 0 })}
                  className="border-halloween-purple/30 focus:border-halloween-orange"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="avatar">URL del Avatar</Label>
                <Input
                  id="avatar"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://ejemplo.com/avatar.jpg"
                  className="border-halloween-purple/30 focus:border-halloween-orange"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                disabled={isSaving}
                className="border-halloween-purple/30 hover:bg-halloween-purple/10"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isSaving}
                className="bg-gradient-halloween hover:shadow-glow-orange transition-all"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
