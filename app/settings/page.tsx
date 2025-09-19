import type { Metadata } from "next"
import { UserManagement } from "@/components/settings/user-management"
import { SecurityConfiguration } from "@/components/settings/security-configuration"
import { SystemConfiguration } from "@/components/settings/system-configuration"
import { PersonalSettings } from "@/components/settings/personal-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Shield, Settings, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Configuración - ProjectFlow",
  description: "Configuración del sistema, seguridad y gestión de usuarios",
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configuración del Sistema</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona usuarios, seguridad, configuración del sistema y preferencias personales
        </p>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuarios y Roles
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Seguridad
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Sistema
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Personal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="security">
          <SecurityConfiguration />
        </TabsContent>

        <TabsContent value="system">
          <SystemConfiguration />
        </TabsContent>

        <TabsContent value="personal">
          <PersonalSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
