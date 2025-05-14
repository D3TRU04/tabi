"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { LandingNavBar } from "@/components/landing-navbar"
import Footer from "@/components/footer"

type FAQItem = {
  question: string
  answer: string
  category: "general" | "security" | "payments" | "account"
}

const faqItems: FAQItem[] = [
  {
    question: "What is Tabi?",
    answer: "Tabi is a social payment platform built on Solana that makes it easy to send and receive money with friends. It combines the power of cryptocurrency with the simplicity of social payments, allowing you to split bills, track expenses, and stay connected with your social circle.",
    category: "general"
  },
  {
    question: "How does Tabi work?",
    answer: "Tabi uses Solana's blockchain technology to enable instant, secure payments between friends. Simply create an account, add your friends, and start sending money. The platform handles all the technical details, making it as easy as sending a message.",
    category: "general"
  },
  {
    question: "Is Tabi secure?",
    answer: "Yes, Tabi prioritizes security. Your private keys are stored securely in your browser, and all transactions are protected by Solana's robust blockchain technology. However, it's important to keep your device secure and never share your private keys with anyone.",
    category: "security"
  },
  {
    question: "What happens if I lose access to my account?",
    answer: "If you lose access to your account, you can recover it using your contact information (email or phone number) that you've added to your account settings. Make sure to add this information when you first create your account.",
    category: "security"
  },
  {
    question: "What cryptocurrencies does Tabi support?",
    answer: "Currently, Tabi supports Solana (SOL) and USDC on the Solana network. We plan to add more stablecoins and tokens in the future to provide more options for our users.",
    category: "payments"
  },
  {
    question: "Are there any fees for using Tabi?",
    answer: "Tabi charges minimal network fees for transactions, which are required by the Solana network. These fees are typically very low (less than $0.01) and are used to process your transactions on the blockchain.",
    category: "payments"
  },
  {
    question: "How do I add friends on Tabi?",
    answer: "You can add friends by clicking the 'Add Friend' button on your dashboard and entering their username. Once they accept your request, you can start sending and receiving money with them.",
    category: "account"
  },
  {
    question: "Can I use Tabi without a Solana wallet?",
    answer: "Yes! Tabi automatically creates a Solana wallet for you when you sign up. You don't need any prior cryptocurrency experience to use the platform.",
    category: "general"
  },
  {
    question: "How do I get started with Tabi?",
    answer: "Getting started is easy! Simply create an account, add your contact information for security, and start adding friends. You can then begin sending and receiving money instantly.",
    category: "general"
  },
  {
    question: "What if I send money to the wrong person?",
    answer: "Always double-check the recipient's username before sending money. If you accidentally send money to the wrong person, contact our support team immediately. However, please note that blockchain transactions cannot be reversed once confirmed.",
    category: "payments"
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <LandingNavBar />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-sky-500 text-white py-20 mt-[90px]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Find answers to common questions about Tabi, our features, and how to get started.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* FAQ Items */}
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => toggleItem(index)}
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openItems.includes(index) ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-4 bg-gray-50"
                  >
                    <p className="text-gray-600">{item.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-24 mb-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Still have questions?</h2>
            <p className="text-gray-600 mb-10">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-full px-8">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="border-gray-200 hover:border-blue-600 hover:text-blue-600 rounded-full px-8">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 