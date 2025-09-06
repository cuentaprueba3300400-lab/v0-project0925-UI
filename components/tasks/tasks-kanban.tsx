"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Clock, Flag, User } from "lucide-react"

interface TasksKanbanProps {
  searchTerm: string
  priorityFilter: string
  projectFilter: string
  assigneeFilter: string
}

const mockTasks = [
  {
    id: "1",
    title: "Design homepage wireframes",
    description: "Create detailed wireframes for the new homepage layout",
    status: "in-progress",
    priority: "high",
    project: "Website Redesign",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "john-doe",
    },
    dueDate: "2024-01-08",
    estimatedHours: 8,
    completedHours: 5,
  },
  {
    id: "2",
    title: "User research analysis",
    description: "Analyze user feedback and research data",
    status: "completed",
    priority: "medium",
    project: "Website Redesign",
    assignee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "jane-smith",
    },
    dueDate: "2024-01-05",
    estimatedHours: 12,
    completedHours: 12,
  },
  {
    id: "3",
    title: "API endpoint development",
    description: "Develop REST API endpoints for user authentication",
    status: "todo",
    priority: "critical",
    project: "Mobile App",
    assignee: {
      name: "Mike Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "mike-wilson",
    },
    dueDate: "2024-01-12",
    estimatedHours: 16,
    completedHours: 0,
  },
  {
    id: "4",
    title: "Database schema design",
    description: "Design and implement database schema",
    status: "in-progress",
    priority: "high",
    project: "Mobile App",
    assignee: {
      name: "Lisa Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "lisa-chen",
    },
    dueDate: "2024-01-10",
    estimatedHours: 10,
    completedHours: 6,
  },
  {
    id: "5",
    title: "Marketing content creation",
    description: "Create engaging content for social media",
    status: "review",
    priority: "medium",
    project: "Marketing Campaign",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "john-doe",
    },
    dueDate: "2024-01-09",
    estimatedHours: 6,
    completedHours: 6,
  },
  {
    id: "6",
    title: "Mobile UI components",
    description: "Build reusable UI components for mobile app",
    status: "todo",
    priority: "medium",
    project: "Mobile App",
    assignee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "jane-smith",
    },
    dueDate: "2024-01-15",
    estimatedHours: 14,
    completedHours: 0,
  },
]

const columns = [
  { id: "todo", title: "To Do", status: "todo" },
  { id: "in-progress", title: "In Progress", status: "in-progress" },
  { id: "review", title: "In Review", status: "review" },
  { id: "completed", title: "Completed", status: "completed" },
]

export function TasksKanban({ searchTerm, priorityFilter, projectFilter, assigneeFilter }: TasksKanbanProps) {
  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    const matchesProject = projectFilter === "all" || task.project.toLowerCase().replace(/\s+/g, "-") === projectFilter
    const matchesAssignee = assigneeFilter === "all" || task.assignee.id === assigneeFilter

    return matchesSearch && matchesPriority && matchesProject && matchesAssignee
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter((task) => task.status === status)
  }

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== "completed"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-300px)]">
      {columns.map((column) => {
        const tasks = getTasksByStatus(column.status)
        return (
          <div key={column.id} className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">{column.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {tasks.length}
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto">
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow ${
                    isOverdue(task.dueDate, task.status) ? "border-destructive/50" : ""
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium leading-tight">{task.title}</CardTitle>
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs ml-2">
                        <Flag className="mr-1 h-2 w-2" />
                        {task.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Due {task.dueDate}</span>
                        {isOverdue(task.dueDate, task.status) && (
                          <Badge variant="destructive" className="text-xs ml-1">
                            Overdue
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          {task.completedHours}h / {task.estimatedHours}h
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {task.project}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                          <AvatarFallback className="text-xs">
                            {task.assignee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    {task.status === "in-progress" && (
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all"
                          style={{
                            width: `${(task.completedHours / task.estimatedHours) * 100}%`,
                          }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {tasks.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">No tasks in this column</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
