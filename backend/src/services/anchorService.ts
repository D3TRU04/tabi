import { Program, AnchorProvider, web3, BN } from '@project-serum/anchor';
import { connection } from '../config/solana';
import { IDL } from '../programs/payment';
import { PublicKey } from '@solana/web3.js';
import { Keypair } from '@solana/web3.js';

export class AnchorService {
  private program: Program;
  private programId: PublicKey;
  private provider: AnchorProvider;

  constructor() {
    this.programId = new PublicKey('Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS');
    
    // Create a dummy wallet for testing
    const wallet = new Keypair();
    
    this.provider = new AnchorProvider(
      connection,
      {
        publicKey: wallet.publicKey,
        signTransaction: async (tx) => {
          tx.sign(wallet);
          return tx;
        },
        signAllTransactions: async (txs) => {
          return txs.map(tx => {
            tx.sign(wallet);
            return tx;
          });
        },
      },
      { commitment: 'confirmed' }
    );
    
    this.program = new Program(IDL, this.programId, this.provider);
  }

  async initializePaymentAccount(authority: PublicKey): Promise<string> {
    const [paymentAccount] = await PublicKey.findProgramAddress(
      [Buffer.from('payment')],
      this.programId
    );

    const tx = await this.program.methods
      .initialize()
      .accounts({
        paymentAccount,
        authority,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    return tx;
  }

  async updateDailyLimit(
    authority: PublicKey,
    newLimit: number
  ): Promise<string> {
    const [paymentAccount] = await PublicKey.findProgramAddress(
      [Buffer.from('payment')],
      this.programId
    );

    const tx = await this.program.methods
      .updateDailyLimit(new BN(newLimit))
      .accounts({
        paymentAccount,
        authority,
      })
      .rpc();

    return tx;
  }

  async sendPayment(
    sender: PublicKey,
    receiver: PublicKey,
    senderTokenAccount: PublicKey,
    receiverTokenAccount: PublicKey,
    amount: number,
    memo: string
  ): Promise<string> {
    const [paymentAccount] = await PublicKey.findProgramAddress(
      [Buffer.from('payment')],
      this.programId
    );

    const [paymentHistory] = await PublicKey.findProgramAddress(
      [
        Buffer.from('payment_history'),
        sender.toBuffer(),
        receiver.toBuffer(),
        new BN(Date.now()).toArrayLike(Buffer, 'le', 8),
      ],
      this.programId
    );

    const tx = await this.program.methods
      .sendPayment(new BN(amount), memo)
      .accounts({
        paymentAccount,
        paymentHistory,
        senderTokenAccount,
        receiverTokenAccount,
        sender,
        receiver,
        tokenProgram: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    return tx;
  }

  async getPaymentAccount(authority: PublicKey) {
    const [paymentAccount] = await PublicKey.findProgramAddress(
      [Buffer.from('payment')],
      this.programId
    );

    return await this.program.account.paymentAccount.fetch(paymentAccount);
  }

  async getPaymentHistory(paymentHistoryAddress: PublicKey) {
    return await this.program.account.paymentHistory.fetch(paymentHistoryAddress);
  }
} 