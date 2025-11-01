"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Users, Activity, Zap, Phone, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const patients = [
    {
      id: 1,
      name: "John Doe",
      coach: "C",
      seat: "45",
      status: "critical",
      condition: "Chest Pain",
      admittedTime: "5 min ago",
      vitals: { hr: 105, bp: "145/95" },
    },
    {
      id: 2,
      name: "Jane Smith",
      coach: "B",
      seat: "32",
      status: "warning",
      condition: "Fever",
      admittedTime: "12 min ago",
      vitals: { hr: 92, bp: "130/85" },
    },
    {
      id: 3,
      name: "Mike Johnson",
      coach: "D",
      seat: "18",
      status: "stable",
      condition: "Dizziness",
      admittedTime: "28 min ago",
      vitals: { hr: 78, bp: "118/75" },
    },
    {
      id: 4,
      name: "Sarah Williams",
      coach: "A",
      seat: "12",
      status: "stable",
      condition: "Routine Check",
      admittedTime: "1 hour ago",
      vitals: { hr: 72, bp: "120/80" },
    },
  ]

  const navigation = [
    { label: "Dashboard", href: "/dashboard/attendant", icon: <Activity className="w-5 h-5" /> },
    { label: "Active Alerts", href: "/dashboard/attendant/alerts", icon: <AlertCircle className="w-5 h-5" /> },
    { label: "Patients", href: "/dashboard/attendant/patients", icon: <Users className="w-5 h-5" /> },
    { label: "Vitals Monitor", href: "/dashboard/attendant/vitals", icon: <Zap className="w-5 h-5" /> },
    { label: "Consultations", href: "/dashboard/attendant/consultations", icon: <Phone className="w-5 h-5" /> },
  ]

  const filteredPatients = patients.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <DashboardLayout title="Patient Management" role="attendant" navigation={navigation}>
      <div className="space-y-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Add Patient</Button>
        </div>

        <div className="grid gap-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
                      <Badge
                        className={`
                        ${patient.status === "critical" ? "status-critical" : ""}
                        ${patient.status === "warning" ? "status-warning" : ""}
                        ${patient.status === "stable" ? "status-success" : ""}
                      `}
                      >
                        {patient.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Coach {patient.coach}, Seat {patient.seat} • {patient.condition}
                    </p>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Heart Rate</p>
                        <p className="font-semibold text-foreground">{patient.vitals.hr} bpm</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Blood Pressure</p>
                        <p className="font-semibold text-foreground">{patient.vitals.bp}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Admitted</p>
                        <p className="font-semibold text-foreground text-sm">{patient.admittedTime}</p>
                      </div>
                      <div className="flex gap-2 items-end">
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Update Vitals
                        </Button>
                      </div>
                    </div>
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
