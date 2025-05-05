"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Copy, ExternalLink } from "lucide-react"
import type { UserType } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [user, setUser] = useState<UserType | null>(null)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

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

      // Load saved contact info if available
      const contactInfo = sessionStorage.getItem("tabiContactInfo")
      if (contactInfo) {
        const { email: savedEmail, phone: savedPhone } = JSON.parse(contactInfo)
        if (savedEmail) setEmail(savedEmail)
        if (savedPhone) setPhone(savedPhone)
      }
    } catch (err) {
      console.error("Error parsing user data:", err)
      sessionStorage.removeItem("tabiUser")
      router.push("/signup")
    }
  }, [router])

  const handleSaveContactInfo = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Save to session storage
      sessionStorage.setItem("tabiContactInfo", JSON.stringify({ email, phone }))

      toast({
        title: "Settings saved",
        description: "Your contact information has been updated.",
      })

      setIsLoading(false)
    }, 1000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Address copied to clipboard.",
    })
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="account" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Add contact information to secure your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Username
                  </label>
                  <Input id="username" value={user.username} disabled />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address (optional)
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number (optional)
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handleSaveContactInfo}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Information</CardTitle>
                <CardDescription>View and manage your Solana wallet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Public Address</label>
                  <div className="flex items-center">
                    <Input value={user.publicKey} disabled />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2"
                      onClick={() => copyToClipboard(user.publicKey)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h3 className="font-medium text-yellow-800">Important Security Notice</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your private key is stored securely in your browser. If you clear your browser data or use a
                    different device, you'll lose access to your wallet. Consider adding contact information to recover
                    your account.
                  </p>
                </div>

                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={() => window.open(`https://explorer.solana.com/address/${user.publicKey}`, "_blank")}
                  >
                    View on Solana Explorer <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
