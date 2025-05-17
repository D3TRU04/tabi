"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LandingNavBar } from "@/components/landing-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is Tabi?",
    answer: "Tabi is a bill-splitting app that helps you easily split expenses with friends, family, or roommates. It provides a simple and efficient way to track shared expenses and settle debts."
  },
  {
    question: "How do I use Tabi?",
    answer: "Simply create an account, add your expenses, and invite your friends to join. You can then split bills, track who owes what, and settle up easily."
  },
  {
    question: "Is Tabi free to use?",
    answer: "Yes, Tabi is completely free to use. We believe in making bill splitting accessible to everyone."
  },
  {
    question: "Can I use Tabi without creating an account?",
    answer: "While you can try out some features without an account, creating an account allows you to save your data, track expenses over time, and collaborate with others."
  },
  {
    question: "How secure is my data?",
    answer: "We take security seriously. All your data is encrypted and stored securely. We never share your personal information with third parties."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-sky-100 relative overflow-x-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-200/40 rounded-full blur-3xl z-0 animate-pulse"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-3xl z-0 animate-pulse"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
      <LandingNavBar />
      <main className="pt-44 pb-24 flex flex-col items-center min-h-screen z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full flex flex-col items-center"
        >
          <div className="max-w-2xl w-full mx-auto px-4">
            <div className="flex flex-col items-center mb-20">
              <h1 className="text-2xl md:text-3xl font-semibold text-center bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent drop-shadow-lg mb-2">Frequently Asked Questions</h1>
              <p className="text-lg text-gray-500 text-center max-w-xl">Everything you need to know about Tabi. If you have more questions, feel free to contact us!</p>
            </div>
            <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200 shadow-2xl p-2 md:p-6 space-y-4 md:space-y-6">
              {faqItems.map((item, index) => (
                <div key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <Card
                      className="rounded-2xl border-none shadow-none bg-transparent transition-transform duration-200 hover:scale-[1.025] group"
                    >
                      <CardHeader className="p-0">
                        <Button
                          variant="ghost"
                          className="w-full flex justify-between items-center px-6 md:px-8 py-6 text-xl font-semibold text-gray-800 hover:text-blue-600 focus:outline-none transition-colors rounded-2xl group"
                          onClick={() => toggleFAQ(index)}
                          aria-expanded={openIndex === index}
                          aria-controls={`faq-content-${index}`}
                        >
                          <span>{item.question}</span>
                          <motion.span
                            className="ml-4"
                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className={`w-7 h-7 text-blue-400 transition-transform`} />
                          </motion.span>
                        </Button>
                      </CardHeader>
                      <AnimatePresence initial={false}>
                        {openIndex === index && (
                          <motion.div
                            id={`faq-content-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <CardContent className="px-6 md:px-8 pb-6 pt-0 text-gray-600 text-lg leading-relaxed">
                              {item.answer}
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                  {index < faqItems.length - 1 && (
                    <div className="my-2 md:my-4 border-t border-dashed border-gray-200 w-11/12 mx-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 