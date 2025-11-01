"use client"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Users, Activity, Zap, Phone } from "lucide-react"
import { useState } from "react"

export default function VitalsPage() {
  const [selectedPatient, setSelectedPatient] = useState("John Doe")
  const [vitals, setVitals] = useState({
    heartRate: "105",
    bloodPressure: "145/95",
    temperature: "37.8",
    spo2: "94",
    respiratoryRate: "22",
  })

  const navigation = [
    { label: "Dashboard", href: "/dashboard/attendant", icon: <Activity className="w-5 h-5" /> },
    { label: "Active Alerts", href: "/dashboard/attendant/alerts", icon: <AlertCircle className="w-5 h-5" /> },
    { label: "Patients", href: "/dashboard/attendant/patients", icon: <Users className="w-5 h-5" /> },
    { label: "Vitals Monitor", href: "/dashboard/attendant/vitals", icon: <Zap className="w-5 h-5" /> },
    { label: "Consultations", href: "/dashboard/attendant/consultations", icon: <Phone className="w-5 h-5" /> },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Vitals recorded successfully")
  }

  return (
    <DashboardLayout title="Vitals Monitor" role="attendant" navigation={navigation}>
      <div className="space-y-6 max-w-2xl">
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Record Patient Vitals</CardTitle>
            <CardDescription>Update vital signs from IoT devices or manual entry</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Select Patient</Label>
                <select
                  id="patient"
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option>John Doe - Coach C, Seat 45</option>
                  <option>Jane Smith - Coach B, Seat 32</option>
                  <option>Mike Johnson - Coach D, Seat 18</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hr">Heart Rate (bpm)</Label>
                  <Input
                    id="hr"
                    type="number"
                    value={vitals.heartRate}
                    onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bp">Blood Pressure (mmHg)</Label>
                  <Input
                    id="bp"
                    type="text"
                    value={vitals.bloodPressure}
                    onChange={(e) => setVitals({ ...vitals, bloodPressure: e.target.value })}
                    placeholder="120/80"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temp">Temperature (°C)</Label>
                  <Input
                    id="temp"
                    type="number"
                    step="0.1"
                    value={vitals.temperature}
                    onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spo2">Oxygen Saturation (%)</Label>
                  <Input
                    id="spo2"
                    type="number"
                    value={vitals.spo2}
                    onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="rr">Respiratory Rate (breaths/min)</Label>
                  <Input
                    id="rr"
                    type="number"
                    value={vitals.respiratoryRate}
                    onChange={(e) => setVitals({ ...vitals, respiratoryRate: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Record Vitals
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>IoT Device Sync</CardTitle>
            <CardDescription>Connect and sync with medical devices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 border border-border rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Pulse Oximeter</p>
                <p className="text-sm text-muted-foreground">Device ID: POX-001</p>
              </div>
              <Button size="sm" variant="outline">
                Connect
              </Button>
            </div>
            <div className="p-4 border border-border rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Blood Pressure Monitor</p>
                <p className="text-sm text-muted-foreground">Device ID: BPM-002</p>
              </div>
              <Button size="sm" className="bg-[var(--success)] hover:bg-[var(--success)]/90">
                Connected
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
