"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navVariants = {
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
  }

  const logoVariants = {
    top: { scale: 1.1 },
    scrolled: { scale: 1 },
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 flex items-center border-b border-gray-200"
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      variants={navVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <motion.div variants={logoVariants} transition={{ duration: 0.3 }}>
          <Link href="/" className="flex items-center space-x-2">
            <ArrowRight className="w-6 h-6 text-blue-500" strokeWidth={2.2} />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Tabi
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <Link
            href="#features"
            className={cn(
              "text-gray-600 hover:text-blue-600 transition-colors relative py-2",
              "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-600 after:to-sky-500",
              "after:transition-all after:duration-300 hover:after:w-full",
            )}
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className={cn(
              "text-gray-600 hover:text-blue-600 transition-colors relative py-2",
              "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-600 after:to-sky-500",
              "after:transition-all after:duration-300 hover:after:w-full",
            )}
          >
            How it Works
          </Link>
          <Link
            href="#faq"
            className={cn(
              "text-gray-600 hover:text-blue-600 transition-colors relative py-2",
              "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-600 after:to-sky-500",
              "after:transition-all after:duration-300 hover:after:w-full",
            )}
          >
            FAQ
          </Link>
          <div className="flex items-center space-x-10">
            <Link
              href="/login"
              className={cn(
                "text-gray-800 font-medium hover:text-blue-600 transition-colors relative py-2",
                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-600 after:to-sky-500",
                "after:transition-all after:duration-300 hover:after:w-full",
              )}
            >
              Login
            </Link>
            <Link href="/signup">
              <Button
                className={cn(
                  "bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-full px-6",
                  "transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-200/50",
                )}
              >
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-gray-800 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-6 flex flex-col space-y-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="#features"
              className="text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="#faq"
              className="text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="flex flex-col space-y-4 pt-4 border-t">
              <Link
                href="/login"
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white w-full rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
