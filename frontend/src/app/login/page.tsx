"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ArrowLeft, UserCircle2 } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(localStorage.getItem("tabi-username") || "");
      setEmail(localStorage.getItem("tabi-email") || "");
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tabi-username", username);
    }
  }, [username]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tabi-email", email);
    }
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && email.trim()) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-blue-50 to-gray-100 px-4">
      {/* Subtle, neutral back button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 rounded-full p-2 bg-white/80 shadow-md hover:bg-gray-200 transition text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Back to Home"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/90 p-8 pt-14 rounded-3xl shadow-2xl w-full max-w-sm text-center border border-gray-100 animate-fade-in"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        {/* Logo/Icon at the top */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full p-3 shadow-lg">
          <UserCircle2 className="w-12 h-12 text-blue-500" />
        </div>
        {/* Tagline */}
        <div className="mb-2 text-gray-500 text-sm font-medium tracking-wide">Welcome back to Tabi</div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign in to your account</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 rounded-full px-5 py-3 text-base shadow-sm border-gray-200"
          required
        />
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-6 rounded-full px-5 py-3 text-base shadow-sm border-gray-200"
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-3 rounded-full font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-sky-600 transition"
        >
          Continue
        </button>
      </form>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </div>
  );
} 