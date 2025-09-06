"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  DollarSign,
  Users,
  Clock,
  Edit,
  Settings,
  Plus,
  CheckCircle,
  AlertCircle,
  Circle,
} from "lucide-react"

interface ProjectDetailsProps {
  projectId: string
}

// Mock data - in real app this would come from API
const mockProject = {
  id: "1",
  name: "Website Redesign",
  description:
    "Complete overhaul of company website with modern design and improved UX. This project includes user research, wireframing, design system creation, and full development implementation.",
  status: "In Progress",
  priority: "High",
  progress: 75,
  startDate: "2024-01-01",
  endDate: "2024-01-15",
  budget: 50000,
  spent: 37500,
  manager: "Sarah Johnson",
  teamMembers: [
    { id: "1", name: "Sarah Johnson", role: "Project Manager", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "2", name: "John Doe", role: "UI/UX Designer", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "3", name: "Jane Smith", role: "Frontend Developer", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "4", name: "Mike Wilson", role: "Backend Developer", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "5", name: "Lisa Chen", role: "QA Engineer", avatar: "/placeholder.svg?height=32&width=32" },
  ],
  tasks: [
    { id: "1", title: "User Research & Analysis", status: "completed", assignee: "John Doe", dueDate: "2024-01-03" },
    { id: "2", title: "Wireframe Creation", status: "completed", assignee: "John Doe", dueDate: "2024-01-05" },
    { id: "3", title: "Design System Setup", status: "in-progress", assignee: "John Doe", dueDate: "2024-01-08" },
    { id: "4", title: "Homepage Development", status: "in-progress", assignee: "Jane Smith", dueDate: "2024-01-10" },
    { id: "5", title: "Backend API Integration", status: "pending", assignee: "Mike Wilson", dueDate: "2024-01-12" },
    { id: "6", title: "Testing & QA", status: "pending", assignee: "Lisa Chen", dueDate: "2024-01-14" },
  ],
  milestones: [
    { id: "1", title: "Research Phase Complete", date: "2024-01-03", completed: true },
    { id: "2", title: "Design Phase Complete", date: "2024-01-08", completed: false },
    { id: "3", title: "Development Phase Complete", date: "2024-01-12", completed: false },
    { id: "4", title: "Project Launch", date: "2024-01-15", completed: false },
  ],
}

export function ProjectDetails({ projectId }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const project = mockProject // In real app, fetch by projectId

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "pending":
        return <Circle className="h-4 w-4 text-gray-400" />
      default:
        return <Circle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "default"
      case "Planning":
        return "secondary"
      case "Review":
        return "outline"
      case "Completed":
        return "default"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive"
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <a href="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </a>
        </Button>
      </div>

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-balance">{project.name}</h1>
            <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
            <Badge variant={getPriorityColor(project.priority)}>{project.priority}</Badge>
          </div>
          <p className="text-muted-foreground text-pretty max-w-2xl">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Project
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Circle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <Progress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${project.spent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">of ${project.budget.toLocaleString()} budget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">active members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Left</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">until {project.endDate}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Start Date</span>
                  <span className="font-medium">{project.startDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">End Date</span>
                  <span className="font-medium">{project.endDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="font-medium">15 days</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Design system updated</p>
                  <p className="text-muted-foreground">2 hours ago by John Doe</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Homepage wireframes completed</p>
                  <p className="text-muted-foreground">1 day ago by John Doe</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">User research findings shared</p>
                  <p className="text-muted-foreground">2 days ago by Sarah Johnson</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Project Tasks</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
          <div className="space-y-2">
            {project.tasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Assigned to {task.assignee} • Due {task.dueDate}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {task.status.replace("-", " ")}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Team Members</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="flex items-center gap-3 p-4">
                  <Avatar>
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Project Milestones</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Milestone
            </Button>
          </div>
          <div className="space-y-2">
            {project.milestones.map((milestone) => (
              <Card key={milestone.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    {milestone.completed ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-400" />
                    )}
                    <div>
                      <p className="font-medium">{milestone.title}</p>
                      <p className="text-sm text-muted-foreground">Due {milestone.date}</p>
                    </div>
                  </div>
                  <Badge variant={milestone.completed ? "default" : "outline"}>
                    {milestone.completed ? "Completed" : "Pending"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
