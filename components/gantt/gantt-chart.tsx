"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ZoomIn, ZoomOut, Info } from "lucide-react"

interface GanttChartProps {
  selectedProject: string
  timeRange: string
}

const mockTasks = [
  {
    id: "1",
    name: "User Research & Analysis",
    project: "Website Redesign",
    projectId: "1",
    startDate: "2024-01-01",
    endDate: "2024-01-03",
    progress: 100,
    dependencies: [],
    assignee: "John Doe",
    priority: "high",
    status: "completed",
    isCriticalPath: true,
    description: "Conduct comprehensive user research to understand current pain points and requirements.",
    resources: ["Research Tools", "Survey Platform"],
  },
  {
    id: "2",
    name: "Wireframe Creation",
    project: "Website Redesign",
    projectId: "1",
    startDate: "2024-01-03",
    endDate: "2024-01-05",
    progress: 100,
    dependencies: ["1"],
    assignee: "John Doe",
    priority: "high",
    status: "completed",
    isCriticalPath: true,
    description: "Create detailed wireframes based on research findings.",
    resources: ["Figma", "Design System"],
  },
  {
    id: "3",
    name: "Design System Setup",
    project: "Website Redesign",
    projectId: "1",
    startDate: "2024-01-05",
    endDate: "2024-01-08",
    progress: 75,
    dependencies: ["2"],
    assignee: "John Doe",
    priority: "medium",
    status: "in-progress",
    isCriticalPath: false,
    description: "Establish comprehensive design system with components and guidelines.",
    resources: ["Figma", "Storybook"],
  },
  {
    id: "4",
    name: "Homepage Development",
    project: "Website Redesign",
    projectId: "1",
    startDate: "2024-01-08",
    endDate: "2024-01-12",
    progress: 40,
    dependencies: ["3"],
    assignee: "Jane Smith",
    priority: "high",
    status: "in-progress",
    isCriticalPath: true,
    description: "Develop responsive homepage with modern design and optimized performance.",
    resources: ["React", "Tailwind CSS", "Next.js"],
  },
  {
    id: "5",
    name: "Backend Integration",
    project: "Website Redesign",
    projectId: "1",
    startDate: "2024-01-10",
    endDate: "2024-01-14",
    progress: 0,
    dependencies: ["4"],
    assignee: "Mike Wilson",
    priority: "critical",
    status: "pending",
    isCriticalPath: true,
    description: "Integrate frontend with backend APIs and database connections.",
    resources: ["Node.js", "Database", "API Gateway"],
  },
  {
    id: "6",
    name: "Testing & QA",
    project: "Website Redesign",
    projectId: "1",
    startDate: "2024-01-12",
    endDate: "2024-01-15",
    progress: 0,
    dependencies: ["4", "5"],
    assignee: "Lisa Chen",
    priority: "high",
    status: "pending",
    isCriticalPath: true,
    description: "Comprehensive testing including unit, integration, and user acceptance testing.",
    resources: ["Jest", "Cypress", "Testing Environment"],
  },
]

