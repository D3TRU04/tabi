# Tabi - Modern Crypto Payments & Bill Splitting

Tabi is a modern web application for instant crypto payments, bill splitting, and AI-powered financial insights, built on the Solana blockchain. With a beautiful Next.js frontend and a robust Express backend, Tabi makes sending stablecoins (USDC), SOL, and splitting group expenses seamless and social. Enjoy a premium, mobile-friendly UI, real-time activity feed, and smart AI advice based on your wallet and transaction history.

## Features

- ⚡ Instant crypto & stablecoin transfers (SOL, USDC)
- 🧮 Smart bill splitting (equal, by items, custom)
- 🤖 AI Financial Advisor (personalized advice based on your activity & wallet)
- 📊 Modern dashboard with tabs: Overview, Payments, Bill Splitter, AI Advisor
- 🧾 Real-time payment feed & transaction history
- 🔒 Secure Solana wallet connection (Phantom, Solflare, etc.)
- 🌈 Beautiful, responsive, glassmorphic UI
- 🧠 No friend management required—just send to usernames or wallet addresses
- 🛡️ Privacy controls
- 🌐 FAQ & landing page with modern design

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Radix UI
- Framer Motion
- Solana Web3.js & SPL Token
- Lucide Icons
- Date-fns
- Supabase (for user data)

### Backend
- Express.js (TypeScript)
- Node.js
- Solana Web3.js & SPL Token
- Supabase
- CORS, dotenv, security middleware

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- (Optional) Solana CLI for local wallet/devnet

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tabi.git
   cd tabi
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. Set up environment variables:
   ```bash
   # In frontend directory
   cp .env.example .env.local

   # In backend directory
   cp .env.example .env
   ```

### Development

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Building for Production

1. Build the backend:
   ```bash
   cd backend
   npm run build
   ```

2. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

### Deploying to Vercel

1. Push your code to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and sign up/log in.
3. Click "New Project" and import your repo.
4. Vercel auto-detects Next.js. Click "Deploy".
5. Set any required environment variables in the Vercel dashboard.
6. Your site will be live at a Vercel URL (e.g., `https://yourproject.vercel.app`).

## Project Structure

```
tabi/
├── frontend/           # Next.js frontend (App Router)
│   ├── app/           # Pages & routes
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   └── public/        # Static assets
├── backend/           # Express backend
│   ├── src/
│   │   ├── routes/    # API routes
│   │   ├── controllers/ # Route controllers
│   │   ├── models/    # Data models
│   │   └── middleware/ # Custom middleware
│   └── dist/          # Compiled JavaScript
└── .gitignore
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Solana](https://solana.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Supabase](https://supabase.com/) 