"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  UserPlus,
  UserMinus,
  Target,
  Award,
  TrendingUp,
  Activity,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  skills: string[]
  efficiency: number
  tasksCompleted: number
  hoursLogged: number
  status: "active" | "busy" | "offline"
}

interface Team {
  id: string
  name: string
  description: string
  leader: string
  members: TeamMember[]
  projects: string[]
  status: "active" | "inactive"
  createdAt: string
  performance: {
    efficiency: number
    tasksCompleted: number
    activeProjects: number
    totalHours: number
  }
}

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Desarrollo Frontend",
    description: "Equipo especializado en desarrollo de interfaces de usuario y experiencia del usuario",
    leader: "Sarah Johnson",
    members: [
      {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah.johnson@empresa.com",
        role: "Team Lead",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["React", "TypeScript", "UI/UX"],
        efficiency: 92,
        tasksCompleted: 28,
        hoursLogged: 156,
        status: "active",
      },
      {
        id: "2",
        name: "John Doe",
        email: "john.doe@empresa.com",
        role: "Senior Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["React", "Next.js", "CSS"],
        efficiency: 88,
        tasksCompleted: 24,
        hoursLogged: 142,
        status: "active",
      },
      {
        id: "3",
        name: "Jane Smith",
        email: "jane.smith@empresa.com",
        role: "UI/UX Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["Figma", "Design Systems", "Prototyping"],
        efficiency: 90,
        tasksCompleted: 22,
        hoursLogged: 138,
        status: "busy",
      },
    ],
    projects: ["Website Redesign", "Mobile App", "Dashboard v2"],
    status: "active",
    createdAt: "2023-06-15",
    performance: {
      efficiency: 90,
      tasksCompleted: 74,
      activeProjects: 3,
      totalHours: 436,
    },
  },
  {
    id: "2",
    name: "Backend & DevOps",
    description: "Equipo encargado del desarrollo del servidor, APIs y infraestructura",
    leader: "Mike Wilson",
    members: [
      {
        id: "4",
        name: "Mike Wilson",
        email: "mike.wilson@empresa.com",
        role: "Team Lead",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["Node.js", "Docker", "AWS"],
        efficiency: 85,
        tasksCompleted: 31,
        hoursLogged: 168,
        status: "active",
      },
      {
        id: "5",
        name: "Lisa Chen",
        email: "lisa.chen@empresa.com",
        role: "DevOps Engineer",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["Kubernetes", "CI/CD", "Monitoring"],
        efficiency: 87,
        tasksCompleted: 19,
        hoursLogged: 128,
        status: "active",
      },
    ],
    projects: ["API Gateway", "Infrastructure Migration"],
    status: "active",
    createdAt: "2023-07-20",
    performance: {
      efficiency: 86,
      tasksCompleted: 50,
      activeProjects: 2,
      totalHours: 296,
    },
  },
  {
    id: "3",
    name: "QA & Testing",
    description: "Equipo de aseguramiento de calidad y testing automatizado",
    leader: "Ana García",
    members: [
      {
        id: "6",
        name: "Ana García",
        email: "ana.garcia@empresa.com",
        role: "QA Lead",
        avatar: "/placeholder.svg?height=40&width=40",
        skills: ["Selenium", "Jest", "Manual Testing"],
        efficiency: 94,
        tasksCompleted: 35,
        hoursLogged: 145,
        status: "active",
      },
    ],
    projects: ["Testing Automation", "Quality Assurance"],
    status: "active",
    createdAt: "2023-08-10",
    performance: {
      efficiency: 94,
      tasksCompleted: 35,
      activeProjects: 2,
      totalHours: 145,
    },
  },
]

const availableMembers: TeamMember[] = [
  {
    id: "7",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@empresa.com",
    role: "Full Stack Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["React", "Node.js", "MongoDB"],
    efficiency: 82,
    tasksCompleted: 15,
    hoursLogged: 89,
    status: "active",
  },
  {
    id: "8",
    name: "María López",
    email: "maria.lopez@empresa.com",
    role: "Data Analyst",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["Python", "SQL", "Tableau"],
    efficiency: 88,
    tasksCompleted: 12,
    hoursLogged: 76,
    status: "active",
  },
]

const teamPerformanceData = [
  { team: "Frontend", efficiency: 90, tasks: 74, hours: 436 },
  { team: "Backend", efficiency: 86, tasks: 50, hours: 296 },
  { team: "QA", efficiency: 94, tasks: 35, hours: 145 },
]

