"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-purple-100/30 to-transparent rounded-full blur-3xl opacity-40"></div>

        {/* Animated shapes */}
        <motion.div
          className="absolute bottom-[20%] left-[10%] w-12 h-12 bg-pink-300 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute top-[30%] right-[5%] w-8 h-8 bg-teal-300 rounded-full opacity-20"
          animate={{
            y: [0, 15, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />
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
            className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-teal-100 to-pink-100 text-purple-600 font-medium text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Simple Process
          </motion.div>
          <motion.h2
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            How Tabi Works
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Getting started with Tabi is simple. Follow these steps to begin sending money instantly.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-12 md:gap-16">
            <Step
              number="01"
              title="Create your account"
              description="Enter a username to create your account. No email or phone number required."
              delay={0}
              image="/step1.png"
              color="purple"
            />
            <Step
              number="02"
              title="Get your Solana wallet"
              description="We'll automatically generate a Solana wallet for you. Your private keys stay on your device."
              delay={0.1}
              image="/step2.png"
              color="pink"
            />
            <Step
              number="03"
              title="Find your friends"
              description="Search for friends by username or invite them to join Tabi."
              delay={0.2}
              image="/step3.png"
              color="teal"
            />
            <Step
              number="04"
              title="Send & receive money"
              description="Instantly send or request money from your friends with just a few taps."
              delay={0.3}
              image="/step4.png"
              color="yellow"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({
  number,
  title,
  description,
  delay = 0,
  image,
  color,
}: {
  number: string
  title: string
  description: string
  delay?: number
  image: string
  color: "purple" | "pink" | "teal" | "yellow"
}) {
  const colorClasses = {
    purple: "bg-purple-100 text-purple-600 border-purple-200",
    pink: "bg-pink-100 text-pink-600 border-pink-200",
    teal: "bg-teal-100 text-teal-600 border-teal-200",
    yellow: "bg-yellow-100 text-yellow-600 border-yellow-200",
  }

  const gradientClasses = {
    purple: "from-purple-400 to-purple-600",
    pink: "from-pink-400 to-pink-600",
    teal: "from-teal-400 to-teal-600",
    yellow: "from-yellow-400 to-orange-500",
  }

  return (
    <motion.div
      className="flex flex-col md:flex-row items-start gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div className="flex-shrink-0" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-full flex items-center justify-center font-bold`}>
          {number}
        </div>
      </motion.div>
      <div className="flex-1 pt-1">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        {/* Step illustration */}
        <div className="mt-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm max-w-xs">
          <Image src={image || "/placeholder.svg"} width={200} height={150} alt={title} className="rounded-lg" />
          <div className={`h-1 w-full mt-2 bg-gradient-to-r ${gradientClasses[color]} rounded-full`}></div>
        </div>
      </div>
      <div className="hidden md:block flex-shrink-0 pt-1">
        <div className="relative">
          <ArrowRight className={`h-6 w-6 text-${color}-300`} />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              background: `radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(124, 58, 237, 0) 70%)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
