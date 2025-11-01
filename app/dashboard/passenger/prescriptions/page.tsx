"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Heart, MessageSquare, FileText, AlertCircle, Download } from "lucide-react"

export default function PrescriptionsPage() {
  const prescriptions = [
    {
      id: 1,
      medication: "Aspirin",
      dosage: "500mg",
      frequency: "Twice daily",
      duration: "7 days",
      doctor: "Dr. Sarah",
      date: "2024-10-20",
    },
    {
      id: 2,
      medication: "Paracetamol",
      dosage: "250mg",
      frequency: "As needed",
      duration: "5 days",
      doctor: "Dr. John",
      date: "2024-10-18",
    },
  ]

  const navigation = [
    { label: "Dashboard", href: "/dashboard/passenger", icon: <Activity className="w-5 h-5" /> },
    { label: "Emergency Request", href: "/dashboard/passenger/emergency", icon: <AlertCircle className="w-5 h-5" /> },
    { label: "Messages", href: "/dashboard/passenger/messages", icon: <MessageSquare className="w-5 h-5" /> },
    { label: "Vitals", href: "/dashboard/passenger/vitals", icon: <Heart className="w-5 h-5" /> },
    { label: "Prescriptions", href: "/dashboard/passenger/prescriptions", icon: <FileText className="w-5 h-5" /> },
  ]

  return (
    <DashboardLayout title="E-Prescriptions" role="passenger" navigation={navigation}>
      <div className="space-y-6">
        <div className="grid gap-4">
          {prescriptions.map((rx) => (
            <Card key={rx.id} className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{rx.medication}</CardTitle>
                    <CardDescription>Prescribed by {rx.doctor}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Dosage</p>
                    <p className="font-medium text-foreground">{rx.dosage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Frequency</p>
                    <p className="font-medium text-foreground">{rx.frequency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium text-foreground">{rx.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">{rx.date}</p>
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