const skillsDistribution = [
  { name: "Frontend", value: 45, color: "#3b82f6" },
  { name: "Backend", value: 30, color: "#10b981" },
  { name: "QA/Testing", value: 15, color: "#f59e0b" },
  { name: "DevOps", value: 10, color: "#ef4444" },
]

export function TeamManagement() {
  const [teams, setTeams] = useState<Team[]>(mockTeams)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isCreatingTeam, setIsCreatingTeam] = useState(false)
  const [editingTeam, setEditingTeam] = useState<Team | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [isManagingMembers, setIsManagingMembers] = useState(false)
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: "",
    leader: "",
  })

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || team.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getMemberStatusColor = (status: string) => {
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

  const handleCreateTeam = () => {
    const team: Team = {
      id: Date.now().toString(),
      name: newTeam.name,
      description: newTeam.description,
      leader: newTeam.leader,
      members: [],
      projects: [],
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      performance: {
        efficiency: 0,
        tasksCompleted: 0,
        activeProjects: 0,
        totalHours: 0,
      },
    }
    setTeams([...teams, team])
    setNewTeam({ name: "", description: "", leader: "" })
    setIsCreatingTeam(false)
  }

  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter((t) => t.id !== teamId))
  }

  const handleAddMemberToTeam = (teamId: string, member: TeamMember) => {
    setTeams(teams.map((team) => (team.id === teamId ? { ...team, members: [...team.members, member] } : team)))
  }

  const handleRemoveMemberFromTeam = (teamId: string, memberId: string) => {
    setTeams(
      teams.map((team) =>
        team.id === teamId ? { ...team, members: team.members.filter((m) => m.id !== memberId) } : team,
      ),
    )
  }

  const handleEditTeam = () => {
    if (editingTeam) {
      setTeams(
        teams.map((team) =>
          team.id === editingTeam.id
            ? { ...team, name: editingTeam.name, description: editingTeam.description, leader: editingTeam.leader }
            : team,
        ),
      )
      setEditingTeam(null)
    }
  }

  const totalTeams = teams.length
  const activeTeams = teams.filter((t) => t.status === "active").length
  const totalMembers = teams.reduce((acc, team) => acc + team.members.length, 0)
  const avgEfficiency = teams.reduce((acc, team) => acc + team.performance.efficiency, 0) / teams.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Equipos</h1>
          <p className="text-muted-foreground">Administra los equipos, miembros y su rendimiento</p>
        </div>
        <Button onClick={() => setIsCreatingTeam(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Crear Equipo
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Equipos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTeams}</div>
            <p className="text-xs text-muted-foreground">{activeTeams} activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Miembros</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">En {activeTeams} equipos activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eficiencia Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgEfficiency.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">+2.5% este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teams.reduce((acc, team) => acc + team.performance.activeProjects, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Distribuidos en {activeTeams} equipos</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="teams" className="space-y-4">
        <TabsList>
          <TabsTrigger value="teams">Equipos</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
          <TabsTrigger value="members">Miembros Disponibles</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar equipos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Teams Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTeams.map((team) => (
              <Card key={team.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                      <Badge className={getStatusColor(team.status)}>
                        {team.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setEditingTeam(team)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteTeam(team.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-sm">{team.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Líder:</span>
                    <span className="font-medium">{team.leader}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Miembros:</span>
                    <span className="font-medium">{team.members.length}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Proyectos Activos:</span>
                    <span className="font-medium">{team.performance.activeProjects}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Eficiencia:</span>
                      <span className="font-medium">{team.performance.efficiency}%</span>
                    </div>
                    <Progress value={team.performance.efficiency} className="h-2" />
                  </div>

                  {/* Team Members Avatars */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Equipo:</span>
                    <div className="flex -space-x-2">
                      {team.members.slice(0, 4).map((member) => (
                        <div key={member.id} className="relative">
                          <Avatar className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback className="text-xs">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-background ${getMemberStatusColor(member.status)}`}
                          />
                        </div>
                      ))}
                      {team.members.length > 4 && (
                        <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs font-medium">+{team.members.length - 4}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Proyectos:</span>
                    <div className="flex flex-wrap gap-1">
                      {team.projects.slice(0, 2).map((project) => (
                        <Badge key={project} variant="outline" className="text-xs">
                          {project}
                        </Badge>
                      ))}
                      {team.projects.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{team.projects.length - 2} más
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        setSelectedTeam(team)
                        setIsManagingMembers(true)
                      }}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Gestionar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Team Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Equipo</CardTitle>
                <CardDescription>Eficiencia, tareas completadas y horas trabajadas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={teamPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="team" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="efficiency" fill="#3b82f6" name="Eficiencia %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skills Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Habilidades</CardTitle>
                <CardDescription>Especialización por área de conocimiento</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={skillsDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {skillsDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Mejores Equipos del Mes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teams
                  .sort((a, b) => b.performance.efficiency - a.performance.efficiency)
                  .slice(0, 3)
                  .map((team, index) => (
                    <div key={team.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{team.name}</p>
                          <p className="text-sm text-muted-foreground">{team.members.length} miembros</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{team.performance.efficiency}%</p>
                        <p className="text-sm text-muted-foreground">{team.performance.tasksCompleted} tareas</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Miembros Disponibles</CardTitle>
              <CardDescription>Personal que puede ser asignado a equipos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableMembers.map((member) => (
                  <Card key={member.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-background ${getMemberStatusColor(member.status)}`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Eficiencia:</span>
                          <span className="font-medium">{member.efficiency}%</span>
                        </div>
                        <Progress value={member.efficiency} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Team Dialog */}
      <Dialog open={isCreatingTeam} onOpenChange={setIsCreatingTeam}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Equipo</DialogTitle>
            <DialogDescription>Configura un nuevo equipo de trabajo</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="teamName">Nombre del Equipo</Label>
              <Input
                id="teamName"
                value={newTeam.name}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                placeholder="Ej: Desarrollo Frontend"
              />
            </div>
            <div>
              <Label htmlFor="teamDescription">Descripción</Label>
              <Textarea
                id="teamDescription"
                value={newTeam.description}
                onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                placeholder="Describe las responsabilidades y objetivos del equipo"
              />
            </div>
            <div>
              <Label htmlFor="teamLeader">Líder del Equipo</Label>
              <Select value={newTeam.leader} onValueChange={(value) => setNewTeam({ ...newTeam, leader: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un líder" />
                </SelectTrigger>
                <SelectContent>
                  {availableMembers.map((member) => (
                    <SelectItem key={member.id} value={member.name}>
                      {member.name} - {member.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatingTeam(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateTeam} disabled={!newTeam.name || !newTeam.description || !newTeam.leader}>
              Crear Equipo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Team Dialog */}
      <Dialog open={!!editingTeam} onOpenChange={(open) => !open && setEditingTeam(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Equipo</DialogTitle>
            <DialogDescription>Modifica la información del equipo</DialogDescription>
          </DialogHeader>
          {editingTeam && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="editTeamName">Nombre del Equipo</Label>
                <Input
                  id="editTeamName"
                  value={editingTeam.name}
                  onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                  placeholder="Ej: Desarrollo Frontend"
                />
              </div>
              <div>
                <Label htmlFor="editTeamDescription">Descripción</Label>
                <Textarea
                  id="editTeamDescription"
                  value={editingTeam.description}
                  onChange={(e) => setEditingTeam({ ...editingTeam, description: e.target.value })}
                  placeholder="Describe las responsabilidades y objetivos del equipo"
                />
              </div>
              <div>
                <Label htmlFor="editTeamLeader">Líder del Equipo</Label>
                <Select
                  value={editingTeam.leader}
                  onValueChange={(value) => setEditingTeam({ ...editingTeam, leader: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un líder" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMembers.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name} - {member.role}
                      </SelectItem>
                    ))}
                    {editingTeam.members.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name} - {member.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTeam(null)}>
              Cancelar
            </Button>
            <Button
              onClick={handleEditTeam}
              disabled={!editingTeam?.name || !editingTeam?.description || !editingTeam?.leader}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Team Members Dialog */}
      <Dialog open={isManagingMembers} onOpenChange={setIsManagingMembers}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Gestionar Miembros - {selectedTeam?.name}</DialogTitle>
            <DialogDescription>Añade o retira miembros del equipo</DialogDescription>
          </DialogHeader>
          {selectedTeam && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Current Members */}
              <div>
                <h4 className="font-medium mb-3">Miembros Actuales ({selectedTeam.members.length})</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedTeam.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMemberFromTeam(selectedTeam.id, member.id)}
                      >
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Members */}
              <div>
                <h4 className="font-medium mb-3">Miembros Disponibles</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {availableMembers
                    .filter((member) => !selectedTeam.members.some((m) => m.id === member.id))
                    .map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback className="text-xs">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAddMemberToTeam(selectedTeam.id, member)}
                        >
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsManagingMembers(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
