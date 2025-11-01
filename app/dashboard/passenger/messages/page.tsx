// "use client"

// import { DashboardLayout } from "@/components/dashboard-layout"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Activity, Heart, MessageSquare, FileText, AlertCircle, Send } from "lucide-react"
// import { useState } from "react"

// export default function MessagesPage() {
//   const [messages, setMessages] = useState([
//     { id: 1, sender: "Dr. Sarah", role: "Doctor", message: "How are you feeling now?", time: "10:30 AM" },
//     { id: 2, sender: "You", role: "Passenger", message: "Better, thank you for checking", time: "10:32 AM" },
//   ])
//   const [newMessage, setNewMessage] = useState("")

//   const navigation = [
//     { label: "Dashboard", href: "/dashboard/passenger", icon: <Activity className="w-5 h-5" /> },
//     { label: "Emergency Request", href: "/dashboard/passenger/emergency", icon: <AlertCircle className="w-5 h-5" /> },
//     { label: "Messages", href: "/dashboard/passenger/messages", icon: <MessageSquare className="w-5 h-5" /> },
//     { label: "Vitals", href: "/dashboard/passenger/vitals", icon: <Heart className="w-5 h-5" /> },
//     { label: "Prescriptions", href: "/dashboard/passenger/prescriptions", icon: <FileText className="w-5 h-5" /> },
//   ]

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       setMessages([
//         ...messages,
//         { id: messages.length + 1, sender: "You", role: "Passenger", message: newMessage, time: "Now" },
//       ])
//       setNewMessage("")
//     }
//   }

//   return (
//     <DashboardLayout title="Live Chat" role="passenger" navigation={navigation}>
//       <div className="space-y-6 max-w-2xl">
//         <Card className="border-border flex flex-col h-[600px]">
//           <CardHeader>
//             <CardTitle>Chat with Medical Staff</CardTitle>
//             <CardDescription>Connected with Dr. Sarah and Paramedic John</CardDescription>
//           </CardHeader>
//           <CardContent className="flex-1 overflow-y-auto space-y-4 mb-4">
//             {messages.map((msg) => (
//               <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
//                 <div
//                   className={`max-w-xs px-4 py-2 rounded-lg ${
//                     msg.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
//                   }`}
//                 >
//                   <p className="text-sm font-medium">{msg.sender}</p>
//                   <p className="text-sm">{msg.message}</p>
//                   <p className="text-xs mt-1 opacity-70">{msg.time}</p>
//                 </div>
//               </div>
//             ))}
//           </CardContent>
//           <div className="border-t border-border p-4 space-y-2">
//             <div className="flex gap-2">
//               <Input
//                 placeholder="Type your message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//               />
//               <Button onClick={handleSendMessage} size="icon" className="bg-primary hover:bg-primary/90">
//                 <Send className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </DashboardLayout>
//   )
// }

"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity, Heart, MessageSquare, FileText, AlertCircle, Send } from "lucide-react"
import { useState } from "react"

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Dr. Sarah", role: "Doctor", message: "How are you feeling today?", time: "10:30 AM" },
    { id: 2, sender: "You", role: "Passenger", message: "Better, thank you for checking!", time: "10:32 AM" },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const navigation = [
    { label: "Dashboard", href: "/dashboard/passenger", icon: <Activity className="w-5 h-5" /> },
    { label: "Emergency Request", href: "/dashboard/passenger/emergency", icon: <AlertCircle className="w-5 h-5" /> },
    { label: "Messages", href: "/dashboard/passenger/messages", icon: <MessageSquare className="w-5 h-5" /> },
    { label: "Vitals", href: "/dashboard/passenger/vitals", icon: <Heart className="w-5 h-5" /> },
    { label: "Prescriptions", href: "/dashboard/passenger/prescriptions", icon: <FileText className="w-5 h-5" /> },
  ]

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMsg = {
      id: messages.length + 1,
      sender: "You",
      role: "Passenger",
      message: newMessage,
      time: "Now",
    }
    setMessages((prev) => [...prev, userMsg])
    setNewMessage("")
    setIsTyping(true)

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: newMessage }),
      })
      const data = await res.json()

      const aiMsg = {
        id: messages.length + 2,
        sender: "Dr. AI (Gemini)",
        role: "Doctor",
        message: data.reply || "Sorry, I couldn’t respond right now.",
        time: "Just now",
      }

      setMessages((prev) => [...prev, aiMsg])
    } catch (error) {
      console.error("AI Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          sender: "System",
          role: "Error",
          message: "⚠️ AI service not responding.",
          time: "Just now",
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <DashboardLayout title="AI Chat" role="passenger" navigation={navigation}>
      <div className="space-y-6 max-w-2xl mx-auto">
        <Card className="border border-gray-200 flex flex-col h-[600px] shadow-md rounded-2xl bg-white/80 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-t-2xl">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              💬 Chat with Medical Assistant
            </CardTitle>
            <CardDescription className="text-sm text-white/90">
              Ask anything about your health or ongoing treatment.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-white to-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl shadow-sm ${
                    msg.sender === "You"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm font-semibold mb-1">{msg.sender}</p>
                  <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                  <p className="text-[10px] mt-1 text-gray-400 text-right">{msg.time}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-sm italic text-gray-500 animate-pulse">Dr. AI is typing...</div>
            )}
          </CardContent>

          <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 border-gray-300 focus:border-blue-400"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                disabled={isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
