"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Eye, AlertTriangle, CheckCircle, Timer, Lightbulb, Monitor } from "lucide-react"

const eyeStrainData = [
  { time: "9:00", strain: 15, blinks: 18 },
  { time: "10:00", strain: 25, blinks: 15 },
  { time: "11:00", strain: 35, blinks: 12 },
  { time: "12:00", strain: 20, blinks: 20 },
  { time: "13:00", strain: 30, blinks: 14 },
  { time: "14:00", strain: 45, blinks: 10 },
  { time: "15:00", strain: 55, blinks: 8 },
  { time: "16:00", strain: 35, blinks: 16 },
]

const chartConfig = {
  strain: {
    label: "Eye Strain Level",
    color: "hsl(var(--chart-1))",
  },
  blinks: {
    label: "Blinks per Minute",
    color: "hsl(var(--chart-2))",
  },
}

export function EyeCare() {
  const [blinkRate, setBlinkRate] = useState(12)
  const [screenTime, setScreenTime] = useState(156) // minutes
  const [lastBreak, setLastBreak] = useState(23) // minutes ago
  const [brightness, setBrightness] = useState([75])
  const [blueLight, setBlueLight] = useState(true)
  const [reminderEnabled, setReminderEnabled] = useState(true)
  const [exerciseActive, setExerciseActive] = useState(false)
  const [exerciseTimer, setExerciseTimer] = useState(20)

  const eyeStrainLevel = Math.min(100, screenTime / 2 + (30 - blinkRate) * 2 + lastBreak / 2)
  const eyeHealthScore = Math.max(0, 100 - eyeStrainLevel)

  const radialData = [
    {
      name: "Eye Health",
      value: eyeHealthScore,
      fill:
        eyeHealthScore > 70
          ? "hsl(var(--chart-2))"
          : eyeHealthScore > 40
            ? "hsl(var(--chart-4))"
            : "hsl(var(--chart-1))",
    },
  ]

  // Eye exercise timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (exerciseActive && exerciseTimer > 0) {
      interval = setInterval(() => {
        setExerciseTimer((time) => {
          if (time <= 1) {
            setExerciseActive(false)
            return 20
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [exerciseActive, exerciseTimer])

  const startEyeExercise = () => {
    setExerciseActive(true)
    setExerciseTimer(20)
  }

  const getStrainLevel = (level: number) => {
    if (level < 30) return { text: "Low", color: "bg-chart-2", variant: "default" as const }
    if (level < 60) return { text: "Moderate", color: "bg-chart-4", variant: "secondary" as const }
    return { text: "High", color: "bg-chart-1", variant: "destructive" as const }
  }

  const strainInfo = getStrainLevel(eyeStrainLevel)

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Eye Care Monitor</h1>
          <p className="text-muted-foreground mt-1">Protect your vision with smart eye care tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={strainInfo.variant} className="px-3 py-1">
            <Eye className="w-3 h-3 mr-1" />
            {strainInfo.text} Strain
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Eye Health Score */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Eye Health Score
            </CardTitle>
            <CardDescription>Overall eye wellness assessment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <ChartContainer config={chartConfig} className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={radialData}>
                    <RadialBar dataKey="value" cornerRadius={10} fill={radialData[0].fill} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="absolute text-center">
                <div className="text-3xl font-bold">{Math.round(eyeHealthScore)}</div>
                <div className="text-sm text-muted-foreground">Health Score</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Blink Rate</span>
                <span>{blinkRate}/min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Screen Time</span>
                <span>
                  {Math.floor(screenTime / 60)}h {screenTime % 60}m
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Break</span>
                <span>{lastBreak}m ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eye Strain Tracking */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Eye Strain Tracking
            </CardTitle>
            <CardDescription>Monitor your eye fatigue throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={eyeStrainData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="strain"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-1)", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="blinks"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-2)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Eye Exercise Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            20-20-20 Eye Exercise
          </CardTitle>
          <CardDescription>Look at something 20 feet away for 20 seconds every 20 minutes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {exerciseActive ? (
            <div className="text-center space-y-4">
              <div className="text-6xl font-mono font-bold animate-breathe">{exerciseTimer}</div>
              <p className="text-lg">Look at something 20 feet away</p>
              <Progress value={((20 - exerciseTimer) / 20) * 100} className="h-3" />
              <Button variant="outline" onClick={() => setExerciseActive(false)}>
                Stop Exercise
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Button onClick={startEyeExercise} size="lg" className="px-8">
                <Eye className="w-4 h-4 mr-2" />
                Start Eye Exercise
              </Button>
              <p className="text-sm text-muted-foreground">Recommended every 20 minutes</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings and Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Eye Care Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Display Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Screen Brightness: {brightness[0]}%</Label>
              <Slider value={brightness} onValueChange={setBrightness} max={100} min={10} step={5} className="w-full" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="blue-light">Blue Light Filter</Label>
              <Switch id="blue-light" checked={blueLight} onCheckedChange={setBlueLight} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="reminders">Eye Break Reminders</Label>
              <Switch id="reminders" checked={reminderEnabled} onCheckedChange={setReminderEnabled} />
            </div>
          </CardContent>
        </Card>

        {/* Eye Care Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Eye Care Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                <p>Blink frequently to keep eyes moist (15-20 times per minute)</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                <p>Position your screen 20-26 inches from your eyes</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                <p>Adjust screen brightness to match your surroundings</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                <p>Use artificial tears if you experience dry eyes</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                <p>Ensure proper lighting to reduce glare</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
