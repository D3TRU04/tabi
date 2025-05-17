import { Keypair } from "@solana/web3.js"
import { encode, decode } from "bs58"

export interface WalletData {
  publicKey: string
  secretKey: string
}

/**
 * Generates a new Solana wallet
 * @returns WalletData object with publicKey and secretKey
 */
export function generateWallet(): WalletData {
  // Generate a new Solana keypair
  const keypair = Keypair.generate()

  // Convert the public key to a string
  const publicKey = keypair.publicKey.toString()

  // Convert the secret key to a base58 string for storage
  // In a real app, you'd want to encrypt this before storing
  const secretKey = encode(keypair.secretKey)

  return {
    publicKey,
    secretKey,
  }
}

/**
 * Reconstructs a Solana keypair from stored data
 * @param secretKeyString The base58-encoded secret key
 * @returns Solana Keypair
 */
export function getKeypairFromSecret(secretKeyString: string): Keypair {
  const secretKey = decode(secretKeyString)
  return Keypair.fromSecretKey(secretKey)
}

/**
 * Checks if the browser supports secure storage
 * @returns boolean indicating if secure storage is available
 */
export function hasSecureStorage(): boolean {
  try {
    return (
      typeof window !== "undefined" && typeof window.crypto !== "undefined" && typeof window.indexedDB !== "undefined"
    )
  } catch (e) {
    return false
  }
}
