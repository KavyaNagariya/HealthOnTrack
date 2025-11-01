"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Heart, MessageSquare, FileText, AlertCircle } from "lucide-react"

export default function VitalsPage() {
  const vitals = [
    { label: "Heart Rate", value: "72", unit: "bpm", status: "success" },
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "success" },
    { label: "Oxygen Saturation", value: "98", unit: "%", status: "success" },
    { label: "Temperature", value: "37.2", unit: "°C", status: "success" },
  ]

  const navigation = [
    { label: "Dashboard", href: "/dashboard/passenger", icon: <Activity className="w-5 h-5" /> },
    { label: "Emergency Request", href: "/dashboard/passenger/emergency", icon: <AlertCircle className="w-5 h-5" /> },
    { label: "Messages", href: "/dashboard/passenger/messages", icon: <MessageSquare className="w-5 h-5" /> },
    { label: "Vitals", href: "/dashboard/passenger/vitals", icon: <Heart className="w-5 h-5" /> },
    { label: "Prescriptions", href: "/dashboard/passenger/prescriptions", icon: <FileText className="w-5 h-5" /> },
  ]

  return (
    <DashboardLayout title="Vital Signs" role="passenger" navigation={navigation}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vitals.map((vital) => (
            <Card key={vital.label} className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{vital.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">{vital.value}</span>
                  <span className="text-sm text-muted-foreground">{vital.unit}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${vital.status === "success" ? "bg-[var(--success)]" : "bg-[var(--warning)]"}`}
                  ></div>
                  <span className="text-xs text-muted-foreground capitalize">{vital.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Vital Signs History</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "10:30 AM", hr: 72, bp: "120/80", spo2: 98 },
                { time: "2:15 PM", hr: 75, bp: "122/82", spo2: 97 },
                { time: "6:45 PM", hr: 70, bp: "118/78", spo2: 99 },
              ].map((record, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium text-foreground">{record.time}</span>
                  <div className="text-xs text-muted-foreground space-x-4">
                    <span>HR: {record.hr} bpm</span>
                    <span>BP: {record.bp}</span>
                    <span>SPO2: {record.spo2}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
