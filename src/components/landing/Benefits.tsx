import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Users, 
  Briefcase, 
  Code, 
  MessageCircle, 
  Award, 
  Clock,
  CheckCircle,
  Zap
} from "lucide-react";

interface BenefitsProps {
  onCTAClick: () => void;
}

export const Benefits = ({ onCTAClick }: BenefitsProps) => {
  const benefits = [
    {
      icon: Code,
      title: "Aprendizaje 100% Práctico",
      description: "Nada de teoría aburrida. Desde el día 1 construyes proyectos reales que van directo a tu portafolio.",
      features: [
        "6 proyectos completos",
        "Código revisado por mentores",
        "Deploy en producción"
      ],
      color: "tech-blue"
    },
    {
      icon: Users,
      title: "Mentoría Personalizada",
      description: "Desarrolladores senior te guían paso a paso. Sesiones 1:1 para resolver dudas y acelerar tu aprendizaje.",
      features: [
        "2 sesiones semanales de mentoría",
        "Code reviews personalizados", 
        "Orientación profesional"
      ],
      color: "tech-green"
    },
    {
      icon: Briefcase,
      title: "Proyectos del Mundo Real",
      description: "Construye aplicaciones que las empresas realmente necesitan. Experiencia equivalente a 1 año de trabajo.",
      features: [
        "E-commerce completo",
        "Red social",
        "App de gestión empresarial"
      ],
      color: "tech-purple"
    },
    {
      icon: MessageCircle,
      title: "Comunidad Activa",
      description: "Únete a una red de +500 developers. Networking, colaboración y oportunidades laborales.",
      features: [
        "Discord 24/7 activo",
        "Eventos mensuales",
        "Bolsa de trabajo exclusiva"
      ],
      color: "tech-orange"
    }
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tech-green/10 rounded-full border border-tech-green/20 mb-6">
            <Award className="w-4 h-4 text-tech-green" />
            <span className="text-sm font-medium text-tech-green">Metodología Única</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Por qué nuestro programa es 
            <span className="text-tech-green"> diferente</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No es solo otro curso online. Es una experiencia completa diseñada 
            para convertirte en desarrollador empleable en tiempo récord.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-8 bg-card/80 hover:bg-card transition-all hover:shadow-card border-l-4 border-l-tech-blue/40 hover:border-l-tech-green/60">
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-lg ${
                  benefit.color === 'tech-blue' ? 'bg-tech-blue/10 border border-tech-blue/20' :
                  benefit.color === 'tech-green' ? 'bg-tech-green/10 border border-tech-green/20' :
                  benefit.color === 'tech-purple' ? 'bg-tech-purple/10 border border-tech-purple/20' :
                  'bg-tech-orange/10 border border-tech-orange/20'
                }`}>
                  <benefit.icon className={`w-8 h-8 ${
                    benefit.color === 'tech-blue' ? 'text-tech-blue' :
                    benefit.color === 'tech-green' ? 'text-tech-green' :
                    benefit.color === 'tech-purple' ? 'text-tech-purple' :
                    'text-tech-orange'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-6">{benefit.description}</p>
                  
                  <ul className="space-y-3">
                    {benefit.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-tech-green flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Guarantee Section */}
        <div className="bg-gradient-accent/5 border border-accent/20 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <Zap className="w-16 h-16 text-accent mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Garantía de Empleabilidad</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Si completas el programa y no consigues trabajo como desarrollador en 6 meses, 
              te devolvemos <span className="font-bold text-accent">el 100% de tu dinero</span>.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Garantía por 6 meses</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-tech-green" />
                <span>Sin letra pequeña</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="cta" 
            onClick={onCTAClick}
            className="text-lg px-12 py-6 animate-glow"
          >
            Asegurar Mi Cupo Ahora
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Solo quedan <span className="text-accent font-semibold">12 cupos</span> disponibles
          </p>
        </div>
      </div>
    </section>
  );
};