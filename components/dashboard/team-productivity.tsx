"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Clock, CheckSquare, Award, Target } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const teamMembers = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 28,
    tasksAssigned: 32,
    efficiency: 87.5,
    hoursLogged: 156,
    status: "active",
    currentProject: "Website Redesign",
  },
  {
    id: "2",
    name: "John Doe",
    role: "UI/UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 24,
    tasksAssigned: 26,
    efficiency: 92.3,
    hoursLogged: 142,
    status: "active",
    currentProject: "Mobile App",
  },
  {
    id: "3",
    name: "Jane Smith",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 31,
    tasksAssigned: 35,
    efficiency: 88.6,
    hoursLogged: 168,
    status: "active",
    currentProject: "Website Redesign",
  },
  {
    id: "4",
    name: "Mike Wilson",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 22,
    tasksAssigned: 28,
    efficiency: 78.6,
    hoursLogged: 134,
    status: "busy",
    currentProject: "Mobile App",
  },
  {
    id: "5",
    name: "Lisa Chen",
    role: "QA Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    tasksCompleted: 19,
    tasksAssigned: 21,
    efficiency: 90.5,
    hoursLogged: 128,
    status: "active",
    currentProject: "Marketing Campaign",
  },
]

const weeklyProductivity = [
  { week: "Week 1", tasks: 45, hours: 320 },
  { week: "Week 2", tasks: 52, hours: 340 },
  { week: "Week 3", tasks: 48, hours: 315 },
  { week: "Week 4", tasks: 58, hours: 365 },
]

const topPerformers = [
  { name: "John Doe", metric: "Efficiency", value: "92.3%", change: "+2.1%" },
  { name: "Lisa Chen", metric: "Quality Score", value: "9.2/10", change: "+0.5" },
  { name: "Jane Smith", metric: "Task Velocity", value: "31 tasks", change: "+4" },
]

export function TeamProductivity() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-600"
    if (efficiency >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Team Analytics</h2>
        <div className="flex gap-2">
          <Select defaultValue="thismonth">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisweek">This Week</SelectItem>
              <SelectItem value="thismonth">This Month</SelectItem>
              <SelectItem value="thisquarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Team Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Efficiency</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">+3.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,340h</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">203</div>
            <p className="text-xs text-muted-foreground">+15% this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Weekly Productivity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Productivity</CardTitle>
            <CardDescription>Tasks completed and hours logged per week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyProductivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#3b82f6" name="Tasks Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Top Performers
            </CardTitle>
            <CardDescription>Outstanding team members this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={performer.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{performer.name}</p>
                      <p className="text-sm text-muted-foreground">{performer.metric}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{performer.value}</p>
                    <p className="text-sm text-green-600">{performer.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members Performance</CardTitle>
          <CardDescription>Individual performance metrics and current assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {member.currentProject}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{member.hoursLogged}h logged</span>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-medium">{member.tasksCompleted}</span>
                      <span className="text-muted-foreground">/{member.tasksAssigned} tasks</span>
                    </div>
                    <div className={`text-sm font-semibold ${getEfficiencyColor(member.efficiency)}`}>
                      {member.efficiency}%
                    </div>
                  </div>
                  <Progress value={(member.tasksCompleted / member.tasksAssigned) * 100} className="w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
