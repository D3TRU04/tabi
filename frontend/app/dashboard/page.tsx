"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Settings, LogOut, Send, Plus, ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { truncateAddress } from "@/lib/utils"
import { mockFriends, mockTransactions } from "@/lib/mock-data"
import type { UserType } from "@/lib/types"

type FriendType = Omit<UserType, "secretKey">

export default function Dashboard() {
  const [user, setUser] = useState<UserType | null>(null)
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [selectedFriend, setSelectedFriend] = useState<FriendType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [transactionType, setTransactionType] = useState<"send" | "request">("send")
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = sessionStorage.getItem("tabiUser")
    if (!userData) {
      router.push("/signup")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (err) {
      console.error("Error parsing user data:", err)
      sessionStorage.removeItem("tabiUser")
      router.push("/signup")
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("tabiUser")
    router.push("/")
  }

  const handleTransaction = () => {
    if (!amount || !selectedFriend) return

    // In a real app, this would create an actual Solana transaction
    console.log(
      `${transactionType === "send" ? "Sending" : "Requesting"} $${amount} ${transactionType === "send" ? "to" : "from"} ${selectedFriend.username}`,
    )

    // Reset form and close dialog
    setAmount("")
    setNote("")
    setSelectedFriend(null)
    setIsDialogOpen(false)
  }

  const openTransactionDialog = (friend: FriendType, type: "send" | "request") => {
    setSelectedFriend(friend)
    setTransactionType(type)
    setIsDialogOpen(true)
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-purple-600">Tabi</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/settings")}>
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* User Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Avatar className="h-16 w-16 mr-4 bg-purple-100">
                  <AvatarFallback className="text-purple-600 text-xl">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{user.username}</h2>
                  <p className="text-sm text-gray-500">{truncateAddress(user.publicKey)}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsDialogOpen(true)}>
                  <Send className="h-4 w-4 mr-2" /> New Transaction
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="friends" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Friends Tab */}
          <TabsContent value="friends" className="mt-4">
            <div className="grid gap-4">
              {mockFriends.map((friend) => (
                <Card key={friend.username} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3 bg-gray-100">
                          <AvatarFallback>{friend.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{friend.username}</p>
                          <p className="text-sm text-gray-500">{truncateAddress(friend.publicKey)}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => openTransactionDialog(friend, "request")}>
                          Request
                        </Button>
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={() => openTransactionDialog(friend, "send")}
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" className="mt-2">
                <Plus className="h-4 w-4 mr-2" /> Add Friend
              </Button>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="mt-4">
            <div className="grid gap-4">
              {mockTransactions.map((transaction, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                            transaction.type === "received" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.type === "received" ? (
                            <ArrowDownLeft className="h-5 w-5" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.type === "received"
                              ? `From ${transaction.counterparty}`
                              : `To ${transaction.counterparty}`}
                          </p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div
                        className={`font-medium ${transaction.type === "received" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "received" ? "+" : "-"}${transaction.amount}
                      </div>
                    </div>
                    {transaction.note && <p className="text-sm text-gray-500 mt-2">{transaction.note}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Transaction Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{transactionType === "send" ? "Send Money" : "Request Money"}</DialogTitle>
            <DialogDescription>
              {selectedFriend
                ? `${transactionType === "send" ? "Send to" : "Request from"} ${selectedFriend.username}`
                : "Select a friend and enter an amount"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {!selectedFriend && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Friend</label>
                <select
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => {
                    const friend = mockFriends.find((f) => f.username === e.target.value)
                    if (friend) setSelectedFriend(friend)
                  }}
                >
                  <option value="">Select a friend</option>
                  {mockFriends.map((friend) => (
                    <option key={friend.username} value={friend.username}>
                      {friend.username}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Note (optional)</label>
              <Input placeholder="What's it for?" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleTransaction}
              disabled={!amount || !selectedFriend}
            >
              {transactionType === "send" ? "Send" : "Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
