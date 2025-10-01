import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Download, Filter, Edit, Trash2, UserCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Student {
  id: string;
  apellido: string;
  nombre: string;
  precio: number;
  ciclo: string;
  avatar: string;
  selected: boolean;
}

const initialStudents: Student[] = [
  { id: "1", apellido: "García", nombre: "María", precio: 1200, ciclo: "I", avatar: "https://i.pravatar.cc/150?img=1", selected: false },
  { id: "2", apellido: "Rodríguez", nombre: "Juan", precio: 1200, ciclo: "II", avatar: "https://i.pravatar.cc/150?img=2", selected: false },
  { id: "3", apellido: "Martínez", nombre: "Ana", precio: 1500, ciclo: "III", avatar: "https://i.pravatar.cc/150?img=3", selected: false },
  { id: "4", apellido: "López", nombre: "Carlos", precio: 1200, ciclo: "I", avatar: "https://i.pravatar.cc/150?img=4", selected: false },
  { id: "5", apellido: "Fernández", nombre: "Laura", precio: 1800, ciclo: "IV", avatar: "https://i.pravatar.cc/150?img=5", selected: false },
  { id: "6", apellido: "González", nombre: "Pedro", precio: 1500, ciclo: "II", avatar: "https://i.pravatar.cc/150?img=6", selected: false },
  { id: "7", apellido: "Sánchez", nombre: "Isabel", precio: 1200, ciclo: "I", avatar: "https://i.pravatar.cc/150?img=7", selected: false },
  { id: "8", apellido: "Ramírez", nombre: "Diego", precio: 1800, ciclo: "III", avatar: "https://i.pravatar.cc/150?img=8", selected: false },
];

export const StudentsTable = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectAll = () => {
    const allSelected = students.every((s) => s.selected);
    setStudents(students.map((s) => ({ ...s, selected: !allSelected })));
  };

  const toggleSelect = (id: string) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s))
    );
  };

  const handleExport = (format: string) => {
    toast({
      title: "Exportando datos",
      description: `Generando archivo ${format.toUpperCase()}...`,
    });
  };

  const handleFilter = (option: string) => {
    setFilterOption(option);
    toast({
      title: "Filtro aplicado",
      description: `Filtrando por: ${option}`,
    });
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
    toast({
      title: "Alumno eliminado",
      description: "El registro ha sido eliminado correctamente.",
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Alumnos Registrados</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Buscar alumnos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Button className="gap-2">
            <Search className="h-4 w-4" />
            BUSCAR
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                EXPORTAR
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>
                Exportar PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("csv")}>
                Exportar CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                FILTRAR
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <h4 className="font-medium mb-3">Opciones de Filtro</h4>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleFilter("Fecha de R")}
                >
                  Fecha de Registro
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleFilter("AB - X2")}
                >
                  AB - X2
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleFilter("Jerarquía")}
                >
                  Jerarquía
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left">
                  <Checkbox
                    checked={students.every((s) => s.selected)}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="p-3 text-left">Avatar</th>
                <th className="p-3 text-left">Apellido</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Precio</th>
                <th className="p-3 text-left">Ciclo</th>
                <th className="p-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="p-3">
                    <Checkbox
                      checked={student.selected}
                      onCheckedChange={() => toggleSelect(student.id)}
                    />
                  </td>
                  <td className="p-3">
                    <img
                      src={student.avatar}
                      alt={`${student.nombre} ${student.apellido}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3 font-medium">{student.apellido}</td>
                  <td className="p-3">{student.nombre}</td>
                  <td className="p-3 font-semibold text-green-600">
                    ${student.precio.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium">
                      {student.ciclo}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(student.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <UserCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No se encontraron alumnos</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
