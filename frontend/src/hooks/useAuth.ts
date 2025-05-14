import { useEffect, useState } from 'react';
import { apiService, User } from '../services/api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    // TODO: Add an endpoint to validate token and get user data
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { user } = await apiService.login(email, password);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in');
      throw err;
    }
  };

  const signUp = async (email: string, password: string, username: string, walletAddress: string) => {
    try {
      setError(null);
      const { user } = await apiService.register(email, password, username, walletAddress);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      apiService.logout();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign out');
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };
} 