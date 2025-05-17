// AUTH DISABLED - useAuth hook is no longer used.
// All authentication logic has been removed from the app.

import { useEffect, useState } from 'react';

type User = {
  id?: string;
  email: string;
  username: string;
  wallet_address?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Example: set mock user on mount
    setUser({
      id: 'demo',
      email: 'demo@tabi.com',
      username: 'demo_user',
      wallet_address: 'DemoWalletAddress123',
    });
  }, []);

  const login = async (email: string, password: string) => {
    // No-op or mock login
    setUser({
      id: 'demo',
      email,
      username: 'demo_user',
      wallet_address: 'DemoWalletAddress123',
    });
  };

  const logout = async () => {
    setUser(null);
  };

  const signIn = async (email: string, password: string) => login(email, password);

  const signUp = async (email: string, password: string, username: string, walletAddress: string) => login(email, password);

  const getProfile = async () => {};

  const signOut = async () => {
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    signIn,
    signUp,
    signOut,
  };
} 