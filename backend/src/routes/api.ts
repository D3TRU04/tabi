import express from 'express';
import { UserService } from '../services/userService';
import { TransactionService } from '../services/transactionService';
import { FriendService } from '../services/friendService';

const router = express.Router();
const userService = new UserService();
const transactionService = new TransactionService();
const friendService = new FriendService();

// User routes
router.post('/users', async (req, res) => {
  try {
    const { wallet_address, username } = req.body;
    const user = await userService.createUser(wallet_address, username);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/users/:walletAddress', async (req, res) => {
  try {
    const user = await userService.getUserByWalletAddress(req.params.walletAddress);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Transaction routes
router.post('/transactions', async (req, res) => {
  try {
    const { sender_wallet, receiver_wallet, amount } = req.body;
    const transaction = await transactionService.createTransaction(
      sender_wallet,
      receiver_wallet,
      amount
    );
    res.json(transaction);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/transactions/:walletAddress', async (req, res) => {
  try {
    const transactions = await transactionService.getTransactionHistory(req.params.walletAddress);
    res.json(transactions);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/balance/:walletAddress', async (req, res) => {
  try {
    const balance = await transactionService.getBalance(req.params.walletAddress);
    res.json({ balance });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Friend routes
router.post('/friends/request', async (req, res) => {
  try {
    const { user_id, friend_id } = req.body;
    const request = await friendService.sendFriendRequest(user_id, friend_id);
    res.json(request);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/friends/accept/:connectionId', async (req, res) => {
  try {
    const { user_id } = req.body;
    const connection = await friendService.acceptFriendRequest(req.params.connectionId, user_id);
    res.json(connection);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/friends/:userId', async (req, res) => {
  try {
    const friends = await friendService.getFriends(req.params.userId);
    res.json(friends);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/friends/pending/:userId', async (req, res) => {
  try {
    const pendingRequests = await friendService.getPendingRequests(req.params.userId);
    res.json(pendingRequests);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/friends/:connectionId', async (req, res) => {
  try {
    const { user_id } = req.body;
    await friendService.removeFriend(req.params.connectionId, user_id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router; 