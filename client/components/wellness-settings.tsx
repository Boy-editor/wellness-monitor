"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Bell,
  Monitor,
  User,
  Shield,
  Download,
  Upload,
  RotateCcw,
  Moon,
  Sun,
  Volume2,
  Smartphone,
  Mail,
} from "lucide-react"

export function WellnessSettings() {
  // General Settings
  const [theme, setTheme] = useState("system")
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("auto")

  // Notification Settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [notificationVolume, setNotificationVolume] = useState([75])

  // Break Settings
  const [workInterval, setWorkInterval] = useState(25)
  const [shortBreakDuration, setShortBreakDuration] = useState(5)
  const [longBreakDuration, setLongBreakDuration] = useState(15)
  const [autoStartBreaks, setAutoStartBreaks] = useState(true)
  const [strictMode, setStrictMode] = useState(false)

  // Health Monitoring
  const [eyeTrackingEnabled, setEyeTrackingEnabled] = useState(true)
  const [postureMonitoring, setPostureMonitoring] = useState(true)
  const [hydrationReminders, setHydrationReminders] = useState(true)
  const [dailyWaterTarget, setDailyWaterTarget] = useState(2000)

  // Privacy Settings
  const [dataCollection, setDataCollection] = useState(true)
  const [analytics, setAnalytics] = useState(false)
  const [shareData, setShareData] = useState(false)

  // Profile Settings
  const [userName, setUserName] = useState("John Doe")
  const [userEmail, setUserEmail] = useState("john@example.com")
  const [workingHours, setWorkingHours] = useState("9:00 AM - 5:00 PM")

  const handleExportData = () => {
    // Simulate data export
    const data = {
      settings: {
        theme,
        notifications: notificationsEnabled,
        workInterval,
        dailyWaterTarget,
      },
      timestamp: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "wellness-data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleResetSettings = () => {
    // Reset to defaults
    setTheme("system")
    setNotificationsEnabled(true)
    setWorkInterval(25)
    setDailyWaterTarget(2000)
    // ... reset other settings
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Settings & Preferences</h1>
          <p className="text-muted-foreground mt-1">Customize your wellness monitoring experience</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExportData} className="flex items-center gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
          <Button variant="outline" onClick={handleResetSettings} className="flex items-center gap-2 bg-transparent">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="breaks">Breaks</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                General Preferences
              </CardTitle>
              <CardDescription>Configure basic application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-detect</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="gmt">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Working Hours</Label>
                  <Input value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Control how and when you receive wellness reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive wellness reminders and alerts</p>
                </div>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Sound Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Play sounds for alerts</p>
                  </div>
                  <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Browser notifications</p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Daily wellness summaries</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notification Volume: {notificationVolume[0]}%</Label>
                <Slider
                  value={notificationVolume}
                  onValueChange={setNotificationVolume}
                  max={100}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Break Settings */}
        <TabsContent value="breaks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Break Timer Configuration</CardTitle>
              <CardDescription>Customize your break intervals and durations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Work Interval (minutes)</Label>
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

                <div className="space-y-2">
                  <Label>Short Break (minutes)</Label>
                  <Select
                    value={shortBreakDuration.toString()}
                    onValueChange={(value) => setShortBreakDuration(Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 minutes</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Long Break (minutes)</Label>
                  <Select
                    value={longBreakDuration.toString()}
                    onValueChange={(value) => setLongBreakDuration(Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="20">20 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-start Breaks</Label>
                    <p className="text-sm text-muted-foreground">Automatically start breaks when work interval ends</p>
                  </div>
                  <Switch checked={autoStartBreaks} onCheckedChange={setAutoStartBreaks} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Strict Mode</Label>
                    <p className="text-sm text-muted-foreground">Prevent skipping breaks and enforce wellness rules</p>
                  </div>
                  <Switch checked={strictMode} onCheckedChange={setStrictMode} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Monitoring */}
        <TabsContent value="health" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Monitoring Settings</CardTitle>
              <CardDescription>Configure wellness tracking features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Eye Strain Tracking</Label>
                    <p className="text-sm text-muted-foreground">Monitor eye fatigue and blink rate</p>
                  </div>
                  <Switch checked={eyeTrackingEnabled} onCheckedChange={setEyeTrackingEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Posture Monitoring</Label>
                    <p className="text-sm text-muted-foreground">Track sitting posture and slouching</p>
                  </div>
                  <Switch checked={postureMonitoring} onCheckedChange={setPostureMonitoring} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Hydration Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminders to drink water</p>
                  </div>
                  <Switch checked={hydrationReminders} onCheckedChange={setHydrationReminders} />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Daily Water Target: {dailyWaterTarget}ml</Label>
                <Slider
                  value={[dailyWaterTarget]}
                  onValueChange={(value) => setDailyWaterTarget(value[0])}
                  max={4000}
                  min={1000}
                  step={250}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1L</span>
                  <span>2.5L</span>
                  <span>4L</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Data
              </CardTitle>
              <CardDescription>Control how your wellness data is collected and used</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Collection</Label>
                    <p className="text-sm text-muted-foreground">Allow collection of wellness metrics for insights</p>
                  </div>
                  <Switch checked={dataCollection} onCheckedChange={setDataCollection} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Usage Analytics</Label>
                    <p className="text-sm text-muted-foreground">Help improve the app with anonymous usage data</p>
                  </div>
                  <Switch checked={analytics} onCheckedChange={setAnalytics} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Share Anonymized Data</Label>
                    <p className="text-sm text-muted-foreground">Contribute to wellness research (fully anonymized)</p>
                  </div>
                  <Switch checked={shareData} onCheckedChange={setShareData} />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Data Management</h4>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleExportData}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <Download className="w-4 h-4" />
                    Export My Data
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Upload className="w-4 h-4" />
                    Import Data
                  </Button>
                  <Button variant="destructive" className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Delete All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Manage your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Work Schedule</Label>
                <Input value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} />
                <p className="text-sm text-muted-foreground">Used to customize break reminders and wellness insights</p>
              </div>

              <div className="space-y-2">
                <Label>Wellness Goals</Label>
                <Textarea
                  placeholder="Describe your wellness goals and what you'd like to achieve..."
                  className="min-h-[100px]"
                />
              </div>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
