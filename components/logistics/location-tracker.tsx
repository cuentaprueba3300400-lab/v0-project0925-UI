"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, MapPin, Clock, Fuel, Navigation } from "lucide-react"

interface Resource {
  id: number
  name: string
  type: string
  location: string
  status: string
  capacity: string
}

interface LocationTrackerProps {
  resources: Resource[]
}

export function LocationTracker({ resources }: LocationTrackerProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Resource Location Tracking</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <Card key={resource.id} className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{resource.name}</h3>
                    </div>
                    <Badge
                      variant={
                        resource.status === "available"
                          ? "secondary"
                          : resource.status === "busy"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {resource.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{resource.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{resource.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-medium">{resource.capacity}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Last Update: 2 min ago</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Fuel className="w-3 h-3" />
                        <span>85%</span>
                      </div>
                    </div>

                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      <Navigation className="w-3 h-3 mr-1" />
                      Track Live
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Geofencing Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Geofencing & Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">Truck #001 entered delivery zone</span>
              </div>
              <span className="text-xs text-muted-foreground">5 min ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span className="text-sm">Van #003 delayed at checkpoint</span>
              </div>
              <span className="text-xs text-muted-foreground">12 min ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm">Truck #005 completed maintenance</span>
              </div>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
