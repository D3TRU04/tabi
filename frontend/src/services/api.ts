import { createClient } from '@supabase/supabase-js';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

// Validate Supabase environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl ? 'present' : 'missing',
    key: supabaseAnonKey ? 'present' : 'missing'
  });
  throw new Error('Missing required Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      
      // First check if Supabase is properly initialized
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }

      console.log('Attempting to sign up with Supabase...');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log('Auth response:', { authData, authError });

      if (authError) {
        console.error('Auth error:', authError);
        // Extract cooldown period from error message if it's a rate limit error
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
        console.error('No user data returned from signup');
        throw new Error('Failed to create user');
      }

      console.log('Signup successful, signing in user...');
      
      // Sign in the user immediately after signup to establish a session
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
          console.error('Error signing in after signup:', signInError);
          // Clean up the auth user if sign-in fails
          try {
              if (authData.user) await supabase.auth.admin.deleteUser(authData.user.id);
          } catch (deleteError) {
              console.error('Failed to clean up auth user:', deleteError);
          }
          throw new Error('Failed to sign in after signup.');
      }

      if (!signInData.session) {
          console.error('No session established after sign-in.');
          // Clean up the auth user if no session
          try {
              if (authData.user) await supabase.auth.admin.deleteUser(authData.user.id);
          } catch (deleteError) {
              console.error('Failed to clean up auth user:', deleteError);
          }
          throw new Error('Failed to establish session after signup.');
      }

      console.log('User signed in successfully, session established:', signInData.session);

      // Wait a short moment to ensure the user is fully created - removed as fetching session might be enough
      // await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Creating user profile...');
      
      // First verify we can access the profiles table
      const { data: tableCheck, error: tableError } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);

      if (tableError) {
        console.error('Table access error:', tableError);
        throw new Error('Cannot access profiles table. Please contact support.');
      }

      // Create user profile in the database
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          username,
          wallet_address: walletAddress || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (profileError) {
        console.error('Profile creation error:', {
          error: profileError,
          message: profileError && 'message' in profileError ? profileError.message : 'No message provided',
          details: profileError && 'details' in profileError ? profileError.details : 'No details provided',
          hint: profileError && 'hint' in profileError ? profileError.hint : 'No hint provided',
          code: profileError && 'code' in profileError ? profileError.code : 'No code provided'
        });

        // Handle specific error cases
        if (profileError && 'code' in profileError && profileError.code === '23505') { // Unique violation
          if (profileError && 'message' in profileError && profileError.message.includes('username')) {
            throw new Error('Username already taken');
          }
        }

        // If we get here, it's an unexpected error
        const errorMessage = profileError && 'message' in profileError ? profileError.message : 'An unexpected error occurred during profile creation.';

        // Clean up the auth user if profile creation fails
        try {
            if (authData.user) await supabase.auth.admin.deleteUser(authData.user.id);
        } catch (deleteError) {
            console.error('Failed to clean up auth user after profile creation failure:', deleteError);
        }

        throw new Error(`Failed to create profile: ${errorMessage}`);
      }

      if (!profileData) {
        throw new Error('Profile was not created successfully');
      }

      console.log('Constructing final user object...');
      try {
          const user = {
            id: authData.user.id,
            email: authData.user.email!,
            username,
            wallet_address: walletAddress || '',
          };

          console.log('Registration successful, returning user:', user);
          return { user };
      } catch (finalError) {
          console.error('Error constructing final user object:', finalError);
          // Clean up the auth user if final construction fails
          try {
              if (authData.user) await supabase.auth.admin.deleteUser(authData.user.id);
          } catch (deleteError) {
              console.error('Failed to clean up auth user after final error:', deleteError);
          }
          throw new Error('An error occurred during the final steps of registration.');
      }
    } catch (error) {
      console.error('Registration error:', {
        error,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        errorStack: error instanceof Error ? error.stack : undefined
      });
      
      if (error instanceof Error) {
        if (error.message.includes('already registered')) {
          throw new Error('Email already exists');
        }
        if (error.message.includes('duplicate key')) {
          throw new Error('Username already taken');
        }
        if (error.message.includes('network')) {
          throw new Error('Network error. Please check your connection.');
        }
        if (error.message.includes('Profiles table not found')) {
          throw new Error('System error. Please contact support.');
        }
      }
      throw error;
    }
  }

  async login(email: string, password: string): Promise<{ user: User }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password');
        }
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('User not found');
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        throw new Error('Failed to fetch user profile');
      }

      return {
        user: {
          id: data.user.id,
          email: data.user.email!,
          username: profile.username,
          wallet_address: profile.wallet_address,
        },
      };
    } catch (error) {
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