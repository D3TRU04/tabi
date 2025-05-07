"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Settings, LogOut, Send, Plus, ArrowDownLeft, ArrowUpRight, ArrowRight, Eye, Shield, Wallet, User, Activity } from "lucide-react"
import { truncateAddress } from "@/lib/utils"
import { mockFriends, mockTransactions, mockPaymentFeed } from "@/lib/mock-data"
import type { UserType, TransactionType, PaymentFeedItem } from "@/lib/types"
import Link from "next/link"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import PaymentFeed from "@/components/payment-feed"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { PaymentForm } from "@/components/payment-form"
import type { Wallet as WalletType } from "@/types/user"
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token"
import { NavBar } from "@/components/navbar"

// USDC mint address on devnet
const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU")

export default function Dashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAddFriendDialog, setShowAddFriendDialog] = useState(false)
  const [newFriendUsername, setNewFriendUsername] = useState("")
  const [showPrivacySettings, setShowPrivacySettings] = useState(false)
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "payments")
  const { publicKey, connected } = useWallet()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const userData = sessionStorage.getItem("tabiUser")
    if (!userData) {
      router.push("/login")
      return
    }
    const parsedUser = JSON.parse(userData) as UserType
    setUser(parsedUser)
    setIsLoading(false)
  }, [router])

  useEffect(() => {
    if (connected && publicKey && user) {
      const connection = new Connection("https://api.devnet.solana.com")
      
      // Get SOL balance
      connection.getBalance(publicKey).then(async (balance) => {
        const solBalance = balance / LAMPORTS_PER_SOL
        
        // Get USDC balance
        let usdcBalance = 0
        try {
          const usdcAccount = await getAssociatedTokenAddress(
            USDC_MINT,
            publicKey
          )
          const accountInfo = await getAccount(connection, usdcAccount)
          usdcBalance = Number(accountInfo.amount) / 1_000_000 // USDC has 6 decimals
        } catch (error) {
          console.log("No USDC account found")
        }
        
        const updatedUser: UserType = {
          ...user,
          wallet: {
            connected: true,
            address: publicKey.toString(),
            balances: {
              SOL: solBalance,
              USDC: usdcBalance
            }
          }
        }
        setUser(updatedUser)
        sessionStorage.setItem("tabiUser", JSON.stringify(updatedUser))
      })
    }
  }, [connected, publicKey, user])

  const handleLogout = () => {
    sessionStorage.removeItem("tabiUser")
    router.push("/")
  }

  const handleAddFriend = () => {
    toast({
      title: "Coming Soon",
      description: "Friend functionality will be available soon!",
    })
  }

  const handleUpdatePrivacySettings = (settings: UserType["privacySettings"]) => {
    if (user) {
      const updatedUser = { ...user, privacySettings: settings }
      setUser(updatedUser)
      sessionStorage.setItem("tabiUser", JSON.stringify(updatedUser))
      toast({
        title: "Privacy settings updated",
        description: "Your privacy settings have been updated successfully.",
      })
      setShowPrivacySettings(false)
    }
  }

  const handleConnectWallet = async () => {
    if (!user) return

    try {
      // TODO: Implement actual Solana wallet connection
      // For now, simulate wallet connection
      const updatedUser: UserType = {
        ...user,
        wallet: {
          connected: true,
          address: "simulated_solana_address",
          balances: {
            SOL: 1000, // Simulated balance
            USDC: 0
          }
        }
      }
      setUser(updatedUser)
      sessionStorage.setItem("tabiUser", JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <NavBar user={user} />

      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info Card */}
          <Card className="p-6 bg-white shadow-lg border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 flex items-center justify-center text-white">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <p className="text-gray-600">{user.email}</p>
                {connected && (
                  <p className="text-sm text-gray-500 mt-1">
                    {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Activity Card */}
          <Card className="p-6 bg-white shadow-lg border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 flex items-center justify-center text-white">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <p className="text-gray-600">No recent transactions</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className="p-6 bg-white shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white"
                disabled={!connected}
                onClick={() => setActiveTab("payments")}
              >
                Send Payment
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleAddFriend}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Friend
              </Button>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white p-1 rounded-lg shadow-sm border border-gray-100">
              <TabsTrigger value="payments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white">
                Payment Feed
              </TabsTrigger>
              <TabsTrigger value="friends" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white">
                Friends
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white">
                Transactions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="payments" className="mt-6">
              <Card className="p-6 bg-white shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Send Payment</h3>
                <PaymentForm />
              </Card>
            </TabsContent>

            <TabsContent value="friends" className="mt-6">
              <Card className="p-6 bg-white shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Friends</h3>
                <p className="text-gray-600">No friends added yet</p>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="mt-6">
              <Card className="p-6 bg-white shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Transactions</h3>
                <p className="text-gray-600">No transactions yet</p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Friend Dialog */}
      <Dialog open={showAddFriendDialog} onOpenChange={setShowAddFriendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Friend</DialogTitle>
            <DialogDescription>Enter your friend's username to send them a friend request.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Username"
              value={newFriendUsername}
              onChange={(e) => setNewFriendUsername(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddFriendDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFriend}>Send Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Privacy Settings Dialog */}
      <Dialog open={showPrivacySettings} onOpenChange={setShowPrivacySettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Privacy Settings</DialogTitle>
            <DialogDescription>Control who can see your activity and payments.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Show Payments</label>
              <select
                className="w-full p-2 border rounded-md"
                value={user.privacySettings.showPayments}
                onChange={(e) =>
                  handleUpdatePrivacySettings({
                    ...user.privacySettings,
                    showPayments: e.target.value as "public" | "friends" | "private",
                  })
                }
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Show Balance</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={user.privacySettings.showBalance}
                  onChange={(e) =>
                    handleUpdatePrivacySettings({
                      ...user.privacySettings,
                      showBalance: e.target.checked,
                    })
                  }
                />
                <span className="text-sm">Show my balance to friends</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Show Activity</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={user.privacySettings.showActivity}
                  onChange={(e) =>
                    handleUpdatePrivacySettings({
                      ...user.privacySettings,
                      showActivity: e.target.checked,
                    })
                  }
                />
                <span className="text-sm">Show my activity in the payment feed</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPrivacySettings(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowPrivacySettings(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
