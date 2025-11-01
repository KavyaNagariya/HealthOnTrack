"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart3 } from "lucide-react"
import { useState } from "react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const navigation = [{ label: "Dashboard", href: "/dashboard/admin", icon: <BarChart3 className="w-5 h-5" /> }]

  const trainStatus = [
    { id: 1, name: "Express 12A", route: "Delhi - Mumbai", cases: 3, status: "active", devices: 8, health: 92 },
    { id: 2, name: "Rajdhani 15", route: "Delhi - Kolkata", cases: 1, status: "active", devices: 8, health: 98 },
    { id: 3, name: "Shatabdi 8", route: "Delhi - Agra", cases: 0, status: "active", devices: 6, health: 100 },
    { id: 4, name: "Local 42", route: "Mumbai - Pune", cases: 2, status: "active", devices: 4, health: 85 },
  ]

  const devices = [
    { id: 1, name: "Pulse Oximeter #1", train: "Express 12A", battery: 95, status: "online" },
    { id: 2, name: "BP Monitor #2", train: "Express 12A", battery: 78, status: "online" },
    { id: 3, name: "Thermometer #3", train: "Rajdhani 15", battery: 45, status: "online" },
  ]

  const inventory = [
    { id: 1, item: "Bandages", stock: 150, status: "adequate", reorder: 50 },
    { id: 2, item: "Syringes", stock: 45, status: "low", reorder: 100 },
    { id: 3, item: "Gloves", stock: 200, status: "adequate", reorder: 100 },
  ]

  const analytics = {
    totalCases: 24,
    avgResponseTime: "2.1 min",
    casesResolved: 18,
    criticalCases: 3,
    peakHour: "14:00 - 15:00",
    staffPerformance: "95%",
  }

  return (
    <DashboardLayout title="🚂 Railway Admin Dashboard" role="admin" navigation={navigation}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trains">🚂 Trains</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
          <TabsTrigger value="devices">⚙️ Devices</TabsTrigger>
          <TabsTrigger value="inventory">📦 Inventory</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-border bg-gradient-to-br from-blue-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">🚂 Active Trains</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">4</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-gradient-to-br from-yellow-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">📋 Total Cases Today</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[var(--warning)]">{analytics.totalCases}</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-gradient-to-br from-green-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">🟢 Devices Online</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[var(--success)]">26/26</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-gradient-to-br from-purple-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">⚡ Avg Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{analytics.avgResponseTime}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">📊 Analytics Report</CardTitle>
                <CardDescription>View system analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-primary hover:bg-primary/90 transition-all">📈 Generate Report</Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">⚙️ Device Management</CardTitle>
                <CardDescription>Monitor IoT devices</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-accent hover:bg-accent/90 transition-all">🔧 View Devices</Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">📦 Inventory Check</CardTitle>
                <CardDescription>Manage supplies</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-secondary hover:bg-secondary/90 transition-all">📋 Check Stock</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trains Tab */}
        <TabsContent value="trains" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🚂 Live Train Health Status</CardTitle>
              <CardDescription>Real-time monitoring of all active trains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trainStatus.map((train) => (
                  <div
                    key={train.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-all duration-300 hover:bg-muted/30"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">🚂 {train.name}</p>
                      <p className="text-sm text-muted-foreground">📍 {train.route}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[var(--warning)]">⚠️ {train.cases}</p>
                        <p className="text-xs text-muted-foreground">Active Cases</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[var(--success)]">⚙️ {train.devices}</p>
                        <p className="text-xs text-muted-foreground">Devices</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">💯 {train.health}%</p>
                        <p className="text-xs text-muted-foreground">Health</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-primary/10 transition-colors bg-transparent"
                      >
                        👁️ View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border bg-gradient-to-br from-green-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">✅ Cases Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[var(--success)]">{analytics.casesResolved}</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-gradient-to-br from-red-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">🆘 Critical Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-destructive animate-pulse">{analytics.criticalCases}</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-gradient-to-br from-blue-50 to-transparent hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">👥 Staff Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{analytics.staffPerformance}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📊 System Analytics</CardTitle>
              <CardDescription>Detailed performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg hover:shadow-md transition-all duration-300">
                  <p className="text-sm text-muted-foreground mb-1">🕐 Peak Hour</p>
                  <p className="text-lg font-semibold text-foreground">{analytics.peakHour}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg hover:shadow-md transition-all duration-300">
                  <p className="text-sm text-muted-foreground mb-1">⚡ Avg Response Time</p>
                  <p className="text-lg font-semibold text-foreground">{analytics.avgResponseTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Devices Tab */}
        <TabsContent value="devices" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">⚙️ IoT Device Monitoring</CardTitle>
              <CardDescription>Real-time device status and battery levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-all duration-300 hover:bg-muted/30"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">🔌 {device.name}</p>
                      <p className="text-sm text-muted-foreground">🚂 {device.train}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">🔋 {device.battery}%</p>
                        <div className="w-24 h-2 bg-muted rounded-full mt-1">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              device.battery > 50 ? "bg-[var(--success)]" : "bg-[var(--warning)]"
                            }`}
                            style={{ width: `${device.battery}%` }}
                          ></div>
                        </div>
                      </div>
                      <Badge className="bg-[var(--success)]">🟢 {device.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📦 Medical Inventory</CardTitle>
              <CardDescription>Stock levels and reorder alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inventory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-all duration-300 hover:bg-muted/30"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">📦 {item.item}</p>
                      <p className="text-sm text-muted-foreground">Reorder at: {item.reorder} units</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">{item.stock}</p>
                        <p className="text-xs text-muted-foreground">units</p>
                      </div>
                      <Badge className={item.status === "adequate" ? "bg-[var(--success)]" : "bg-[var(--warning)]"}>
                        {item.status === "adequate" ? "✅" : "⚠️"} {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
