"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Activity, Search, Video } from "lucide-react"
import { useState } from "react"

export default function AttendantDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const navigation = [{ label: "Dashboard", href: "/dashboard/attendant", icon: <Activity className="w-5 h-5" /> }]

  const activeAlerts = [
    {
      id: 1,
      passenger: "John Doe",
      coach: "C",
      seat: "45",
      symptom: "Chest Pain",
      severity: "critical",
      time: "5 min ago",
      bp: "140/90",
      hr: "95",
    },
    {
      id: 2,
      passenger: "Jane Smith",
      coach: "B",
      seat: "32",
      symptom: "Fever",
      severity: "warning",
      time: "12 min ago",
      bp: "120/80",
      hr: "88",
    },
    {
      id: 3,
      passenger: "Mike Johnson",
      coach: "D",
      seat: "18",
      symptom: "Dizziness",
      severity: "info",
      time: "28 min ago",
      bp: "118/76",
      hr: "70",
    },
  ]

  const patients = [
    { id: 1, name: "John Doe", coach: "C", seat: "45", status: "critical", lastVitals: "5 min ago" },
    { id: 2, name: "Jane Smith", coach: "B", seat: "32", status: "warning", lastVitals: "12 min ago" },
    { id: 3, name: "Mike Johnson", coach: "D", seat: "18", status: "stable", lastVitals: "28 min ago" },
  ]

  const consultations = [
    { id: 1, patient: "John Doe", doctor: "Dr. Smith", status: "active", duration: "5 min" },
    { id: 2, patient: "Jane Smith", doctor: "Dr. Johnson", status: "pending", duration: "-" },
  ]

  return (
    <DashboardLayout title="🏥 Attendant Dashboard" role="attendant" navigation={navigation}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alerts">🚨 Alerts</TabsTrigger>
          <TabsTrigger value="patients">👥 Patients</TabsTrigger>
          <TabsTrigger value="vitals">📊 Vitals</TabsTrigger>
          <TabsTrigger value="consultations">📞 Consultations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-border bg-gradient-to-br from-blue-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">🔴 Active Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">3</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-gradient-to-br from-red-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">🆘 Critical</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-destructive animate-pulse">1</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-gradient-to-br from-yellow-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">⏳ Pending Consult</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[var(--warning)]">2</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-gradient-to-br from-green-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">✅ Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[var(--success)]">8</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">📊 Record Vitals</CardTitle>
                <CardDescription>Update patient vital signs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-primary hover:bg-primary/90 transition-all">📝 Open Vitals Form</Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">🔌 Connect IoT Device</CardTitle>
                <CardDescription>Sync with medical devices</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-accent hover:bg-accent/90 transition-all">⚙️ Pair Device</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🚨 Active Alerts</CardTitle>
              <CardDescription>Immediate attention required</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300 ${
                      alert.severity === "critical"
                        ? "border-red-200 bg-red-50/30 animate-pulse"
                        : alert.severity === "warning"
                          ? "border-yellow-200 bg-yellow-50/30"
                          : "border-blue-200 bg-blue-50/30"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          className={`
                          ${alert.severity === "critical" ? "status-critical" : ""}
                          ${alert.severity === "warning" ? "status-warning" : ""}
                          ${alert.severity === "info" ? "status-info" : ""}
                        `}
                        >
                          {alert.severity === "critical" ? "🆘" : alert.severity === "warning" ? "⚠️" : "ℹ️"}{" "}
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <p className="font-semibold text-foreground">{alert.passenger}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        🚂 Coach {alert.coach}, Seat {alert.seat} • {alert.symptom}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        💓 BP: {alert.bp} • ❤️ HR: {alert.hr} bpm • ⏱️ {alert.time}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-primary hover:bg-primary/90 transition-all">
                        👁️ View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-primary/10 transition-colors bg-transparent"
                      >
                        📞 Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Patients Tab */}
        <TabsContent value="patients" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">👥 Patient Management</CardTitle>
              <CardDescription>Search and manage all patients</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="🔍 Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 transition-all focus:ring-2"
                />
                <Button size="icon" variant="outline" className="hover:bg-primary/10 transition-colors bg-transparent">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:shadow-md transition-all duration-300 hover:bg-muted/30"
                  >
                    <div>
                      <p className="font-semibold text-foreground">👤 {patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        🚂 Coach {patient.coach}, Seat {patient.seat}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`
                        ${patient.status === "critical" ? "status-critical" : ""}
                        ${patient.status === "warning" ? "status-warning" : ""}
                        ${patient.status === "stable" ? "status-success" : ""}
                      `}
                      >
                        {patient.status === "critical" ? "🆘" : patient.status === "warning" ? "⚠️" : "✅"}{" "}
                        {patient.status}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-primary/10 transition-colors bg-transparent"
                      >
                        👁️ View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vitals Tab */}
        <TabsContent value="vitals" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📊 Record Vital Signs</CardTitle>
              <CardDescription>Enter patient vitals manually or sync from device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">💓 Blood Pressure</label>
                  <Input placeholder="e.g., 120/80" className="transition-all focus:ring-2" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">❤️ Heart Rate (bpm)</label>
                  <Input placeholder="e.g., 72" className="transition-all focus:ring-2" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">💨 SpO2 (%)</label>
                  <Input placeholder="e.g., 98" className="transition-all focus:ring-2" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">🌡️ Temperature (°C)</label>
                  <Input placeholder="e.g., 37.2" className="transition-all focus:ring-2" />
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 transition-all">💾 Save Vitals</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Consultations Tab */}
        <TabsContent value="consultations" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📞 Telemedicine Consultations</CardTitle>
              <CardDescription>Manage doctor consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {consultations.map((consult) => (
                  <div
                    key={consult.id}
                    className={`flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300 ${
                      consult.status === "active"
                        ? "border-green-200 bg-green-50/30"
                        : "border-yellow-200 bg-yellow-50/30"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-foreground">👤 {consult.patient}</p>
                      <p className="text-sm text-muted-foreground">👨‍⚕️ {consult.doctor}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={consult.status === "active" ? "bg-[var(--success)]" : "bg-[var(--warning)]"}>
                        {consult.status === "active" ? "🟢" : "🟡"} {consult.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">⏱️ {consult.duration}</span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 transition-all">
                        <Video className="w-4 h-4 mr-2" />📞 Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
