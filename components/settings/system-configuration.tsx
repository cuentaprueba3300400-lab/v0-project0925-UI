"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Database, Archive, Bell, Zap, Save, HardDrive, Clock } from "lucide-react"

export function SystemConfiguration() {
  const [autoArchiveDays, setAutoArchiveDays] = useState(365)
  const [backupFrequency, setBackupFrequency] = useState("daily")
  const [enableAutoBackup, setEnableAutoBackup] = useState(true)
  const [maxFileSize, setMaxFileSize] = useState(50)
  const [cacheExpiry, setCacheExpiry] = useState(24)
  const [enablePerformanceMode, setEnablePerformanceMode] = useState(false)

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [notificationFrequency, setNotificationFrequency] = useState("immediate")
  const [digestEnabled, setDigestEnabled] = useState(false)

  const handleSaveSettings = () => {
    console.log("[v0] Guardando configuración del sistema:", {
      autoArchiveDays,
      backupFrequency,
      enableAutoBackup,
      maxFileSize,
      cacheExpiry,
      enablePerformanceMode,
      emailNotifications,
      pushNotifications,
      notificationFrequency,
      digestEnabled,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="data" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Gestión de Datos
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Rendimiento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Archivado Automático de Proyectos
              </CardTitle>
              <CardDescription>
                Configura cuándo los proyectos completados deben archivarse automáticamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="archiveDays">Archivar proyectos después de (días)</Label>
                  <div className="mt-2">
                    <Slider
                      value={[autoArchiveDays]}
                      onValueChange={(value) => setAutoArchiveDays(value[0])}
                      max={730}
                      min={30}
                      step={30}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>30 días</span>
                      <span className="font-medium">{autoArchiveDays} días</span>
                      <span>2 años</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="backupFreq">Frecuencia de Respaldo</Label>
                    <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Cada hora</SelectItem>
                        <SelectItem value="daily">Diario</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoBackup">Respaldo Automático</Label>
                    <Switch id="autoBackup" checked={enableAutoBackup} onCheckedChange={setEnableAutoBackup} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                Gestión de Archivos
              </CardTitle>
              <CardDescription>Configura los límites y políticas de almacenamiento de archivos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="maxFileSize">Tamaño máximo de archivo (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={maxFileSize}
                  onChange={(e) => setMaxFileSize(Number(e.target.value))}
                  min="1"
                  max="500"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Los archivos más grandes de {maxFileSize}MB serán rechazados
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones del Sistema</CardTitle>
              <CardDescription>Personaliza cómo y cuándo se envían las notificaciones a los usuarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotif">Notificaciones por Correo</Label>
                    <p className="text-sm text-muted-foreground">Enviar notificaciones por correo electrónico</p>
                  </div>
                  <Switch id="emailNotif" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotif">Notificaciones Push</Label>
                    <p className="text-sm text-muted-foreground">Mostrar notificaciones en el navegador</p>
                  </div>
                  <Switch id="pushNotif" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>

                <div>
                  <Label htmlFor="notifFreq">Frecuencia de Notificaciones</Label>
                  <Select value={notificationFrequency} onValueChange={setNotificationFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Inmediata</SelectItem>
                      <SelectItem value="hourly">Cada hora</SelectItem>
                      <SelectItem value="daily">Diaria</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="digest">Resumen Diario</Label>
                    <p className="text-sm text-muted-foreground">Enviar un resumen diario de actividades</p>
                  </div>
                  <Switch id="digest" checked={digestEnabled} onCheckedChange={setDigestEnabled} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Optimización del Rendimiento
              </CardTitle>
              <CardDescription>Ajusta la configuración para optimizar el rendimiento del sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cacheExpiry">Tiempo de expiración de caché (horas)</Label>
                  <Input
                    id="cacheExpiry"
                    type="number"
                    value={cacheExpiry}
                    onChange={(e) => setCacheExpiry(Number(e.target.value))}
                    min="1"
                    max="168"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Los datos en caché se actualizarán cada {cacheExpiry} horas
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="perfMode">Modo de Alto Rendimiento</Label>
                    <p className="text-sm text-muted-foreground">
                      Optimiza consultas y cálculos para mejor rendimiento
                    </p>
                  </div>
                  <Switch id="perfMode" checked={enablePerformanceMode} onCheckedChange={setEnablePerformanceMode} />
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-800">Optimización Automática</p>
                    <p className="text-blue-700">
                      El sistema optimiza automáticamente las consultas de base de datos y los cálculos de rutas durante
                      las horas de menor actividad.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  )
}
