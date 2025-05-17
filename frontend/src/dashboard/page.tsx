"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [entered, setEntered] = useState(false);
  const [total, setTotal] = useState("");
  const [people, setPeople] = useState("");
  const [split, setSplit] = useState<number | null>(null);

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) setEntered(true);
  };

  const handleSplit = (e: React.FormEvent) => {
    e.preventDefault();
    const t = parseFloat(total);
    const p = parseInt(people);
    if (!isNaN(t) && !isNaN(p) && p > 0) {
      setSplit(Number((t / p).toFixed(2)));
    } else {
      setSplit(null);
    }
  };

  if (!entered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleEnter} className="bg-white p-8 rounded shadow w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-4 text-center">Welcome to Tabi</h1>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full mb-4"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Continue</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Tabi Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">Hi, {name}!</span>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">Connect Wallet</button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Bill Splitting Calculator</h2>
            <form onSubmit={handleSplit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Bill</label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={total}
                  onChange={e => setTotal(e.target.value)}
                  className="mt-1 block w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of People</label>
                <Input
                  type="number"
                  min="1"
                  value={people}
                  onChange={e => setPeople(e.target.value)}
                  className="mt-1 block w-full"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Calculate</button>
            </form>
            {split !== null && (
              <div className="mt-4 text-green-600 font-semibold text-center">
                Each person pays: ${split}
              </div>
            )}
          </div>
          <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center h-full">
            <h2 className="text-lg font-medium mb-4">Coming Soon</h2>
            <ul className="text-gray-500 list-disc list-inside space-y-2">
              <li>Transaction History</li>
              <li>Group Payments</li>
              <li>Rewards & Analytics</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
} 