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
import {
  FileText,
  Download,
  CalendarIcon,
  BarChart3,
  Target,
  FileSpreadsheet,
  FilePen as FilePdf,
  Loader2,
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

export function ReportsGenerator() {
  const [selectedProject, setSelectedProject] = useState("") // Changed to single project selection
  const [selectedReportType, setSelectedReportType] = useState("")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [outputFormat, setOutputFormat] = useState("pdf")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      // Simulate file download
      const fileName = `reporte_${selectedProject.replace(/\s+/g, "_")}_${format(new Date(), "yyyy-MM-dd")}.${outputFormat}`
      console.log("Descargando reporte:", fileName)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Generación de Reportes Personalizados</h1>
          <p className="text-muted-foreground text-pretty">
            Genere y descargue reportes personalizados en diferentes formatos para análisis de datos
          </p>
        </div>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Ver Todos los Reportes
        </Button>
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
