"use client";

import { useState, useEffect, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Activity, Plus, Sparkles, X, PlusCircle, Send, Split, Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp, BarChart3, Settings, Bell, History, Share2 } from "lucide-react";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import PaymentFeed from "@/components/payment-feed";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { PaymentForm } from "@/components/payment-form";
import { NavBar } from "@/components/navbar";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import type { UserType } from "@/types/user";
import { formatDistanceToNow } from "date-fns";

const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

// Add these new types after the existing imports
type GroupType = 'friends' | 'family' | 'business' | 'roommates' | 'travel' | 'custom';
type PaymentMethod = 'cash' | 'card' | 'crypto' | 'mixed';
type SplitScenario = 'equal' | 'items' | 'custom' | 'income' | 'shares' | 'percentage';

// Remove advanced group types and scenarios, keep only these:
type SplitMode = 'equal' | 'items' | 'custom';

type Person = {
  name: string;
  items?: number;
  amount?: number;
};

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [paymentFeed, setPaymentFeed] = useState<any[]>([]);
  const [transactions, setTransactions] = useState([
    {
      id: "tx1",
      type: "payment",
      amount: 0.5,
      token: "SOL",
      recipient: "Alex",
      description: "Lunch payment",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
      status: "completed"
    },
    {
      id: "tx2",
      type: "payment",
      amount: 25,
      token: "USDC",
      recipient: "Sarah",
      description: "Movie tickets",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      status: "completed"
    },
    {
      id: "tx3",
      type: "split",
      amount: 150,
      token: "USDC",
      recipient: "Group Dinner",
      description: "Split bill at Italian restaurant",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      status: "completed"
    },
    {
      id: "tx4",
      type: "payment",
      amount: 1.2,
      token: "SOL",
      recipient: "Mike",
      description: "Coffee and snacks",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
      status: "completed"
    },
    {
      id: "tx5",
      type: "payment",
      amount: 45,
      token: "USDC",
      recipient: "Emma",
      description: "Concert tickets",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
      status: "completed"
    },
    {
      id: "tx6",
      type: "split",
      amount: 200,
      token: "USDC",
      recipient: "Vacation Group",
      description: "Airbnb payment",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
      status: "completed"
    },
    {
      id: "tx7",
      type: "payment",
      amount: 0.8,
      token: "SOL",
      recipient: "John",
      description: "Gaming subscription",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), // 5 days ago
      status: "completed"
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(true);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "payments");
  const { publicKey, connected } = useWallet();
  // AI Financial Advisor mock state
  const [advisorInput, setAdvisorInput] = useState("");
  const [advisorResponse, setAdvisorResponse] = useState<string | null>(null);
  // Bill Splitter advanced state
  const [splitMode, setSplitMode] = useState<SplitMode>('equal');
  const [people, setPeople] = useState<Person[]>([
    { name: '', items: 1, amount: 0 },
    { name: '', items: 1, amount: 0 },
  ]);
  const [totalBill, setTotalBill] = useState('');
  const [tip, setTip] = useState('');
  const [tax, setTax] = useState('');
  const [currency, setCurrency] = useState('$');
  const [splitResult, setSplitResult] = useState<any[]>([]);
  const [splitTipTaxBy, setSplitTipTaxBy] = useState<'equal' | 'items'>('equal');
  // New state declarations in the Dashboard component
  const [groupType, setGroupType] = useState<GroupType>('friends');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mixed');
  const [splitScenario, setSplitScenario] = useState<SplitScenario>('equal');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [saveGroup, setSaveGroup] = useState(false);
  const [groupHistory, setGroupHistory] = useState<any[]>([]);
  const [showGroupHistory, setShowGroupHistory] = useState(false);
  const [featureTab, setFeatureTab] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Use mock user and payment feed data since Supabase/apiService is removed
        setUser({
          username: "demo_user",
          email: "demo@tabi.com",
          privacySettings: {
            showPayments: true,
            showBalance: true,
            showFriends: true,
          },
          balance: 0,
          friends: [],
          transactions: [],
          wallet: {
            connected: true,
            address: "DemoWalletAddress123",
            balances: { SOL: 2.5, USDC: 150 },
          },
        });
        setPaymentFeed([]); // or use mockPaymentFeed if you want to show demo data
      } catch (err) {
        // router.push("/login"); // Removed to prevent redirect loop
        // Optionally, set an error state here
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [router]);

  useEffect(() => {
    if (connected && publicKey && user) {
      const connection = new Connection("https://api.devnet.solana.com");
      connection.getBalance(publicKey).then(async (balance) => {
        const solBalance = balance / LAMPORTS_PER_SOL;
        let usdcBalance = 0;
        try {
          const usdcAccount = await getAssociatedTokenAddress(
            USDC_MINT,
            publicKey
          );
          const accountInfo = await getAccount(connection, usdcAccount);
          usdcBalance = Number(accountInfo.amount) / 1_000_000;
        } catch (error) {
          console.log("No USDC account found");
        }
        const updatedUser = {
          ...user,
          wallet: {
            connected: true,
            address: publicKey.toString(),
            balances: {
              SOL: solBalance,
              USDC: usdcBalance
            }
          }
        };
        setUser(updatedUser);
        sessionStorage.setItem("tabiUser", JSON.stringify(updatedUser));
      });
    }
  }, [connected, publicKey, user]);

  const handleLogout = () => {
    sessionStorage.removeItem("tabiUser");
    router.push("/");
  };

  const handleAdvisorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock AI response
    setAdvisorResponse("Based on your recent activity, you could save more by splitting bills and using USDC for group payments.");
  };

  const handlePersonChange = (idx: number, field: string, value: string) => {
    setPeople(prev => prev.map((p, i) => i === idx ? { ...p, [field]: field === 'name' ? value : Number(value) } : p));
  };
  const handleAddPerson = () => setPeople(prev => [...prev, { name: "", items: 1, amount: 0 }]);
  const handleRemovePerson = (idx: number) => setPeople(prev => prev.filter((_, i) => i !== idx));

  const handleSplit = (e: React.FormEvent) => {
    e.preventDefault();
    const bill = parseFloat(totalBill) || 0;
    const tipValue = parseFloat(tip) || 0;
    const taxValue = parseFloat(tax) || 0;
    const grandTotal = bill + tipValue + taxValue;
    let results: { name: string, owes: number }[] = [];
    if (splitMode === 'equal') {
      const perPerson = grandTotal / people.length;
      results = people.map((p, i) => ({ name: p.name || `Person ${i + 1}`, owes: perPerson }));
    } else if (splitMode === 'items') {
      const totalItems = people.reduce((sum, p) => sum + (p.items || 0), 0);
      results = people.map((p, i) => {
        const base = totalItems > 0 ? (bill * (p.items || 0) / totalItems) : 0;
        let tipShare = 0, taxShare = 0;
        if (splitTipTaxBy === 'equal') {
          tipShare = tipValue / people.length;
          taxShare = taxValue / people.length;
        } else {
          tipShare = totalItems > 0 ? (tipValue * (p.items || 0) / totalItems) : 0;
          taxShare = totalItems > 0 ? (taxValue * (p.items || 0) / totalItems) : 0;
        }
        return {
          name: p.name || `Person ${i + 1}`,
          owes: base + tipShare + taxShare
        };
      });
    } else if (splitMode === 'custom') {
      const customTotal = people.reduce((sum, p) => sum + (p.amount || 0), 0);
      // Distribute tip/tax equally
      const tipShare = tipValue / people.length;
      const taxShare = taxValue / people.length;
      results = people.map((p, i) => ({
        name: p.name || `Person ${i + 1}`,
        owes: (p.amount || 0) + tipShare + taxShare
      }));
    }
    setSplitResult(results);
  };

  // Add these new functions in the Dashboard component
  const handleGroupTypeChange = (type: GroupType) => {
    setGroupType(type);
    // Pre-fill some fields based on group type
    switch (type) {
      case 'family':
        setSplitScenario('income');
        break;
      case 'business':
        setSplitScenario('shares');
        break;
      case 'roommates':
        setSplitScenario('custom');
        break;
      case 'travel':
        setSplitScenario('items');
        break;
      default:
        setSplitScenario('equal');
    }
  };

  const handleSaveGroup = () => {
    if (saveGroup && groupName) {
      const newGroup = {
        id: Date.now(),
        name: groupName,
        type: groupType,
        description: groupDescription,
        members: people,
        createdAt: new Date().toISOString()
      };
      setGroupHistory(prev => [...prev, newGroup]);
      toast({
        title: "Group Saved",
        description: "Your group has been saved for future use.",
      });
    }
  };

  // Add mock data for recent activity if paymentFeed is empty
  const mockPaymentFeed = [
    {
      id: 'p1',
      type: 'payment',
      timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), // 20 mins ago
      user: 'You',
      action: 'paid Alex',
      details: {
        amount: 0.25,
        token: 'SOL',
        description: 'Coffee at Blue Bottle',
      },
    },
    {
      id: 'p2',
      type: 'payment',
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
      user: 'You',
      action: 'paid Sarah',
      details: {
        amount: 12,
        token: 'USDC',
        description: 'Lunch at Sweetgreen',
      },
    },
    {
      id: 'p3',
      type: 'payment',
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
      user: 'You',
      action: 'paid Mike',
      details: {
        amount: 0.5,
        token: 'SOL',
        description: 'Ride share',
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Fallback to mock user if user is still null
  const displayUser = user || {
    username: "demo_user",
    email: "demo@tabi.com",
    privacySettings: {
      showPayments: true,
      showBalance: true,
      showFriends: true,
    },
    balance: 0,
    friends: [],
    transactions: [],
    wallet: {
      connected: true,
      address: "DemoWalletAddress123",
      balances: { SOL: 2.5, USDC: 150 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30"
    >
      {/* Disclaimer Modal */}
      <AnimatePresence>
        {disclaimerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 rounded-3xl shadow-2xl p-8 flex flex-col items-center max-w-md mx-auto border border-gray-100 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 flex items-center justify-center mb-6">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Preview Mode: Real Features Coming Soon</h2>
              <p className="mb-6 text-gray-500 text-center max-w-xs">
                This dashboard is currently in preview mode. Many features and data are mock or for demonstration only. Real wallet connections, payments, and live data will be available in a future update. Stay tuned for the full experience!
              </p>
              <button
                onClick={() => setDisclaimerOpen(false)}
                className="bg-gradient-to-r from-blue-600 to-sky-500 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-sky-600 transition text-center"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`relative transition-all duration-500 ${disclaimerOpen ? "pointer-events-none select-none blur-sm brightness-90" : ""}`}>
        <NavBar user={displayUser} />
        
        <div className="container mx-auto px-4 py-8">
          {/* Top-level feature tabs */}
          <Tabs value={featureTab} onValueChange={setFeatureTab} className="w-full mb-10">
            <TabsList className="flex bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow mb-8">
              <TabsTrigger value="overview" className="flex-1 px-8 py-3 font-semibold rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-sky-400 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 transition-all">Overview</TabsTrigger>
              <TabsTrigger value="payments" className="flex-1 px-8 py-3 font-semibold rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-sky-400 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 transition-all">Payments</TabsTrigger>
              <TabsTrigger value="split" className="flex-1 px-8 py-3 font-semibold rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-sky-400 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 transition-all">Bill Splitter</TabsTrigger>
              <TabsTrigger value="advisor" className="flex-1 px-8 py-3 font-semibold rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-sky-400 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 transition-all">AI Advisor</TabsTrigger>
            </TabsList>
            {/* Overview Tab */}
            <TabsContent value="overview">
              {/* Welcome Section */}
              <div className="mb-14 mt-10 flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent mb-4 drop-shadow-lg">
                  {displayUser.username ? `Welcome, ${displayUser.username}!` : 'Welcome to Tabi!'}
                </h1>
                <p className="text-lg text-gray-500 max-w-xl mx-auto mb-4">Your all-in-one dashboard for payments, bill splitting, and smart financial insights. Experience the future of group finance.</p>
              </div>
              {/* Quick Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/90 rounded-3xl p-6 shadow-lg border border-gray-100 flex flex-col items-center">
                  <Wallet className="w-8 h-8 text-blue-500 mb-2" />
                  <span className="text-sm font-medium text-gray-500">Total Balance</span>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{displayUser.wallet.balances.SOL} SOL</p>
                  <p className="text-lg text-gray-600">${displayUser.wallet.balances.USDC} USDC</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/90 rounded-3xl p-6 shadow-lg border border-gray-100 flex flex-col items-center">
                  <ArrowUpRight className="w-8 h-8 text-green-500 mb-2" />
                  <span className="text-sm font-medium text-gray-500">Sent Today</span>
                  <p className="text-2xl font-bold text-gray-900 mt-1">0.5 SOL</p>
                  <p className="text-lg text-gray-600">$25 USDC</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/90 rounded-3xl p-6 shadow-lg border border-gray-100 flex flex-col items-center">
                  <ArrowDownLeft className="w-8 h-8 text-purple-500 mb-2" />
                  <span className="text-sm font-medium text-gray-500">Received Today</span>
                  <p className="text-2xl font-bold text-gray-900 mt-1">1.2 SOL</p>
                  <p className="text-lg text-gray-600">$150 USDC</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/90 rounded-3xl p-6 shadow-lg border border-gray-100 flex flex-col items-center">
                  <TrendingUp className="w-8 h-8 text-orange-500 mb-2" />
                  <span className="text-sm font-medium text-gray-500">Monthly Activity</span>
                  <p className="text-2xl font-bold text-gray-900 mt-1">24 Tx</p>
                  <p className="text-lg text-gray-600">+12% vs last month</p>
                </motion.div>
              </div>
              {/* Soft background accent for depth */}
              <div className="absolute left-0 right-0 top-0 h-96 pointer-events-none -z-10" aria-hidden>
                <div className="w-full h-full bg-gradient-to-br from-blue-100/40 via-white/60 to-sky-100/40 blur-2xl opacity-70"></div>
              </div>
            </TabsContent>
            {/* Payments Tab */}
            <TabsContent value="payments">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  {/* Payment Feed */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 shadow border border-gray-100 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                    <PaymentFeed items={paymentFeed.length > 0 ? paymentFeed : mockPaymentFeed} />
                  </motion.div>
                </div>
                <div>
                  {/* Send Payment */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 shadow border border-gray-100 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Send Payment</h3>
                    <PaymentForm />
                  </motion.div>
                </div>
              </div>
            </TabsContent>
            {/* Bill Splitter Tab */}
            <TabsContent value="split">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 shadow border border-gray-100 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Bill Splitting Calculator</h2>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-xl"
                    onClick={handleAddPerson}
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Person
                  </Button>
                </div>
                <form className="space-y-6" onSubmit={handleSplit}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Total Bill</label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={totalBill}
                          onChange={e => setTotalBill(e.target.value)}
                          className="rounded-xl flex-1"
                          required
                        />
                        <Input
                          type="text"
                          value={currency}
                          onChange={e => setCurrency(e.target.value)}
                          className="rounded-xl w-20 text-center"
                          maxLength={2}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Tip</label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={tip}
                        onChange={e => setTip(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Tax</label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={tax}
                        onChange={e => setTax(e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-xl font-medium transition ${splitMode === 'equal' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => setSplitMode('equal')}
                    >
                      Equally
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-xl font-medium transition ${splitMode === 'items' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => setSplitMode('items')}
                    >
                      By Items
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-xl font-medium transition ${splitMode === 'custom' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => setSplitMode('custom')}
                    >
                      Custom Amount
                    </button>
                  </div>
                  {splitMode === 'items' && (
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium text-gray-700">Split tip/tax by:</label>
                      <button
                        type="button"
                        className={`px-3 py-1 rounded-xl font-medium transition ${splitTipTaxBy === 'equal' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        onClick={() => setSplitTipTaxBy('equal')}
                      >
                        Equally
                      </button>
                      <button
                        type="button"
                        className={`px-3 py-1 rounded-xl font-medium transition ${splitTipTaxBy === 'items' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        onClick={() => setSplitTipTaxBy('items')}
                      >
                        By Items
                      </button>
                    </div>
                  )}
                  <div className="space-y-4">
                    {people.map((p, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row gap-3 items-center bg-gray-50 rounded-2xl p-4"
                      >
                        <Input
                          type="text"
                          placeholder="Name (optional)"
                          value={p.name}
                          onChange={e => handlePersonChange(idx, 'name', e.target.value)}
                          className="rounded-xl flex-1"
                        />
                        {splitMode === 'items' && (
                          <Input
                            type="number"
                            min="1"
                            value={p.items}
                            onChange={e => handlePersonChange(idx, 'items', e.target.value)}
                            className="rounded-xl w-28"
                            placeholder="Items"
                          />
                        )}
                        {splitMode === 'custom' && (
                          <Input
                            type="number"
                            min="0"
                            value={p.amount}
                            onChange={e => handlePersonChange(idx, 'amount', e.target.value)}
                            className="rounded-xl w-32"
                            placeholder="Amount"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemovePerson(idx)}
                          className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-xl py-3 text-base font-semibold shadow-lg"
                  >
                    Calculate Split
                  </Button>
                </form>
                {splitResult.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <h3 className="text-lg font-semibold mb-4">Split Result</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {splitResult.map((r, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center bg-blue-50 rounded-2xl px-5 py-3"
                        >
                          <span className="font-medium text-blue-700">{r.name}</span>
                          <span className="font-semibold text-blue-700">
                            {currency}{r.owes.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>
            {/* AI Advisor Tab */}
            <TabsContent value="advisor">
              <div className="flex flex-col items-center justify-center min-h-[60vh] py-8">
                <div className="relative w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-50/80 via-white/90 to-sky-100/80 rounded-3xl shadow-2xl border border-blue-100 flex flex-col items-center px-0 py-0 overflow-hidden">
                  {/* Animated background accent */}
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="w-full h-full bg-gradient-to-tr from-blue-200/40 via-white/60 to-sky-200/40 blur-2xl opacity-80 animate-pulse-slow"></div>
                  </div>
                  {/* Header with icon and title */}
                  <div className="relative z-10 flex flex-col items-center pt-10 pb-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 shadow-xl flex items-center justify-center mb-3 animate-pulse">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight leading-tight mb-1">AI Financial Advisor</h2>
                    <p className="text-base text-gray-500 font-medium mb-2">Ask anything about your finances, payments, or group spending.</p>
                  </div>
                  {/* Prompt input */}
                  <form onSubmit={handleAdvisorSubmit} className="relative z-10 flex flex-col gap-4 w-full px-8 pt-2 pb-6 items-center">
                    <Input
                      type="text"
                      placeholder="Ask for financial advice..."
                      value={advisorInput}
                      onChange={e => setAdvisorInput(e.target.value)}
                      className="rounded-xl px-5 py-4 text-lg shadow border border-blue-200 bg-white/90 focus:ring-2 focus:ring-blue-200 placeholder:text-blue-300 w-full"
                      required
                    />
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-xl py-3 text-lg font-semibold shadow-xl mt-2"
                    >
                      <Sparkles className="w-5 h-5 mr-2 -mt-1" /> Ask AI
                    </Button>
                  </form>
                  {/* AI response as a modern card */}
                  {advisorResponse && (
                    <div className="relative z-10 w-full flex justify-center px-8 pb-10">
                      <div className="flex items-start gap-3 w-full max-w-md mt-2">
                        <div className="flex-shrink-0 p-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 shadow-lg flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <div className="bg-white/95 border border-blue-200 rounded-2xl px-6 py-4 shadow-xl text-blue-900 text-base font-medium leading-relaxed w-full">
                          {advisorResponse}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
} 