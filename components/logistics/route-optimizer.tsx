"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Route, Clock, MapPin, Navigation, Loader2 } from "lucide-react"

export function RouteOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationResults, setOptimizationResults] = useState(null)
  const [selectedLocations, setSelectedLocations] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const availableLocations = [
    {
      id: 1,
      name: "Centro Comercial Plaza Norte",
      address: "Av. Principal 123, Centro",
      lat: -12.0464,
      lng: -77.0428,
      selected: false,
    },
    {
      id: 2,
      name: "Oficina Corporativa Lima",
      address: "Jr. Lampa 456, Lima",
      lat: -12.0432,
      lng: -77.0282,
      selected: false,
    },
    {
      id: 3,
      name: "Almacén Industrial",
      address: "Av. Industrial 789, Callao",
      lat: -12.0546,
      lng: -77.1181,
      selected: false,
    },
    {
      id: 4,
      name: "Sucursal Miraflores",
      address: "Av. Larco 321, Miraflores",
      lat: -12.1196,
      lng: -77.0365,
      selected: false,
    },
    {
      id: 5,
      name: "Centro de Distribución",
      address: "Av. Universitaria 654, San Martín",
      lat: -12.0175,
      lng: -77.0512,
      selected: false,
    },
    {
      id: 6,
      name: "Tienda San Isidro",
      address: "Av. Javier Prado 987, San Isidro",
      lat: -12.0931,
      lng: -77.0465,
      selected: false,
    },
    {
      id: 7,
      name: "Punto de Entrega Surco",
      address: "Av. Benavides 147, Surco",
      lat: -12.1348,
      lng: -77.0112,
      selected: false,
    },
    {
      id: 8,
      name: "Oficina Satelital Norte",
      address: "Av. Túpac Amaru 258, Independencia",
      lat: -11.9939,
      lng: -77.0547,
      selected: false,
    },
  ]

  const [locations, setLocations] = useState(availableLocations)

  const handleLocationToggle = (locationId) => {
    setLocations((prev) => prev.map((loc) => (loc.id === locationId ? { ...loc, selected: !loc.selected } : loc)))
    setSelectedLocations((prev) => {
      const location = locations.find((loc) => loc.id === locationId)
      if (location.selected) {
        return prev.filter((id) => id !== locationId)
      } else {
        return [...prev, locationId]
      }
    })
  }

  const handleOptimize = () => {
    if (selectedLocations.length < 2) {
      alert("Selecciona al menos 2 ubicaciones para optimizar la ruta")
      return
    }

    setIsOptimizing(true)
    setTimeout(() => {
      const selectedLocs = locations.filter((loc) => selectedLocations.includes(loc.id))
      const baseDistance = selectedLocs.length * 3.2 + Math.random() * 8
      const optimizedDistance = baseDistance + Math.random() * 4.5

      setOptimizationResults({
        originalDistance: baseDistance.toFixed(1),
        optimizedDistance: optimizedDistance.toFixed(1),
        timeSaved: `${Math.floor(Math.random() * 2 + 1)}h ${Math.floor(Math.random() * 45 + 15)}m`,
        estimatedTime: `${Math.floor((optimizedDistance / 20) * 60)} minutos`,
        selectedCount: selectedLocs.length,
        optimizedRoute: selectedLocs.sort(() => Math.random() - 0.5),
      })
      setIsOptimizing(false)
    }, 2500)
  }

  const handleSaveRoute = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert("Ruta guardada exitosamente en el sistema")
    }, 1000)
  }

  const handleShareRoute = () => {
    setIsSharing(true)
    setTimeout(() => {
      setIsSharing(false)
      // Simulate PDF generation or sharing link
      const routeData = {
        distance: optimizationResults.optimizedDistance,
        time: optimizationResults.estimatedTime,
        points: optimizationResults.optimizedRoute.length + 2,
      }
      alert(`Enlace de ruta generado: https://routes.app/share/${Date.now()}`)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Mapa Interactivo de Rutas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
            {optimizationResults ? (
              <div className="relative w-full h-full p-4">
                <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded border shadow-sm">
                  <div className="relative w-full h-full overflow-hidden rounded">
                    {/* Simulated route line */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
                      <defs>
                        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                      {/* Route line connecting points */}
                      <path
                        d="M 30 50 Q 80 30 120 60 T 200 80 Q 240 90 270 120"
                        stroke="url(#routeGradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      {/* Numbered markers for route points */}
                      {[
                        { x: 30, y: 50, label: "S" },
                        { x: 80, y: 45, label: "1" },
                        { x: 120, y: 60, label: "2" },
                        { x: 160, y: 70, label: "3" },
                        { x: 200, y: 80, label: "4" },
                        { x: 270, y: 120, label: "F" },
                      ].map((point, index) => (
                        <g key={index}>
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="12"
                            fill={point.label === "S" || point.label === "F" ? "#10b981" : "#3b82f6"}
                            stroke="white"
                            strokeWidth="2"
                          />
                          <text
                            x={point.x}
                            y={point.y + 4}
                            textAnchor="middle"
                            fill="white"
                            fontSize="10"
                            fontWeight="bold"
                          >
                            {point.label}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Ruta Optimizada
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Navigation className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground font-medium">Mapa Interactivo</p>
                <p className="text-sm text-muted-foreground">Visualización de ubicaciones y rutas optimizadas</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Puntos de Interés</span>
              </div>
              <Badge variant="outline">{selectedLocations.length} seleccionados</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-secondary/20 transition-colors"
                >
                  <Checkbox
                    id={`location-${location.id}`}
                    checked={location.selected}
                    onCheckedChange={() => handleLocationToggle(location.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <label htmlFor={`location-${location.id}`} className="font-medium text-sm cursor-pointer block">
                      {location.name}
                    </label>
                    <p className="text-xs text-muted-foreground truncate">{location.address}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Configuración de Optimización</Label>
              <Select defaultValue="distance">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distancia más corta</SelectItem>
                  <SelectItem value="time">Tiempo más rápido</SelectItem>
                  <SelectItem value="fuel">Eficiencia de combustible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleOptimize}
              disabled={isOptimizing || selectedLocations.length < 2}
              className="w-full"
              size="lg"
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Calculando ruta óptima...
                </>
              ) : (
                <>
                  <Route className="w-4 h-4 mr-2" />
                  Optimizar Ruta
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Resumen de la Ruta Optimizada</CardTitle>
          </CardHeader>
          <CardContent>
            {optimizationResults ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border-2 border-primary/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Distancia Total</p>
                      <p className="text-3xl font-bold text-primary">{optimizationResults.optimizedDistance} km</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Tiempo Estimado</p>
                      <p className="text-3xl font-bold text-foreground">{optimizationResults.estimatedTime}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Tiempo Ahorrado</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      {optimizationResults.timeSaved}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Orden Óptimo de Puntos</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto bg-secondary/5 p-3 rounded-lg">
                    <div className="flex items-center space-x-3 p-2 bg-primary/5 rounded">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                        S
                      </div>
                      <span className="text-sm font-medium">Punto de Inicio</span>
                    </div>
                    {optimizationResults.optimizedRoute.map((location, index) => (
                      <div key={location.id} className="flex items-center space-x-3 p-2 hover:bg-secondary/20 rounded">
                        <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium block">{location.name}</span>
                          <span className="text-xs text-muted-foreground truncate block">{location.address}</span>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center space-x-3 p-2 bg-primary/5 rounded">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                        F
                      </div>
                      <span className="text-sm font-medium">Punto de Retorno</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={handleSaveRoute}
                      disabled={isSaving}
                      variant="outline"
                      size="lg"
                      className="h-12 bg-transparent"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Route className="w-4 h-4 mr-2" />
                          Guardar Ruta
                        </>
                      )}
                    </Button>
                    <Button onClick={handleShareRoute} disabled={isSharing} size="lg" className="h-12">
                      {isSharing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generando PDF...
                        </>
                      ) : (
                        <>
                          <Navigation className="w-4 h-4 mr-2" />
                          Imprimir/Compartir
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Route className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Selecciona ubicaciones y optimiza</p>
                <p className="text-sm text-muted-foreground">Los resultados aparecerán aquí</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
