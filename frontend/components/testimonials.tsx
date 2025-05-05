"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    content:
      "Tabi has completely changed how I split bills with friends. No more awkward reminders or waiting days for bank transfers.",
    author: "Alex Johnson",
    role: "Designer",
    avatar: "/avatar1.png",
  },
  {
    id: 2,
    content:
      "I travel internationally a lot, and Tabi makes it so easy to send money back home without the crazy fees other services charge.",
    author: "Sarah Chen",
    role: "Digital Nomad",
    avatar: "/avatar2.png",
  },
  {
    id: 3,
    content:
      "The simplicity is what got me. I was up and running in seconds, and sending money is as easy as sending a text message.",
    author: "Michael Rodriguez",
    role: "Software Engineer",
    avatar: "/avatar3.png",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-purple-50"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>

        {/* Animated shapes */}
        <motion.div
          className="absolute top-[20%] right-[10%] w-10 h-10 bg-teal-300 rounded-full opacity-20"
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[15%] w-8 h-8 bg-pink-300 rounded-full opacity-20"
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 7,
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
            className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 font-medium text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Testimonials
          </motion.div>
          <motion.h2
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What our users say
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Don't just take our word for it. Here's what people are saying about their experience with Tabi.
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative">
            {/* Large quote mark */}
            <div className="absolute -top-10 -left-10 text-purple-200 opacity-50">
              <Quote size={80} />
            </div>

            {/* Testimonial card */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 relative z-10"
            >
              <p className="text-lg md:text-xl text-gray-700 mb-6 italic">{testimonials[activeIndex].content}</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                    width={60}
                    height={60}
                    alt={testimonials[activeIndex].author}
                    className="rounded-full border-2 border-purple-100"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonials[activeIndex].author}</h4>
                  <p className="text-gray-500">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-purple-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 text-purple-600" />
              </button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-purple-600" : "bg-gray-300"}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-purple-50 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 text-purple-600" />
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-teal-200 to-purple-200 rounded-full blur-3xl opacity-40"></div>
        </div>
      </div>
    </section>
  )
}
