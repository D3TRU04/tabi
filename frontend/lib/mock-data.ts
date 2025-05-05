import type { UserType, TransactionType } from "./types"

// Mock friends data
export const mockFriends: Omit<UserType, "secretKey">[] = [
  {
    username: "alice",
    publicKey: "8xyt9MGpAhDj9nnNkMYQUXVT5jmS8PjW47Vc9GqHqP3r",
  },
  {
    username: "bob",
    publicKey: "3zQ9aMWpRvEz2smwCrL6Yf9jK8wTFNKzHYZ7H9XQbBag",
  },
  {
    username: "carol",
    publicKey: "FZp6o3HiMYmYjAMDvbhNJVKVxf3uYVGVWkJJFNsm5Sxc",
  },
  {
    username: "dave",
    publicKey: "GtFT4fFgrxX7XGQ9ucKJpKYYhT1XmXXtAZpQCdkTXoLm",
  },
]

// Mock transaction data
export const mockTransactions: TransactionType[] = [
  {
    type: "received",
    amount: "25.00",
    counterparty: "alice",
    date: "Today, 2:30 PM",
    note: "Thanks for dinner last night!",
  },
  {
    type: "sent",
    amount: "18.50",
    counterparty: "bob",
    date: "Today, 11:15 AM",
    note: "Coffee and pastries",
  },
  {
    type: "received",
    amount: "42.00",
    counterparty: "carol",
    date: "Yesterday, 5:20 PM",
    note: "Movie tickets",
  },
  {
    type: "sent",
    amount: "15.75",
    counterparty: "dave",
    date: "May 3, 2024",
    note: "Lunch",
  },
]
