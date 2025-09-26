import { Card } from "@/components/ui/card";

export const TechStack = () => {
  const frontendTech = [
    { name: "React", icon: "⚛️", description: "La librería más demandada" },
    { name: "TypeScript", icon: "📘", description: "JavaScript con superpoderes" },
    { name: "Tailwind CSS", icon: "🎨", description: "Diseño moderno y responsive" },
    { name: "Next.js", icon: "▲", description: "Framework de producción" }
  ];

  const backendTech = [
    { name: "Node.js", icon: "🟢", description: "JavaScript en el servidor" },
    { name: "Express", icon: "🚀", description: "Framework web minimalista" },
    { name: "MongoDB", icon: "🍃", description: "Base de datos NoSQL" },
    { name: "PostgreSQL", icon: "🐘", description: "Base de datos relacional" }
  ];

  const tools = [
    { name: "Git", icon: "🔄", description: "Control de versiones" },
    { name: "Docker", icon: "🐋", description: "Contenedorización" },
    { name: "AWS", icon: "☁️", description: "Despliegue en la nube" },
    { name: "Vercel", icon: "▲", description: "Deploy automático" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Stack Tecnológico
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Aprende las tecnologías más demandadas por las empresas en 2024. 
            Stack completo para desarrollo moderno.
          </p>
        </div>

        {/* Frontend */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-tech-blue">Frontend Development</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {frontendTech.map((tech, index) => (
              <Card key={index} className="p-6 text-center bg-card/80 hover:bg-tech-blue/5 transition-all hover:border-tech-blue/40 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tech.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{tech.name}</h4>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-tech-green">Backend Development</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {backendTech.map((tech, index) => (
              <Card key={index} className="p-6 text-center bg-card/80 hover:bg-tech-green/5 transition-all hover:border-tech-green/40 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tech.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{tech.name}</h4>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Tools & Deployment */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-tech-purple">Herramientas & Deploy</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tools.map((tech, index) => (
              <Card key={index} className="p-6 text-center bg-card/80 hover:bg-tech-purple/5 transition-all hover:border-tech-purple/40 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tech.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{tech.name}</h4>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 p-8 bg-gradient-hero rounded-lg border border-border">
          <h3 className="text-2xl font-bold mb-4">¿Por qué este Stack?</h3>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="font-semibold text-tech-blue mb-2">📈 Alta Demanda</h4>
              <p className="text-sm text-muted-foreground">Stack utilizado por empresas como Netflix, Airbnb, WhatsApp</p>
            </div>
            <div>
              <h4 className="font-semibold text-tech-green mb-2">💰 Mejor Salario</h4>
              <p className="text-sm text-muted-foreground">Desarrolladores full stack ganan 40% más que especializados</p>
            </div>
            <div>
              <h4 className="font-semibold text-tech-purple mb-2">🚀 Versatilidad</h4>
              <p className="text-sm text-muted-foreground">Un solo lenguaje (JavaScript) para todo el desarrollo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};