export function GanttChart({ selectedProject, timeRange }: GanttChartProps) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)

  const filteredTasks = useMemo(() => {
    if (selectedProject === "all") return mockTasks
    return mockTasks.filter((task) => task.projectId === selectedProject)
  }, [selectedProject])

  const dateRange = useMemo(() => {
    const start = new Date("2024-01-01")
    const end = new Date("2024-01-31")
    const dates = []
    const current = new Date(start)
    const step = Math.max(1, Math.floor(3 / zoomLevel))

    while (current <= end) {
      dates.push(new Date(current))
      current.setDate(current.getDate() + step)
    }
    return dates
  }, [zoomLevel])

  const getTaskPosition = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const rangeStart = new Date("2024-01-01")
    const rangeEnd = new Date("2024-01-31")

    const totalDays = (rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24)
    const startOffset = (start.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24)
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)

    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`,
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "border-l-destructive"
      case "high":
        return "border-l-orange-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-400"
    }
  }

  const getStatusColor = (status: string, isCriticalPath: boolean) => {
    console.log("[v0] Task status:", status, "Critical path:", isCriticalPath)

    if (isCriticalPath) {
      switch (status) {
        case "completed":
          return "!bg-green-700 border-2 !border-green-600"
        case "in-progress":
          return "!bg-red-700 border-2 !border-red-600"
        case "pending":
          return "!bg-red-600 border-2 !border-red-500"
        default:
          return "!bg-red-600 border-2 !border-red-500"
      }
    }

    switch (status) {
      case "completed":
        return "!bg-green-700"
      case "in-progress":
        return "!bg-blue-700"
      case "pending":
        return "!bg-gray-600"
      default:
        return "!bg-gray-600"
    }
  }

  const renderDependencyLines = () => {
    return filteredTasks.map((task) => {
      return task.dependencies.map((depId) => {
        const depTask = filteredTasks.find((t) => t.id === depId)
        if (!depTask) return null

        const taskIndex = filteredTasks.findIndex((t) => t.id === task.id)
        const depIndex = filteredTasks.findIndex((t) => t.id === depId)

        return (
          <svg key={`${depId}-${task.id}`} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            <line
              x1="75%"
              y1={`${(depIndex + 0.5) * 68 + 32}px`}
              x2="25%"
              y2={`${(taskIndex + 0.5) * 68 + 32}px`}
              stroke={task.isCriticalPath && depTask.isCriticalPath ? "#ef4444" : "#6b7280"}
              strokeWidth={task.isCriticalPath && depTask.isCriticalPath ? "3" : "2"}
              strokeDasharray={task.isCriticalPath && depTask.isCriticalPath ? "none" : "5,5"}
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill={task.isCriticalPath && depTask.isCriticalPath ? "#ef4444" : "#6b7280"}
                />
              </marker>
            </defs>
          </svg>
        )
      })
    })
  }

  const selectedTaskData = selectedTask ? filteredTasks.find((t) => t.id === selectedTask) : null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.5))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.5))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">Zoom: {zoomLevel}x</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 bg-red-700 border border-red-600 rounded" />
            <span>Critical Path Tasks</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          {/* Timeline Header */}
          <div className="flex">
            <div className="w-80 flex-shrink-0 p-4 font-medium border-r bg-muted/50">
              <div className="flex items-center gap-2">
                Task Name
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="flex border-b bg-muted/50">
                {dateRange.map((date) => (
                  <div key={date.toISOString()} className="flex-1 p-2 text-center text-sm border-r">
                    {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tasks with dependency lines */}
          <div className="relative">
            {renderDependencyLines()}
            <div className="space-y-1">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center hover:bg-muted/50 rounded cursor-pointer transition-colors ${
                    selectedTask === task.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                >
                  <div
                    className={`w-80 flex-shrink-0 p-4 border-r border-l-4 ${getPriorityColor(task.priority)} ${
                      task.isCriticalPath ? "!bg-red-200 !border-l-red-800" : ""
                    }`}
                  >
                    <div className="space-y-1">
                      <div
                        className={`font-medium text-sm flex items-center gap-2 ${
                          task.isCriticalPath ? "!text-red-950" : "text-foreground"
                        }`}
                      >
                        {task.name}
                        {task.isCriticalPath && (
                          <span className="inline-flex items-center rounded-md bg-red-800 px-2 py-1 text-xs font-medium text-white">
                            Critical
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs border-gray-400 text-gray-700">
                          {task.assignee}
                        </Badge>
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                            task.status === "completed"
                              ? "bg-green-800 text-white"
                              : task.status === "in-progress"
                                ? "bg-blue-800 text-white"
                                : "bg-gray-600 text-white"
                          }`}
                        >
                          {task.status.replace("-", " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 relative h-16 p-2">
                    <div
                      className={`absolute top-2 h-8 rounded flex items-center px-2 shadow-sm transition-all ${getStatusColor(
                        task.status,
                        task.isCriticalPath,
                      )} ${task.isCriticalPath ? "shadow-lg" : ""}`}
                      style={getTaskPosition(task.startDate, task.endDate)}
                    >
                      <div className="text-xs font-medium truncate !text-white">{task.progress}%</div>
                      {task.progress > 0 && task.progress < 100 && (
                        <div className="absolute inset-0 rounded overflow-hidden">
                          <div
                            className="h-full bg-white/20"
                            style={{ width: `${100 - task.progress}%`, marginLeft: `${task.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-700 rounded" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-700 rounded" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-600 rounded" />
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-red-700 border border-red-600 rounded" />
              <span>Critical Path Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="8">
                <line x1="0" y1="4" x2="20" y2="4" stroke="#ef4444" strokeWidth="2" />
              </svg>
              <span>Critical Dependencies</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="8">
                <line x1="0" y1="4" x2="20" y2="4" stroke="#6b7280" strokeWidth="2" strokeDasharray="3,3" />
              </svg>
              <span>Regular Dependencies</span>
            </div>
          </div>
        </div>

        {selectedTaskData && (
          <Card className="w-80 flex-shrink-0">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                {selectedTaskData.name}
                {selectedTaskData.isCriticalPath && (
                  <Badge variant="destructive" className="text-xs">
                    Critical Path
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedTaskData.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-1">Timeline</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedTaskData.startDate).toLocaleDateString()} -{" "}
                  {new Date(selectedTaskData.endDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-1">Progress</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${selectedTaskData.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{selectedTaskData.progress}%</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-1">Resources</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedTaskData.resources.map((resource) => (
                    <Badge key={resource} variant="outline" className="text-xs">
                      {resource}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-1">Assignee</h4>
                <Badge variant="secondary">{selectedTaskData.assignee}</Badge>
              </div>

              {selectedTaskData.dependencies.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-1">Dependencies</h4>
                  <div className="space-y-1">
                    {selectedTaskData.dependencies.map((depId) => {
                      const depTask = filteredTasks.find((t) => t.id === depId)
                      return depTask ? (
                        <div key={depId} className="text-sm text-muted-foreground">
                          • {depTask.name}
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
