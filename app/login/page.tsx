"use client"

import type React from "react"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { login } = useAuth()
  const role = (searchParams.get("role") || "passenger") as "passenger" | "attendant" | "doctor" | "admin"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const roleNames: Record<string, string> = {
    passenger: "Passenger",
    attendant: "Attendant / Paramedic",
    doctor: "Doctor",
    admin: "Railway Admin",
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password, role)
      // Route to appropriate dashboard
      const dashboardRoutes: Record<string, string> = {
        passenger: "/dashboard/passenger",
        attendant: "/dashboard/attendant",
        doctor: "/dashboard/doctor",
        admin: "/dashboard/admin",
      }
      router.push(dashboardRoutes[role] || "/dashboard/passenger")
    } catch (error) {
      console.error("Login failed:", error)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-border">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-primary">Healthcare on the Move</span>
            </div>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Login as {roleNames[role] || "User"}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link href={`/signup?role=${role}`} className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Link href="/" className="text-sm text-primary hover:underline">
                ← Back to role selection
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
