"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Heart,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  BarChart3,
} from "lucide-react"

const wellnessScoreData = [
  { day: "Mon", score: 72, posture: 68, hydration: 85, breaks: 60, eyeCare: 75 },
  { day: "Tue", score: 78, posture: 75, hydration: 90, breaks: 70, eyeCare: 80 },
  { day: "Wed", score: 65, posture: 60, hydration: 75, breaks: 55, eyeCare: 70 },
  { day: "Thu", score: 82, posture: 85, hydration: 88, breaks: 80, eyeCare: 85 },
  { day: "Fri", score: 88, posture: 90, hydration: 95, breaks: 85, eyeCare: 82 },
  { day: "Sat", score: 75, posture: 70, hydration: 80, breaks: 75, eyeCare: 78 },
  { day: "Sun", score: 70, posture: 65, hydration: 85, breaks: 65, eyeCare: 75 },
]

const monthlyTrend = [
  { week: "Week 1", score: 68 },
  { week: "Week 2", score: 72 },
  { week: "Week 3", score: 78 },
  { week: "Week 4", score: 82 },
]

const achievements = [
  { id: 1, title: "Hydration Hero", description: "Reached daily water goal 7 days in a row", earned: true },
  { id: 2, title: "Break Master", description: "Took all recommended breaks for 5 days", earned: true },
  { id: 3, title: "Posture Pro", description: "Maintained good posture for 80% of work time", earned: false },
  { id: 4, title: "Eye Care Expert", description: "Completed 20-20-20 exercises 50 times", earned: true },
  { id: 5, title: "Wellness Warrior", description: "Achieved 90+ wellness score for 3 days", earned: false },
]

const insights = [
  {
    type: "positive",
    title: "Great Hydration Habits",
    description: "You've consistently met your daily water intake goals this week. Keep it up!",
    icon: CheckCircle,
    color: "text-chart-2",
  },
  {
    type: "warning",
    title: "Posture Needs Attention",
    description: "Your posture score has declined by 15% this week. Consider adjusting your workspace setup.",
    icon: AlertTriangle,
    color: "text-chart-4",
  },
  {
    type: "tip",
    title: "Break Timing Optimization",
    description: "Taking breaks every 25 minutes instead of 45 could improve your focus and reduce eye strain.",
    icon: Lightbulb,
    color: "text-chart-3",
  },
]

const chartConfig = {
  score: {
    label: "Wellness Score",
    color: "hsl(var(--chart-1))",
  },
  posture: {
    label: "Posture",
    color: "hsl(var(--chart-2))",
  },
  hydration: {
    label: "Hydration",
    color: "hsl(var(--chart-3))",
  },
  breaks: {
    label: "Breaks",
    color: "hsl(var(--chart-4))",
  },
  eyeCare: {
    label: "Eye Care",
    color: "hsl(var(--chart-5))",
  },
}

export function WellnessScore() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const currentScore = 82
  const previousScore = 78
  const scoreChange = currentScore - previousScore
  const isImproving = scoreChange > 0

  const scoreData = [
    {
      name: "Wellness Score",
      value: currentScore,
      fill:
        currentScore > 80 ? "hsl(var(--chart-2))" : currentScore > 60 ? "hsl(var(--chart-4))" : "hsl(var(--chart-1))",
    },
  ]

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: "Excellent", color: "bg-chart-2" }
    if (score >= 80) return { grade: "Very Good", color: "bg-chart-2" }
    if (score >= 70) return { grade: "Good", color: "bg-chart-3" }
    if (score >= 60) return { grade: "Fair", color: "bg-chart-4" }
    return { grade: "Needs Improvement", color: "bg-chart-1" }
  }

  const scoreGrade = getScoreGrade(currentScore)

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Wellness Score & Insights</h1>
          <p className="text-muted-foreground mt-1">Track your overall wellness and get personalized insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={`px-3 py-1 ${scoreGrade.color} text-white`}>
            <Heart className="w-3 h-3 mr-1" />
            {scoreGrade.grade}
          </Badge>
        </div>
      </div>

      {/* Current Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Score Display */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Current Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <ChartContainer config={chartConfig} className="h-[150px] w-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={scoreData}>
                    <RadialBar dataKey="value" cornerRadius={10} fill={scoreData[0].fill} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="absolute text-center">
                <div className="text-3xl font-bold">{currentScore}</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              {isImproving ? (
                <TrendingUp className="w-4 h-4 text-chart-2" />
              ) : (
                <TrendingDown className="w-4 h-4 text-chart-1" />
              )}
              <span className={`text-sm font-medium ${isImproving ? "text-chart-2" : "text-chart-1"}`}>
                {isImproving ? "+" : ""}
                {scoreChange} from last week
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Score Breakdown
            </CardTitle>
            <CardDescription>Your wellness metrics contributing to the overall score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Posture</span>
                  <span className="text-sm">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Hydration</span>
                  <span className="text-sm">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Breaks</span>
                  <span className="text-sm">80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Eye Care</span>
                  <span className="text-sm">82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Wellness Trend</CardTitle>
                <CardDescription>Your wellness score over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={wellnessScoreData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="day" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="var(--color-chart-1)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-chart-1)", strokeWidth: 2, r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Monthly Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
                <CardDescription>Average wellness score by week</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="week" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="var(--color-chart-2)"
                        fill="var(--color-chart-2)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {insights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 text-base ${insight.color}`}>
                      <Icon className="w-5 h-5" />
                      {insight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Personalized Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription>Based on your wellness patterns and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-chart-2 rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium">Optimize Your Break Schedule</h4>
                    <p className="text-sm text-muted-foreground">
                      Your productivity peaks around 10 AM and 2 PM. Consider scheduling longer breaks before these
                      times to maximize focus.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-chart-3 rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium">Improve Workspace Ergonomics</h4>
                    <p className="text-sm text-muted-foreground">
                      Your posture score drops significantly after 2 PM. Consider adjusting your monitor height or chair
                      position.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-chart-4 rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium">Hydration Timing</h4>
                    <p className="text-sm text-muted-foreground">
                      You tend to forget water intake in the afternoon. Set reminders for 2 PM and 4 PM to maintain
                      consistent hydration.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={achievement.earned ? "border-chart-2" : "border-muted"}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className={`w-5 h-5 ${achievement.earned ? "text-chart-2" : "text-muted-foreground"}`} />
                    {achievement.title}
                    {achievement.earned && <Badge className="bg-chart-2 text-white">Earned</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Goals</CardTitle>
                <CardDescription>Track your wellness objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Achieve 90+ Wellness Score</span>
                    <span className="text-sm">82/90</span>
                  </div>
                  <Progress value={(82 / 90) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Take 12 Breaks Daily</span>
                    <span className="text-sm">8/12</span>
                  </div>
                  <Progress value={(8 / 12) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Maintain 85% Posture Score</span>
                    <span className="text-sm">85/85</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Set New Goal</CardTitle>
                <CardDescription>Create a new wellness objective</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Create New Goal
                </Button>
                <div className="text-sm text-muted-foreground">
                  <p>Suggested goals based on your patterns:</p>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Improve afternoon posture score</li>
                    <li>Increase eye exercise frequency</li>
                    <li>Maintain hydration consistency</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
