import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ghost, Sparkles, Trophy } from "lucide-react";

export const StudentGames = () => {
  const games = [
    {
      id: 1,
      name: "♟️ Ajedrez",
      description: "Mejora tu estrategia y pensamiento lógico",
      players: "1-2 jugadores",
      difficulty: "Media",
      color: "halloween-purple",
      available: true,
    },
    {
      id: 2,
      name: "🎲 Dominó",
      description: "Juego clásico de estrategia y cálculo",
      players: "2-4 jugadores",
      difficulty: "Fácil",
      color: "halloween-orange",
      available: true,
    },
    {
      id: 3,
      name: "🎯 Ludo",
      description: "Diviértete con este clásico de mesa",
      players: "2-4 jugadores",
      difficulty: "Fácil",
      color: "halloween-ghost",
      available: true,
    },
    {
      id: 4,
      name: "🏯 Damas Chinas",
      description: "Desafía tu mente con movimientos estratégicos",
      players: "2-6 jugadores",
      difficulty: "Media",
      color: "halloween-purple",
      available: true,
    },
    {
      id: 5,
      name: "⚽ Futbolito",
      description: "Mini juego de fútbol para relajarte",
      players: "1-2 jugadores",
      difficulty: "Fácil",
      color: "halloween-orange",
      available: true,
    },
    {
      id: 6,
      name: "🎱 Billar",
      description: "Practica tu precisión y control",
      players: "1-2 jugadores",
      difficulty: "Media",
      color: "halloween-ghost",
      available: true,
    },
  ];

  const achievements = [
    { name: "🏆 Maestro del Ajedrez", unlocked: true },
    { name: "🎯 Campeón de Ludo", unlocked: true },
    { name: "⚡ Velocista", unlocked: false },
    { name: "🌟 Jugador Completo", unlocked: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-halloween-purple/20 shadow-glow-orange">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full bg-gradient-halloween flex items-center justify-center text-white shadow-glow animate-float">
              <Ghost className="h-8 w-8 absolute animate-pulse-glow" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-halloween bg-clip-text text-transparent">
                Zona de Relajo
              </h2>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Sparkles className="h-4 w-4 text-halloween-orange" />
                Tómate un descanso y diviértete con nuestros juegos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-halloween-orange/20 shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-halloween-orange" />
            Logros Desbloqueados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-center border transition-all ${
                  achievement.unlocked
                    ? 'bg-halloween-purple/10 border-halloween-purple/30 hover:shadow-glow'
                    : 'bg-muted/30 border-border opacity-50'
                }`}
              >
                <p className="text-sm font-medium">{achievement.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className={`border-${game.color}/20 shadow-glow hover:shadow-glow-orange transition-all hover:scale-105 cursor-pointer`}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="bg-gradient-halloween bg-clip-text text-transparent">
                  {game.name}
                </span>
                <Badge
                  variant="outline"
                  className={`border-${game.color}/30 text-${game.color}`}
                >
                  {game.difficulty}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{game.description}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground py-3 border-y border-border">
                <span>{game.players}</span>
                <Badge variant="secondary" className="bg-halloween-purple/10">
                  🎮 Online
                </Badge>
              </div>

              <Button
                className={`w-full ${
                  game.available
                    ? 'bg-gradient-halloween hover:shadow-glow-orange'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!game.available}
              >
                {game.available ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Jugar Ahora
                  </>
                ) : (
                  '🔒 Próximamente'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="border-halloween-purple/20 shadow-glow">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <Ghost className="h-12 w-12 mx-auto text-halloween-orange animate-float" />
            <h3 className="text-xl font-bold bg-gradient-halloween bg-clip-text text-transparent">
              ¡Recuerda balancear tu tiempo!
            </h3>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Los juegos son perfectos para tomar descansos activos durante tus sesiones de estudio.
              Te recomendamos jugar 10-15 minutos después de cada hora de estudio intenso.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
