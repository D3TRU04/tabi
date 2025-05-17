"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import { Settings, LogOut, Home, Sparkles, ArrowRight } from "lucide-react"
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
            <Link href="/dashboard" className="flex items-center space-x-2">
              <ArrowRight className="w-7 h-7 text-blue-500" strokeWidth={2.2} />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                Tabi
              </span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/" className="flex items-center text-base font-medium text-gray-700 hover:text-blue-600">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              <Link href="/faq" className="flex items-center text-base font-medium text-gray-700 hover:text-blue-600">
                <Sparkles className="h-4 w-4 mr-2" />
                FAQ
              </Link>
            </div>
          </div>

          {/* User Controls */}
          <div className="flex items-center space-x-6">
            <WalletMultiButton className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white" />
            {connected && (
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-base font-medium text-gray-700">SOL:</span>
                  <span className="font-semibold text-blue-600">
                    {user.wallet?.balances?.SOL?.toFixed(4) ?? "0.0000"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-base font-medium text-gray-700">USDC:</span>
                  <span className="font-semibold text-blue-600">
                    {user.wallet?.balances?.USDC?.toFixed(2) ?? "0.00"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-100">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-around">
            <Link href="/" className="flex flex-col items-center text-base font-semibold text-gray-800 hover:text-blue-600">
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link href="/faq" className="flex flex-col items-center text-base font-semibold text-gray-800 hover:text-blue-600">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs mt-1">FAQ</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
