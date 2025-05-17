"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Copy, ExternalLink, ArrowRight, LogOut } from "lucide-react"
import type { UserType } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const [user, setUser] = useState<UserType | null>(null)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  const handleLogout = () => {
    // Implement logout functionality
    console.log("Logging out")
  }

  if (!user) {
    return null // Remove fallback, rely on global loading overlay
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 flex items-center border-b border-gray-200"
        initial="top"
        animate={isScrolled ? "scrolled" : "top"}
        variants={{
          top: {
            backgroundColor: "rgba(255, 255, 255, 0)",
            boxShadow: "none",
            height: "90px",
          },
          scrolled: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            backdropFilter: "blur(10px)",
            height: "70px",
          },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <motion.div
            variants={{
              top: { scale: 1.1 },
              scrolled: { scale: 1 },
            }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <ArrowRight className="w-6 h-6 text-blue-500" strokeWidth={2.2} />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                Tabi
              </span>
            </Link>
          </motion.div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-5 w-5 text-gray-600 hover:text-blue-600" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5 text-gray-600 hover:text-blue-600" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 mt-[90px]">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-500">Manage your account and wallet settings</p>
        </div>
        <Tabs defaultValue="account" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg mb-6">
            <TabsTrigger value="account" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">Account</TabsTrigger>
            <TabsTrigger value="wallet" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">Wallet</TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="mt-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-gray-900 mb-2">Account Information</CardTitle>
                <CardDescription className="text-gray-500">Add contact information to secure your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="username" className="text-sm font-medium text-gray-900">
                    Username
                  </label>
                  <Input 
                    id="username" 
                    value={user.username} 
                    disabled 
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-medium text-gray-900">
                    Email Address (optional)
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-900">
                    Phone Number (optional)
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-full px-6"
                  onClick={handleSaveContactInfo}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="mt-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-gray-900 mb-2">Wallet Information</CardTitle>
                <CardDescription className="text-gray-500">View and manage your Solana wallet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-900">Public Address</label>
                  <div className="flex items-center">
                    <Input 
                      value={user.publicKey} 
                      disabled 
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-3 text-gray-600 hover:text-blue-600"
                      onClick={() => copyToClipboard(user.publicKey)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h3 className="font-medium text-yellow-800 mb-2">Important Security Notice</h3>
                  <p className="text-sm text-yellow-700">
                    Your private key is stored securely in your browser. If you clear your browser data or use a
                    different device, you&apos;ll lose access to your wallet. Consider adding contact information to recover
                    your account.
                  </p>
                </div>

                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="flex items-center border-gray-200 hover:border-blue-600 hover:text-blue-600"
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

      {/* Footer */}
      <Footer />
    </div>
  )
}
