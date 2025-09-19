"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Bell, Settings, CheckCircle, AlertTriangle, Info, Clock, X } from "lucide-react"

interface Notification {
  id: string
  type: "info" | "warning" | "success" | "error"
  title: string
  message: string
  timestamp: string
  read: boolean
  project?: string
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "warning",
      title: "Tarea Vencida",
      message: "La tarea 'Diseño de UI' en el proyecto 'App Móvil' ha vencido",
      timestamp: "Hace 5 minutos",
      read: false,
      project: "App Móvil",
    },
    {
      id: "2",
      type: "success",
      title: "Tarea Completada",
      message: "María completó la tarea 'Investigación de mercado'",
      timestamp: "Hace 1 hora",
      read: false,
      project: "Marketing Campaign",
    },
    {
      id: "3",
      type: "info",
      title: "Nuevo Comentario",
      message: "Carlos agregó un comentario en 'Desarrollo Backend'",
      timestamp: "Hace 2 horas",
      read: true,
      project: "Website Redesign",
    },
    {
      id: "4",
      type: "warning",
      title: "Presupuesto Excedido",
      message: "El proyecto 'E-commerce' ha excedido el 90% del presupuesto",
      timestamp: "Hace 3 horas",
      read: true,
      project: "E-commerce",
    },
  ])

  const [settings, setSettings] = useState({
    taskDeadlines: true,
    taskCompletions: true,
    comments: true,
    budgetAlerts: true,
    teamUpdates: true,
    projectMilestones: true,
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
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

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Centro de Notificaciones</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Marcar todas como leídas
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configuración de Notificaciones</DialogTitle>
                  <DialogDescription>Personaliza qué tipo de notificaciones deseas recibir</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Fechas límite de tareas</label>
                      <p className="text-xs text-muted-foreground">
                        Recibir alertas cuando las tareas estén próximas a vencer
                      </p>
                    </div>
                    <Switch
                      checked={settings.taskDeadlines}
                      onCheckedChange={(checked) => setSettings({ ...settings, taskDeadlines: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Tareas completadas</label>
                      <p className="text-xs text-muted-foreground">Notificar cuando se completen tareas</p>
                    </div>
                    <Switch
                      checked={settings.taskCompletions}
                      onCheckedChange={(checked) => setSettings({ ...settings, taskCompletions: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Comentarios</label>
                      <p className="text-xs text-muted-foreground">Recibir notificaciones de nuevos comentarios</p>
                    </div>
                    <Switch
                      checked={settings.comments}
                      onCheckedChange={(checked) => setSettings({ ...settings, comments: checked })}
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
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No hay notificaciones</h3>
              <p className="text-muted-foreground">Te notificaremos cuando haya actualizaciones importantes</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  notification.read ? "bg-muted/30 border-muted" : "bg-background border-border shadow-sm"
                }`}
              >
                {getNotificationIcon(notification.type)}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-sm font-medium ${
                        notification.read ? "text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {notification.title}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className={`text-sm ${notification.read ? "text-muted-foreground" : "text-muted-foreground"}`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {notification.timestamp}
                    {notification.project && (
                      <>
                        <span>•</span>
                        <span>{notification.project}</span>
                      </>
                    )}
                  </div>
                </div>
                {!notification.read && (
                  <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)} className="text-xs">
                    Marcar como leída
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
