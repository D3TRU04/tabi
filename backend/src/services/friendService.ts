import { supabase } from '../config/supabase';
import type { FriendConnection } from '../config/supabase';

export class FriendService {
  async sendFriendRequest(userId: string, friendId: string): Promise<FriendConnection> {
    // Check if connection already exists
    const { data: existingConnection } = await supabase
      .from('friend_connections')
      .select('*')
      .or(`and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`)
      .single();

    if (existingConnection) {
      throw new Error('Friend connection already exists');
    }

    // Create new friend request
    const { data, error } = await supabase
      .from('friend_connections')
      .insert([
        {
          user_id: userId,
          friend_id: friendId,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async acceptFriendRequest(connectionId: string, userId: string): Promise<FriendConnection> {
    const { data, error } = await supabase
      .from('friend_connections')
      .update({ status: 'accepted' })
      .eq('id', connectionId)
      .eq('friend_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getFriends(userId: string): Promise<FriendConnection[]> {
    const { data, error } = await supabase
      .from('friend_connections')
      .select('*')
      .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
      .eq('status', 'accepted');

    if (error) throw error;
    return data;
  }

  async getPendingRequests(userId: string): Promise<FriendConnection[]> {
    const { data, error } = await supabase
      .from('friend_connections')
      .select('*')
      .eq('friend_id', userId)
      .eq('status', 'pending');

    if (error) throw error;
    return data;
  }

  async removeFriend(connectionId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('friend_connections')
      .delete()
      .eq('id', connectionId)
      .or(`user_id.eq.${userId},friend_id.eq.${userId}`);

    if (error) throw error;
  }
} 