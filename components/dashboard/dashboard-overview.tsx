import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FolderKanban, CheckSquare, Users, Clock, AlertTriangle, Download, BarChart3 } from "lucide-react"
import { PerformanceCharts } from "./performance-charts"
import { TeamProductivity } from "./team-productivity"
import { ProjectTimeline } from "./project-timeline"

export function DashboardOverview() {
  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 from last month",
      icon: FolderKanban,
      color: "text-primary",
    },
    {
      title: "Completed Tasks",
      value: "248",
      change: "+18% from last week",
      icon: CheckSquare,
      color: "text-accent",
    },
    {
      title: "Team Members",
      value: "24",
      change: "+3 new members",
      icon: Users,
      color: "text-secondary",
    },
    {
      title: "Overdue Tasks",
      value: "7",
      change: "-2 from yesterday",
      icon: AlertTriangle,
      color: "text-destructive",
    },
  ]

  const recentProjects = [
    {
      name: "Website Redesign",
      status: "In Progress",
      progress: 75,
      dueDate: "2024-01-15",
      team: 5,
    },
    {
      name: "Mobile App Development",
      status: "Planning",
      progress: 25,
      dueDate: "2024-02-28",
      team: 8,
    },
    {
      name: "Marketing Campaign",
      status: "Review",
      progress: 90,
      dueDate: "2024-01-10",
      team: 3,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Welcome back, John!</h1>
          <p className="text-muted-foreground text-pretty">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
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

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="team">Team Analytics</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your most active projects and their current status</CardDescription>
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
                            project.status === "In Progress"
                              ? "default"
                              : project.status === "Planning"
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
                          Due {project.dueDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {project.team} members
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
    </div>
  )
}
