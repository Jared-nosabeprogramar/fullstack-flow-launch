import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";

interface PersonalityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentId: string;
  studentName: string;
  currentPromedio: number;
}

export const PersonalityFormModal = ({ isOpen, onClose, studentId, studentName, currentPromedio }: PersonalityFormModalProps) => {
  const [tipoPersonalidad, setTipoPersonalidad] = useState("");
  const [estiloAprendizaje, setEstiloAprendizaje] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [generatedTips, setGeneratedTips] = useState<any>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Guardar personalidad en la base de datos
      const { error: insertError } = await supabase
        .from('student_personalities')
        .upsert({
          student_id: studentId,
          tipo_personalidad: tipoPersonalidad,
          estilo_aprendizaje: estiloAprendizaje,
          descripcion: descripcion || null,
        });

      if (insertError) throw insertError;

      // Generar tips con IA
      const { data, error: functionError } = await supabase.functions.invoke('generate-student-tips', {
        body: {
          tipoPersonalidad,
          estiloAprendizaje,
          promedioActual: currentPromedio,
        },
      });

      if (functionError) throw functionError;

      // Guardar tips en la base de datos
      const tips = data.tips;
      const tipsToInsert = [
        ...tips.concentracion.map((tip: string) => ({
          student_id: studentId,
          categoria: 'Concentración',
          contenido: tip,
        })),
        ...tips.tecnicas_estudio.map((tip: string) => ({
          student_id: studentId,
          categoria: 'Técnicas de Estudio',
          contenido: tip,
        })),
        ...tips.gestion_tiempo.map((tip: string) => ({
          student_id: studentId,
          categoria: 'Gestión del Tiempo',
          contenido: tip,
        })),
      ];

      const { error: tipsError } = await supabase
        .from('ai_tips')
        .insert(tipsToInsert);

      if (tipsError) throw tipsError;

      setGeneratedTips(tips);
      setShowTips(true);

      toast({
        title: "✅ Perfil guardado",
        description: "Los tips personalizados han sido generados exitosamente",
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message || "Error al guardar el perfil",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowTips(false);
    setGeneratedTips(null);
    setTipoPersonalidad("");
    setEstiloAprendizaje("");
    setDescripcion("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Perfil Cognitivo - {studentName}
          </DialogTitle>
        </DialogHeader>

        {!showTips ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="personality">Tipo de Personalidad *</Label>
              <Select value={tipoPersonalidad} onValueChange={setTipoPersonalidad} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo de personalidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Analítico">Analítico</SelectItem>
                  <SelectItem value="Creativo">Creativo</SelectItem>
                  <SelectItem value="Práctico">Práctico</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                  <SelectItem value="Reflexivo">Reflexivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="learning">Estilo de Aprendizaje *</Label>
              <Select value={estiloAprendizaje} onValueChange={setEstiloAprendizaje} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el estilo de aprendizaje" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Visual">Visual</SelectItem>
                  <SelectItem value="Auditivo">Auditivo</SelectItem>
                  <SelectItem value="Kinestésico">Kinestésico</SelectItem>
                  <SelectItem value="Lectura/Escritura">Lectura/Escritura</SelectItem>
                  <SelectItem value="Multimodal">Multimodal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción Adicional (Opcional)</Label>
              <Textarea
                id="description"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Agrega notas adicionales sobre el estudiante..."
                rows={4}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generando Tips con IA...
                  </>
                ) : (
                  "Guardar y Generar Tips"
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Tips Personalizados Generados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {generatedTips && (
                  <>
                    <div>
                      <h4 className="font-semibold text-sm text-primary mb-2">🎯 Concentración</h4>
                      <ul className="space-y-1.5 list-disc list-inside text-sm">
                        {generatedTips.concentracion.map((tip: string, idx: number) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-blue-600 mb-2">📚 Técnicas de Estudio</h4>
                      <ul className="space-y-1.5 list-disc list-inside text-sm">
                        {generatedTips.tecnicas_estudio.map((tip: string, idx: number) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-green-600 mb-2">⏰ Gestión del Tiempo</h4>
                      <ul className="space-y-1.5 list-disc list-inside text-sm">
                        {generatedTips.gestion_tiempo.map((tip: string, idx: number) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleClose}>Cerrar</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
