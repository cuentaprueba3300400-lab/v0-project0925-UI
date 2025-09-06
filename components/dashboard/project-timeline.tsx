"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"

const timelineData = [
  {
    id: "1",
    project: "Website Redesign",
    phase: "Development",
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    progress: 75,
    status: "in-progress",
    team: 5,
    milestones: [
      { name: "Research Complete", date: "2024-01-03", completed: true },
      { name: "Design Approved", date: "2024-01-08", completed: true },
      { name: "Development Complete", date: "2024-01-12", completed: false },
      { name: "Testing & Launch", date: "2024-01-15", completed: false },
    ],
    risks: ["Resource conflict on Jan 10"],
  },
  {
    id: "2",
    project: "Mobile App Development",
    phase: "Planning",
    startDate: "2024-01-10",
    endDate: "2024-02-28",
    progress: 25,
    status: "planning",
    team: 8,
    milestones: [
      { name: "Requirements Gathering", date: "2024-01-15", completed: false },
      { name: "Architecture Design", date: "2024-01-25", completed: false },
      { name: "Development Start", date: "2024-02-01", completed: false },
      { name: "Beta Release", date: "2024-02-28", completed: false },
    ],
    risks: [],
  },
  {
    id: "3",
    project: "Marketing Campaign",
    phase: "Review",
    startDate: "2023-12-15",
    endDate: "2024-01-10",
    progress: 90,
    status: "review",
    team: 3,
    milestones: [
      { name: "Content Creation", date: "2023-12-20", completed: true },
      { name: "Design Assets", date: "2024-01-05", completed: true },
      { name: "Campaign Review", date: "2024-01-08", completed: true },
      { name: "Launch", date: "2024-01-10", completed: false },
    ],
    risks: [],
  },
]

const upcomingDeadlines = [
  { project: "Website Redesign", task: "Development Complete", date: "2024-01-12", daysLeft: 3, priority: "high" },
  { project: "Marketing Campaign", task: "Campaign Launch", date: "2024-01-10", daysLeft: 1, priority: "critical" },
  { project: "Mobile App", task: "Requirements Sign-off", date: "2024-01-15", daysLeft: 6, priority: "medium" },
]

export function ProjectTimeline() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "planning":
        return "outline"
      case "review":
        return "outline"
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
      default:
        return "outline"
    }
  }

  const getDaysLeftColor = (days: number) => {
    if (days <= 1) return "text-red-600"
    if (days <= 3) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Timeline</h2>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active Only</SelectItem>
              <SelectItem value="critical">Critical Path</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Upcoming Deadlines
          </CardTitle>
          <CardDescription>Critical tasks and milestones requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{deadline.task}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{deadline.project}</span>
                    <span>•</span>
                    <span>Due {deadline.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getPriorityColor(deadline.priority)} className="capitalize">
                    {deadline.priority}
                  </Badge>
                  <span className={`text-sm font-medium ${getDaysLeftColor(deadline.daysLeft)}`}>
                    {deadline.daysLeft} days left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Timeline */}
      <div className="space-y-4">
        {timelineData.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.project}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {project.startDate} - {project.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{project.team} members</span>
                    </div>
                    <Badge variant={getStatusColor(project.status)} className="capitalize">
                      {project.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{project.progress}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Milestones */}
              <div>
                <h4 className="font-medium mb-3">Milestones</h4>
                <div className="space-y-2">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {milestone.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                      )}
                      <div className="flex-1 flex items-center justify-between">
                        <span className={milestone.completed ? "line-through text-muted-foreground" : ""}>
                          {milestone.name}
                        </span>
                        <span className="text-sm text-muted-foreground">{milestone.date}</span>
                      </div>
                      {index < project.milestones.length - 1 && (
                        <ArrowRight className="h-3 w-3 text-muted-foreground ml-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Risks */}
              {project.risks.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 text-red-600">Identified Risks</h4>
                  <div className="space-y-1">
                    {project.risks.map((risk, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                        <span className="text-red-600">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
