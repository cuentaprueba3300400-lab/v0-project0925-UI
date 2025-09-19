"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Settings, CheckCircle, AlertTriangle, UserPlus, Clock, X, ExternalLink } from "lucide-react"

interface Notification {
  id: string
  type: "critical" | "status" | "assignment" | "info"
  title: string
  message: string
  timestamp: string
  read: boolean
  project?: string
  taskId?: string
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "critical",
      title: "Tarea Crítica Vencida",
      message: "La tarea 'Diseño de UI' en el proyecto 'App Móvil' ha vencido y está en la ruta crítica",
      timestamp: "Hace 5 minutos",
      read: false,
      project: "App Móvil",
      taskId: "task-123",
    },
    {
      id: "2",
      type: "status",
      title: "Tarea Completada",
      message: "María completó la tarea 'Investigación de mercado'",
      timestamp: "Hace 1 hora",
      read: false,
      project: "Marketing Campaign",
      taskId: "task-456",
    },
    {
      id: "3",
      type: "assignment",
      title: "Nueva Asignación",
      message: "Te han asignado la tarea 'Desarrollo Backend' en el proyecto 'Website Redesign'",
      timestamp: "Hace 2 horas",
      read: true,
      project: "Website Redesign",
      taskId: "task-789",
    },
    {
      id: "4",
      type: "critical",
      title: "Presupuesto Crítico",
      message: "El proyecto 'E-commerce' ha excedido el 95% del presupuesto asignado",
      timestamp: "Hace 3 horas",
      read: true,
      project: "E-commerce",
    },
  ])

  const [settings, setSettings] = useState({
    taskDeadlines: true,
    taskCompletions: true,
    assignments: true,
    budgetAlerts: true,
    teamUpdates: true,
    projectMilestones: true,
    emailFrequency: "immediate",
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "status":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "assignment":
        return <UserPlus className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-l-red-500 bg-red-50/50"
      case "status":
        return "border-l-green-500 bg-green-50/50"
      case "assignment":
        return "border-l-blue-500 bg-blue-50/50"
      default:
        return "border-l-gray-500 bg-gray-50/50"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (notification.taskId) {
      // Redirect to specific task
      window.location.href = `/tasks/${notification.taskId}`
    } else if (notification.project) {
      // Redirect to project
      window.location.href = `/projects/${notification.project.toLowerCase().replace(/\s+/g, "-")}`
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notificaciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96" align="end" sideOffset={8}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Notificaciones</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} nuevas
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                Marcar todas
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Configuración de Notificaciones</DialogTitle>
                  <DialogDescription>
                    Personaliza qué tipo de notificaciones deseas recibir y con qué frecuencia
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Tipos de Notificaciones</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Fechas límite de tareas</label>
                          <p className="text-xs text-muted-foreground">
                            Alertas críticas cuando las tareas estén próximas a vencer
                          </p>
                        </div>
                        <Switch
                          checked={settings.taskDeadlines}
                          onCheckedChange={(checked) => setSettings({ ...settings, taskDeadlines: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Cambios de estado</label>
                          <p className="text-xs text-muted-foreground">
                            Notificar cuando cambien los estados de tareas
                          </p>
                        </div>
                        <Switch
                          checked={settings.taskCompletions}
                          onCheckedChange={(checked) => setSettings({ ...settings, taskCompletions: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Nuevas asignaciones</label>
                          <p className="text-xs text-muted-foreground">
                            Recibir notificaciones de nuevas tareas asignadas
                          </p>
                        </div>
                        <Switch
                          checked={settings.assignments}
                          onCheckedChange={(checked) => setSettings({ ...settings, assignments: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium">Alertas de presupuesto</label>
                          <p className="text-xs text-muted-foreground">Notificar cuando se exceda el presupuesto</p>
                        </div>
                        <Switch
                          checked={settings.budgetAlerts}
                          onCheckedChange={(checked) => setSettings({ ...settings, budgetAlerts: checked })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Frecuencia de Correo Electrónico</h4>
                    <Select
                      value={settings.emailFrequency}
                      onValueChange={(value) => setSettings({ ...settings, emailFrequency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Inmediata</SelectItem>
                        <SelectItem value="daily">Diaria</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="never">Nunca</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <ScrollArea className="h-96">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No hay notificaciones</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border-l-4 cursor-pointer transition-colors hover:bg-accent/50 ${getNotificationColor(
                      notification.type,
                    )} ${notification.read ? "opacity-60" : ""}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className={`text-sm font-medium line-clamp-1 ${notification.read ? "text-muted-foreground" : "text-foreground"}`}
                        >
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {notification.taskId && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                            className="h-6 w-6 p-0 hover:bg-destructive/10"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {notification.timestamp}
                        {notification.project && (
                          <>
                            <span>•</span>
                            <span className="font-medium">{notification.project}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
