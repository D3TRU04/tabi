import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import dotenv from 'dotenv';

dotenv.config();

// Network configuration
export const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Token configuration
export const USDC_MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'); // Devnet USDC
export const USDC_DECIMALS = 6;

// Constants
export const LAMPORTS_PER_SOL = 1000000000;

// Error messages
export const ERROR_MESSAGES = {
  INVALID_AMOUNT: 'Amount must be greater than 0',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  INVALID_WALLET: 'Invalid wallet address',
  TRANSACTION_FAILED: 'Transaction failed',
  DAILY_LIMIT_EXCEEDED: 'Daily payment limit exceeded',
  INVALID_RECEIVER: 'Invalid receiver address',
  NETWORK_ERROR: 'Network error occurred',
  WALLET_NOT_CONNECTED: 'Wallet not connected',
  INVALID_TOKEN_ACCOUNT: 'Invalid token account',
  PROGRAM_ERROR: 'Program error occurred',
} as const; 