"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield, Bell, Palette, Save, Camera, Key } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function PersonalSettings() {
  const [profile, setProfile] = useState({
    name: "Ana García",
    email: "ana.garcia@empresa.com",
    phone: "+34 123 456 789",
    department: "Gestión de Proyectos",
    timezone: "Europe/Madrid",
    language: "es",
  })

  const [preferences, setPreferences] = useState({
    theme: "system",
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    taskReminders: true,
    projectUpdates: true,
  })

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 60,
    loginAlerts: true,
  })

  const handleSaveProfile = () => {
    console.log("[v0] Guardando perfil personal:", { profile, preferences, security })
  }

  const handleEnable2FA = () => {
    setSecurity({ ...security, twoFactorEnabled: !security.twoFactorEnabled })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Preferencias
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Seguridad Personal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Actualiza tu información de perfil y datos de contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg">AG</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Camera className="h-4 w-4" />
                    Cambiar Foto
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">JPG, PNG o GIF. Máximo 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="department">Departamento</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Select
                    value={profile.timezone}
                    onValueChange={(value) => setProfile({ ...profile, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                      <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                      <SelectItem value="America/New_York">Nueva York (GMT-5)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Los Ángeles (GMT-8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={profile.language}
                    onValueChange={(value) => setProfile({ ...profile, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Interfaz</CardTitle>
              <CardDescription>Personaliza la apariencia y comportamiento de la aplicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="theme">Tema de la Aplicación</Label>
                <Select
                  value={preferences.theme}
                  onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="system">Automático (Sistema)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>Controla qué notificaciones deseas recibir y cómo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotif">Notificaciones por Correo</Label>
                    <p className="text-sm text-muted-foreground">Recibir notificaciones en tu correo electrónico</p>
                  </div>
                  <Switch
                    id="emailNotif"
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotif">Notificaciones Push</Label>
                    <p className="text-sm text-muted-foreground">Mostrar notificaciones en el navegador</p>
                  </div>
                  <Switch
                    id="pushNotif"
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, pushNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyDigest">Resumen Semanal</Label>
                    <p className="text-sm text-muted-foreground">Recibir un resumen semanal de actividades</p>
                  </div>
                  <Switch
                    id="weeklyDigest"
                    checked={preferences.weeklyDigest}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, weeklyDigest: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="taskReminders">Recordatorios de Tareas</Label>
                    <p className="text-sm text-muted-foreground">Notificaciones sobre fechas límite de tareas</p>
                  </div>
                  <Switch
                    id="taskReminders"
                    checked={preferences.taskReminders}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, taskReminders: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="projectUpdates">Actualizaciones de Proyectos</Label>
                    <p className="text-sm text-muted-foreground">Notificaciones sobre cambios en proyectos</p>
                  </div>
                  <Switch
                    id="projectUpdates"
                    checked={preferences.projectUpdates}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, projectUpdates: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad de la Cuenta</CardTitle>
              <CardDescription>Gestiona la seguridad de tu cuenta personal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="2fa" className="text-base font-medium">
                      Autenticación de Dos Factores (2FA)
                    </Label>
                    <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad a tu cuenta</p>
                    {security.twoFactorEnabled && (
                      <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">Activado</Badge>
                    )}
                  </div>
                  <Button
                    variant={security.twoFactorEnabled ? "outline" : "default"}
                    onClick={handleEnable2FA}
                    className="flex items-center gap-2"
                  >
                    <Key className="h-4 w-4" />
                    {security.twoFactorEnabled ? "Desactivar" : "Activar"} 2FA
                  </Button>
                </div>

                <div>
                  <Label htmlFor="sessionTimeout">Tiempo de Sesión (minutos)</Label>
                  <Select
                    value={security.sessionTimeout.toString()}
                    onValueChange={(value) => setSecurity({ ...security, sessionTimeout: Number(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="120">2 horas</SelectItem>
                      <SelectItem value="480">8 horas</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tu sesión expirará automáticamente después de este tiempo de inactividad
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="loginAlerts">Alertas de Inicio de Sesión</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibir notificaciones cuando alguien acceda a tu cuenta
                    </p>
                  </div>
                  <Switch
                    id="loginAlerts"
                    checked={security.loginAlerts}
                    onCheckedChange={(checked) => setSecurity({ ...security, loginAlerts: checked })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full bg-transparent">
                  Cambiar Contraseña
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Descargar Datos de la Cuenta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveProfile} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  )
}
