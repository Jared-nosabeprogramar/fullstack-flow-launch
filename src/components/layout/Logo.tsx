import { Ghost, Code2 } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-xl rounded-full group-hover:opacity-40 transition-opacity" />
        <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-halloween rounded-xl shadow-glow group-hover:shadow-float transition-all duration-300 group-hover:scale-110">
          <Ghost className="w-6 h-6 text-white" />
          <Code2 className="w-3 h-3 text-halloween-orange-light absolute bottom-1 right-1" />
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform">
          Naje Academy
        </h1>
        <p className="text-xs text-muted-foreground">Full Stack Developer</p>
      </div>
    </div>
  );
};
