import { Card } from "@/components/ui/card";
import frontendStackImg from "@/assets/frontend-stack.jpg";
import backendStackImg from "@/assets/backend-stack.jpg";
import devopsToolsImg from "@/assets/devops-tools.jpg";

export const TechStack = () => {
  const frontendTech = [
    { 
      name: "React", 
      icon: "⚛️", 
      description: "La librería más demandada",
      details: "Hooks, Context, State Management, Performance Optimization",
      market: "Usado por Facebook, Netflix, Airbnb" 
    },
    { 
      name: "TypeScript", 
      icon: "📘", 
      description: "JavaScript con superpoderes",
      details: "Type Safety, Interfaces, Generics, Advanced Types",
      market: "Estándar en empresas enterprise" 
    },
    { 
      name: "Next.js", 
      icon: "▲", 
      description: "Framework de producción",
      details: "SSR, SSG, API Routes, Optimización automática",
      market: "Usado por TikTok, Vercel, Twitch" 
    },
    { 
      name: "Tailwind CSS", 
      icon: "🎨", 
      description: "CSS utility-first moderno",
      details: "Responsive Design, Dark Mode, Custom Components",
      market: "Adoptado por GitHub, Shopify, Algolia" 
    }
  ];

  const backendTech = [
    { 
      name: "Node.js", 
      icon: "🟢", 
      description: "JavaScript en el servidor",
      details: "Event Loop, NPM Ecosystem, Microservices, REST APIs",
      market: "Usado por LinkedIn, Uber, PayPal" 
    },
    { 
      name: "Express.js", 
      icon: "🚀", 
      description: "Framework web minimalista",
      details: "Middleware, Routing, Error Handling, Security",
      market: "Base de millones de aplicaciones" 
    },
    { 
      name: "MongoDB", 
      icon: "🍃", 
      description: "Base de datos NoSQL",
      details: "Agregaciones, Indexing, Replicación, Sharding",
      market: "Usado por Forbes, Toyota, Adobe" 
    },
    { 
      name: "PostgreSQL", 
      icon: "🐘", 
      description: "Base de datos relacional avanzada",
      details: "Queries complejas, ACID, Triggers, Stored Procedures",
      market: "Usado por Instagram, Spotify, Reddit" 
    }
  ];

  const tools = [
    { 
      name: "Git & GitHub", 
      icon: "🔄", 
      description: "Control de versiones profesional",
      details: "Branching, Merging, Pull Requests, CI/CD Integration",
      market: "Estándar universal en desarrollo" 
    },
    { 
      name: "Docker", 
      icon: "🐋", 
      description: "Contenedorización y DevOps",
      details: "Containers, Images, Volumes, Docker Compose",
      market: "Usado por Google, Amazon, Microsoft" 
    },
    { 
      name: "AWS", 
      icon: "☁️", 
      description: "Cloud computing líder mundial",
      details: "EC2, S3, Lambda, RDS, Load Balancing",
      market: "32% del mercado cloud global" 
    },
    { 
      name: "Testing & QA", 
      icon: "🧪", 
      description: "Testing automatizado profesional",
      details: "Jest, React Testing Library, Cypress, Unit & E2E Tests",
      market: "Esencial para empresas serias" 
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Stack Tecnológico Completo
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Aprende las tecnologías más demandadas del mercado en 2024-2025. Stack completo para desarrollo moderno 
            que usan empresas como <span className="text-tech-blue font-semibold">Netflix, Airbnb, WhatsApp y Uber</span>.
          </p>
          <div className="bg-tech-blue/10 border border-tech-blue/20 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="font-semibold text-tech-blue mb-3">🔥 ¿Por qué JavaScript Full Stack?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <strong className="text-tech-green">1 Lenguaje = Todo</strong>
                <p className="text-muted-foreground mt-1">Frontend, Backend, Mobile, Desktop. Una sola sintaxis para dominar.</p>
              </div>
              <div>
                <strong className="text-tech-purple">Mercado Gigante</strong>
                <p className="text-muted-foreground mt-1">69% de developers profesionales usan JavaScript. Mayor demanda laboral.</p>
              </div>
              <div>
                <strong className="text-tech-orange">Salarios Top</strong>
                <p className="text-muted-foreground mt-1">Full Stack JS developers: $60K-120K USD/año según experiencia.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Frontend */}
        <div className="mb-16">
          <div className="mb-8">
            <img 
              src={frontendStackImg} 
              alt="Frontend Development Stack"
              className="w-full max-w-5xl mx-auto h-64 object-cover rounded-lg border border-border"
            />
          </div>
          <h3 className="text-2xl font-bold text-center mb-8 text-tech-blue">Frontend Development</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {frontendTech.map((tech, index) => (
              <Card key={index} className="p-6 text-center bg-card/80 hover:bg-tech-blue/5 transition-all hover:border-tech-blue/40 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tech.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{tech.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{tech.description}</p>
                <div className="text-xs text-muted-foreground/70 mb-2 border-t pt-3">
                  <strong>Aprenderás:</strong> {tech.details}
                </div>
                <div className="text-xs text-tech-blue font-medium">
                  {tech.market}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="mb-16">
          <div className="mb-8">
            <img 
              src={backendStackImg} 
              alt="Backend Development Stack"
              className="w-full max-w-5xl mx-auto h-64 object-cover rounded-lg border border-border"
            />
          </div>
          <h3 className="text-2xl font-bold text-center mb-8 text-tech-green">Backend Development</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {backendTech.map((tech, index) => (
              <Card key={index} className="p-6 text-center bg-card/80 hover:bg-tech-green/5 transition-all hover:border-tech-green/40 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tech.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{tech.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{tech.description}</p>
                <div className="text-xs text-muted-foreground/70 mb-2 border-t pt-3">
                  <strong>Aprenderás:</strong> {tech.details}
                </div>
                <div className="text-xs text-tech-green font-medium">
                  {tech.market}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tools & Deployment */}
        <div>
          <div className="mb-8">
            <img 
              src={devopsToolsImg} 
              alt="DevOps Tools and Deployment"
              className="w-full max-w-5xl mx-auto h-64 object-cover rounded-lg border border-border"
            />
          </div>
          <h3 className="text-2xl font-bold text-center mb-8 text-tech-purple">Herramientas & Deploy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tech, index) => (
              <Card key={index} className="p-6 text-center bg-card/80 hover:bg-tech-purple/5 transition-all hover:border-tech-purple/40 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{tech.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{tech.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{tech.description}</p>
                <div className="text-xs text-muted-foreground/70 mb-2 border-t pt-3">
                  <strong>Aprenderás:</strong> {tech.details}
                </div>
                <div className="text-xs text-tech-purple font-medium">
                  {tech.market}
                </div>
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