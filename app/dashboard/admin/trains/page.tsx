"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Zap, Package, TrendingUp } from "lucide-react"

export default function TrainsPage() {
  const trains = [
    {
      id: 1,
      name: "Express 12A",
      route: "Delhi - Mumbai",
      status: "active",
      cases: 3,
      devices: 8,
      passengers: 450,
      doctors: 2,
      attendants: 4,
      health: 92,
    },
    {
      id: 2,
      name: "Rajdhani 15",
      route: "Delhi - Kolkata",
      status: "active",
      cases: 1,
      devices: 8,
      passengers: 380,
      doctors: 2,
      attendants: 3,
      health: 98,
    },
    {
      id: 3,
      name: "Shatabdi 8",
      route: "Delhi - Agra",
      status: "active",
      cases: 0,
      devices: 6,
      passengers: 200,
      doctors: 1,
      attendants: 2,
      health: 100,
    },
    {
      id: 4,
      name: "Local 42",
      route: "Mumbai - Pune",
      status: "active",
      cases: 2,
      devices: 4,
      passengers: 320,
      doctors: 1,
      attendants: 2,
      health: 85,
    },
  ]

  const navigation = [
    { label: "Dashboard", href: "/dashboard/admin", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Train Health Map", href: "/dashboard/admin/trains", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Device Monitoring", href: "/dashboard/admin/devices", icon: <Zap className="w-5 h-5" /> },
    { label: "Inventory", href: "/dashboard/admin/inventory", icon: <Package className="w-5 h-5" /> },
  ]

  return (
    <DashboardLayout title="Train Health Map" role="admin" navigation={navigation}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Trains</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{trains.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Passengers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{trains.reduce((sum, t) => sum + t.passengers, 0)}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--warning)]">{trains.reduce((sum, t) => sum + t.cases, 0)}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--success)]">
                {Math.round(trains.reduce((sum, t) => sum + t.health, 0) / trains.length)}%
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {trains.map((train) => (
            <Card key={train.id} className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{train.name}</h3>
                      <Badge className="status-success">{train.status.toUpperCase()}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{train.route}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-foreground">{train.health}%</p>
                    <p className="text-xs text-muted-foreground">Health Score</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Passengers</p>
                    <p className="font-semibold text-foreground">{train.passengers}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Doctors</p>
                    <p className="font-semibold text-foreground">{train.doctors}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Attendants</p>
                    <p className="font-semibold text-foreground">{train.attendants}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Active Cases</p>
                    <p className="font-semibold text-[var(--warning)]">{train.cases}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Devices</p>
                    <p className="font-semibold text-[var(--success)]">{train.devices}</p>
                  </div>
                </div>

                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
