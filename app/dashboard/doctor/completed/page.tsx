"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, CheckCircle, Video, FileText, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function CompletedPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const completedCases = [
    {
      id: 1,
      patient: "Jane Smith",
      date: "2024-10-20",
      diagnosis: "Viral Fever",
      treatment: "Rest, fluids, antipyretics",
      status: "resolved",
    },
    {
      id: 2,
      patient: "Mike Johnson",
      date: "2024-10-20",
      diagnosis: "Vertigo",
      treatment: "Vestibular exercises, medication",
      status: "resolved",
    },
    {
      id: 3,
      patient: "Sarah Williams",
      date: "2024-10-19",
      diagnosis: "Migraine",
      treatment: "Pain management, rest",
      status: "resolved",
    },
    {
      id: 4,
      patient: "Tom Brown",
      date: "2024-10-19",
      diagnosis: "Gastritis",
      treatment: "Antacids, dietary changes",
      status: "resolved",
    },
  ]

  const navigation = [
    { label: "Dashboard", href: "/dashboard/doctor", icon: <Activity className="w-5 h-5" /> },
    { label: "Pending Consultations", href: "/dashboard/doctor/pending", icon: <Clock className="w-5 h-5" /> },
    { label: "Active Calls", href: "/dashboard/doctor/calls", icon: <Video className="w-5 h-5" /> },
    { label: "Completed Cases", href: "/dashboard/doctor/completed", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Prescriptions", href: "/dashboard/doctor/prescriptions", icon: <FileText className="w-5 h-5" /> },
  ]

  const filteredCases = completedCases.filter((c) => c.patient.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <DashboardLayout title="Completed Cases" role="doctor" navigation={navigation}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{completedCases.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--success)]">2</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">12</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredCases.map((caseItem) => (
            <Card key={caseItem.id} className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{caseItem.patient}</h3>
                      <Badge className="status-success">{caseItem.status.toUpperCase()}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{caseItem.date}</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium text-foreground">Diagnosis:</span>{" "}
                        <span className="text-muted-foreground">{caseItem.diagnosis}</span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium text-foreground">Treatment:</span>{" "}
                        <span className="text-muted-foreground">{caseItem.treatment}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                      <Download className="w-4 h-4" />
                      Report
                    </Button>
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
