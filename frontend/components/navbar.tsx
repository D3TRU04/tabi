"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import { Settings, LogOut, Home, Activity, Users } from "lucide-react"
import type { UserType } from "@/types/user"

interface NavBarProps {
  user: UserType
}

export function NavBar({ user }: NavBarProps) {
  const router = useRouter()
  const { connected } = useWallet()
  const [showSettings, setShowSettings] = useState(false)

  const handleLogout = () => {
    sessionStorage.removeItem("tabiUser")
    router.push("/")
  }

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Main Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Tabi
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              <Link href="/dashboard?tab=activity" className="flex items-center text-gray-600 hover:text-blue-600">
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </Link>
              <Link href="/dashboard?tab=friends" className="flex items-center text-gray-600 hover:text-blue-600">
                <Users className="h-4 w-4 mr-2" />
                Friends
              </Link>
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            {!connected ? (
              <WalletMultiButton className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white" />
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">SOL:</span>
                  <span className="font-medium text-blue-600">
                    {user.wallet?.balances?.SOL?.toFixed(4) ?? "0.0000"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">USDC:</span>
                  <span className="font-medium text-blue-600">
                    {user.wallet?.balances?.USDC?.toFixed(2) ?? "0.00"}
                  </span>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-blue-50"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-blue-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-100">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-around">
            <Link href="/dashboard" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/dashboard?tab=activity" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
              <Activity className="h-5 w-5" />
              <span className="text-xs mt-1">Activity</span>
            </Link>
            <Link href="/dashboard?tab=friends" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
              <Users className="h-5 w-5" />
              <span className="text-xs mt-1">Friends</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
