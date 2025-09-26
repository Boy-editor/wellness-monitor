"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Timer, Play, Pause, RotateCcw, Eye, Coffee, Dumbbell, Settings } from "lucide-react"

type BreakType = "micro" | "short" | "long" | "eye"

interface BreakSession {
  type: BreakType
  duration: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const breakTypes: Record<BreakType, BreakSession> = {
  micro: {
    type: "micro",
    duration: 30,
    title: "Micro Break",
    description: "Quick stretch and posture reset",
    icon: Timer,
    color: "bg-chart-1",
  },
  short: {
    type: "short",
    duration: 300,
    title: "Short Break",
    description: "5-minute movement and hydration",
    icon: Coffee,
    color: "bg-chart-2",
  },
  long: {
    type: "long",
    duration: 900,
    title: "Long Break",
    description: "15-minute walk and mental reset",
    icon: Dumbbell,
    color: "bg-chart-3",
  },
  eye: {
    type: "eye",
    duration: 20,
    title: "Eye Break",
    description: "20-20-20 rule: Look 20ft away for 20 seconds",
    icon: Eye,
    color: "bg-chart-4",
  },
}

export function BreakTimer() {
  const [selectedBreak, setSelectedBreak] = useState<BreakType>("short")
  const [timeRemaining, setTimeRemaining] = useState(breakTypes.short.duration)
  const [isActive, setIsActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [autoStart, setAutoStart] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Auto-break intervals (in minutes)
  const [workInterval, setWorkInterval] = useState(25)
  const [nextAutoBreak, setNextAutoBreak] = useState(workInterval * 60)

  const currentBreak = breakTypes[selectedBreak]
  const progress = ((currentBreak.duration - timeRemaining) / currentBreak.duration) * 100

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const playNotificationSound = useCallback(() => {
    if (soundEnabled && typeof window !== "undefined") {
      // Create a simple notification sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800
      oscillator.type = "sine"
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }, [soundEnabled])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsActive(false)
            setIsCompleted(true)
            playNotificationSound()
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeRemaining, playNotificationSound])

  // Auto-break countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (autoStart && !isActive && nextAutoBreak > 0) {
      interval = setInterval(() => {
        setNextAutoBreak((time) => {
          if (time <= 1) {
            // Trigger auto break
            setSelectedBreak("short")
            setTimeRemaining(breakTypes.short.duration)
            setIsActive(true)
            playNotificationSound()
            return workInterval * 60
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoStart, isActive, nextAutoBreak, workInterval, playNotificationSound])

  const startTimer = () => {
    setIsActive(true)
    setIsCompleted(false)
  }

  const pauseTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsCompleted(false)
    setTimeRemaining(currentBreak.duration)
  }

  const handleBreakTypeChange = (type: BreakType) => {
    setSelectedBreak(type)
    setTimeRemaining(breakTypes[type].duration)
    setIsActive(false)
    setIsCompleted(false)
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Break Timer</h1>
          <p className="text-muted-foreground mt-1">Take regular breaks to maintain your wellness</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {autoStart && <>Next auto break: {formatTime(nextAutoBreak)}</>}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timer */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${currentBreak.color} text-white`}>
                  <currentBreak.icon className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>{currentBreak.title}</CardTitle>
                  <CardDescription>{currentBreak.description}</CardDescription>
                </div>
              </div>
              <Badge variant={isCompleted ? "default" : isActive ? "secondary" : "outline"}>
                {isCompleted ? "Completed" : isActive ? "Active" : "Ready"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timer Display */}
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="text-6xl font-mono font-bold animate-breathe">{formatTime(timeRemaining)}</div>
                {isActive && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-4 h-4 bg-primary rounded-full animate-pulse-wellness" />
                  </div>
                )}
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3">
              {!isActive ? (
                <Button onClick={startTimer} size="lg" className="px-8">
                  <Play className="w-4 h-4 mr-2" />
                  Start Break
                </Button>
              ) : (
                <Button onClick={pauseTimer} variant="secondary" size="lg" className="px-8">
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              )}
              <Button onClick={resetTimer} variant="outline" size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Break Type Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.values(breakTypes).map((breakType) => {
                const Icon = breakType.icon
                const isSelected = selectedBreak === breakType.type

                return (
                  <Button
                    key={breakType.type}
                    variant={isSelected ? "default" : "outline"}
                    className="h-auto p-3 flex flex-col gap-2"
                    onClick={() => handleBreakTypeChange(breakType.type)}
                    disabled={isActive}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{breakType.title}</span>
                    <span className="text-xs text-muted-foreground">{formatTime(breakType.duration)}</span>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Settings & Stats */}
        <div className="space-y-4">
          {/* Timer Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Timer Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-start">Auto-start breaks</Label>
                <Switch id="auto-start" checked={autoStart} onCheckedChange={setAutoStart} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sound">Sound notifications</Label>
                <Switch id="sound" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
              <div className="space-y-2">
                <Label>Work interval (minutes)</Label>
                <Select
                  value={workInterval.toString()}
                  onValueChange={(value) => setWorkInterval(Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="25">25 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Today's Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Today's Breaks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Micro breaks</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Short breaks</span>
                <Badge variant="secondary">6</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Long breaks</span>
                <Badge variant="secondary">2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Eye breaks</span>
                <Badge variant="secondary">18</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Break Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Suggested Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>• Stand up and stretch your arms</p>
                <p>• Look out the window for 20 seconds</p>
                <p>• Do 10 neck rolls</p>
                <p>• Take 5 deep breaths</p>
                <p>• Drink a glass of water</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
