"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timeout)
  }, [pathname])
  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-sky-100 animate-fade-in">
          <div className="flex items-center space-x-4">
            <ArrowRight className="w-10 h-10 text-blue-500 drop-shadow-lg animate-pulse" strokeWidth={2.2} />
            <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg">Tabi</span>
            <span className="ml-2">
              <span className="inline-block w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin align-middle shadow-sm"></span>
            </span>
          </div>
        </div>
      )}
      {children}
    </>
  )
} 