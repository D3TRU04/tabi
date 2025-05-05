export interface UserType {
  username: string
  publicKey: string
  secretKey: string
}

export interface TransactionType {
  type: "sent" | "received"
  amount: string
  counterparty: string
  date: string
  note?: string
}
