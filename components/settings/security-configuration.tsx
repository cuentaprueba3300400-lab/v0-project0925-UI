"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Shield, Users, Eye, Save, Plus, Edit, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

interface AuditEvent {
  id: string
  timestamp: string
  event: string
  user: string
  details: string
  severity: "low" | "medium" | "high"
}

const initialRoles: Role[] = [
  {
    id: "1",
    name: "Administrador",
    description: "Acceso completo al sistema",
    permissions: ["crear_proyectos", "gestionar_usuarios", "configurar_sistema", "ver_reportes", "archivar_proyectos"],
    userCount: 2,
  },
  {
    id: "2",
    name: "Planificador",
    description: "Gestión de proyectos y tareas",
    permissions: ["crear_proyectos", "gestionar_tareas", "ver_reportes", "asignar_recursos"],
    userCount: 5,
  },
  {
    id: "3",
    name: "Colaborador",
    description: "Participación en proyectos asignados",
    permissions: ["ver_proyectos", "actualizar_tareas", "comunicarse"],
    userCount: 12,
  },
]

const auditEvents: AuditEvent[] = [
  {
    id: "1",
    timestamp: "2024-01-15 14:30:22",
    event: "Intento de inicio de sesión fallido",
    user: "usuario@ejemplo.com",
    details: "Contraseña incorrecta - 3 intentos",
    severity: "medium",
  },
  {
    id: "2",
    timestamp: "2024-01-15 13:45:10",
    event: "Cambio de permisos",
    user: "admin@empresa.com",
    details: "Rol modificado: Planificador → Administrador",
    severity: "high",
  },
  {
    id: "3",
    timestamp: "2024-01-15 12:20:05",
    event: "Acceso a datos sensibles",
    user: "planificador@empresa.com",
    details: "Descarga de reporte financiero",
    severity: "low",
  },
  {
    id: "4",
    timestamp: "2024-01-15 11:15:33",
    event: "Activación de 2FA",
    user: "colaborador@empresa.com",
    details: "Autenticación de dos factores habilitada",
    severity: "low",
  },
]

const availablePermissions = [
  { id: "crear_proyectos", name: "Crear Proyectos", description: "Permite crear nuevos proyectos" },
  { id: "gestionar_usuarios", name: "Gestionar Usuarios", description: "Administrar cuentas de usuario" },
  { id: "configurar_sistema", name: "Configurar Sistema", description: "Acceso a configuración del sistema" },
  { id: "ver_reportes", name: "Ver Reportes", description: "Acceso a reportes y análisis" },
  { id: "archivar_proyectos", name: "Archivar Proyectos", description: "Archivar y restaurar proyectos" },
  { id: "gestionar_tareas", name: "Gestionar Tareas", description: "Crear y modificar tareas" },
  { id: "asignar_recursos", name: "Asignar Recursos", description: "Asignar recursos a proyectos" },
  { id: "ver_proyectos", name: "Ver Proyectos", description: "Visualizar proyectos asignados" },
  { id: "actualizar_tareas", name: "Actualizar Tareas", description: "Actualizar estado de tareas" },
  { id: "comunicarse", name: "Comunicarse", description: "Participar en comunicaciones del equipo" },
]

