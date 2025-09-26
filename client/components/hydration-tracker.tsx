"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Droplets, Plus, Minus, Clock, Target, TrendingUp } from "lucide-react"

const hydrationData = [
  { time: "8:00", intake: 250, target: 250 },
  { time: "10:00", intake: 500, target: 500 },
  { time: "12:00", intake: 750, target: 750 },
  { time: "14:00", intake: 900, target: 1000 },
  { time: "16:00", intake: 1100, target: 1250 },
  { time: "18:00", intake: 1300, target: 1500 },
]

const chartConfig = {
  intake: {
    label: "Water Intake",
    color: "hsl(var(--chart-3))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--chart-2))",
  },
}

export function HydrationTracker() {
  const [dailyIntake, setDailyIntake] = useState(1300) // ml
  const [dailyTarget, setDailyTarget] = useState(2000) // ml
  const [reminderInterval, setReminderInterval] = useState(60) // minutes
  const [reminderEnabled, setReminderEnabled] = useState(true)
  const [lastDrink, setLastDrink] = useState(45) // minutes ago

  const hydrationPercentage = Math.min(100, (dailyIntake / dailyTarget) * 100)
  const remainingIntake = Math.max(0, dailyTarget - dailyIntake)
  const glassesConsumed = Math.floor(dailyIntake / 250) // 250ml per glass

  const addWater = (amount: number) => {
    setDailyIntake((prev) => Math.min(prev + amount, dailyTarget + 500))
    setLastDrink(0)
  }

  const removeWater = (amount: number) => {
    setDailyIntake((prev) => Math.max(prev - amount, 0))
  }

  const getHydrationStatus = () => {
    if (hydrationPercentage >= 100) return { text: "Excellent", variant: "default" as const, color: "text-chart-2" }
    if (hydrationPercentage >= 75) return { text: "Good", variant: "secondary" as const, color: "text-chart-3" }
    if (hydrationPercentage >= 50) return { text: "Fair", variant: "secondary" as const, color: "text-chart-4" }
    return { text: "Low", variant: "destructive" as const, color: "text-chart-1" }
  }

  const hydrationStatus = getHydrationStatus()

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Hydration Tracker</h1>
          <p className="text-muted-foreground mt-1">Stay hydrated for optimal health and focus</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={hydrationStatus.variant} className="px-3 py-1">
            <Droplets className="w-3 h-3 mr-1" />
            {hydrationStatus.text}
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Progress</CardTitle>
            <Target className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(hydrationPercentage)}%</div>
            <p className="text-xs text-muted-foreground">
              {dailyIntake}ml of {dailyTarget}ml
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Glasses Today</CardTitle>
            <Droplets className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{glassesConsumed}</div>
            <p className="text-xs text-muted-foreground">250ml per glass</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{remainingIntake}ml</div>
            <p className="text-xs text-muted-foreground">{Math.ceil(remainingIntake / 250)} glasses left</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Drink</CardTitle>
            <Clock className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lastDrink}m</div>
            <p className="text-xs text-muted-foreground">ago</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hydration Progress */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              Daily Progress
            </CardTitle>
            <CardDescription>Track your water intake goal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 mx-auto">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="hsl(var(--muted))" strokeWidth="8" fill="transparent" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - hydrationPercentage / 100)}`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{Math.round(hydrationPercentage)}%</div>
                      <div className="text-xs text-muted-foreground">Complete</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-lg font-semibold">{dailyIntake}ml</div>
                <div className="text-sm text-muted-foreground">of {dailyTarget}ml target</div>
              </div>
            </div>

            {/* Quick Add Buttons */}
            <div className="space-y-3">
              <Label>Quick Add Water</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => addWater(250)} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Glass (250ml)
                </Button>
                <Button variant="outline" onClick={() => addWater(500)} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Bottle (500ml)
                </Button>
              </div>
              <Button variant="outline" onClick={() => removeWater(250)} className="w-full flex items-center gap-2">
                <Minus className="w-4 h-4" />
                Remove Last Entry
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hydration Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hydration Timeline</CardTitle>
            <CardDescription>Your water intake throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hydrationData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="intake" fill="var(--color-chart-3)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} fillOpacity={0.3} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Settings and Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hydration Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Hydration Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Daily Target (ml)</Label>
              <Select value={dailyTarget.toString()} onValueChange={(value) => setDailyTarget(Number.parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1500">1,500ml (6 glasses)</SelectItem>
                  <SelectItem value="2000">2,000ml (8 glasses)</SelectItem>
                  <SelectItem value="2500">2,500ml (10 glasses)</SelectItem>
                  <SelectItem value="3000">3,000ml (12 glasses)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Reminder Interval</Label>
              <Select
                value={reminderInterval.toString()}
                onValueChange={(value) => setReminderInterval(Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">Every 30 minutes</SelectItem>
                  <SelectItem value="60">Every hour</SelectItem>
                  <SelectItem value="90">Every 90 minutes</SelectItem>
                  <SelectItem value="120">Every 2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="hydration-reminders">Hydration Reminders</Label>
              <Switch id="hydration-reminders" checked={reminderEnabled} onCheckedChange={setReminderEnabled} />
            </div>
          </CardContent>
        </Card>

        {/* Hydration Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Hydration Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-chart-3 mt-0.5 flex-shrink-0" />
                <p>Start your day with a glass of water</p>
              </div>
              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-chart-3 mt-0.5 flex-shrink-0" />
                <p>Keep a water bottle at your desk</p>
              </div>
              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-chart-3 mt-0.5 flex-shrink-0" />
                <p>Drink water before, during, and after meals</p>
              </div>
              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-chart-3 mt-0.5 flex-shrink-0" />
                <p>Set regular reminders to drink water</p>
              </div>
              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-chart-3 mt-0.5 flex-shrink-0" />
                <p>Monitor urine color as a hydration indicator</p>
              </div>
              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-chart-3 mt-0.5 flex-shrink-0" />
                <p>Increase intake during exercise or hot weather</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
