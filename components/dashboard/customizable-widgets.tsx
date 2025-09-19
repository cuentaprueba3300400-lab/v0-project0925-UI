"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import {
  Settings,
  Grip,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Target,
  AlertTriangle,
  CheckSquare,
} from "lucide-react"

interface Widget {
  id: string
  title: string
  type: string
  enabled: boolean
  data?: any
}

export function CustomizableWidgets() {
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: "progress",
      title: "Progreso del Proyecto",
      type: "progress",
      enabled: true,
      data: { value: 68, total: 100 },
    },
    {
      id: "budget",
      title: "Presupuesto",
      type: "budget",
      enabled: true,
      data: { used: 45000, total: 60000 },
    },
    {
      id: "team",
      title: "Recursos del Equipo",
      type: "team",
      enabled: true,
      data: { active: 12, total: 15 },
    },
    {
      id: "tasks",
      title: "Tareas Pendientes",
      type: "tasks",
      enabled: false,
      data: { pending: 23, overdue: 5 },
    },
    {
      id: "timeline",
      title: "Cronograma",
      type: "timeline",
      enabled: false,
      data: { onTime: 8, delayed: 2 },
    },
  ])

  const availableWidgets = [
    { id: "progress", title: "Progreso del Proyecto", icon: BarChart3 },
    { id: "budget", title: "Presupuesto", icon: DollarSign },
    { id: "team", title: "Recursos del Equipo", icon: Users },
    { id: "tasks", title: "Tareas Pendientes", icon: CheckSquare },
    { id: "timeline", title: "Cronograma", icon: Clock },
    { id: "performance", title: "Rendimiento", icon: TrendingUp },
    { id: "risks", title: "Riesgos", icon: AlertTriangle },
    { id: "goals", title: "Objetivos", icon: Target },
  ]

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(widgets.filter((w) => w.enabled))
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const newWidgets = widgets.map((widget) => {
      if (widget.enabled) {
        const newIndex = items.findIndex((item) => item.id === widget.id)
        return { ...widget, order: newIndex }
      }
      return widget
    })

    setWidgets(newWidgets)
  }

  const toggleWidget = (widgetId: string) => {
    setWidgets(widgets.map((widget) => (widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget)))
  }

  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case "progress":
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completado</span>
                  <span>{widget.data.value}%</span>
                </div>
                <Progress value={widget.data.value} />
              </div>
            </CardContent>
          </Card>
        )

      case "budget":
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">${widget.data.used.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">de ${widget.data.total.toLocaleString()}</div>
                <Progress value={(widget.data.used / widget.data.total) * 100} />
              </div>
            </CardContent>
          </Card>
        )

      case "team":
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{widget.data.active}</div>
                <div className="text-sm text-muted-foreground">de {widget.data.total} miembros activos</div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{widget.data.active} Activos</Badge>
                  <Badge variant="outline">{widget.data.total - widget.data.active} Disponibles</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case "tasks":
        return (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{widget.data.pending}</div>
                <div className="text-sm text-muted-foreground">tareas pendientes</div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{widget.data.pending} Pendientes</Badge>
                  <Badge variant="destructive">{widget.data.overdue} Vencidas</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">{widget.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Widget en desarrollo</p>
            </CardContent>
          </Card>
        )
    }
  }

  const enabledWidgets = widgets.filter((w) => w.enabled)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Panel Personalizable</h2>
          <p className="text-muted-foreground">Personaliza tu vista con los widgets que más necesites</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Settings className="mr-2 h-4 w-4" />
              Personalizar Widgets
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Configurar Widgets</DialogTitle>
              <DialogDescription>Selecciona los widgets que deseas mostrar en tu panel</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {availableWidgets.map((widget) => {
                const isEnabled = widgets.find((w) => w.id === widget.id)?.enabled || false
                return (
                  <div key={widget.id} className="flex items-center space-x-2">
                    <Checkbox id={widget.id} checked={isEnabled} onCheckedChange={() => toggleWidget(widget.id)} />
                    <label
                      htmlFor={widget.id}
                      className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <widget.icon className="h-4 w-4" />
                      {widget.title}
                    </label>
                  </div>
                )
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="widgets" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {enabledWidgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`relative ${snapshot.isDragging ? "opacity-50" : ""}`}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="absolute top-2 right-2 z-10 cursor-grab active:cursor-grabbing"
                      >
                        <Grip className="h-4 w-4 text-muted-foreground" />
                      </div>
                      {renderWidget(widget)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {enabledWidgets.length === 0 && (
        <Card className="p-8 text-center">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">No hay widgets configurados</h3>
            <p className="text-muted-foreground">Haz clic en "Personalizar Widgets" para agregar widgets a tu panel</p>
          </div>
        </Card>
      )}
    </div>
  )
}
