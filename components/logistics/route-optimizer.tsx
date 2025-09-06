"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Route, Zap, Clock, Fuel, MapPin, Settings } from "lucide-react"

export function RouteOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationResults, setOptimizationResults] = useState(null)

  const handleOptimize = () => {
    setIsOptimizing(true)
    // Simulate optimization process
    setTimeout(() => {
      setOptimizationResults({
        originalDistance: 127.5,
        optimizedDistance: 89.2,
        timeSaved: "1h 45m",
        fuelSaved: "12.3L",
        costSaved: "$45.60",
      })
      setIsOptimizing(false)
    }, 3000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Optimization Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Route Optimization Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="optimization-type">Optimization Priority</Label>
              <Select defaultValue="distance">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Shortest Distance</SelectItem>
                  <SelectItem value="time">Fastest Time</SelectItem>
                  <SelectItem value="fuel">Fuel Efficiency</SelectItem>
                  <SelectItem value="cost">Lowest Cost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="vehicle-type">Vehicle Type</Label>
              <Select defaultValue="truck">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="truck">Heavy Truck</SelectItem>
                  <SelectItem value="van">Delivery Van</SelectItem>
                  <SelectItem value="motorcycle">Motorcycle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="max-stops">Maximum Stops per Route</Label>
              <Input id="max-stops" type="number" defaultValue="15" />
            </div>

            <div>
              <Label htmlFor="time-window">Time Window</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" defaultValue="08:00" />
                <Input type="time" defaultValue="18:00" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Delivery Locations</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {[
                "123 Main St, Downtown",
                "456 Oak Ave, Midtown",
                "789 Pine Rd, Uptown",
                "321 Elm St, Westside",
                "654 Maple Dr, Eastside",
              ].map((address, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-secondary/20 rounded">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{address}</span>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleOptimize} disabled={isOptimizing} className="w-full">
            {isOptimizing ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-spin" />
                Optimizing Routes...
              </>
            ) : (
              <>
                <Route className="w-4 h-4 mr-2" />
                Optimize Routes
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Optimization Results */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Results</CardTitle>
        </CardHeader>
        <CardContent>
          {optimizationResults ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-secondary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Original Route</p>
                  <p className="text-2xl font-bold text-foreground">{optimizationResults.originalDistance} km</p>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Optimized Route</p>
                  <p className="text-2xl font-bold text-primary">{optimizationResults.optimizedDistance} km</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Time Saved</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  >
                    {optimizationResults.timeSaved}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Fuel className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Fuel Saved</span>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    {optimizationResults.fuelSaved}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">💰</span>
                    <span className="text-sm font-medium">Cost Saved</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  >
                    {optimizationResults.costSaved}
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Optimized Route Sequence</h4>
                <div className="space-y-2">
                  {[
                    "Warehouse Central (Start)",
                    "123 Main St, Downtown",
                    "321 Elm St, Westside",
                    "789 Pine Rd, Uptown",
                    "456 Oak Ave, Midtown",
                    "654 Maple Dr, Eastside",
                    "Warehouse Central (End)",
                  ].map((stop, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm">{stop}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full">Apply Optimized Route</Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Route className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Run optimization to see results</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
