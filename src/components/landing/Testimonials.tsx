import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "María González",
      role: "Frontend Developer en Mercado Libre",
      image: "👩‍💻",
      rating: 5,
      text: "Hace un año trabajaba en atención al cliente ganando el mínimo. Hoy soy Frontend Developer en una de las empresas tech más grandes de LATAM. El cambio de vida ha sido increíble.",
      beforeJob: "Atención al Cliente",
      afterJob: "Frontend Developer", 
      salaryIncrease: "+250%"
    },
    {
      name: "Carlos Mendoza",
      role: "Full Stack Developer en Startup",
      image: "👨‍🚀",
      rating: 5,
      text: "El programa me dio mucho más que conocimiento técnico. Aprendí a pensar como desarrollador, a resolver problemas complejos y a trabajar en equipo. Ahora lidero un equipo de 5 developers.",
      beforeJob: "Contador",
      afterJob: "Tech Lead",
      salaryIncrease: "+180%"
    },
    {
      name: "Ana Rodríguez",
      role: "Backend Developer en Rappi",
      image: "👩‍🔬",
      rating: 5,
      text: "La mentoría personalizada fue clave para mi éxito. Cada duda fue resuelta al instante y siempre tuve el apoyo necesario. Los proyectos que construí fueron mi carta de presentación.",
      beforeJob: "Profesora",
      afterJob: "Backend Developer",
      salaryIncrease: "+200%"
    },
    {
      name: "Diego Torres",
      role: "Freelance Full Stack",
      image: "🧑‍💼",
      rating: 5,
      text: "Decidí ser freelancer después del curso. En 8 meses ya había recuperado la inversión y ahora gano más que en mi trabajo anterior, con total libertad de horarios.",
      beforeJob: "Vendedor",
      afterJob: "Freelancer",
      salaryIncrease: "+300%"
    },
    {
      name: "Sofía Castillo",
      role: "React Developer en Globant",
      image: "👩‍🎨",
      rating: 5,
      text: "La comunidad del curso sigue siendo mi red de contactos más valiosa. Conseguí mi trabajo actual gracias a una recomendación de un compañero del programa.",
      beforeJob: "Diseñadora Gráfica",
      afterJob: "React Developer",
      salaryIncrease: "+150%"
    },
    {
      name: "Roberto Silva",
      role: "DevOps Engineer en Platzi",
      image: "🧑‍🔧",
      rating: 5,
      text: "No solo aprendí a programar, aprendí todo el ecosistema de desarrollo moderno. Docker, AWS, CI/CD... tecnologías que uso día a día en mi trabajo actual.",
      beforeJob: "Soporte IT",
      afterJob: "DevOps Engineer",
      salaryIncrease: "+220%"
    }
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Historias de <span className="text-tech-green">Éxito</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            +500 estudiantes ya transformaron sus carreras. Lee sus experiencias reales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-card/80 hover:bg-card transition-all hover:shadow-card border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{testimonial.image}</span>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <Quote className="w-6 h-6 text-tech-blue/40" />
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-tech-orange text-tech-orange" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Antes:</span>
                  <span>{testimonial.beforeJob}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Ahora:</span>
                  <span className="text-tech-green font-semibold">{testimonial.afterJob}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Aumento salarial:</span>
                  <span className="text-tech-green font-bold">{testimonial.salaryIncrease}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-tech-blue mb-2">95%</div>
            <p className="text-sm text-muted-foreground">Consigue trabajo en 6 meses</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-tech-green mb-2">$85K</div>
            <p className="text-sm text-muted-foreground">Salario promedio USD</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-tech-purple mb-2">500+</div>
            <p className="text-sm text-muted-foreground">Graduados empleados</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-tech-orange mb-2">4.9</div>
            <p className="text-sm text-muted-foreground">Rating promedio</p>
          </div>
        </div>
      </div>
    </section>
  );
};