export type UserType = {
  username: string
  secretKey: string
  publicKey: string
  email?: string
  phone?: string
  privacySettings: PrivacySettings
}

export type PrivacySettings = {
  showPayments: "public" | "friends" | "private"
  showBalance: boolean
  showActivity: boolean
}

export type FriendType = {
  username: string
  publicKey: string
  status: "pending" | "accepted"
  lastInteraction?: string
}

export type TransactionType = {
  id: string
  type: "send" | "receive" | "split"
  amount: number
  token: string
  from: string
  to: string
  timestamp: string
  status: "pending" | "completed" | "failed"
  note?: string
  emoji?: string
}

export type SplitDetails = {
  id: string
  totalAmount: number
  token: string
  participants: {
    username: string
    amount: number
    status: "pending" | "paid"
  }[]
  description: string
  category?: string
  timestamp: string
}

export type PaymentFeedItem = {
  id: string
  type: "payment" | "split" | "friend"
  timestamp: string
  user: string
  action: string
  details: {
    amount?: number
    token?: string
    description?: string
    emoji?: string
  }
}

export type WalletType = {
  address: string
  balances: {
    [token: string]: number
  }
}
