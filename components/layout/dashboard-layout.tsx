"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  BarChart3,
  Users,
  MapPin,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  UserPlus,
} from "lucide-react"
import { NotificationDropdown } from "@/components/notifications/notification-dropdown"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userRole, setUserRole] = useState("Administrador") // Mock admin role

  const navigation = [
    { name: "Panel Principal", href: "/dashboard", icon: LayoutDashboard },
    { name: "Proyectos", href: "/projects", icon: FolderKanban },
    { name: "Tareas", href: "/tasks", icon: CheckSquare },
    { name: "Análisis y Gantt", href: "/analytics", icon: BarChart3 },
    { name: "Equipo", href: "/team", icon: Users },
    { name: "Logística", href: "/logistics", icon: MapPin },
    { name: "Reportes", href: "/reports", icon: BarChart3 },
    { name: "Configuración", href: "/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-72 bg-sidebar border-r border-sidebar-border shadow-xl">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">PF</span>
              </div>
              <h1 className="text-xl font-bold text-sidebar-primary">ProjectFlow</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="px-4 py-6">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 group"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-72 lg:bg-sidebar lg:border-r lg:border-sidebar-border">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold">PF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-primary">ProjectFlow</h1>
              <p className="text-xs text-sidebar-foreground/60">Gestión de Proyectos</p>
            </div>
          </div>
        </div>
        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 group"
                >
                  <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="lg:hidden hover:bg-accent" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir barra lateral</span>
          </Button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="hidden md:flex flex-1 max-w-lg">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar proyectos, tareas..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-secondary/50 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="flex md:hidden flex-1" />

            <div className="flex items-center gap-x-2 lg:gap-x-4">
              <Button variant="ghost" size="sm" className="md:hidden">
                <Search className="h-5 w-5" />
                <span className="sr-only">Buscar</span>
              </Button>
              <NotificationDropdown />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-accent">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Usuario" />
                      <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Juan Pérez</p>
                      <p className="text-xs leading-none text-muted-foreground">juan.perez@ejemplo.com</p>
                      <Badge variant="secondary" className="w-fit mt-1 text-xs">
                        Gerente de Proyecto
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  {userRole === "Administrador" && (
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => (window.location.href = "/admin/register")}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Registrar Usuario</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="py-4 sm:py-6 lg:py-8">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
