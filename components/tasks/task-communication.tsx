"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Clock, Paperclip } from "lucide-react"

interface Message {
  id: string
  author: string
  avatar?: string
  content: string
  timestamp: string
  type: "message" | "system"
}

interface TaskCommunicationProps {
  taskId: string
  taskTitle: string
}

export function TaskCommunication({ taskId, taskTitle }: TaskCommunicationProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      author: "María González",
      avatar: "/avatars/maria.jpg",
      content: "He terminado la investigación inicial. Los resultados están en el documento compartido.",
      timestamp: "Hace 2 horas",
      type: "message",
    },
    {
      id: "2",
      author: "Sistema",
      content: "Carlos Ruiz fue asignado a esta tarea",
      timestamp: "Hace 3 horas",
      type: "system",
    },
    {
      id: "3",
      author: "Juan Pérez",
      avatar: "/avatars/juan.jpg",
      content: "¿Necesitamos revisar los requisitos antes de continuar? Hay algunos puntos que no están claros.",
      timestamp: "Hace 4 horas",
      type: "message",
    },
    {
      id: "4",
      author: "Ana López",
      avatar: "/avatars/ana.jpg",
      content: "Perfecto, voy a revisar el documento y te doy feedback mañana temprano.",
      timestamp: "Hace 5 horas",
      type: "message",
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        author: "Tú",
        content: newMessage,
        timestamp: "Ahora",
        type: "message",
      }
      setMessages([message, ...messages])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <div>
            <CardTitle className="text-lg">Comunicación de Tarea</CardTitle>
            <CardDescription>{taskTitle}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Message Input */}
        <div className="space-y-2">
          <Textarea
            placeholder="Escribe un mensaje para el equipo..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[80px] resize-none"
          />
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm">
              <Paperclip className="h-4 w-4 mr-2" />
              Adjuntar archivo
            </Button>
            <Button onClick={sendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Enviar
            </Button>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              {message.type === "system" ? (
                <div className="flex items-center justify-center">
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {message.content} • {message.timestamp}
                  </Badge>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {message.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{message.author}</span>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <div className="bg-muted p-3 rounded-lg text-sm">{message.content}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {messages.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No hay mensajes aún</h3>
            <p className="text-muted-foreground">Inicia la conversación con tu equipo sobre esta tarea</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
