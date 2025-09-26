"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Activity, Eye, Timer, Heart, Droplets, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const wellnessData = [
  { time: "9:00", eyeStrain: 20, posture: 85, hydration: 90, breaks: 3 },
  { time: "10:00", eyeStrain: 35, posture: 75, hydration: 85, breaks: 2 },
  { time: "11:00", eyeStrain: 45, posture: 70, hydration: 80, breaks: 1 },
  { time: "12:00", eyeStrain: 25, posture: 90, hydration: 95, breaks: 4 },
  { time: "13:00", eyeStrain: 30, posture: 85, hydration: 90, breaks: 3 },
  { time: "14:00", eyeStrain: 50, posture: 65, hydration: 75, breaks: 1 },
  { time: "15:00", eyeStrain: 60, posture: 60, hydration: 70, breaks: 0 },
  { time: "16:00", eyeStrain: 40, posture: 80, hydration: 85, breaks: 2 },
]

const chartConfig = {
  eyeStrain: {
    label: "Eye Strain",
    color: "hsl(var(--chart-1))",
  },
  posture: {
    label: "Posture Score",
    color: "hsl(var(--chart-2))",
  },
  hydration: {
    label: "Hydration",
    color: "hsl(var(--chart-3))",
  },
}

export function DashboardOverview() {
  const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const workingTime = "2h 34m"
  const nextBreak = "26m"

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Wellness Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor your computer usage and health metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="px-3 py-1">
            <Clock className="w-3 h-3 mr-1" />
            {currentTime}
          </Badge>
          <Button className="bg-primary hover:bg-primary/90">Take Break Now</Button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Working Time</CardTitle>
            <Timer className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workingTime}</div>
            <p className="text-xs text-muted-foreground">+23m from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Break</CardTitle>
            <AlertTriangle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nextBreak}</div>
            <p className="text-xs text-muted-foreground">Recommended: 20-20-20 rule</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-chart-2/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
            <Heart className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Good - Keep it up!</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-chart-3/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Breaks Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Target: 12 breaks</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wellness Trends Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Wellness Trends
            </CardTitle>
            <CardDescription>Your health metrics throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={wellnessData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="posture"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-2)", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hydration"
                    stroke="var(--color-chart-3)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-chart-3)", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Eye Strain Monitor */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Eye Strain Monitor
            </CardTitle>
            <CardDescription>Track your eye fatigue levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wellnessData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="eyeStrain"
                    stroke="var(--color-chart-1)"
                    fill="var(--color-chart-1)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Posture Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Posture Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">75%</span>
              <Badge variant="secondary">Needs Improvement</Badge>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Slouching detected 4 times in the last hour. Consider adjusting your chair height.
            </p>
          </CardContent>
        </Card>

        {/* Hydration Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Droplets className="w-4 h-4" />
              Hydration Level
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">85%</span>
              <Badge className="bg-chart-3 text-chart-3-foreground">Good</Badge>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-sm text-muted-foreground">6 glasses consumed today. Next reminder in 45 minutes.</p>
          </CardContent>
        </Card>

        {/* Break Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Break Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">67%</span>
              <Badge variant="outline">8/12 breaks</Badge>
            </div>
            <Progress value={67} className="h-2" />
            <p className="text-sm text-muted-foreground">
              You've missed 4 recommended breaks. Try setting more frequent reminders.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Take immediate steps to improve your wellness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Eye className="w-4 h-4" />
              Start Eye Exercise
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Activity className="w-4 h-4" />
              Posture Check
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Droplets className="w-4 h-4" />
              Log Water Intake
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Timer className="w-4 h-4" />
              Schedule Break
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
