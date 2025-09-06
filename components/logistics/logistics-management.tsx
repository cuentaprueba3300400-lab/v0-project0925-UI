"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapView } from "./map-view"
import { RouteOptimizer } from "./route-optimizer"
import { LocationTracker } from "./location-tracker"
import { Route, Navigation, Clock, Truck } from "lucide-react"

export function LogisticsManagement() {
  const [activeView, setActiveView] = useState("map")

  const routes = [
    {
      id: 1,
      name: "Downtown Delivery Route",
      status: "active",
      driver: "Carlos Rodriguez",
      stops: 8,
      distance: "45.2 km",
      estimatedTime: "3h 20m",
      progress: 62,
    },
    {
      id: 2,
      name: "Industrial Zone Route",
      status: "planned",
      driver: "Maria Santos",
      stops: 12,
      distance: "67.8 km",
      estimatedTime: "4h 45m",
      progress: 0,
    },
    {
      id: 3,
      name: "Residential Area Route",
      status: "completed",
      driver: "Juan Perez",
      stops: 15,
      distance: "52.3 km",
      estimatedTime: "4h 10m",
      progress: 100,
    },
  ]

  const resources = [
    {
      id: 1,
      name: "Truck #001",
      type: "Heavy Duty",
      location: "Warehouse A",
      status: "available",
      capacity: "5000 kg",
    },
    {
      id: 2,
      name: "Van #003",
      type: "Light Delivery",
      location: "En Route",
      status: "busy",
      capacity: "1500 kg",
    },
    {
      id: 3,
      name: "Truck #005",
      type: "Medium",
      location: "Maintenance",
      status: "maintenance",
      capacity: "3000 kg",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Logistics & Routes</h1>
          <p className="text-muted-foreground">Manage routes, track resources, and optimize deliveries</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Route className="w-4 h-4 mr-2" />
          Create New Route
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Route className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Routes</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Vehicles</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Navigation className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Distance</p>
                <p className="text-2xl font-bold text-foreground">342 km</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Delivery Time</p>
                <p className="text-2xl font-bold text-foreground">2.5h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-4">
        <TabsList>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="routes">Route Management</TabsTrigger>
          <TabsTrigger value="resources">Resource Tracking</TabsTrigger>
          <TabsTrigger value="optimizer">Route Optimizer</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <MapView />
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routes.map((route) => (
                  <div key={route.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Route className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{route.name}</h3>
                        <p className="text-sm text-muted-foreground">Driver: {route.driver}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-muted-foreground">{route.stops} stops</span>
                          <span className="text-xs text-muted-foreground">{route.distance}</span>
                          <span className="text-xs text-muted-foreground">{route.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="w-24 bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${route.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{route.progress}% complete</p>
                      </div>
                      <Badge
                        variant={
                          route.status === "active" ? "default" : route.status === "completed" ? "secondary" : "outline"
                        }
                      >
                        {route.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <LocationTracker resources={resources} />
        </TabsContent>

        <TabsContent value="optimizer" className="space-y-4">
          <RouteOptimizer />
        </TabsContent>
      </Tabs>
    </div>
  )
}
