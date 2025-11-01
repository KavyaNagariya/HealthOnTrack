"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, CheckCircle, Video, FileText, Mic, MicOff, Phone, PhoneOff } from "lucide-react"
import { useState } from "react"
import { useLiveVitals } from "@/lib/use-live-vitals"

export default function CallsPage() {
  const [activeCall, setActiveCall] = useState(true)
  const [micOn, setMicOn] = useState(true)
  const vitals = useLiveVitals("john-doe")

  const navigation = [
    { label: "Dashboard", href: "/dashboard/doctor", icon: <Activity className="w-5 h-5" /> },
    { label: "Pending Consultations", href: "/dashboard/doctor/pending", icon: <Clock className="w-5 h-5" /> },
    { label: "Active Calls", href: "/dashboard/doctor/calls", icon: <Video className="w-5 h-5" /> },
    { label: "Completed Cases", href: "/dashboard/doctor/completed", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Prescriptions", href: "/dashboard/doctor/prescriptions", icon: <FileText className="w-5 h-5" /> },
  ]

  return (
    <DashboardLayout title="Active Consultations" role="doctor" navigation={navigation}>
      <div className="space-y-6">
        {activeCall && (
          <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>John Doe - Chest Pain</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Coach C, Seat 45 • Express 12A</p>
                </div>
                <Badge className="status-success animate-pulse">LIVE</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Heart Rate</p>
                  <p className="text-2xl font-bold text-foreground">{Math.round(vitals.heartRate)}</p>
                  <p className="text-xs text-muted-foreground">bpm</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Blood Pressure</p>
                  <p className="text-2xl font-bold text-foreground">{vitals.bloodPressure}</p>
                  <p className="text-xs text-muted-foreground">mmHg</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Oxygen Saturation</p>
                  <p className="text-2xl font-bold text-foreground">{Math.round(vitals.spo2)}</p>
                  <p className="text-xs text-muted-foreground">%</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Temperature</p>
                  <p className="text-2xl font-bold text-foreground">{vitals.temperature.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">°C</p>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4 min-h-64 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-16 h-16 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-muted-foreground">Video feed would appear here</p>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setMicOn(!micOn)}
                  className={
                    micOn ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground"
                  }
                >
                  {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </Button>
                <Button
                  size="lg"
                  className="bg-destructive hover:bg-destructive/90"
                  onClick={() => setActiveCall(false)}
                >
                  <PhoneOff className="w-5 h-5 mr-2" />
                  End Call
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!activeCall && (
          <Card className="border-border">
            <CardContent className="pt-6 text-center">
              <Phone className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No active calls</p>
              <Button className="mt-4 bg-primary hover:bg-primary/90">Check Pending Consultations</Button>
            </CardContent>
          </Card>
        )}

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Call History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { patient: "Jane Smith", duration: "12 min", time: "2 hours ago", status: "completed" },
                { patient: "Mike Johnson", duration: "8 min", time: "4 hours ago", status: "completed" },
                { patient: "Sarah Williams", duration: "15 min", time: "Yesterday", status: "completed" },
              ].map((call, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{call.patient}</p>
                    <p className="text-sm text-muted-foreground">{call.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{call.duration}</p>
                    <Badge className="status-success mt-1">{call.status.toUpperCase()}</Badge>
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
