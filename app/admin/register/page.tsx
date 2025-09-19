import { RegisterForm } from "@/components/auth/register-form"

export default function AdminRegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Registrar Nuevo Usuario</h1>
          <p className="text-muted-foreground">Solo administradores pueden registrar nuevos usuarios</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
