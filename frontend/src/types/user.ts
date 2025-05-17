export interface PrivacySettings {
  showPayments: boolean
  showBalance: boolean
  showFriends: boolean
}

export interface TokenBalance {
  symbol: string
  balance: number
  decimals: number
}

export interface Wallet {
  connected: boolean
  address?: string
  balances: {
    SOL: number
    USDC: number
  }
}

export interface UserType {
  username: string
  email: string
  privacySettings: PrivacySettings
  balance: number
  friends: string[]
  transactions: any[]
  wallet: Wallet
} 