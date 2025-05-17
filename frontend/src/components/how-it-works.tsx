"use client"

import { ArrowRight, Wallet, Users, Send, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

type Color = "blue" | "sky" | "cyan" | "light-blue";

const colorClasses = {
  blue: "bg-blue-100 text-blue-700",
  sky: "bg-sky-100 text-sky-700",
  cyan: "bg-cyan-100 text-cyan-700",
  "light-blue": "bg-blue-50 text-blue-600",
};

const gradientClasses = {
  blue: "from-blue-600 to-sky-500",
  sky: "from-sky-600 to-blue-500",
  cyan: "from-cyan-600 to-blue-500",
  "light-blue": "from-blue-500 to-sky-400",
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-gray-50"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-blue-100/30 to-transparent rounded-full blur-3xl opacity-40"></div>

        {/* Animated shapes */}
        <motion.div
          className="absolute bottom-[20%] left-[10%] w-12 h-12 bg-blue-300 rounded-full opacity-20"
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
          className="absolute top-[30%] right-[5%] w-8 h-8 bg-sky-300 rounded-full opacity-20"
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

      {/* Modern Wave Divider - Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[100px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="howitworks-cta-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#2563eb" />
              <stop offset="100%" stop-color="#0ea5e9" />
            </linearGradient>
          </defs>
          <path
            fill="url(#howitworks-cta-gradient)"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Top Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
        <svg
          className="relative block w-full h-[100px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#f9fafb"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
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
            Simple Process
          </motion.div>
          <motion.h2
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500"
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
          <div className="grid md:grid-cols-3 gap-10">
            <Step
              number="1"
              title="Connect Your Wallet"
              description="Link your Solana wallet or create a new one. We support Phantom, Solflare, and other popular wallets."
              color="blue"
              delay={0}
              icon={<Wallet className="w-7 h-7 stroke-2" />}
            />
            <Step
              number="2"
              title="AI Financial Advising"
              description="Get personalized financial advice based on your transaction history, activity feed, and wallet analysis."
              color="blue"
              delay={0.1}
              icon={<Sparkles className="w-7 h-7 stroke-2" />}
            />
            <Step
              number="3"
              title="Send & Split"
              description="Send crypto instantly or split bills with friends. Choose from USDC, USDT, SOL, or other tokens."
              color="blue"
              delay={0.2}
              icon={<Send className="w-7 h-7 stroke-2" />}
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
  icon,
  color,
}: {
  number: string
  title: string
  description: string
  delay?: number
  icon: React.ReactNode
  color: "blue" | "sky" | "cyan" | "light-blue"
}) {
  return (
    <motion.div
      className="flex flex-col md:flex-col items-center gap-5 px-2 py-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div className="flex-shrink-0" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
        <div className={`flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 text-${color}-600 opacity-90 shrink-0`}>
          {icon}
        </div>
      </motion.div>
      <div className="flex-1 w-full flex flex-col items-center text-center">
        <h3 className="text-xl font-bold mb-2 mt-2">{title}</h3>
        <p className="text-gray-600 mb-0.5">{description}</p>
      </div>
    </motion.div>
  )
}
