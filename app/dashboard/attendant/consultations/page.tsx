"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Users, Activity, Zap, Phone, Video, Mic } from "lucide-react"

export default function ConsultationsPage() {
  const consultations = [
    {
      id: 1,
      patient: "John Doe",
      doctor: "Dr. Sarah",
      status: "active",
      startTime: "5 min ago",
      coach: "C",
      seat: "45",
    },
    {
      id: 2,
      patient: "Jane Smith",
      doctor: "Dr. John",
      status: "pending",
      startTime: "Waiting...",
      coach: "B",
      seat: "32",
    },
    {
      id: 3,
      patient: "Mike Johnson",
      doctor: "Dr. Sarah",
      status: "completed",
      startTime: "30 min ago",
      coach: "D",
      seat: "18",
    },
  ]

  const navigation = [
    { label: "Dashboard", href: "/dashboard/attendant", icon: <Activity className="w-5 h-5" /> },
    { label: "Active Alerts", href: "/dashboard/attendant/alerts", icon: <AlertCircle className="w-5 h-5" /> },
    { label: "Patients", href: "/dashboard/attendant/patients", icon: <Users className="w-5 h-5" /> },
    { label: "Vitals Monitor", href: "/dashboard/attendant/vitals", icon: <Zap className="w-5 h-5" /> },
    { label: "Consultations", href: "/dashboard/attendant/consultations", icon: <Phone className="w-5 h-5" /> },
  ]

  return (
    <DashboardLayout title="Telemedicine Consultations" role="attendant" navigation={navigation}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">1</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--warning)]">1</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--success)]">5</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {consultations.map((consult) => (
            <Card key={consult.id} className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{consult.patient}</h3>
                      <Badge
                        className={`
                        ${consult.status === "active" ? "status-success" : ""}
                        ${consult.status === "pending" ? "status-warning" : ""}
                        ${consult.status === "completed" ? "bg-muted text-muted-foreground" : ""}
                      `}
                      >
                        {consult.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Doctor: {consult.doctor} • Coach {consult.coach}, Seat {consult.seat}
                    </p>
                    <p className="text-xs text-muted-foreground">{consult.startTime}</p>
                  </div>
                  <div className="flex gap-2">
                    {consult.status === "active" && (
                      <>
                        <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                          <Video className="w-4 h-4" />
                          Video
                        </Button>
                        <Button size="sm" className="gap-2 bg-accent hover:bg-accent/90">
                          <Mic className="w-4 h-4" />
                          Audio
                        </Button>
                      </>
                    )}
                    {consult.status === "pending" && (
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Start Call
                      </Button>
                    )}
                    {consult.status === "completed" && (
                      <Button size="sm" variant="outline">
                        View Notes
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
