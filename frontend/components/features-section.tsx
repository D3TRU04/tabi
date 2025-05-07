"use client"

import { motion } from "framer-motion"
import { Wallet, Users, Send, Shield, Split, Activity, Eye, Coins } from "lucide-react"

const features = [
  {
    title: "Multi-Crypto Support",
    description: "Send and receive any Solana token or stablecoin. Support for USDC, USDT, SOL, and more.",
    icon: <Coins className="w-7 h-7 stroke-2" />,
    color: "blue",
  },
  {
    title: "Social Payments",
    description: "Share your payments with friends, add emojis, and keep your social circle in the loop.",
    icon: <Activity className="w-7 h-7 stroke-2" />,
    color: "sky",
  },
  {
    title: "Secure & Private",
    description: "Your wallet is generated client-side and your private keys never leave your device.",
    icon: <Shield className="w-7 h-7 stroke-2" />,
    color: "cyan",
  },
]

type Color = "blue" | "sky" | "cyan"

const colorMap = {
  blue: "from-blue-600 to-blue-700",
  sky: "from-sky-500 to-sky-600",
  cyan: "from-cyan-500 to-cyan-600",
}

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-gray-50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Everything you need to manage social payments
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Powerful features to make sending and receiving money with friends as easy as sending a message.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorMap[feature.color as Color]} flex items-center justify-center text-white mb-4 md:mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 md:mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 