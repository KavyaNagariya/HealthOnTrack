"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Zap, Package, TrendingUp } from "lucide-react"

export default function InventoryPage() {
  const inventory = [
    {
      id: 1,
      item: "Oxygen Cylinders",
      quantity: 24,
      capacity: 30,
      unit: "units",
      status: "good",
      lastRestocked: "2 days ago",
    },
    {
      id: 2,
      item: "First Aid Kits",
      quantity: 12,
      capacity: 15,
      unit: "kits",
      status: "good",
      lastRestocked: "1 week ago",
    },
    {
      id: 3,
      item: "Bandages & Gauze",
      quantity: 8,
      capacity: 20,
      unit: "boxes",
      status: "low",
      lastRestocked: "3 weeks ago",
    },
    {
      id: 4,
      item: "Medications",
      quantity: 45,
      capacity: 50,
      unit: "units",
      status: "good",
      lastRestocked: "5 days ago",
    },
    {
      id: 5,
      item: "Syringes",
      quantity: 3,
      capacity: 100,
      unit: "boxes",
      status: "critical",
      lastRestocked: "2 months ago",
    },
    {
      id: 6,
      item: "Gloves",
      quantity: 15,
      capacity: 50,
      unit: "boxes",
      status: "low",
      lastRestocked: "1 month ago",
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
    <DashboardLayout title="Inventory Management" role="admin" navigation={navigation}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{inventory.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Good Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--success)]">
                {inventory.filter((i) => i.status === "good").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[var(--warning)]">
                {inventory.filter((i) => i.status === "low").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Critical</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">
                {inventory.filter((i) => i.status === "critical").length}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {inventory.map((item) => (
            <Card key={item.id} className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{item.item}</h3>
                      <Badge
                        className={`
                        ${item.status === "good" ? "status-success" : ""}
                        ${item.status === "low" ? "status-warning" : ""}
                        ${item.status === "critical" ? "status-critical" : ""}
                      `}
                      >
                        {item.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Last restocked: {item.lastRestocked}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-foreground">Stock Level</p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} / {item.capacity} {item.unit}
                          </p>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.status === "good" ? "bg-[var(--success)]" : item.status === "low" ? "bg-[var(--warning)]" : "bg-destructive"}`}
                            style={{ width: `${(item.quantity / item.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                    {item.status !== "good" && (
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Restock
                      </Button>
                    )}
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
