"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { generateWallet } from "@/lib/wallet"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!username || username.length < 3) {
      setError("Username must be at least 3 characters")
      setIsLoading(false)
      return
    }

    try {
      // Check if username is unique (mock implementation)
      // In a real app, this would be a server call
      const isUnique = await checkUsernameUnique(username)

      if (!isUnique) {
        setError("Username is already taken")
        setIsLoading(false)
        return
      }

      // Generate Solana wallet
      const wallet = generateWallet()

      // Store user data in session storage
      const userData = {
        username,
        publicKey: wallet.publicKey,
        secretKey: wallet.secretKey, // In a real app, handle this more securely
      }

      sessionStorage.setItem("tabiUser", JSON.stringify(userData))

      toast({
        title: "Account created!",
        description: "Your Solana wallet has been generated.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      console.error("Error during signup:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Mock function to check if username is unique
  const checkUsernameUnique = async (username: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // For demo purposes, let's say these usernames are taken
    const takenUsernames = ["admin", "test", "user"]
    return !takenUsernames.includes(username.toLowerCase())
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Enter a username to get started with Tabi. No email required.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <Input
                  id="username"
                  placeholder="Enter a unique username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Continue"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
