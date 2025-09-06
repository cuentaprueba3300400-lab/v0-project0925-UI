"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GanttChart } from "./gantt-chart"
import { CriticalPathAnalysis } from "./critical-path-analysis"
import { TimelineControls } from "./timeline-controls"
import { Calendar, BarChart3, TrendingUp, Clock, AlertTriangle, CheckCircle } from "lucide-react"

const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    progress: 75,
    status: "In Progress",
  },
  {
    id: "2",
    name: "Mobile App Development",
    startDate: "2024-01-10",
    endDate: "2024-02-28",
    progress: 25,
    status: "Planning",
  },
  {
    id: "3",
    name: "Marketing Campaign",
    startDate: "2023-12-15",
    endDate: "2024-01-10",
    progress: 90,
    status: "Review",
  },
]

const ganttStats = [
  {
    title: "Active Projects",
    value: "3",
    change: "+1 this month",
    icon: BarChart3,
    color: "text-primary",
  },
  {
    title: "Critical Path Tasks",
    value: "8",
    change: "2 at risk",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    title: "On Schedule",
    value: "85%",
    change: "+5% from last week",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Avg. Completion",
    value: "63%",
    change: "+12% this month",
    icon: TrendingUp,
    color: "text-accent",
  },
]

export function GanttChartView() {
  const [selectedProject, setSelectedProject] = useState("all")
  const [timeRange, setTimeRange] = useState("month")
  const [activeTab, setActiveTab] = useState("gantt")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Project Analytics & Gantt Charts</h1>
          <p className="text-muted-foreground text-pretty">
            Visualize project timelines, dependencies, and critical paths
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Export Timeline
          </Button>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ganttStats.map((stat) => (
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

      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {mockProjects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TimelineControls />
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
          <TabsTrigger value="critical-path">Critical Path</TabsTrigger>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
        </TabsList>

        <TabsContent value="gantt">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline - Gantt Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <GanttChart selectedProject={selectedProject} timeRange={timeRange} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical-path">
          <CriticalPathAnalysis selectedProject={selectedProject} />
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Timeline Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{project.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          {project.startDate} - {project.endDate}
                        </span>
                        <Badge variant="outline">{project.status}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{project.progress}%</div>
                      <div className="text-sm text-muted-foreground">Complete</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
