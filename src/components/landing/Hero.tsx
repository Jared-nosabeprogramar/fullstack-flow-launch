import { Button } from "@/components/ui/button";
import { Code2, Rocket, Sparkles, Ghost } from "lucide-react";

interface HeroProps {
  onCTAClick?: () => void;
}

export const Hero = ({ onCTAClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-halloween-purple/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-32 w-40 h-40 bg-halloween-orange/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-20 w-24 h-24 bg-halloween-purple/20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 left-40 w-28 h-28 bg-halloween-orange/20 rounded-full blur-2xl animate-float delay-500" />
      </div>
      
      {/* Floating Halloween Code Snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 text-halloween-purple/30 font-mono text-lg transform -rotate-12 animate-float">
          <Ghost className="w-8 h-8 mb-2" />
          const magic = {'{'}
          <br />
          &nbsp;&nbsp;skills: 'fullstack',
          <br />
          &nbsp;&nbsp;future: '∞'
          <br />
          {'}'}
        </div>
        <div className="absolute bottom-32 right-32 text-halloween-orange/30 font-mono text-lg transform rotate-12 animate-float delay-1000">
          <Sparkles className="w-6 h-6 mb-2" />
          {'<Success />'}
        </div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 text-center px-4 py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-halloween-purple/20 border border-halloween-purple/30 rounded-full mb-8 animate-fade-up backdrop-blur-sm hover:bg-halloween-purple/30 transition-all duration-300">
          <Sparkles className="w-4 h-4 text-halloween-orange animate-pulse-glow" />
          <span className="text-sm font-medium">Próximo grupo inicia en enero 2025</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up">
          <span className="bg-gradient-primary bg-clip-text text-transparent hover:scale-105 inline-block transition-transform">
            Conviértete en
          </span>
          <br />
          <span className="text-foreground">Full Stack Developer</span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-normal">
            en solo 6 meses intensivos
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 animate-fade-up">
          Domina el stack tecnológico más demandado: <span className="text-halloween-purple font-semibold">React, Node.js, MongoDB/PostgreSQL</span>. 
          Construye 6 proyectos profesionales, recibe mentoría personalizada de desarrolladores senior, 
          y únete a una comunidad activa de <span className="text-halloween-orange font-semibold">+500 graduados empleados</span>.
        </p>
        
        <div className="max-w-3xl mx-auto mb-12 animate-fade-up">
          <div className="grid md:grid-cols-3 gap-4 text-sm bg-card/50 backdrop-blur-md rounded-2xl p-6 border border-border/50 shadow-card hover:shadow-float transition-all duration-300">
            <div className="text-center group cursor-pointer hover:scale-105 transition-transform">
              <div className="text-halloween-purple font-bold mb-1">🎯 100% Práctico</div>
              <p className="text-muted-foreground">Sin teoría aburrida, solo proyectos reales desde el día 1</p>
            </div>
            <div className="text-center group cursor-pointer hover:scale-105 transition-transform">
              <div className="text-halloween-orange font-bold mb-1">💼 Garantía Laboral</div>
              <p className="text-muted-foreground">95% de nuestros graduados consigue trabajo en 6 meses</p>
            </div>
            <div className="text-center group cursor-pointer hover:scale-105 transition-transform">
              <div className="text-halloween-purple font-bold mb-1">🚀 Mentoría 1:1</div>
              <p className="text-muted-foreground">Acompañamiento personal de developers senior</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-up">
          <Button 
            size="lg" 
            variant="cta" 
            onClick={onCTAClick}
            className="text-lg px-12 py-6 shadow-glow hover:shadow-glow-orange hover:scale-110 transition-all duration-300 group"
          >
            <Ghost className="w-6 h-6 mr-3 group-hover:animate-float" />
            Inscribirme Ahora
            <Sparkles className="w-5 h-5 ml-3 animate-pulse-glow" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={onCTAClick}
            className="text-lg px-8 py-6 border-2 border-halloween-purple hover:bg-halloween-purple/10 hover:scale-105 transition-all duration-300"
          >
            <Rocket className="w-6 h-6 mr-3" />
            Comenzar mi Transformación Ahora
          </Button>
        </div>
        
        {/* Expanded Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-6xl mx-auto">
          <div className="text-center p-6 bg-card/30 backdrop-blur-md rounded-2xl border border-halloween-purple/30 hover:border-halloween-purple/60 transition-all duration-300 hover:shadow-glow hover:scale-105 cursor-pointer group">
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">500+</div>
            <p className="text-muted-foreground text-sm font-semibold">Graduados empleados</p>
            <p className="text-xs text-muted-foreground/70 mt-1">En empresas como MercadoLibre, Globant, Rappi</p>
          </div>
          <div className="text-center p-6 bg-card/30 backdrop-blur-md rounded-2xl border border-halloween-orange/30 hover:border-halloween-orange/60 transition-all duration-300 hover:shadow-glow-orange hover:scale-105 cursor-pointer group">
            <div className="text-4xl font-bold text-halloween-orange mb-2 group-hover:scale-110 transition-transform">95%</div>
            <p className="text-muted-foreground text-sm font-semibold">Tasa de empleabilidad</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Dentro de los primeros 6 meses</p>
          </div>
          <div className="text-center p-6 bg-card/30 backdrop-blur-md rounded-2xl border border-halloween-purple/30 hover:border-halloween-purple/60 transition-all duration-300 hover:shadow-glow hover:scale-105 cursor-pointer group">
            <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">$85K</div>
            <p className="text-muted-foreground text-sm font-semibold">Salario promedio USD</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Primer trabajo como Full Stack</p>
          </div>
          <div className="text-center p-6 bg-card/30 backdrop-blur-md rounded-2xl border border-halloween-orange/30 hover:border-halloween-orange/60 transition-all duration-300 hover:shadow-glow-orange hover:scale-105 cursor-pointer group">
            <div className="text-4xl font-bold text-halloween-orange mb-2 group-hover:scale-110 transition-transform">6</div>
            <p className="text-muted-foreground text-sm font-semibold">Proyectos profesionales</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Para tu portfolio completo</p>
          </div>
        </div>
        
        {/* Company Logos Section */}
        <div className="mt-16 animate-fade-up">
          <p className="text-sm text-muted-foreground mb-6">Nuestros graduados trabajan en:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-80 transition-opacity">
            <div className="text-2xl font-bold text-muted-foreground hover:text-halloween-purple transition-colors cursor-pointer">MercadoLibre</div>
            <div className="text-2xl font-bold text-muted-foreground hover:text-halloween-purple transition-colors cursor-pointer">Globant</div>
            <div className="text-2xl font-bold text-muted-foreground hover:text-halloween-orange transition-colors cursor-pointer">Rappi</div>
            <div className="text-2xl font-bold text-muted-foreground hover:text-halloween-purple transition-colors cursor-pointer">Platzi</div>
            <div className="text-2xl font-bold text-muted-foreground hover:text-halloween-orange transition-colors cursor-pointer">Ualá</div>
            <div className="text-2xl font-bold text-muted-foreground hover:text-halloween-purple transition-colors cursor-pointer">Auth0</div>
          </div>
        </div>
      </div>
    </section>
  );
};