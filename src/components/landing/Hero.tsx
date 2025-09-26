import { Button } from "@/components/ui/button";
import { Code2, Rocket, Zap } from "lucide-react";

interface HeroProps {
  onCTAClick: () => void;
}

export const Hero = ({ onCTAClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--tech-blue)/0.1),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(var(--tech-green)/0.1),transparent_50%)]" />
      
      {/* Code Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-tech-blue/30 font-mono text-sm transform -rotate-12">
          const developer = {'{'}
          <br />
          &nbsp;&nbsp;skills: ['React', 'Node.js'],
          <br />
          &nbsp;&nbsp;passion: true
          <br />
          {'}'}
        </div>
        <div className="absolute bottom-32 right-32 text-tech-green/30 font-mono text-sm transform rotate-12">
          function success() {'{'}
          <br />
          &nbsp;&nbsp;return hardWork + dedication;
          <br />
          {'}'}
        </div>
        <div className="absolute top-1/2 left-10 text-tech-purple/30 font-mono text-xs">
          {'<FullStackDev />'}
        </div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 text-center px-4 py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border mb-8 animate-fade-up">
          <Zap className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium">Próximo grupo inicia en enero 2025</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Conviértete en
          </span>
          <br />
          <span className="text-foreground">Full Stack Developer</span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-normal">
            en 6 meses
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-up">
          Domina el stack MERN/PERN con proyectos reales, mentoría personalizada y 
          una comunidad activa de desarrolladores. <span className="text-accent font-semibold">100% práctico</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-up">
          <Button 
            size="lg" 
            variant="cta" 
            onClick={onCTAClick}
            className="text-lg px-12 py-6 animate-glow"
          >
            <Rocket className="w-6 h-6 mr-3" />
            Comenzar Ahora
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 border-border hover:bg-secondary"
          >
            <Code2 className="w-6 h-6 mr-3" />
            Ver Temario
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-tech-blue mb-2">500+</div>
            <p className="text-muted-foreground">Estudiantes graduados</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-tech-green mb-2">95%</div>
            <p className="text-muted-foreground">Tasa de empleabilidad</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-tech-purple mb-2">6</div>
            <p className="text-muted-foreground">Proyectos reales</p>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-tech-blue/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-10 w-32 h-32 bg-tech-green/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-tech-purple/20 rounded-full blur-xl animate-pulse delay-500" />
    </section>
  );
};