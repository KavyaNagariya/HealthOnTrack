"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Users, Activity, Zap, Phone, Clock, MapPin } from "lucide-react"
import { useState } from "react"

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      passenger: "John Doe",
      coach: "C",
      seat: "45",
      symptom: "Chest Pain",
      severity: "critical",
      time: "5 min ago",
      description: "Severe chest pain, shortness of breath",
      vitals: { hr: 105, bp: "145/95", spo2: 94 },
    },
    {
      id: 2,
      passenger: "Jane Smith",
      coach: "B",
      seat: "32",
      symptom: "Fever",
      severity: "warning",
      time: "12 min ago",
      description: "High fever, body aches",
      vitals: { hr: 92, bp: "130/85", spo2: 97 },
    },
    {
      id: 3,
      passenger: "Mike Johnson",
      coach: "D",
      seat: "18",
      symptom: "Dizziness",
      severity: "info",
      time: "28 min ago",
      description: "Mild dizziness, feeling faint",
      vitals: { hr: 78, bp: "118/75", spo2: 99 },
    },
  ])

  const navigation = [
    { label: "Dashboard", href: "/dashboard/attendant", icon: <Activity className="w-5 h-5" /> },
    { label: "Active Alerts", href: "/dashboard/attendant/alerts", icon: <AlertCircle className="w-5 h-5" /> },
    { label: "Patients", href: "/dashboard/attendant/patients", icon: <Users className="w-5 h-5" /> },
    { label: "Vitals Monitor", href: "/dashboard/attendant/vitals", icon: <Zap className="w-5 h-5" /> },
    { label: "Consultations", href: "/dashboard/attendant/consultations", icon: <Phone className="w-5 h-5" /> },
  ]

  const handleResolve = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <DashboardLayout title="Active Alerts" role="attendant" navigation={navigation}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{alerts.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Critical</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">
                {alerts.filter((a) => a.severity === "critical").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">2.3 min</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className={`border-l-4 ${alert.severity === "critical" ? "border-l-destructive" : alert.severity === "warning" ? "border-l-warning" : "border-l-accent"}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge
                        className={`
                        ${alert.severity === "critical" ? "status-critical" : ""}
                        ${alert.severity === "warning" ? "status-warning" : ""}
                        ${alert.severity === "info" ? "status-info" : ""}
                      `}
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <h3 className="text-lg font-semibold text-foreground">{alert.passenger}</h3>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Coach {alert.coach}, Seat {alert.seat}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {alert.time}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-foreground mb-1">{alert.symptom}</p>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Heart Rate</p>
                    <p className="font-semibold text-foreground">{alert.vitals.hr} bpm</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Blood Pressure</p>
                    <p className="font-semibold text-foreground">{alert.vitals.bp}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">SpO2</p>
                    <p className="font-semibold text-foreground">{alert.vitals.spo2}%</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">Call Doctor</Button>
                  <Button className="flex-1 bg-accent hover:bg-accent/90">Start Consultation</Button>
                  <Button variant="outline" onClick={() => handleResolve(alert.id)}>
                    Resolve
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
