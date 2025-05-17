"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import BackgroundGradientAnimationDemo from "@/components/background-gradient-animation-demo"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <BackgroundGradientAnimationDemo />
      </div>
      {/* Main Hero Content */}
      <div className="relative z-10">
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-gray-50"></div>

          {/* Colorful gradient blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-blue-100/30 to-transparent rounded-full blur-3xl opacity-40"></div>
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-b from-sky-100/20 to-transparent rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-blue-100/20 to-transparent rounded-full blur-3xl opacity-40"></div>

          {/* Animated shapes */}
          <motion.div
            className="absolute top-[20%] left-[10%] w-8 h-8 bg-blue-200 rounded-full opacity-20"
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute top-[30%] right-[15%] w-12 h-12 bg-sky-200 rounded-full opacity-20"
            animate={{
              y: [0, 30, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[25%] w-10 h-10 bg-gray-200 rounded-full opacity-20"
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 2,
            }}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                className="text-center md:text-left space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  The Future of Crypto Payments
                </motion.div>
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Send crypto to friends,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500">
                    instantly
                  </span>
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl text-gray-600 max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Tabi makes sending stablecoins and crypto as easy as sending a message. Split bills, track spending, and get AI-powered insights - all powered by Solana.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white px-8 py-6 text-lg rounded-full flex items-center w-full sm:w-auto transition-all duration-300">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button
                      variant="outline"
                      className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg rounded-full w-full sm:w-auto"
                    >
                      How it Works
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* App Preview */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* 3D-like card with perspective */}
                <div className="relative perspective-1000">
                  <motion.div
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform-style-3d"
                    whileHover={{ rotateY: 5, rotateX: -5 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-blue-50 p-6 md:p-8">
                      <div className="grid gap-4">
                        <motion.div
                          className="bg-white rounded-xl p-4 shadow-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                          whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1)" }}
                        >
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                A
                              </div>
                              <span className="ml-2 font-medium">Alex</span>
                            </div>
                            <span className="text-green-500 font-medium">+25 USDC</span>
                          </div>
                          <p className="text-gray-600 text-sm">Thanks for dinner last night!</p>
                        </motion.div>
                        <motion.div
                          className="bg-white rounded-xl p-4 shadow-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                          whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1)" }}
                        >
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold">
                                J
                              </div>
                              <span className="ml-2 font-medium">Jamie</span>
                            </div>
                            <span className="text-red-500 font-medium">-0.12 SOL</span>
                          </div>
                          <p className="text-gray-600 text-sm">Coffee and pastries</p>
                        </motion.div>
                        <motion.div
                          className="bg-white rounded-xl p-4 shadow-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 }}
                          whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1)" }}
                        >
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                S
                              </div>
                              <span className="ml-2 font-medium">Sarah</span>
                            </div>
                            <span className="text-green-500 font-medium">+42 USDC</span>
                          </div>
                          <p className="text-gray-600 text-sm">Movie tickets</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full blur-3xl opacity-40"></div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -right-10 top-1/4 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full"></div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -left-8 bottom-1/4 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full"
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 1,
                  }}
                />

                {/* Solana logo floating */}
                <motion.div
                  className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/4"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Modern Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              className="relative block w-full h-[100px]"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hero-features-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#fff" />
                  <stop offset="100%" stop-color="#f9fafb" />
                </linearGradient>
              </defs>
              <path
                fill="url(#hero-features-gradient)"
                fillOpacity="1"
                d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,234.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>
      </div>
    </section>
  )
}
