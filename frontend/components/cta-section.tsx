"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 text-white font-medium text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Get Started Today
          </motion.div>
          <motion.h2
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join the future of social payments
          </motion.h2>
          <motion.p
            className="text-white/80 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Be part of a community that's redefining how friends share expenses. Send crypto instantly, split bills, and stay connected with your social circle.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-600 bg-white hover:bg-blue-50 transition-colors"
            >
              Get Started Free
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-full text-white hover:bg-white/10 transition-colors"
            >
              See How It Works
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
