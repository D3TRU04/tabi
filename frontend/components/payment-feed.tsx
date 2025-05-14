"use client"

import { motion } from "framer-motion"
import { Send, Users, Split } from "lucide-react"
import type { PaymentFeedItem } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

type PaymentFeedProps = {
  items: PaymentFeedItem[]
}

export default function PaymentFeed({ items }: PaymentFeedProps) {
  const getIcon = (type: PaymentFeedItem["type"]) => {
    switch (type) {
      case "payment":
        return <Send className="w-5 h-5" />
      case "split":
        return <Split className="w-5 h-5" />
      case "friend":
        return <Users className="w-5 h-5" />
    }
  }

  const getColor = (type: PaymentFeedItem["type"]) => {
    switch (type) {
      case "payment":
        return "bg-blue-100 text-blue-600"
      case "split":
        return "bg-green-100 text-green-600"
      case "friend":
        return "bg-purple-100 text-purple-600"
    }
  }

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-lg ${getColor(item.type)}`}>
              {getIcon(item.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-900 font-medium">{item.user} {item.action}</p>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                </span>
              </div>
              {item.details.amount && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">
                    {item.details.amount} {item.details.token}
                  </span>
                  {item.details.description && (
                    <span className="ml-2">• {item.details.description}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
} 