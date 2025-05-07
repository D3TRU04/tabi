"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import type { UserType } from "@/types/user"

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      const userData = sessionStorage.getItem("tabiUser")
      
      if (!userData) {
        throw new Error("No user data found")
      }

      const user = JSON.parse(userData) as UserType
      
      if (user.username !== username) {
        throw new Error("Invalid username")
      }

      // In a real app, we would verify the password here
      router.push("/dashboard")
    } catch (error) {
      console.error(error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-gray-50"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-b from-blue-100/20 to-transparent rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-blue-100/20 to-transparent rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent mb-8">
              Welcome Back
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:text-blue-700">
                Sign up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 