export function SecurityConfiguration() {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [passwordMinLength, setPasswordMinLength] = useState(8)
  const [requireSpecialChars, setRequireSpecialChars] = useState(true)
  const [requireNumbers, setRequireNumbers] = useState(true)
  const [require2FA, setRequire2FA] = useState(false)
  const [isEditingRole, setIsEditingRole] = useState<Role | null>(null)
  const [isCreatingRole, setIsCreatingRole] = useState(false)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleSaveChanges = () => {
    console.log("[v0] Guardando configuración de seguridad:", {
      passwordMinLength,
      requireSpecialChars,
      requireNumbers,
      require2FA,
      roles,
    })
    // Aquí se implementaría la lógica para guardar en el backend
  }

  const handleEditRole = (role: Role) => {
    setIsEditingRole({ ...role })
  }

  const handleSaveRole = () => {
    if (isEditingRole) {
      setRoles(roles.map((r) => (r.id === isEditingRole.id ? isEditingRole : r)))
      setIsEditingRole(null)
    }
  }

  const handleCreateRole = () => {
    const newRole: Role = {
      id: Date.now().toString(),
      name: "Nuevo Rol",
      description: "Descripción del rol",
      permissions: [],
      userCount: 0,
    }
    setRoles([...roles, newRole])
    setIsEditingRole(newRole)
    setIsCreatingRole(false)
  }

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((r) => r.id !== roleId))
  }

  return (
    <Tabs defaultValue="roles" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="roles" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Roles y Permisos
        </TabsTrigger>
        <TabsTrigger value="auth" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Autenticación
        </TabsTrigger>
        <TabsTrigger value="audit" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          Registro de Auditoría
        </TabsTrigger>
      </TabsList>

      <TabsContent value="roles" className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Gestión de Roles y Permisos</CardTitle>
                <CardDescription>Administra los roles de usuario y sus permisos asociados</CardDescription>
              </div>
              <Dialog open={isCreatingRole} onOpenChange={setIsCreatingRole}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Rol
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Rol</DialogTitle>
                    <DialogDescription>Define un nuevo rol con permisos específicos</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreatingRole(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateRole}>Crear Rol</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rol</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Permisos</TableHead>
                  <TableHead>Usuarios</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {availablePermissions.find((p) => p.id === permission)?.name}
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.permissions.length - 3} más
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{role.userCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditRole(role)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRole(role.id)}
                          disabled={role.userCount > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Role Edit Dialog */}
        <Dialog open={!!isEditingRole} onOpenChange={() => setIsEditingRole(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Editar Rol: {isEditingRole?.name}</DialogTitle>
              <DialogDescription>Modifica los permisos y configuración del rol</DialogDescription>
            </DialogHeader>
            {isEditingRole && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="roleName">Nombre del Rol</Label>
                    <Input
                      id="roleName"
                      value={isEditingRole.name}
                      onChange={(e) =>
                        setIsEditingRole({
                          ...isEditingRole,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="roleDescription">Descripción</Label>
                    <Input
                      id="roleDescription"
                      value={isEditingRole.description}
                      onChange={(e) =>
                        setIsEditingRole({
                          ...isEditingRole,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>Permisos</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {availablePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission.id}
                          checked={isEditingRole.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setIsEditingRole({
                                ...isEditingRole,
                                permissions: [...isEditingRole.permissions, permission.id],
                              })
                            } else {
                              setIsEditingRole({
                                ...isEditingRole,
                                permissions: isEditingRole.permissions.filter((p) => p !== permission.id),
                              })
                            }
                          }}
                        />
                        <div>
                          <Label htmlFor={permission.id} className="text-sm font-medium">
                            {permission.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditingRole(null)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveRole}>Guardar Cambios</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TabsContent>

      <TabsContent value="auth" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Autenticación</CardTitle>
            <CardDescription>Ajusta las políticas de seguridad y autenticación del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Políticas de Contraseña</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minLength">Longitud Mínima</Label>
                  <Input
                    id="minLength"
                    type="number"
                    min="6"
                    max="20"
                    value={passwordMinLength}
                    onChange={(e) => setPasswordMinLength(Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="specialChars">Caracteres Especiales Requeridos</Label>
                    <Switch id="specialChars" checked={requireSpecialChars} onCheckedChange={setRequireSpecialChars} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="numbers">Números Requeridos</Label>
                    <Switch id="numbers" checked={requireNumbers} onCheckedChange={setRequireNumbers} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Autenticación de Dos Factores (2FA)</h3>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="require2FA" className="text-base font-medium">
                    Requerir 2FA para todos los usuarios
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Obliga a todos los usuarios a configurar autenticación de dos factores
                  </p>
                </div>
                <Switch id="require2FA" checked={require2FA} onCheckedChange={setRequire2FA} />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Advertencia de Seguridad</p>
                <p className="text-yellow-700">
                  Los cambios en las políticas de autenticación afectarán a todos los usuarios del sistema.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="audit" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Registro de Auditoría</CardTitle>
            <CardDescription>Monitorea eventos de seguridad y actividades del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha y Hora</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Detalles</TableHead>
                  <TableHead>Severidad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-mono text-sm">{event.timestamp}</TableCell>
                    <TableCell className="font-medium">{event.event}</TableCell>
                    <TableCell>{event.user}</TableCell>
                    <TableCell className="max-w-xs truncate">{event.details}</TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(event.severity)}>
                        {event.severity === "high" ? "Alta" : event.severity === "medium" ? "Media" : "Baja"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <div className="flex justify-end">
        <Button onClick={handleSaveChanges} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>
    </Tabs>
  )
}
