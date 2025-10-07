import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Users, Ghost, Sparkles } from "lucide-react";
import { useState } from "react";

interface StudentChatProps {
  studentId: string;
  studentName: string;
}

export const StudentChat = ({ studentId, studentName }: StudentChatProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, user: "Ana García", message: "¿Alguien terminó el proyecto de React?", time: "10:30 AM", avatar: "", isOwn: false },
    { id: 2, user: studentName, message: "Sí, yo lo terminé ayer. ¿Necesitas ayuda?", time: "10:32 AM", avatar: "", isOwn: true },
    { id: 3, user: "Carlos López", message: "¿Podrían compartir sus repositorios de Github?", time: "10:35 AM", avatar: "", isOwn: false },
    { id: 4, user: studentName, message: "Claro! Te lo envío por privado", time: "10:37 AM", avatar: "", isOwn: true },
  ]);

  const groups = [
    { id: 1, name: "Grupo General", members: 45, online: 12, icon: "💬" },
    { id: 2, name: "React Avanzado", members: 23, online: 8, icon: "⚛️" },
    { id: 3, name: "Backend Node.js", members: 18, online: 5, icon: "🟢" },
    { id: 4, name: "Proyectos Finales", members: 15, online: 3, icon: "🚀" },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: studentName,
        message: message,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        avatar: "",
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Groups Sidebar */}
      <Card className="lg:col-span-1 border-halloween-purple/20 shadow-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-halloween-purple" />
            Grupos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {groups.map((group) => (
              <div
                key={group.id}
                className="p-4 rounded-lg bg-muted/50 border border-halloween-purple/20 hover:bg-muted cursor-pointer transition-all hover:shadow-glow hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{group.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{group.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs border-halloween-orange/30">
                        <span className="w-2 h-2 rounded-full bg-halloween-orange mr-1 animate-pulse-glow"></span>
                        {group.online} en línea
                      </Badge>
                      <span className="text-xs text-muted-foreground">{group.members} miembros</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-2 border-halloween-orange/20 shadow-glow-orange">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ghost className="h-5 w-5 text-halloween-orange animate-float" />
            Chat - Grupo General
            <Sparkles className="h-4 w-4 text-halloween-purple animate-pulse-glow ml-auto" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className="h-10 w-10 border-2 border-halloween-purple/30">
                    <AvatarImage src={msg.avatar} />
                    <AvatarFallback className={msg.isOwn ? 'bg-gradient-halloween text-white' : 'bg-muted'}>
                      {msg.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex-1 ${msg.isOwn ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      {msg.isOwn ? (
                        <>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                          <span className="font-semibold text-sm bg-gradient-halloween bg-clip-text text-transparent">
                            {msg.user}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-semibold text-sm">{msg.user}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </>
                      )}
                    </div>
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        msg.isOwn
                          ? 'bg-gradient-halloween text-white shadow-glow-orange'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe un mensaje..."
              className="border-halloween-purple/30 focus:border-halloween-orange"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-halloween hover:shadow-glow-orange"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
