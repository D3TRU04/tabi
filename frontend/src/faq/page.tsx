"use client";

import { useState } from "react";

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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow">
              <button
                className="w-full px-6 py-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{item.question}</h3>
                  <span className="text-gray-500">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 