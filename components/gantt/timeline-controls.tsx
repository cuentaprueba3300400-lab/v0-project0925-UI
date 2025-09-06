"use client"

import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw, Play, Pause } from "lucide-react"

export function TimelineControls() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm">
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm">
        <RotateCcw className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-2" />
      <Button variant="outline" size="sm">
        <Play className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm">
        <Pause className="h-4 w-4" />
      </Button>
    </div>
  )
}
