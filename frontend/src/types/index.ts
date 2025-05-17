export interface PrivacySettings {
  showPayments: boolean
  showBalance: boolean
  showFriends: boolean
}

export interface Wallet {
  connected: boolean
  address?: string
  balance?: number
}

export interface UserType {
  username: string
  email: string
  privacySettings: PrivacySettings
  balance: number
  friends: string[]
  transactions: any[]
  wallet: {
    connected: boolean
    address?: string
    balance?: number
  }
}

// Re-export all types
export * from './index' 