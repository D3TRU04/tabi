import { supabase } from '../config/supabase';
import type { User } from '../config/supabase';

export class UserService {
  async createUser(walletAddress: string, username: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          wallet_address: walletAddress,
          username,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserByWalletAddress(walletAddress: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows returned
      throw error;
    }
    return data;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
} 