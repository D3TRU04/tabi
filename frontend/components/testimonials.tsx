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

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  delay: number;
}

const TestimonialCard = ({ quote, author, role, avatar, delay }: TestimonialCardProps) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-lg relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/20 to-sky-100/20 rounded-full blur-2xl"></div>
      <div className="relative z-10">
        <p className="text-gray-600 mb-6">{quote}</p>
        <div className="flex items-center">
          <img src={avatar} alt={author} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h4 className="font-semibold text-gray-900">{author}</h4>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50 to-white"></div>
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
            Loved by thousands of users
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join thousands of users who are already using Tabi to manage their social payments.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.author}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
