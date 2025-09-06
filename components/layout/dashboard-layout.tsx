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
  Bell,
  Search,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Analytics & Gantt", href: "/analytics", icon: BarChart3 },
  { name: "Team", href: "/team", icon: Users },
  { name: "Logistics", href: "/logistics", icon: MapPin }, // Updated route name to match logistics page
  { name: "Reports", href: "/reports", icon: BarChart3 }, // Added reports navigation
  { name: "Settings", href: "/settings", icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-72 bg-sidebar border-r border-sidebar-border shadow-xl">
          {" "}
          {/* Increased width and added shadow */}
          <div className="flex h-16 items-center justify-between px-6">
            {" "}
            {/* Increased padding */}
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
            {" "}
            {/* Increased padding */}
            <ul className="space-y-1">
              {" "}
              {/* Reduced spacing for better mobile fit */}
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 group" // Enhanced hover effects
                    onClick={() => setSidebarOpen(false)} // Close sidebar on navigation
                  >
                    <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />{" "}
                    {/* Added hover animation */}
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
        {" "}
        {/* Increased width */}
        <div className="flex h-16 items-center px-6">
          {" "}
          {/* Increased padding */}
          <div className="flex items-center space-x-3">
            {" "}
            {/* Added logo and improved spacing */}
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold">PF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-sidebar-primary">ProjectFlow</h1>
              <p className="text-xs text-sidebar-foreground/60">Project Management</p>
            </div>
          </div>
        </div>
        <nav className="px-4 py-6">
          {" "}
          {/* Increased padding */}
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 group" // Enhanced styling
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
        {" "}
        {/* Updated to match new sidebar width */}
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          {" "}
          {/* Added backdrop blur and transparency */}
          <Button variant="ghost" size="sm" className="lg:hidden hover:bg-accent" onClick={() => setSidebarOpen(true)}>
            {" "}
            {/* Enhanced mobile button */}
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="hidden md:flex flex-1 max-w-lg">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects, tasks..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-secondary/50 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="flex md:hidden flex-1" />

            <div className="flex items-center gap-x-2 lg:gap-x-4">
              {" "}
              {/* Improved spacing */}
              <Button variant="ghost" size="sm" className="md:hidden">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-accent">
                    {" "}
                    {/* Enhanced button styling */}
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                      <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  {" "}
                  {/* Increased width */}
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                      <Badge variant="secondary" className="w-fit mt-1 text-xs">
                        Project Manager
                      </Badge>{" "}
                      {/* Added role badge */}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    {" "}
                    {/* Added cursor pointer */}
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                    {" "}
                    {/* Enhanced logout styling */}
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="py-4 sm:py-6 lg:py-8">
          {" "}
          {/* Responsive padding */}
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {" "}
            {/* Added max width and centering */}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
