"use client"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Activity, Clock, CheckCircle, Video, FileText } from "lucide-react"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

export default function PrescriptionsPage() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    patient: "",
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: "",
  })

  const prescriptions = [
    {
      id: 1,
      patient: "John Doe",
      medication: "Aspirin",
      dosage: "500mg",
      frequency: "Twice daily",
      duration: "7 days",
      date: "2024-10-20",
    },
    {
      id: 2,
      patient: "Jane Smith",
      medication: "Paracetamol",
      dosage: "250mg",
      frequency: "As needed",
      duration: "5 days",
      date: "2024-10-20",
    },
  ]

  const navigation = [
    { label: "Dashboard", href: "/dashboard/doctor", icon: <Activity className="w-5 h-5" /> },
    { label: "Pending Consultations", href: "/dashboard/doctor/pending", icon: <Clock className="w-5 h-5" /> },
    { label: "Active Calls", href: "/dashboard/doctor/calls", icon: <Video className="w-5 h-5" /> },
    { label: "Completed Cases", href: "/dashboard/doctor/completed", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Prescriptions", href: "/dashboard/doctor/prescriptions", icon: <FileText className="w-5 h-5" /> },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Prescription created successfully")
    setShowForm(false)
    setFormData({ patient: "", medication: "", dosage: "", frequency: "", duration: "", notes: "" })
  }

  return (
    <DashboardLayout title="Prescription Management" role="doctor" navigation={navigation}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-foreground">Recent Prescriptions</h2>
          <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90">
            {showForm ? "Cancel" : "New Prescription"}
          </Button>
        </div>

        {showForm && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Create New Prescription</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient Name</Label>
                  <Input
                    id="patient"
                    value={formData.patient}
                    onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                    placeholder="Select or enter patient name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="medication">Medication</Label>
                    <Input
                      id="medication"
                      value={formData.medication}
                      onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                      placeholder="e.g., Aspirin"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      value={formData.dosage}
                      onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                      placeholder="e.g., 500mg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Input
                      id="frequency"
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                      placeholder="e.g., Twice daily"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 7 days"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special instructions or notes..."
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Create Prescription
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {prescriptions.map((rx) => (
            <Card key={rx.id} className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{rx.patient}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Medication</p>
                        <p className="font-medium text-foreground">{rx.medication}</p>
                      </div>
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
                  </div>
                  <Button size="sm" variant="outline">
                    View/Edit
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
