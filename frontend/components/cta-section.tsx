"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-b from-purple-100/30 to-transparent rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-5xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative background with rotation */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-teal-400 rounded-2xl transform rotate-1 scale-[1.03] opacity-70 blur-sm"></div>

          <motion.div
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-teal-400 rounded-2xl p-10 md:p-16 text-white text-center relative overflow-hidden"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2"></div>

            {/* Floating app icons */}
            <motion.div
              className="absolute top-10 right-10 md:right-20"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Image src="/app-icon-1.png" width={60} height={60} alt="App Icon" className="rounded-xl shadow-lg" />
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-10 md:left-20"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            >
              <Image src="/app-icon-2.png" width={50} height={50} alt="App Icon" className="rounded-xl shadow-lg" />
            </motion.div>

            <div className="relative z-10">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Ready to get started?
              </motion.h2>
              <motion.p
                className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join thousands of users who are already enjoying the simplest way to send and receive money.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/signup">
                  <Button className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Create your account
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                  >
                    Learn more
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
