"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Target, Clock, CheckCircle } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const performanceData = [
  { month: "Jul", completed: 45, planned: 50, efficiency: 90 },
  { month: "Aug", completed: 52, planned: 55, efficiency: 95 },
  { month: "Sep", completed: 48, planned: 60, efficiency: 80 },
  { month: "Oct", completed: 61, planned: 65, efficiency: 94 },
  { month: "Nov", completed: 55, planned: 58, efficiency: 95 },
  { month: "Dec", completed: 67, planned: 70, efficiency: 96 },
]

const projectStatusData = [
  { name: "Completed", value: 45, color: "#22c55e" },
  { name: "In Progress", value: 30, color: "#3b82f6" },
  { name: "Planning", value: 15, color: "#f59e0b" },
  { name: "On Hold", value: 10, color: "#ef4444" },
]

const teamEfficiencyData = [
  { team: "Frontend", efficiency: 92, tasks: 45, completed: 41 },
  { team: "Backend", efficiency: 88, tasks: 38, completed: 33 },
  { team: "Design", efficiency: 95, tasks: 28, completed: 27 },
  { team: "QA", efficiency: 90, tasks: 32, completed: 29 },
  { team: "DevOps", efficiency: 85, tasks: 22, completed: 19 },
]

export function PerformanceCharts() {
  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return "text-green-600"
    if (efficiency >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Performance Analytics</h2>
        <Select defaultValue="6months">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(94.2, 91.5)}
              <span>+2.7% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Task Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 days</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(2.1, 2.3)}
              <span>-0.2 days improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7/10</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(8.7, 8.4)}
              <span>+0.3 points this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Velocity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67 pts</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(67, 61)}
              <span>+6 points this sprint</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Task Completion Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Task Completion Trend</CardTitle>
            <CardDescription>Monthly completed vs planned tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} name="Completed" />
                <Line type="monotone" dataKey="planned" stroke="#3b82f6" strokeWidth={2} name="Planned" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status Distribution</CardTitle>
            <CardDescription>Current status of all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {projectStatusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Efficiency */}
      <Card>
        <CardHeader>
          <CardTitle>Team Efficiency Analysis</CardTitle>
          <CardDescription>Performance metrics by team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamEfficiencyData.map((team) => (
              <div key={team.team} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{team.team} Team</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      {team.completed}/{team.tasks} tasks completed
                    </span>
                    <Badge variant="outline">{team.efficiency}% efficiency</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${getEfficiencyColor(team.efficiency)}`}>
                    {team.efficiency}%
                  </div>
                  <div className="text-sm text-muted-foreground">Efficiency</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
