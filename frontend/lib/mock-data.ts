import type { UserType, FriendType, TransactionType, PaymentFeedItem, SplitDetails } from "./types"

// Mock user data
export const mockUser: UserType = {
  username: "alice",
  secretKey: "mock-secret-key",
  email: "alice@example.com",
  phone: "+1234567890",
  privacySettings: {
    showPayments: "friends",
    showBalance: true,
    showActivity: true,
  },
}

// Mock friends data
export const mockFriends: FriendType[] = [
  {
    username: "bob",
    status: "accepted",
    lastInteraction: new Date("2024-03-15"),
  },
  {
    username: "charlie",
    status: "accepted",
    lastInteraction: new Date("2024-03-14"),
  },
  {
    username: "dave",
    status: "pending",
  },
]

// Mock transaction data
export const mockTransactions: TransactionType[] = [
  {
    id: "1",
    type: "send",
    amount: 50,
    token: "USDC",
    from: "alice",
    to: "bob",
    timestamp: new Date("2024-03-15T10:00:00"),
    status: "completed",
    note: "Lunch",
    emoji: "🍔",
  },
  {
    id: "2",
    type: "receive",
    amount: 25,
    token: "USDC",
    from: "charlie",
    to: "alice",
    timestamp: new Date("2024-03-14T15:30:00"),
    status: "completed",
    note: "Movie tickets",
    emoji: "🎬",
  },
  {
    id: "3",
    type: "split",
    amount: 100,
    token: "USDC",
    from: "alice",
    to: "bob",
    timestamp: new Date("2024-03-13T20:00:00"),
    status: "completed",
    note: "Dinner",
    emoji: "🍽️",
    splitDetails: {
      totalAmount: 100,
      participants: [
        { username: "alice", amount: 50, status: "paid" },
        { username: "bob", amount: 50, status: "paid" },
      ],
      description: "Dinner at Italian Restaurant",
      category: "dinner",
    },
  },
]

export const mockPaymentFeed: PaymentFeedItem[] = [
  {
    id: "1",
    type: "payment",
    content: "Sent $50 to Bob for lunch 🍔",
    timestamp: new Date("2024-03-15T10:00:00"),
    user: "alice",
    transaction: mockTransactions[0],
  },
  {
    id: "2",
    type: "split",
    content: "Split $100 dinner bill with Bob 🍽️",
    timestamp: new Date("2024-03-13T20:00:00"),
    user: "alice",
    splitDetails: mockTransactions[2].splitDetails,
  },
  {
    id: "3",
    type: "friend",
    content: "Added Dave as a friend",
    timestamp: new Date("2024-03-12T14:00:00"),
    user: "alice",
    friendActivity: {
      action: "added",
      friend: "dave",
    },
  },
]

export const mockSplitDetails: SplitDetails[] = [
  {
    totalAmount: 100,
    participants: [
      { username: "alice", amount: 50, status: "paid" },
      { username: "bob", amount: 50, status: "paid" },
    ],
    description: "Dinner at Italian Restaurant",
    category: "dinner",
  },
  {
    totalAmount: 300,
    participants: [
      { username: "alice", amount: 100, status: "paid" },
      { username: "bob", amount: 100, status: "pending" },
      { username: "charlie", amount: 100, status: "pending" },
    ],
    description: "Weekend trip expenses",
    category: "trip",
  },
]
