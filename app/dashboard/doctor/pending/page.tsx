"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, CheckCircle, Video, FileText } from "lucide-react"

export default function PendingPage() {
  const consultations = [
    {
      id: 1,
      patient: "John Doe",
      train: "Express 12A",
      coach: "C",
      seat: "45",
      symptom: "Chest Pain",
      severity: "critical",
      waitTime: "5 min",
      vitals: { hr: 105, bp: "145/95", spo2: 94 },
      attendant: "Paramedic John",
    },
    {
      id: 2,
      patient: "Jane Smith",
      train: "Express 12A",
      coach: "B",
      seat: "32",
      symptom: "High Fever",
      severity: "warning",
      waitTime: "12 min",
      vitals: { hr: 92, bp: "130/85", spo2: 97 },
      attendant: "Paramedic Sarah",
    },
    {
      id: 3,
      patient: "Mike Johnson",
      train: "Express 12A",
      coach: "D",
      seat: "18",
      symptom: "Dizziness",
      severity: "info",
      waitTime: "28 min",
      vitals: { hr: 78, bp: "118/75", spo2: 99 },
      attendant: "Paramedic Mike",
    },
  ]

  const navigation = [
    { label: "Dashboard", href: "/dashboard/doctor", icon: <Activity className="w-5 h-5" /> },
    { label: "Pending Consultations", href: "/dashboard/doctor/pending", icon: <Clock className="w-5 h-5" /> },
    { label: "Active Calls", href: "/dashboard/doctor/calls", icon: <Video className="w-5 h-5" /> },
    { label: "Completed Cases", href: "/dashboard/doctor/completed", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Prescriptions", href: "/dashboard/doctor/prescriptions", icon: <FileText className="w-5 h-5" /> },
  ]

  return (
    <DashboardLayout title="Pending Consultations" role="doctor" navigation={navigation}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{consultations.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Critical Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">
                {consultations.filter((c) => c.severity === "critical").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Wait Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--warning)]">15 min</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {consultations.map((consultation) => (
            <Card
              key={consultation.id}
              className={`border-l-4 ${consultation.severity === "critical" ? "border-l-destructive" : consultation.severity === "warning" ? "border-l-warning" : "border-l-accent"}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge
                        className={`
                        ${consultation.severity === "critical" ? "status-critical" : ""}
                        ${consultation.severity === "warning" ? "status-warning" : ""}
                        ${consultation.severity === "info" ? "status-info" : ""}
                      `}
                      >
                        {consultation.severity.toUpperCase()}
                      </Badge>
                      <h3 className="text-lg font-semibold text-foreground">{consultation.patient}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {consultation.train} • Coach {consultation.coach}, Seat {consultation.seat}
                    </p>
                    <p className="text-sm font-medium text-foreground mb-2">{consultation.symptom}</p>
                    <p className="text-xs text-muted-foreground">
                      Attendant: {consultation.attendant} • Waiting: {consultation.waitTime}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Heart Rate</p>
                    <p className="font-semibold text-foreground">{consultation.vitals.hr} bpm</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Blood Pressure</p>
                    <p className="font-semibold text-foreground">{consultation.vitals.bp}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">SpO2</p>
                    <p className="font-semibold text-foreground">{consultation.vitals.spo2}%</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 gap-2 bg-primary hover:bg-primary/90">
                    <Video className="w-4 h-4" />
                    Start Video Call
                  </Button>
                  <Button className="flex-1 bg-accent hover:bg-accent/90">View Full History</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
