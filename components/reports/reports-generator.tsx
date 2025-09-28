"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  CalendarIcon,
  BarChart3,
  Target,
  FileSpreadsheet,
  FilePen as FilePdf,
  Loader2,
  Search,
  ArrowUpDown,
  Eye,
  Trash2,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

const reportTypes = [
  {
    id: "task-progress",
    name: "Reporte de Progreso de Tareas",
    description: "Muestra el estado de todas las tareas, sus responsables y su avance",
    category: "Gestión de Tareas",
    estimatedTime: "2-3 minutos",
  },
  {
    id: "workload",
    name: "Reporte de Carga de Trabajo",
    description: "Visualiza la asignación de recursos y la carga de trabajo del personal",
    category: "Recursos Humanos",
    estimatedTime: "3-4 minutos",
  },
  {
    id: "schedule",
    name: "Reporte de Cronograma",
    description: "Ofrece una vista del cronograma del proyecto con fechas de inicio y finalización",
    category: "Planificación",
    estimatedTime: "2-3 minutos",
  },
]

const projects = [
  "Rediseño del Sitio Web",
  "Desarrollo de App Móvil",
  "Campaña de Marketing",
  "Actualización de Infraestructura",
  "Sistema de Gestión",
  "Plataforma E-commerce",
]

const recentReports = [
  {
    id: "1",
    name: "Resumen Proyecto Q4",
    type: "Reporte de Progreso de Tareas",
    generatedDate: "2024-01-08",
    status: "completado",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "Carga de Trabajo Diciembre",
    type: "Reporte de Carga de Trabajo",
    generatedDate: "2024-01-05",
    status: "completado",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Cronograma Semanal",
    type: "Reporte de Cronograma",
    generatedDate: "2024-01-03",
    status: "completado",
    size: "956 KB",
  },
]

const allReports = [
  {
    id: "1",
    name: "Resumen Proyecto Q4",
    type: "Reporte de Progreso de Tareas",
    generatedDate: "2024-01-08",
    status: "completado",
    size: "2.4 MB",
    team: "Desarrollo Frontend",
    personnel: "Ana García, Carlos López",
    project: "Rediseño del Sitio Web",
    format: "PDF",
  },
  {
    id: "2",
    name: "Carga de Trabajo Diciembre",
    type: "Reporte de Carga de Trabajo",
    generatedDate: "2024-01-05",
    status: "completado",
    size: "1.8 MB",
    team: "Recursos Humanos",
    personnel: "María Rodríguez, Juan Pérez",
    project: "Sistema de Gestión",
    format: "XLSX",
  },
  {
    id: "3",
    name: "Cronograma Semanal",
    type: "Reporte de Cronograma",
    generatedDate: "2024-01-03",
    status: "completado",
    size: "956 KB",
    team: "Planificación",
    personnel: "Luis Martín",
    project: "Desarrollo de App Móvil",
    format: "PDF",
  },
  {
    id: "4",
    name: "Análisis de Rendimiento Q1",
    type: "Reporte de Progreso de Tareas",
    generatedDate: "2024-01-15",
    status: "completado",
    size: "3.2 MB",
    team: "Desarrollo Backend",
    personnel: "Pedro Sánchez, Elena Torres",
    project: "Plataforma E-commerce",
    format: "PDF",
  },
  {
    id: "5",
    name: "Distribución de Recursos",
    type: "Reporte de Carga de Trabajo",
    generatedDate: "2024-01-12",
    status: "completado",
    size: "1.5 MB",
    team: "Gestión de Proyectos",
    personnel: "Roberto Silva, Carmen Vega",
    project: "Campaña de Marketing",
    format: "XLSX",
  },
  {
    id: "6",
    name: "Planificación Mensual",
    type: "Reporte de Cronograma",
    generatedDate: "2024-01-10",
    status: "completado",
    size: "2.1 MB",
    team: "Operaciones",
    personnel: "Diego Morales, Sofía Ruiz",
    project: "Actualización de Infraestructura",
    format: "CSV",
  },
  {
    id: "7",
    name: "Estado de Tareas Críticas",
    type: "Reporte de Progreso de Tareas",
    generatedDate: "2024-01-07",
    status: "completado",
    size: "1.9 MB",
    team: "QA Testing",
    personnel: "Andrea Jiménez, Miguel Castro",
    project: "Sistema de Gestión",
    format: "PDF",
  },
  {
    id: "8",
    name: "Asignación de Personal",
    type: "Reporte de Carga de Trabajo",
    generatedDate: "2024-01-04",
    status: "completado",
    size: "2.7 MB",
    team: "Recursos Humanos",
    personnel: "Natalia Herrera, Javier Ortiz",
    project: "Rediseño del Sitio Web",
    format: "XLSX",
  },
]

