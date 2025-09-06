"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Truck, AlertTriangle } from "lucide-react"

export function MapView() {
  const locations = [
    { id: 1, name: "Warehouse Central", type: "warehouse", lat: 40.7128, lng: -74.006, status: "active" },
    { id: 2, name: "Client A", type: "delivery", lat: 40.7589, lng: -73.9851, status: "pending" },
    { id: 3, name: "Client B", type: "delivery", lat: 40.6892, lng: -74.0445, status: "completed" },
    { id: 4, name: "Truck #001", type: "vehicle", lat: 40.7282, lng: -73.9942, status: "moving" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Container */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Live Map View</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-secondary/20 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-secondary">
            <div className="text-center space-y-2">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Interactive Map Integration</p>
              <p className="text-sm text-muted-foreground">Real-time vehicle tracking and route visualization</p>
            </div>

            {/* Simulated map markers */}
            <div className="absolute top-4 left-4 space-y-2">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-center space-x-2 bg-background/90 backdrop-blur-sm rounded-lg p-2 shadow-sm"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      location.type === "warehouse"
                        ? "bg-blue-500"
                        : location.type === "delivery"
                          ? "bg-green-500"
                          : "bg-orange-500"
                    }`}
                  />
                  <span className="text-xs font-medium">{location.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {location.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Details */}
      <Card>
        <CardHeader>
          <CardTitle>Location Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-sm font-medium">Warehouses</span>
              </div>
              <span className="text-sm text-muted-foreground">3 active</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">Delivery Points</span>
              </div>
              <span className="text-sm text-muted-foreground">24 pending</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="text-sm font-medium">Vehicles</span>
              </div>
              <span className="text-sm text-muted-foreground">8 tracking</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-3">Recent Alerts</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm">Traffic delay on Route 3</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Truck className="w-4 h-4 text-green-600" />
                <span className="text-sm">Delivery completed at Client B</span>
              </div>
            </div>
          </div>

          <Button className="w-full">
            <Navigation className="w-4 h-4 mr-2" />
            Center on Active Routes
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
