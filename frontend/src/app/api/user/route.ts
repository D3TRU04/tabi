import { NextRequest, NextResponse } from "next/server";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";

// USDC mint address on devnet
const USDC_MINT = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json({ error: "Missing wallet address" }, { status: 400 });
  }

  try {
    const connection = new Connection("https://api.devnet.solana.com");
    const publicKey = new PublicKey(wallet);

    // Get SOL balance
    const solBalance = await connection.getBalance(publicKey) / LAMPORTS_PER_SOL;

    // Get USDC balance
    let usdcBalance = 0;
    try {
      const usdcAccount = await getAssociatedTokenAddress(USDC_MINT, publicKey);
      const accountInfo = await getAccount(connection, usdcAccount);
      usdcBalance = Number(accountInfo.amount) / 1_000_000; // USDC has 6 decimals
    } catch (error) {
      // No USDC account found
    }

    return NextResponse.json({
      username: "solana_user", // You can fetch this from your DB if you have one
      email: "user@tabi.com",  // Ditto
      wallet_address: wallet,
      balance: solBalance,
      privacySettings: {
        showPayments: true,
        showBalance: true,
        showFriends: true,
      },
      friends: [],
      transactions: [],
      wallet: {
        connected: true,
        address: wallet,
        balances: { SOL: solBalance, USDC: usdcBalance },
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid wallet address or Solana error" }, { status: 400 });
  }
} 