"use client"

import { useEffect } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import HowItWorks from "@/components/how-it-works"
import Testimonials from "@/components/testimonials"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function LandingPage() {
  // Add framer-motion to the page
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")

      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        e.preventDefault()
        const targetElement = document.querySelector(anchor.hash)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: "smooth",
          })
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)
    return () => document.removeEventListener("click", handleAnchorClick)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
