"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function CTASection() {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="inline-block mb-4 px-4 py-1 rounded-full bg-white/20 text-white font-medium text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Get Started Today
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ready to transform your social payments?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of users who are already using Tabi to manage their social payments with ease.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/signup">
              <Button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-600 bg-white hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
