import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Target, TrendingUp, Users } from "lucide-react";

interface ProblemSolutionProps {
  onCTAClick: () => void;
}

export const ProblemSolution = ({ onCTAClick }: ProblemSolutionProps) => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Estancado en tu trabajo actual",
      description: "Sin oportunidades de crecimiento ni aumentos significativos"
    },
    {
      icon: Target,
      title: "Falta de skills técnicos demandados",
      description: "El mercado pide desarrolladores full stack pero no sabes por dónde empezar"
    },
    {
      icon: TrendingUp,
      title: "Aprendizaje sin estructura",
      description: "Tutoriales sueltos que no te llevan a un nivel profesional real"
    }
  ];

  const solutions = [
    {
      icon: Users,
      title: "Mentoría personalizada",
      description: "Acompañamiento directo de desarrolladores senior con experiencia real"
    },
    {
      icon: Target,
      title: "Proyectos del mundo real",
      description: "Construye aplicaciones que realmente se usan en empresas actuales"
    },
    {
      icon: TrendingUp,
      title: "Ruta estructurada y probada",
      description: "Metodología validada por +500 estudiantes que ya trabajan como developers"
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container px-4">
        {/* Problem Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Te suena familiar esto?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Miles de personas están atrapadas en trabajos que no les ofrecen crecimiento ni les permiten alcanzar su potencial real.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {problems.map((problem, index) => (
            <Card key={index} className="p-8 bg-card/50 border border-destructive/20 hover:border-destructive/40 transition-all">
              <problem.icon className="w-12 h-12 text-destructive mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-destructive">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </Card>
          ))}
        </div>

        {/* Solution Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-tech-green">La solución está aquí</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un programa completo que te lleva desde cero hasta desarrollador full stack empleable en solo 6 meses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <Card key={index} className="p-8 bg-card/80 border border-tech-green/20 hover:border-tech-green/40 transition-all hover:shadow-glow">
              <solution.icon className="w-12 h-12 text-tech-green mb-6" />
              <h3 className="text-xl font-semibold mb-4">{solution.title}</h3>
              <p className="text-muted-foreground">{solution.description}</p>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            variant="cta" 
            onClick={onCTAClick}
            className="text-lg px-12 py-6"
          >
            Cambiar Mi Futuro Ahora
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Próximo grupo limitado a 50 estudiantes
          </p>
        </div>
      </div>
    </section>
  );
};