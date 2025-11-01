"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, X, Check, AlertCircle, Info } from "lucide-react"
import type { Alert } from "@/lib/use-real-time-alerts"
import Link from "next/link"

interface NotificationCenterProps {
  alerts: Alert[]
  unreadCount: number
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onClearAlert: (id: string) => void
}

export function NotificationCenter({
  alerts,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAlert,
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "emergency":
        return <AlertCircle className="w-5 h-5 text-destructive" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-[var(--warning)]" />
      default:
        return <Info className="w-5 h-5 text-accent" />
    }
  }

  const getAlertColor = (type: Alert["type"]) => {
    switch (type) {
      case "emergency":
        return "border-l-destructive bg-destructive/5"
      case "warning":
        return "border-l-[var(--warning)] bg-[var(--warning)]/5"
      default:
        return "border-l-accent bg-accent/5"
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-card border border-border rounded-lg shadow-lg z-50">
          <Card className="border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button size="sm" variant="ghost" onClick={onMarkAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto space-y-2">
              {alerts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No notifications</p>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`border-l-4 p-3 rounded flex items-start gap-3 ${getAlertColor(alert.type)}`}
                  >
                    <div className="flex-shrink-0 mt-1">{getAlertIcon(alert.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round((Date.now() - alert.timestamp.getTime()) / 60000)} min ago
                      </p>
                      {alert.actionUrl && (
                        <Link href={alert.actionUrl}>
                          <Button size="sm" variant="ghost" className="mt-2 h-7 text-xs">
                            View
                          </Button>
                        </Link>
                      )}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {!alert.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onMarkAsRead(alert.id)}
                          className="h-6 w-6 p-0"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => onClearAlert(alert.id)} className="h-6 w-6 p-0">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
