import { LayoutDashboard, Users, Mail, Settings, FileText, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Alumnos", path: "/admin#students" },
  { icon: BarChart3, label: "Estadísticas", path: "/admin#stats" },
  { icon: Mail, label: "Mensajes", path: "/admin#messages" },
  { icon: FileText, label: "Reportes", path: "/admin#reports" },
  { icon: Settings, label: "Configuración", path: "/admin#settings" },
];

export const AdminSidebar = () => {
  return (
    <aside className="bg-card border-r border-border h-full flex flex-col items-center py-6 gap-6">
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `p-3 rounded-lg transition-all duration-200 hover:bg-accent group relative ${
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
            }`
          }
          title={item.label}
        >
          <item.icon className="h-6 w-6" />
          <span className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {item.label}
          </span>
        </NavLink>
      ))}
    </aside>
  );
};
