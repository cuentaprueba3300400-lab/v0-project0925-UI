"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateProjectDialog } from "./create-project-dialog"
import { Plus, Search, Filter, Calendar, Users, MoreHorizontal, Eye, Edit, Trash2, Archive } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const mockProjects = [
  {
    id: "1",
    name: "Rediseño del Sitio Web",
    description: "Renovación completa del sitio web de la empresa con diseño moderno y UX mejorada",
    status: "En Progreso",
    priority: "Alta",
    progress: 75,
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    teamMembers: 5,
    budget: 50000,
    manager: "Sarah Johnson",
    archived: false,
  },
  {
    id: "2",
    name: "Desarrollo de App Móvil",
    description: "App nativa iOS y Android para engagement de clientes",
    status: "Planificación",
    priority: "Media",
    progress: 25,
    startDate: "2024-01-10",
    endDate: "2024-02-28",
    teamMembers: 8,
    budget: 120000,
    manager: "Mike Chen",
    archived: false,
  },
  {
    id: "3",
    name: "Campaña Marketing Q1",
    description: "Campaña de marketing digital para lanzamiento de producto",
    status: "Revisión",
    priority: "Alta",
    progress: 90,
    startDate: "2023-12-15",
    endDate: "2024-01-10",
    teamMembers: 3,
    budget: 25000,
    manager: "Emily Davis",
    archived: false,
  },
  {
    id: "4",
    name: "Actualización de Infraestructura",
    description: "Migración de servidores y optimización de rendimiento",
    status: "Completado",
    priority: "Crítica",
    progress: 100,
    startDate: "2023-11-01",
    endDate: "2023-12-20",
    teamMembers: 4,
    budget: 75000,
    manager: "Alex Rodriguez",
    archived: false,
  },
  {
    id: "5",
    name: "Proyecto Archivado Ejemplo",
    description: "Este es un proyecto que ha sido archivado",
    status: "Completado",
    priority: "Media",
    progress: 100,
    startDate: "2023-10-01",
    endDate: "2023-11-15",
    teamMembers: 3,
    budget: 30000,
    manager: "John Doe",
    archived: true,
  },
]

export function ProjectsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [viewFilter, setViewFilter] = useState("active")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [archiveDialog, setArchiveDialog] = useState<{ open: boolean; projectId: string; projectName: string }>({
    open: false,
    projectId: "",
    projectName: "",
  })
  const [projects, setProjects] = useState(mockProjects)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter
    const matchesView = viewFilter === "active" ? !project.archived : project.archived

    return matchesSearch && matchesStatus && matchesPriority && matchesView
  })

  const handleArchiveClick = (projectId: string, projectName: string) => {
    setArchiveDialog({ open: true, projectId, projectName })
  }

  const confirmArchive = () => {
    setProjects((prev) =>
      prev.map((project) => (project.id === archiveDialog.projectId ? { ...project, archived: true } : project)),
    )
    setArchiveDialog({ open: false, projectId: "", projectName: "" })
  }

  const handleUnarchive = (projectId: string) => {
    setProjects((prev) => prev.map((project) => (project.id === projectId ? { ...project, archived: false } : project)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Progreso":
        return "default"
      case "Planificación":
        return "secondary"
      case "Revisión":
        return "outline"
      case "Completado":
        return "default"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Crítica":
        return "destructive"
      case "Alta":
        return "default"
      case "Media":
        return "secondary"
      case "Baja":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">
            {viewFilter === "active" ? "Proyectos Activos" : "Proyectos Archivados"}
          </h1>
          <p className="text-muted-foreground text-pretty">
            {viewFilter === "active"
              ? "Gestiona y rastrea todos tus proyectos activos en un solo lugar"
              : "Consulta y recupera proyectos archivados"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant={viewFilter === "active" ? "default" : "outline"} onClick={() => setViewFilter("active")}>
            Activos
          </Button>
          <Button variant={viewFilter === "archived" ? "default" : "outline"} onClick={() => setViewFilter("archived")}>
            Archivados
          </Button>
          {viewFilter === "active" && (
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Proyecto
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Estados</SelectItem>
              <SelectItem value="Planificación">Planificación</SelectItem>
              <SelectItem value="En Progreso">En Progreso</SelectItem>
              <SelectItem value="Revisión">Revisión</SelectItem>
              <SelectItem value="Completado">Completado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Prioridades</SelectItem>
              <SelectItem value="Crítica">Crítica</SelectItem>
              <SelectItem value="Alta">Alta</SelectItem>
              <SelectItem value="Media">Media</SelectItem>
              <SelectItem value="Baja">Baja</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                    <Badge variant={getPriorityColor(project.priority)}>{project.priority}</Badge>
                    {project.archived && (
                      <Badge variant="outline" className="text-muted-foreground">
                        Archivado
                      </Badge>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Detalles
                    </DropdownMenuItem>
                    {!project.archived && (
                      <>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar Proyecto
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleArchiveClick(project.id, project.name)}>
                          <Archive className="mr-2 h-4 w-4" />
                          Archivar Proyecto
                        </DropdownMenuItem>
                      </>
                    )}
                    {project.archived && (
                      <DropdownMenuItem onClick={() => handleUnarchive(project.id)}>
                        <Archive className="mr-2 h-4 w-4" />
                        Desarchivar Proyecto
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar Proyecto
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription className="text-sm">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Vence:</span>
                  <span className="font-medium">{project.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Equipo:</span>
                  <span className="font-medium">{project.teamMembers}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Gerente:</span>
                    <span className="ml-1 font-medium">{project.manager}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/projects/${project.id}`}>Ver Proyecto</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {viewFilter === "active"
              ? "No se encontraron proyectos activos que coincidan con tus criterios."
              : "No hay proyectos archivados que coincidan con tus criterios."}
          </p>
        </div>
      )}

      <Dialog open={archiveDialog.open} onOpenChange={(open) => setArchiveDialog((prev) => ({ ...prev, open }))}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Archivado</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas archivar el proyecto "{archiveDialog.projectName}"? El proyecto dejará de
              aparecer en la lista principal pero podrá ser consultado en la sección de archivados.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setArchiveDialog({ open: false, projectId: "", projectName: "" })}>
              Cancelar
            </Button>
            <Button onClick={confirmArchive}>Archivar Proyecto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CreateProjectDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  )
}
