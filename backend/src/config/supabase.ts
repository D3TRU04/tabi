import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface User {
  id: string;
  wallet_address: string;
  username: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  sender_id: string;
  receiver_id: string;
  amount: number;
  stablecoin_type: string;
  transaction_hash: string;
  status: 'pending' | 'completed' | 'failed';
  memo: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentAccount {
  id: string;
  user_id: string;
  daily_limit: number;
  created_at: string;
  updated_at: string;
}

// Database types for TypeScript
export type FriendConnection = {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted';
  created_at: string;
  updated_at: string;
}; 