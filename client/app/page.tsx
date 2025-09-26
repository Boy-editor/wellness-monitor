"use client"

import { useState } from "react"
import { WellnessSidebar } from "@/components/wellness-sidebar"
import { DashboardOverview } from "@/components/dashboard-overview"
import { BreakTimer } from "@/components/break-timer"
import { EyeCare } from "@/components/eye-care"
import { PostureTracker } from "@/components/posture-tracker"
import { HydrationTracker } from "@/components/hydration-tracker"
import { WellnessSettings } from "@/components/wellness-settings"
import { WellnessScore } from "@/components/wellness-score"

export default function WellnessMonitorPage() {
  const [activeSection, setActiveSection] = useState("overview")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "break-timer":
        return <BreakTimer />
      case "eye-care":
        return <EyeCare />
      case "posture":
        return <PostureTracker />
      case "hydration":
        return <HydrationTracker />
      case "wellness-score":
        return <WellnessScore />
      case "settings":
        return <WellnessSettings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <WellnessSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  )
}
