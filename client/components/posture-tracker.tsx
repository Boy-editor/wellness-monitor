"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Activity, AlertTriangle, CheckCircle, TrendingUp, User, Settings } from "lucide-react"

const postureData = [
  { time: "9:00", good: 85, fair: 10, poor: 5 },
  { time: "10:00", good: 75, fair: 20, poor: 5 },
  { time: "11:00", good: 65, fair: 25, poor: 10 },
  { time: "12:00", good: 90, fair: 8, poor: 2 },
  { time: "13:00", good: 80, fair: 15, poor: 5 },
  { time: "14:00", good: 60, fair: 30, poor: 10 },
  { time: "15:00", good: 55, fair: 25, poor: 20 },
  { time: "16:00", good: 70, fair: 20, poor: 10 },
]

const postureBreakdown = [
  { name: "Good Posture", value: 68, color: "hsl(var(--chart-2))" },
  { name: "Fair Posture", value: 22, color: "hsl(var(--chart-4))" },
  { name: "Poor Posture", value: 10, color: "hsl(var(--chart-1))" },
]

const chartConfig = {
  good: {
    label: "Good Posture",
    color: "hsl(var(--chart-2))",
  },
  fair: {
    label: "Fair Posture",
    color: "hsl(var(--chart-4))",
  },
  poor: {
    label: "Poor Posture",
    color: "hsl(var(--chart-1))",
  },
}

export function PostureTracker() {
  const [postureScore, setPostureScore] = useState(68)
  const [slouchingEvents, setSlounchingEvents] = useState(12)
  const [reminderEnabled, setReminderEnabled] = useState(true)
  const [calibrationMode, setCalibrationMode] = useState(false)

  const getPostureGrade = (score: number) => {
    if (score >= 80) return { grade: "Excellent", color: "bg-chart-2", variant: "default" as const }
    if (score >= 60) return { grade: "Good", color: "bg-chart-4", variant: "secondary" as const }
    if (score >= 40) return { grade: "Fair", color: "bg-chart-4", variant: "secondary" as const }
    return { grade: "Poor", color: "bg-chart-1", variant: "destructive" as const }
  }

  const postureGrade = getPostureGrade(postureScore)

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Posture Tracker</h1>
          <p className="text-muted-foreground mt-1">Monitor and improve your sitting posture</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={postureGrade.variant} className="px-3 py-1">
            <Activity className="w-3 h-3 mr-1" />
            {postureGrade.grade}
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posture Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postureScore}%</div>
            <p className="text-xs text-muted-foreground">+5% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Slouching Events</CardTitle>
            <AlertTriangle className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{slouchingEvents}</div>
            <p className="text-xs text-muted-foreground">-3 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Good Posture Time</CardTitle>
            <CheckCircle className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2h</div>
            <p className="text-xs text-muted-foreground">68% of work time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posture Breaks</CardTitle>
            <User className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Recommended: 8</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posture Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Posture Timeline
            </CardTitle>
            <CardDescription>Your posture quality throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={postureData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="good"
                    stackId="1"
                    stroke="var(--color-chart-2)"
                    fill="var(--color-chart-2)"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="fair"
                    stackId="1"
                    stroke="var(--color-chart-4)"
                    fill="var(--color-chart-4)"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="poor"
                    stackId="1"
                    stroke="var(--color-chart-1)"
                    fill="var(--color-chart-1)"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Posture Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Posture Breakdown</CardTitle>
            <CardDescription>Today's posture distribution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={postureBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {postureBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="space-y-2">
              {postureBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posture Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Posture Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="posture-reminders">Posture Reminders</Label>
              <Switch id="posture-reminders" checked={reminderEnabled} onCheckedChange={setReminderEnabled} />
            </div>
            <div className="space-y-3">
              <Button
                variant={calibrationMode ? "secondary" : "outline"}
                className="w-full"
                onClick={() => setCalibrationMode(!calibrationMode)}
              >
                {calibrationMode ? "Stop Calibration" : "Calibrate Posture"}
              </Button>
              {calibrationMode && (
                <p className="text-sm text-muted-foreground">
                  Sit in your ideal posture for 10 seconds to calibrate the system.
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Current Posture Score</Label>
              <Progress value={postureScore} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Posture Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Posture Improvement Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                <p>Keep your feet flat on the floor</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                <p>Align your ears over your shoulders</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                <p>Keep your shoulders relaxed and back</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                <p>Support your lower back with a cushion</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                <p>Position your monitor at eye level</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2 mt-0.5 flex-shrink-0" />
                <p>Take regular breaks to stand and stretch</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