export function ReportsGenerator() {
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedReportType, setSelectedReportType] = useState("")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [outputFormat, setOutputFormat] = useState("pdf")
  const [isGenerating, setIsGenerating] = useState(false)

  const [showAllReports, setShowAllReports] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterTeam, setFilterTeam] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      const fileName = `reporte_${selectedProject.replace(/\s+/g, "_")}_${format(new Date(), "yyyy-MM-dd")}.${outputFormat}`
      console.log("Descargando reporte:", fileName)
    }, 3000)
  }

  const filteredAndSortedReports = allReports
    .filter((report) => {
      const matchesSearch =
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.personnel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.project.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === "all" || report.type === filterType
      const matchesTeam = filterTeam === "all" || report.team === filterTeam
      return matchesSearch && matchesType && matchesTeam
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "date":
          comparison = new Date(a.generatedDate).getTime() - new Date(b.generatedDate).getTime()
          break
        case "team":
          comparison = a.team.localeCompare(b.team)
          break
        case "type":
          comparison = a.type.localeCompare(b.type)
          break
        default:
          comparison = 0
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

  const uniqueTeams = [...new Set(allReports.map((report) => report.team))]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Generación de Reportes Personalizados</h1>
          <p className="text-muted-foreground text-pretty">
            Genere y descargue reportes personalizados en diferentes formatos para análisis de datos
          </p>
        </div>
        <Dialog open={showAllReports} onOpenChange={setShowAllReports}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Ver Todos los Reportes
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Todos los Reportes</DialogTitle>
              <DialogDescription>Gestione y filtre todos los reportes generados en el sistema</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, personal o proyecto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Tipo de reporte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterTeam} onValueChange={setFilterTeam}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Equipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los equipos</SelectItem>
                    {uniqueTeams.map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Fecha</SelectItem>
                    <SelectItem value="name">Nombre</SelectItem>
                    <SelectItem value="team">Equipo</SelectItem>
                    <SelectItem value="type">Tipo</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                  <ArrowUpDown className="h-4 w-4" />
                  {sortOrder === "asc" ? "Asc" : "Desc"}
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50 sticky top-0">
                      <tr>
                        <th className="text-left p-3 font-medium">Nombre</th>
                        <th className="text-left p-3 font-medium">Tipo</th>
                        <th className="text-left p-3 font-medium">Equipo</th>
                        <th className="text-left p-3 font-medium">Personal</th>
                        <th className="text-left p-3 font-medium">Proyecto</th>
                        <th className="text-left p-3 font-medium">Fecha</th>
                        <th className="text-left p-3 font-medium">Tamaño</th>
                        <th className="text-left p-3 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSortedReports.map((report) => (
                        <tr key={report.id} className="border-t hover:bg-muted/25">
                          <td className="p-3">
                            <div className="font-medium">{report.name}</div>
                            <div className="text-sm text-muted-foreground">{report.format}</div>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline" className="text-xs">
                              {report.type.split(" ")[2]}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm">{report.team}</td>
                          <td className="p-3 text-sm">{report.personnel}</td>
                          <td className="p-3 text-sm">{report.project}</td>
                          <td className="p-3 text-sm">{format(new Date(report.generatedDate), "dd/MM/yyyy")}</td>
                          <td className="p-3 text-sm">{report.size}</td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Mostrando {filteredAndSortedReports.length} de {allReports.length} reportes
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generar Reporte</TabsTrigger>
          <TabsTrigger value="recent">Reportes Recientes</TabsTrigger>
          <TabsTrigger value="scheduled">Reportes Programados</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Reporte</CardTitle>
              <CardDescription>
                Seleccione el proyecto, tipo de reporte y parámetros para generar su informe personalizado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project">Proyecto *</Label>
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar proyecto" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project} value={project}>
                            {project}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Tipo de Reporte *</Label>
                    <RadioGroup value={selectedReportType} onValueChange={setSelectedReportType}>
                      {reportTypes.map((type) => (
                        <div key={type.id} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={type.id} id={type.id} />
                            <Label htmlFor={type.id} className="font-medium">
                              {type.name}
                            </Label>
                          </div>
                          <p className="text-sm text-muted-foreground ml-6">{type.description}</p>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Rango de Fechas</Label>
                    <div className="grid grid-cols-1 gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !dateRange.from && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange.from ? format(dateRange.from, "PPP", { locale: es }) : "Fecha de inicio"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dateRange.from}
                            onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !dateRange.to && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange.to ? format(dateRange.to, "PPP", { locale: es }) : "Fecha de finalización"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dateRange.to}
                            onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Formato de Archivo</Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">
                          <div className="flex items-center gap-2">
                            <FilePdf className="h-4 w-4" />
                            PDF
                          </div>
                        </SelectItem>
                        <SelectItem value="xlsx">
                          <div className="flex items-center gap-2">
                            <FileSpreadsheet className="h-4 w-4" />
                            XLSX
                          </div>
                        </SelectItem>
                        <SelectItem value="csv">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            CSV
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleGenerateReport}
                    disabled={!selectedProject || !selectedReportType || isGenerating}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generando Reporte...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Generar Reporte
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Reportes Recientes</CardTitle>
              <CardDescription>Descargue y gestione sus reportes generados anteriormente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{report.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{report.type}</span>
                        <span>•</span>
                        <span>Generado {format(new Date(report.generatedDate), "PPP", { locale: es })}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Completado</Badge>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Reportes Programados</CardTitle>
              <CardDescription>Configure la generación automática de reportes de forma recurrente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hay reportes programados configurados aún.</p>
                <Button className="mt-4">
                  <Target className="mr-2 h-4 w-4" />
                  Programar Nuevo Reporte
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
