"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-purple-50 to-white"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>

        {/* Colorful gradient blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-purple-100/50 to-transparent rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-b from-teal-200/30 to-transparent rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-pink-100/30 to-transparent rounded-full blur-3xl opacity-60"></div>

        {/* Animated shapes */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-8 h-8 bg-yellow-300 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-[30%] right-[15%] w-12 h-12 bg-teal-300 rounded-full opacity-20"
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[25%] w-10 h-10 bg-pink-300 rounded-full opacity-20"
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
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 font-medium text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Reimagining Money Transfers
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Send money to friends,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-teal-400">
                instantly
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Tabi makes sending money as easy as sending a message. No fees, no waiting, just simple transfers powered
              by Solana.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-full flex items-center w-full sm:w-auto transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-200/50">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg rounded-full w-full sm:w-auto"
                >
                  How it works
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium",
                        i === 1 ? "bg-purple-200" : i === 2 ? "bg-pink-200" : i === 3 ? "bg-teal-200" : "bg-yellow-200",
                      )}
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">1,000+ users</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">4.9/5 rating</span>
              </div>
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
                <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-teal-50 p-6 md:p-8">
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
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                            A
                          </div>
                          <span className="ml-2 font-medium">Alex</span>
                        </div>
                        <span className="text-green-500 font-medium">+$25.00</span>
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
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold">
                            J
                          </div>
                          <span className="ml-2 font-medium">Jamie</span>
                        </div>
                        <span className="text-red-500 font-medium">-$18.50</span>
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
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold">
                            S
                          </div>
                          <span className="ml-2 font-medium">Sarah</span>
                        </div>
                        <span className="text-green-500 font-medium">+$42.00</span>
                      </div>
                      <p className="text-gray-600 text-sm">Movie tickets</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-teal-200 to-purple-200 rounded-full blur-3xl opacity-40"></div>

            {/* Floating elements */}
            <motion.div
              className="absolute -right-10 top-1/4 w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full"></div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -left-8 bottom-1/4 w-12 h-12 bg-gradient-to-br from-teal-100 to-purple-100 rounded-full"
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
              <Image src="/solana-logo.png" width={60} height={60} alt="Solana Logo" className="opacity-70" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-[50px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  )
}
