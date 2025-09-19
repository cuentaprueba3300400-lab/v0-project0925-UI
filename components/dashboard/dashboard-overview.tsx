import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FolderKanban, CheckSquare, Users, Clock, AlertTriangle, Download, BarChart3, Bell } from "lucide-react"
import { PerformanceCharts } from "./performance-charts"
import { TeamProductivity } from "./team-productivity"
import { ProjectTimeline } from "./project-timeline"
import { CustomizableWidgets } from "./customizable-widgets"
import { NotificationCenter } from "./notification-center"

export function DashboardOverview() {
  const stats = [
    {
      title: "Proyectos Activos",
      value: "12",
      change: "+2 desde el mes pasado",
      icon: FolderKanban,
      color: "text-primary",
    },
    {
      title: "Tareas Completadas",
      value: "248",
      change: "+18% desde la semana pasada",
      icon: CheckSquare,
      color: "text-accent",
    },
    {
      title: "Miembros del Equipo",
      value: "24",
      change: "+3 nuevos miembros",
      icon: Users,
      color: "text-secondary",
    },
    {
      title: "Tareas Vencidas",
      value: "7",
      change: "-2 desde ayer",
      icon: AlertTriangle,
      color: "text-destructive",
    },
  ]

  const recentProjects = [
    {
      name: "Rediseño del Sitio Web",
      status: "En Progreso",
      progress: 75,
      dueDate: "2024-01-15",
      team: 5,
    },
    {
      name: "Desarrollo de App Móvil",
      status: "Planificación",
      progress: 25,
      dueDate: "2024-02-28",
      team: 8,
    },
    {
      name: "Campaña de Marketing",
      status: "Revisión",
      progress: 90,
      dueDate: "2024-01-10",
      team: 3,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">¡Bienvenido de nuevo, Juan!</h1>
          <p className="text-muted-foreground text-pretty">Esto es lo que está pasando con tus proyectos hoy.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Reporte
          </Button>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generar Reporte
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="widgets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="widgets">Panel Personalizable</TabsTrigger>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="team">Análisis del Equipo</TabsTrigger>
          <TabsTrigger value="timeline">Cronología</TabsTrigger>
        </TabsList>

        <TabsContent value="widgets">
          <CustomizableWidgets />
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proyectos Recientes</CardTitle>
              <CardDescription>Tus proyectos más activos y su estado actual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.name} className="flex items-center justify-between space-x-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{project.name}</h4>
                        <Badge
                          variant={
                            project.status === "En Progreso"
                              ? "default"
                              : project.status === "Planificación"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Vence {project.dueDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {project.team} miembros
                        </div>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="text-sm font-medium">{project.progress}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceCharts />
        </TabsContent>

        <TabsContent value="team">
          <TeamProductivity />
        </TabsContent>

        <TabsContent value="timeline">
          <ProjectTimeline />
        </TabsContent>
      </Tabs>

      <NotificationCenter />
    </div>
  )
}
