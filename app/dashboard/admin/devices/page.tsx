"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Zap, Package, TrendingUp } from "lucide-react"

export default function DevicesPage() {
  const devices = [
    {
      id: 1,
      name: "Pulse Oximeter",
      type: "Vital Monitor",
      train: "Express 12A",
      status: "online",
      battery: 95,
      lastSync: "2 min ago",
    },
    {
      id: 2,
      name: "Blood Pressure Monitor",
      type: "Vital Monitor",
      train: "Express 12A",
      status: "online",
      battery: 87,
      lastSync: "5 min ago",
    },
    {
      id: 3,
      name: "ECG Machine",
      type: "Diagnostic",
      train: "Rajdhani 15",
      status: "online",
      battery: 92,
      lastSync: "1 min ago",
    },
    {
      id: 4,
      name: "Thermometer",
      type: "Vital Monitor",
      train: "Shatabdi 8",
      status: "online",
      battery: 78,
      lastSync: "8 min ago",
    },
    {
      id: 5,
      name: "Defibrillator",
      type: "Emergency",
      train: "Local 42",
      status: "offline",
      battery: 45,
      lastSync: "1 hour ago",
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
    <DashboardLayout title="Device Monitoring" role="admin" navigation={navigation}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Devices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{devices.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Online</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--success)]">
                {devices.filter((d) => d.status === "online").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Offline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">
                {devices.filter((d) => d.status === "offline").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Battery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">
                {Math.round(devices.reduce((sum, d) => sum + d.battery, 0) / devices.length)}%
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {devices.map((device) => (
            <Card key={device.id} className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{device.name}</h3>
                      <Badge className={device.status === "online" ? "status-success" : "status-warning"}>
                        {device.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {device.type} • {device.train}
                    </p>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground">Battery Level</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${device.battery > 50 ? "bg-[var(--success)]" : device.battery > 20 ? "bg-[var(--warning)]" : "bg-destructive"}`}
                              style={{ width: `${device.battery}%` }}
                            ></div>
                          </div>
                          <p className="text-sm font-medium text-foreground">{device.battery}%</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Last Sync</p>
                        <p className="text-sm font-medium text-foreground mt-1">{device.lastSync}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Sync
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
