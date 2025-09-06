"use client"

import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"

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
  },
  {
    id: "7",
    name: "App Architecture",
    project: "Mobile App Development",
    projectId: "2",
    startDate: "2024-01-10",
    endDate: "2024-01-15",
    progress: 60,
    dependencies: [],
    assignee: "Mike Wilson",
    priority: "critical",
    status: "in-progress",
  },
  {
    id: "8",
    name: "UI Components",
    project: "Mobile App Development",
    projectId: "2",
    startDate: "2024-01-15",
    endDate: "2024-01-25",
    progress: 20,
    dependencies: ["7"],
    assignee: "Jane Smith",
    priority: "high",
    status: "in-progress",
  },
]

export function GanttChart({ selectedProject, timeRange }: GanttChartProps) {
  const filteredTasks = useMemo(() => {
    if (selectedProject === "all") return mockTasks
    return mockTasks.filter((task) => task.projectId === selectedProject)
  }, [selectedProject])

  // Generate date range for timeline
  const dateRange = useMemo(() => {
    const start = new Date("2024-01-01")
    const end = new Date("2024-01-31")
    const dates = []
    const current = new Date(start)

    while (current <= end) {
      dates.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    return dates
  }, [])

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-primary"
      case "pending":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
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

  return (
    <div className="space-y-4">
      {/* Timeline Header */}
      <div className="flex">
        <div className="w-80 flex-shrink-0 p-4 font-medium border-r">Task Name</div>
        <div className="flex-1 relative">
          <div className="flex border-b">
            {dateRange
              .filter((_, index) => index % 2 === 0)
              .map((date) => (
                <div key={date.toISOString()} className="flex-1 p-2 text-center text-sm border-r">
                  {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-1">
        {filteredTasks.map((task) => (
          <div key={task.id} className="flex items-center hover:bg-muted/50 rounded">
            <div className={`w-80 flex-shrink-0 p-4 border-r border-l-4 ${getPriorityColor(task.priority)}`}>
              <div className="space-y-1">
                <div className="font-medium text-sm">{task.name}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {task.assignee}
                  </Badge>
                  <Badge
                    variant={
                      task.status === "completed" ? "default" : task.status === "in-progress" ? "secondary" : "outline"
                    }
                    className="text-xs"
                  >
                    {task.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex-1 relative h-16 p-2">
              <div
                className={`absolute top-2 h-8 rounded ${getStatusColor(task.status)} flex items-center px-2 shadow-sm`}
                style={getTaskPosition(task.startDate, task.endDate)}
              >
                <div className="text-white text-xs font-medium truncate">{task.progress}%</div>
                {task.progress > 0 && task.progress < 100 && (
                  <div className="absolute inset-0 rounded overflow-hidden">
                    <div
                      className="h-full bg-white/20"
                      style={{ width: `${100 - task.progress}%`, marginLeft: `${task.progress}%` }}
                    />
                  </div>
                )}
              </div>
              {/* Dependencies lines would be drawn here in a real implementation */}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 pt-4 border-t text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded" />
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded" />
          <span>Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-2 border-l-4 border-l-destructive" />
          <span>Critical Priority</span>
        </div>
      </div>
    </div>
  )
}
