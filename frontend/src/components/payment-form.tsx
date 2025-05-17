"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { TOKEN_PROGRAM_ID, createTransferInstruction, getAssociatedTokenAddress } from "@solana/spl-token"
import { Card } from "@/components/ui/card"

// USDC mint address on devnet
const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU")

export function PaymentForm() {
  const { publicKey, sendTransaction } = useWallet()
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [token, setToken] = useState("SOL")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const supportedTokens = ["SOL", "USDC"]
  const allTokens = ["SOL", "USDC", "USDT", "BONK", "JUP", "mSOL"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey || !recipient || !amount) return

    if (!supportedTokens.includes(token)) {
      toast({
        title: `${token} support coming soon!`,
        description: `Sending ${token} will be available in a future update.`,
        variant: "default",
      })
      return
    }

    try {
      setIsLoading(true)
      const connection = new Connection("https://api.devnet.solana.com")
      const recipientPubkey = new PublicKey(recipient)

      if (token === "SOL") {
        // Handle SOL transfer
        const amountInLamports = parseFloat(amount) * LAMPORTS_PER_SOL
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientPubkey,
            lamports: amountInLamports,
          })
        )

        const signature = await sendTransaction(transaction, connection)
        await connection.confirmTransaction(signature)

        toast({
          title: "Payment sent!",
          description: `Transaction signature: ${signature}`,
        })
      } else if (token === "USDC") {
        // Handle USDC transfer
        const fromTokenAccount = await getAssociatedTokenAddress(
          USDC_MINT,
          publicKey
        )

        const toTokenAccount = await getAssociatedTokenAddress(
          USDC_MINT,
          recipientPubkey
        )

        // Amount in smallest unit (6 decimals for USDC)
        const amountInSmallestUnit = parseFloat(amount) * 1_000_000

        const transaction = new Transaction().add(
          createTransferInstruction(
            fromTokenAccount,
            toTokenAccount,
            publicKey,
            amountInSmallestUnit
          )
        )

        const signature = await sendTransaction(transaction, connection)
        await connection.confirmTransaction(signature)

        toast({
          title: "USDC Payment sent!",
          description: `Transaction signature: ${signature}`,
        })
      }

      setRecipient("")
      setAmount("")
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to send payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 rounded-3xl shadow-lg bg-white/90 border border-gray-100 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="token">Token</Label>
          <Select value={token} onValueChange={setToken}>
            <SelectTrigger className="rounded-full px-5 py-3 text-base shadow-sm border-gray-200">
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl bg-white border border-gray-200 shadow-lg">
              {allTokens.map((t) => (
                <SelectItem key={t} value={t} className="rounded-full">
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter Solana address"
            required
            className="rounded-full px-5 py-3 text-base shadow-sm border-gray-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount ({token})</Label>
          <Input
            id="amount"
            type="number"
            step={token === "SOL" ? "0.000000001" : "0.000001"}
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Enter amount in ${token}`}
            required
            className="rounded-full px-5 py-3 text-base shadow-sm border-gray-200"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-full py-3 text-lg font-semibold shadow-lg"
          disabled={isLoading || !publicKey}
        >
          {isLoading ? "Sending..." : `Send ${token}`}
        </Button>
      </form>
    </Card>
  )
} 