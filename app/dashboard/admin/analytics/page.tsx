"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Zap, Package, TrendingUp } from "lucide-react"

export default function AnalyticsPage() {
  const navigation = [
    { label: "Dashboard", href: "/dashboard/admin", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Train Health Map", href: "/dashboard/admin/trains", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Device Monitoring", href: "/dashboard/admin/devices", icon: <Zap className="w-5 h-5" /> },
    { label: "Inventory", href: "/dashboard/admin/inventory", icon: <Package className="w-5 h-5" /> },
  ]

  const metrics = [
    { label: "Total Cases This Month", value: "156", trend: "+12%" },
    { label: "Average Response Time", value: "2.3 min", trend: "-0.5 min" },
    { label: "Case Resolution Rate", value: "94%", trend: "+2%" },
    { label: "Patient Satisfaction", value: "4.7/5", trend: "+0.2" },
    { label: "Staff Utilization", value: "87%", trend: "+5%" },
    { label: "Device Uptime", value: "99.8%", trend: "+0.1%" },
  ]

  const casesByType = [
    { type: "Chest Pain", count: 34, percentage: 22 },
    { type: "Fever", count: 28, percentage: 18 },
    { type: "Dizziness", count: 22, percentage: 14 },
    { type: "Headache", count: 19, percentage: 12 },
    { type: "Other", count: 53, percentage: 34 },
  ]

  return (
    <DashboardLayout title="Analytics Dashboard" role="admin" navigation={navigation}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, idx) => (
            <Card key={idx} className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                  <p className="text-sm text-[var(--success)]">{metric.trend}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Cases by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {casesByType.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{item.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.count} cases ({item.percentage}%)
                    </p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Peak Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { hour: "8:00 AM - 10:00 AM", cases: 12 },
                  { hour: "12:00 PM - 2:00 PM", cases: 18 },
                  { hour: "6:00 PM - 8:00 PM", cases: 15 },
                  { hour: "10:00 PM - 12:00 AM", cases: 8 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded">
                    <p className="text-sm text-foreground">{item.hour}</p>
                    <p className="font-semibold text-primary">{item.cases} cases</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Staff Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Dr. Sarah", cases: 24, rating: 4.8 },
                  { name: "Dr. John", cases: 19, rating: 4.6 },
                  { name: "Paramedic Mike", cases: 31, rating: 4.7 },
                  { name: "Paramedic Sarah", cases: 28, rating: 4.9 },
                ].map((staff, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div>
                      <p className="text-sm font-medium text-foreground">{staff.name}</p>
                      <p className="text-xs text-muted-foreground">{staff.cases} cases</p>
                    </div>
                    <p className="font-semibold text-accent">{staff.rating}/5</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
