"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Clock, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"

interface CriticalPathAnalysisProps {
  selectedProject: string
}

const criticalPathData = {
  "1": {
    projectName: "Website Redesign",
    totalDuration: 15,
    criticalPath: [
      {
        id: "1",
        name: "User Research & Analysis",
        duration: 3,
        startDate: "2024-01-01",
        endDate: "2024-01-03",
        status: "completed",
        risk: "low",
      },
      {
        id: "2",
        name: "Wireframe Creation",
        duration: 2,
        startDate: "2024-01-03",
        endDate: "2024-01-05",
        status: "completed",
        risk: "low",
      },
      {
        id: "3",
        name: "Design System Setup",
        duration: 3,
        startDate: "2024-01-05",
        endDate: "2024-01-08",
        status: "in-progress",
        risk: "medium",
      },
      {
        id: "4",
        name: "Homepage Development",
        duration: 4,
        startDate: "2024-01-08",
        endDate: "2024-01-12",
        status: "in-progress",
        risk: "high",
      },
      {
        id: "6",
        name: "Testing & QA",
        duration: 3,
        startDate: "2024-01-12",
        endDate: "2024-01-15",
        status: "pending",
        risk: "medium",
      },
    ],
    risks: [
      {
        task: "Homepage Development",
        issue: "Resource allocation conflict",
        impact: "2 days delay",
        mitigation: "Assign additional developer",
      },
      {
        task: "Design System Setup",
        issue: "Dependency on external library",
        impact: "1 day delay",
        mitigation: "Prepare fallback solution",
      },
    ],
  },
  all: {
    projectName: "All Projects",
    totalDuration: 45,
    criticalPath: [
      {
        id: "1",
        name: "Website Redesign - Critical Path",
        duration: 15,
        startDate: "2024-01-01",
        endDate: "2024-01-15",
        status: "in-progress",
        risk: "medium",
      },
      {
        id: "7",
        name: "Mobile App - Architecture",
        duration: 5,
        startDate: "2024-01-10",
        endDate: "2024-01-15",
        status: "in-progress",
        risk: "high",
      },
    ],
    risks: [
      {
        task: "Cross-project Resource Sharing",
        issue: "Team members allocated to multiple projects",
        impact: "3-5 days delay across projects",
        mitigation: "Prioritize critical path tasks",
      },
    ],
  },
}

export function CriticalPathAnalysis({ selectedProject }: CriticalPathAnalysisProps) {
  const data = criticalPathData[selectedProject as keyof typeof criticalPathData] || criticalPathData["1"]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-primary" />
      case "pending":
        return <Clock className="h-4 w-4 text-gray-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const completedTasks = data.criticalPath.filter((task) => task.status === "completed").length
  const progressPercentage = (completedTasks / data.criticalPath.length) * 100

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Path Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalDuration} days</div>
            <p className="text-xs text-muted-foreground">Total project timeline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Path Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
            <Progress value={progressPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">Medium</div>
            <p className="text-xs text-muted-foreground">{data.risks.length} identified risks</p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Path Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Critical Path - {data.projectName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.criticalPath.map((task, index) => (
              <div key={task.id} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(task.status)}
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{task.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>
                          {task.startDate} - {task.endDate}
                        </span>
                        <span>•</span>
                        <span>{task.duration} days</span>
                      </div>
                    </div>
                    <Badge variant={getRiskColor(task.risk)} className="capitalize">
                      {task.risk} Risk
                    </Badge>
                  </div>
                </div>

                {index < data.criticalPath.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Risk Analysis & Mitigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.risks.map((risk, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-destructive">{risk.task}</h4>
                  <Badge variant="destructive">High Impact</Badge>
                </div>
                <div className="grid gap-2 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Issue: </span>
                    <span>{risk.issue}</span>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Impact: </span>
                    <span className="text-destructive">{risk.impact}</span>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Mitigation: </span>
                    <span className="text-green-600">{risk.mitigation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
