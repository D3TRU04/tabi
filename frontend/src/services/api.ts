// AUTH DISABLED - All authentication, login, register, and user profile related code is no longer used.
// You can safely ignore or remove these functions.

import { createClient } from '@supabase/supabase-js';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

// Validate Supabase environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl ? 'present' : 'missing',
    anonKey: supabaseAnonKey ? 'present' : 'missing',
    serviceKey: supabaseServiceKey ? 'present' : 'missing'
  });
  throw new Error('Missing required Supabase environment variables');
}

// Create two clients - one for regular operations and one for admin operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export interface User {
  id: string;
  email: string;
  username: string;
  wallet_address: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Transaction {
  id: string;
  sender_id: string;
  receiver_id: string;
  amount: number;
  stablecoin_type: string;
  memo: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface SupabaseError {
  code?: string;
  message?: string;
}

class ApiService {
  private async getAuthHeader() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('No authentication token found');
    }
    return {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    };
  }

  async register(email: string, password: string, username: string, walletAddress: string): Promise<{ user: User }> {
    try {
      console.log('Starting registration process...');
      
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }

      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (authError) {
        console.error('Auth error:', authError);
        if (authError.message.includes('For security purposes')) {
          const match = authError.message.match(/(\d+)\s+seconds/);
          if (match) {
            const cooldownSeconds = parseInt(match[1]);
            console.log('Rate limit cooldown period:', cooldownSeconds, 'seconds');
          }
        }
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('Failed to create user');
      }

      // Wait a short moment to ensure the user is fully created in auth
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if username already exists in profiles
      const { data: existingUsername, error: usernameCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();

      if (existingUsername) {
        // Clean up the auth user
        try {
          await supabase.auth.admin.deleteUser(authData.user.id);
        } catch (deleteError) {
          console.error('Failed to clean up auth user:', deleteError);
        }
        throw new Error('Username already taken');
      }

      // Check if wallet address already exists in users
      const { data: existingWallet, error: walletCheckError } = await supabase
        .from('users')
        .select('id')
        .eq('wallet_address', walletAddress)
        .single();

      if (existingWallet) {
        // Clean up the auth user
        try {
          await supabase.auth.admin.deleteUser(authData.user.id);
        } catch (deleteError) {
          console.error('Failed to clean up auth user:', deleteError);
        }
        throw new Error('Wallet address already registered');
      }

      // Create user in users table
      try {
        console.log('Creating user record with data:', {
          id: authData.user.id,
          wallet_address: walletAddress,
          username,
        });

        // Use admin client for user creation
        const { data: userData, error: userError } = await supabaseAdmin
          .from('users')
          .insert({
            id: authData.user.id,
            email: email,
            wallet_address: walletAddress,
            username,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (userError) {
          console.error('User creation error details:', {
            code: userError.code,
            message: userError.message,
            details: userError.details,
            hint: userError.hint
          });

          // Clean up the auth user
          try {
            await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
          } catch (deleteError) {
            console.error('Failed to clean up auth user:', deleteError);
          }

          if (userError.code === '23505') {
            if (userError.message?.includes('wallet_address')) {
              throw new Error('Wallet address already registered');
            }
            if (userError.message?.includes('username')) {
              throw new Error('Username already taken');
            }
            if (userError.message?.includes('email')) {
              throw new Error('Email already registered');
            }
          }
          throw new Error(`Failed to create user record: ${userError.message || 'Unknown error'}`);
        }

        if (!userData) {
          throw new Error('User record was not created');
        }

        console.log('User record created successfully:', userData);

        // Create profile in profiles table
        console.log('Creating profile record...');
        const { data: profileData, error: profileError } = await supabaseAdmin
          .from('profiles')
          .insert({
            id: authData.user.id,
            username,
            wallet_address: walletAddress,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (profileError) {
          console.error('Profile creation error details:', {
            code: profileError.code,
            message: profileError.message,
            details: profileError.details,
            hint: profileError.hint
          });

          // Clean up both auth user and user record
          try {
            await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
            await supabaseAdmin.from('users').delete().eq('id', userData.id);
          } catch (deleteError) {
            console.error('Failed to clean up records:', deleteError);
          }
          throw new Error(`Failed to create user profile: ${profileError.message || 'Unknown error'}`);
        }

        if (!profileData) {
          throw new Error('Profile record was not created');
        }

        console.log('Profile record created successfully:', profileData);

        return {
          user: {
            id: authData.user.id,
            email: authData.user.email!,
            username,
            wallet_address: walletAddress,
          }
        };
      } catch (error) {
        console.error('Registration process error:', error);
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('An unexpected error occurred during registration');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(emailOrUsername: string, password: string): Promise<{ user: User }> {
    try {
      console.log('Attempting login...');
      
      // First check if the input is a username
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('username', emailOrUsername)
        .single();

      let email = emailOrUsername;
      if (userData?.email) {
        email = userData.email;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid username/email or password');
        }
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('User not found');
      }

      console.log('Auth successful, fetching user profile...');
      // Get user profile from users table
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('User fetch error:', profileError);
        throw new Error('Failed to fetch user profile');
      }

      return {
        user: {
          id: data.user.id,
          email: userProfile.email,
          username: userProfile.username,
          wallet_address: userProfile.wallet_address,
        },
      };
    } catch (error) {
      console.error('Login process error:', error);
      throw error;
    }
  }

  async logout() {
    await supabase.auth.signOut();
  }

  async createTransaction(
    senderId: string,
    receiverId: string,
    amount: number,
    stablecoinType: string,
    memo: string
  ): Promise<Transaction> {
    const headers = await this.getAuthHeader();
    const response = await fetch(`${BACKEND_URL}/api/transactions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sender_id: senderId,
        receiver_id: receiverId,
        amount,
        stablecoin_type: stablecoinType,
        memo,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create transaction');
    }

    return response.json();
  }

  async checkHealth(): Promise<{ status: string }> {
    const response = await fetch(`${BACKEND_URL}/api/health`);
    if (!response.ok) {
      throw new Error('Backend health check failed');
    }
    return response.json();
  }

  async getUserProfile(): Promise<User> {
    const headers = await this.getAuthHeader();
    const response = await fetch(`${BACKEND_URL}/api/user`, {
      method: 'GET',
      headers,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch user profile');
    }
    return response.json();
  }

  async getPaymentFeed(): Promise<any[]> {
    const headers = await this.getAuthHeader();
    const response = await fetch(`${BACKEND_URL}/api/payments`, {
      method: 'GET',
      headers,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch payment feed');
    }
    return response.json();
  }
}

export const apiService = new ApiService(); 