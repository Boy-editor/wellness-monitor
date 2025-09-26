"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Eye, Timer, Heart, Settings, TrendingUp, Droplets, Menu, X } from "lucide-react"

interface WellnessSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function WellnessSidebar({ activeSection, onSectionChange }: WellnessSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "break-timer", label: "Break Timer", icon: Timer },
    { id: "eye-care", label: "Eye Care", icon: Eye },
    { id: "posture", label: "Posture", icon: TrendingUp },
    { id: "hydration", label: "Hydration", icon: Droplets },
    { id: "wellness-score", label: "Wellness Score", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <Card
      className={`h-screen transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"} border-r bg-card/50 backdrop-blur-sm`}
    >
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">WellnessMonitor</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="ml-auto">
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${isCollapsed ? "px-2" : "px-3"}`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          )
        })}
      </div>

      {!isCollapsed && (
        <div className="p-4 mt-auto">
          <Card className="p-3 bg-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-wellness" />
              <span className="text-sm font-medium">Active Session</span>
            </div>
            <p className="text-xs text-muted-foreground">2h 34m working time</p>
            <Badge variant="secondary" className="mt-2 text-xs">
              Next break in 26m
            </Badge>
          </Card>
        </div>
      )}
    </Card>
  )
}
