"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export function LandingNavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    controls.start(isScrolled ? "scrolled" : "top")
  }, [isScrolled, controls])

  const variants = {
    top: {
      height: 80,
      width: "100vw",
      left: 0,
      x: 0,
      top: 0,
      borderRadius: "0px",
      background: "rgba(255,255,255,0.8)",
      boxShadow: "0 0 0 0 rgba(0,0,0,0)",
      backdropFilter: "blur(8px)",
      scale: 1,
    },
    scrolled: {
      height: 64,
      width: "min(99.5vw, 1400px)",
      left: "50%",
      x: "-50%",
      top: 24,
      borderRadius: "2rem",
      background: "rgba(255,255,255,0.98)",
      boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
      backdropFilter: "blur(24px)",
      scale: 1.03,
    },
  }

  return (
    <motion.nav
      animate={controls}
      variants={variants}
      initial="top"
      transition={{ type: "spring", stiffness: 200, damping: 32 }}
      className="fixed z-50 border-b border-gray-100"
      style={{ willChange: "height, width, left, top, border-radius, background, box-shadow, backdrop-filter, transform" }}
    >
      <div className="container mx-auto px-8 h-full flex items-center">
        {/* Logo on the far left */}
        <Link href="/" className="flex items-center space-x-2">
          <ArrowRight className="w-7 h-7 text-blue-500" strokeWidth={2.2} />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            Tabi
          </span>
        </Link>

        {/* All nav links and buttons on the right */}
        <div className="flex items-center space-x-8 ml-auto">
          {/* <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors text-base font-medium px-2 py-1">
            Features
          </Link>
          <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors text-base font-medium px-2 py-1">
            How it Works
          </Link> */}
          <Link href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors text-base font-medium px-2 py-1">
            FAQ
          </Link>
          <Link href="/login">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-500 px-7 py-2 rounded-full">
              Log in
            </Button>
          </Link>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-lg shadow-blue-500/20 px-7 py-2 rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  )
} 