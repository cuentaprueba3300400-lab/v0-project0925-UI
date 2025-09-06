"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Clock, MoreHorizontal, Edit, Trash2, Eye, Link, Flag, User } from "lucide-react"

interface TasksListProps {
  searchTerm: string
  statusFilter: string
  priorityFilter: string
  projectFilter: string
  assigneeFilter: string
}

const mockTasks = [
  {
    id: "1",
    title: "Design homepage wireframes",
    description: "Create detailed wireframes for the new homepage layout including mobile responsive design",
    status: "in-progress",
    priority: "high",
    project: "Website Redesign",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "john-doe",
    },
    dueDate: "2024-01-08",
    createdDate: "2024-01-01",
    dependencies: ["2"],
    tags: ["design", "ui/ux"],
    estimatedHours: 8,
    completedHours: 5,
  },
  {
    id: "2",
    title: "User research analysis",
    description: "Analyze user feedback and research data to inform design decisions",
    status: "completed",
    priority: "medium",
    project: "Website Redesign",
    assignee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "jane-smith",
    },
    dueDate: "2024-01-05",
    createdDate: "2023-12-28",
    dependencies: [],
    tags: ["research", "analysis"],
    estimatedHours: 12,
    completedHours: 12,
  },
  {
    id: "3",
    title: "API endpoint development",
    description: "Develop REST API endpoints for user authentication and data management",
    status: "todo",
    priority: "critical",
    project: "Mobile App",
    assignee: {
      name: "Mike Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "mike-wilson",
    },
    dueDate: "2024-01-12",
    createdDate: "2024-01-02",
    dependencies: ["4"],
    tags: ["backend", "api"],
    estimatedHours: 16,
    completedHours: 0,
  },
  {
    id: "4",
    title: "Database schema design",
    description: "Design and implement database schema for the mobile application",
    status: "in-progress",
    priority: "high",
    project: "Mobile App",
    assignee: {
      name: "Lisa Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "lisa-chen",
    },
    dueDate: "2024-01-10",
    createdDate: "2024-01-01",
    dependencies: [],
    tags: ["database", "backend"],
    estimatedHours: 10,
    completedHours: 6,
  },
  {
    id: "5",
    title: "Marketing content creation",
    description: "Create engaging content for social media marketing campaign",
    status: "review",
    priority: "medium",
    project: "Marketing Campaign",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      id: "john-doe",
    },
    dueDate: "2024-01-09",
    createdDate: "2024-01-03",
    dependencies: [],
    tags: ["marketing", "content"],
    estimatedHours: 6,
    completedHours: 6,
  },
]

export function TasksList({ searchTerm, statusFilter, priorityFilter, projectFilter, assigneeFilter }: TasksListProps) {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    const matchesProject = projectFilter === "all" || task.project.toLowerCase().replace(/\s+/g, "-") === projectFilter
    const matchesAssignee = assigneeFilter === "all" || task.assignee.id === assigneeFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesProject && matchesAssignee
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "review":
        return "outline"
      case "todo":
        return "secondary"
      default:
        return "secondary"
    }
  }

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✓"
      case "in-progress":
        return "⏳"
      case "review":
        return "👁"
      case "todo":
        return "○"
      default:
        return "○"
    }
  }

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const isOverdue = (dueDate: string) => {
    return (
      new Date(dueDate) < new Date() &&
      !["completed"].includes(mockTasks.find((t) => t.dueDate === dueDate)?.status || "")
    )
  }

  return (
    <div className="space-y-4">
      {selectedTasks.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">{selectedTasks.length} tasks selected</span>
          <Button variant="outline" size="sm">
            Bulk Edit
          </Button>
          <Button variant="outline" size="sm">
            Mark Complete
          </Button>
          <Button variant="outline" size="sm">
            Delete
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className={`hover:shadow-md transition-shadow ${isOverdue(task.dueDate) ? "border-destructive/50" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={selectedTasks.includes(task.id)}
                  onCheckedChange={() => toggleTaskSelection(task.id)}
                  className="mt-1"
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getStatusIcon(task.status)}</span>
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                        {isOverdue(task.dueDate) && (
                          <Badge variant="destructive" className="text-xs">
                            Overdue
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{task.description}</p>
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
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Task
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link className="mr-2 h-4 w-4" />
                          Manage Dependencies
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(task.status)} className="capitalize">
                        {task.status.replace("-", " ")}
                      </Badge>
                      <Badge variant={getPriorityColor(task.priority)} className="capitalize">
                        <Flag className="mr-1 h-3 w-3" />
                        {task.priority}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Due {task.dueDate}</span>
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {task.completedHours}h / {task.estimatedHours}h
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                        <AvatarFallback className="text-xs">
                          {task.assignee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{task.assignee.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Project:</span>
                      <Badge variant="outline" className="text-xs">
                        {task.project}
                      </Badge>
                      {task.dependencies.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <Link className="mr-1 h-3 w-3" />
                          {task.dependencies.length} dependencies
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tasks found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
