import {
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  Keypair,
} from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  getAccount,
} from '@solana/spl-token';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { connection, USDC_MINT, USDC_DECIMALS, ERROR_MESSAGES } from '../config/solana';
import { supabase } from '../config/supabase';
import type { Transaction as DBTransaction } from '../config/supabase';
import { IDL } from '../programs/payment';
import { BN } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { AnchorService } from './anchorService';

export class TransactionService {
  private anchorService: AnchorService;

  constructor() {
    this.anchorService = new AnchorService();
  }

  async createTransaction(
    senderWallet: string,
    receiverWallet: string,
    amount: number,
    memo: string = ''
  ): Promise<DBTransaction> {
    if (amount <= 0) {
      throw new Error(ERROR_MESSAGES.INVALID_AMOUNT);
    }

    try {
      const senderPubkey = new PublicKey(senderWallet);
      const receiverPubkey = new PublicKey(receiverWallet);

      // Create a dummy signer for testing
      const senderSigner = Keypair.generate();
      const receiverSigner = Keypair.generate();

      // Get or create token accounts
      const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        senderSigner,
        USDC_MINT,
        senderPubkey
      );

      const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        receiverSigner,
        USDC_MINT,
        receiverPubkey
      );

      // Send payment using Anchor program
      const tx = await this.anchorService.sendPayment(
        senderPubkey,
        receiverPubkey,
        senderTokenAccount.address,
        receiverTokenAccount.address,
        amount * Math.pow(10, USDC_DECIMALS),
        memo
      );

      // Get user IDs from Supabase
      const { data: sender } = await supabase
        .from('users')
        .select('id')
        .eq('wallet_address', senderWallet)
        .single();

      const { data: receiver } = await supabase
        .from('users')
        .select('id')
        .eq('wallet_address', receiverWallet)
        .single();

      if (!sender || !receiver) {
        throw new Error('Sender or receiver not found in database');
      }

      // Record transaction in Supabase
      const { data: dbTransaction, error } = await supabase
        .from('transactions')
        .insert([
          {
            sender_id: sender.id,
            receiver_id: receiver.id,
            amount,
            stablecoin_type: 'USDC',
            transaction_hash: tx,
            status: 'completed',
            memo,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return dbTransaction;
    } catch (error) {
      // Record failed transaction
      const { data: dbTransaction, error: dbError } = await supabase
        .from('transactions')
        .insert([
          {
            sender_id: senderWallet,
            receiver_id: receiverWallet,
            amount,
            stablecoin_type: 'USDC',
            transaction_hash: 'failed',
            status: 'failed',
            memo,
          },
        ])
        .select()
        .single();

      if (dbError) throw dbError;
      throw error;
    }
  }

  async getTransactionHistory(walletAddress: string): Promise<DBTransaction[]> {
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('wallet_address', walletAddress)
      .single();

    if (!user) {
      throw new Error('User not found');
    }

    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*')
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return transactions;
  }

  async getBalance(walletAddress: string): Promise<number> {
    try {
      const pubkey = new PublicKey(walletAddress);
      const signer = Keypair.generate();
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        signer,
        USDC_MINT,
        pubkey
      );

      const account = await getAccount(connection, tokenAccount.address);
      return Number(account.amount) / Math.pow(10, USDC_DECIMALS);
    } catch (error) {
      throw new Error('Failed to get balance');
    }
  }

  async getPaymentAccountInfo(walletAddress: string) {
    const pubkey = new PublicKey(walletAddress);
    return await this.anchorService.getPaymentAccount(pubkey);
  }

  async updateDailyLimit(walletAddress: string, newLimit: number) {
    const pubkey = new PublicKey(walletAddress);
    return await this.anchorService.updateDailyLimit(pubkey, newLimit);
  }
} 