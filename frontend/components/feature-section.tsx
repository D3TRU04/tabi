"use client"

import type React from "react"
import { Wallet, Send, Shield, Clock, Globe, Lock } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function FeatureSection() {
  return (
    <section id="features" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-blue-100/20 to-transparent rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-sky-100/20 to-transparent rounded-full blur-3xl opacity-40"></div>

        {/* Animated patterns */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: "radial-gradient(circle, #7c3aed 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Powerful Features
          </motion.div>
          <motion.h2
            className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Why choose Tabi?
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tabi combines the speed of Solana with the simplicity of modern design to create the easiest way to send and manage crypto payments.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Wallet className="h-6 w-6 text-white" />}
            title="Multi-Crypto Support"
            description="Send and receive any Solana token or stablecoin. Support for USDC, USDT, SOL, and more."
            delay={0}
            gradient="from-blue-600 to-sky-500"
          />
          <FeatureCard
            icon={<Send className="h-6 w-6 text-white" />}
            title="Social Payments"
            description="Share your payments with friends, add emojis, and keep your social circle in the loop."
            delay={0.1}
            gradient="from-blue-600 to-sky-500"
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6 text-white" />}
            title="Secure & Private"
            description="Your wallet is generated client-side and your private keys never leave your device."
            delay={0.2}
            gradient="from-blue-600 to-sky-500"
          />
          <FeatureCard
            icon={<Clock className="h-6 w-6 text-white" />}
            title="Smart Bill Splitting"
            description="Split expenses with friends automatically. Perfect for group dinners, trips, and shared expenses."
            delay={0.3}
            gradient="from-blue-600 to-sky-500"
          />
          <FeatureCard
            icon={<Globe className="h-6 w-6 text-white" />}
            title="Payment Feed"
            description="See what your friends are up to with a social feed of payments and activities."
            delay={0.4}
            gradient="from-blue-600 to-sky-500"
          />
          <FeatureCard
            icon={<Lock className="h-6 w-6 text-white" />}
            title="Privacy Controls"
            description="Choose who sees your payments and customize your privacy settings."
            delay={0.5}
            gradient="from-blue-600 to-sky-500"
          />
        </div>
      </div>

      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-[50px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-gray-50"
          ></path>
        </svg>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
  gradient,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
  gradient: string
}) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(124, 58, 237, 0.1)" }}
    >
      <div
        className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      {/* Decorative corner */}
      <div
        className={`absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-br ${gradient} opacity-10 rounded-full group-hover:opacity-20 transition-opacity`}
      ></div>
    </motion.div>
  )
}
