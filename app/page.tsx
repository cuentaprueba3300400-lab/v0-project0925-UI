"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">ProjectFlow</h1>
          <p className="text-muted-foreground">Sistema Profesional de Gestión de Proyectos y Logística</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</CardTitle>
            <CardDescription className="text-center">
              {isLogin
                ? "Ingresa tus credenciales para acceder a tus proyectos"
                : "Comienza tu experiencia en gestión de proyectos"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin ? <LoginForm /> : <RegisterForm />}

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
