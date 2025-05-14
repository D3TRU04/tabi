use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod payment {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let payment_account = &mut ctx.accounts.payment_account;
        payment_account.authority = ctx.accounts.authority.key();
        payment_account.total_transfers = 0;
        payment_account.total_amount = 0;
        payment_account.daily_limit = 1000 * LAMPORTS_PER_SOL; // Default daily limit
        Ok(())
    }

    pub fn update_daily_limit(ctx: Context<UpdateLimit>, new_limit: u64) -> Result<()> {
        let payment_account = &mut ctx.accounts.payment_account;
        require!(
            ctx.accounts.authority.key() == payment_account.authority,
            PaymentError::Unauthorized
        );
        payment_account.daily_limit = new_limit;
        Ok(())
    }

    pub fn send_payment(
        ctx: Context<SendPayment>,
        amount: u64,
        memo: String,
    ) -> Result<()> {
        // Validate amount
        require!(amount > 0, PaymentError::InvalidAmount);
        
        let payment_account = &mut ctx.accounts.payment_account;
        
        // Check daily limit
        let current_time = Clock::get()?.unix_timestamp;
        if current_time - payment_account.last_reset > 86400 { // 24 hours
            payment_account.daily_amount = 0;
            payment_account.last_reset = current_time;
        }
        
        require!(
            payment_account.daily_amount.checked_add(amount).unwrap() <= payment_account.daily_limit,
            PaymentError::DailyLimitExceeded
        );

        // Create transfer instruction
        let transfer_instruction = Transfer {
            from: ctx.accounts.sender_token_account.to_account_info(),
            to: ctx.accounts.receiver_token_account.to_account_info(),
            authority: ctx.accounts.sender.to_account_info(),
        };

        // Execute transfer
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                transfer_instruction,
            ),
            amount,
        )?;

        // Update payment account stats
        payment_account.total_transfers = payment_account.total_transfers.checked_add(1).unwrap();
        payment_account.total_amount = payment_account.total_amount.checked_add(amount).unwrap();
        payment_account.daily_amount = payment_account.daily_amount.checked_add(amount).unwrap();

        // Record payment in history
        let payment_history = &mut ctx.accounts.payment_history;
        payment_history.sender = ctx.accounts.sender.key();
        payment_history.receiver = ctx.accounts.receiver.key();
        payment_history.amount = amount;
        payment_history.memo = memo;
        payment_history.timestamp = current_time;

        // Emit payment event
        emit!(PaymentEvent {
            sender: ctx.accounts.sender.key(),
            receiver: ctx.accounts.receiver.key(),
            amount,
            memo,
            timestamp: current_time,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + PaymentAccount::LEN)]
    pub payment_account: Account<'info, PaymentAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateLimit<'info> {
    #[account(mut)]
    pub payment_account: Account<'info, PaymentAccount>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct SendPayment<'info> {
    #[account(mut)]
    pub payment_account: Account<'info, PaymentAccount>,
    #[account(
        init,
        payer = sender,
        space = 8 + PaymentHistory::LEN
    )]
    pub payment_history: Account<'info, PaymentHistory>,
    #[account(mut)]
    pub sender_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub receiver_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub sender: Signer<'info>,
    /// CHECK: This is safe as we only use it for event emission
    pub receiver: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct PaymentAccount {
    pub authority: Pubkey,
    pub total_transfers: u64,
    pub total_amount: u64,
    pub daily_limit: u64,
    pub daily_amount: u64,
    pub last_reset: i64,
}

impl PaymentAccount {
    pub const LEN: usize = 32 + 8 + 8 + 8 + 8 + 8; // authority + total_transfers + total_amount + daily_limit + daily_amount + last_reset
}

#[account]
pub struct PaymentHistory {
    pub sender: Pubkey,
    pub receiver: Pubkey,
    pub amount: u64,
    pub memo: String,
    pub timestamp: i64,
}

impl PaymentHistory {
    pub const LEN: usize = 32 + 32 + 8 + 100 + 8; // sender + receiver + amount + memo (max 100 chars) + timestamp
}

#[event]
pub struct PaymentEvent {
    pub sender: Pubkey,
    pub receiver: Pubkey,
    pub amount: u64,
    pub memo: String,
    pub timestamp: i64,
}

#[error_code]
pub enum PaymentError {
    #[msg("Invalid amount")]
    InvalidAmount,
    #[msg("Daily limit exceeded")]
    DailyLimitExceeded,
    #[msg("Unauthorized")]
    Unauthorized,
} 