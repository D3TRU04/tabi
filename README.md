# Tabi - Instant Money Transfers

Tabi is a modern web application that enables instant money transfers between friends using Solana blockchain technology. Built with Next.js and Express, it provides a seamless and secure way to send and request money using stablecoins (USDC, USDT) and SOL. Whether you're splitting bills, paying for dinner, or sending gifts, Tabi makes cryptocurrency transfers as simple as sending a text message while maintaining the security and speed of the Solana blockchain.

## Features

- 💸 Instant money transfers
- 🔐 Secure Solana blockchain integration
- 👥 Friend management
- 📱 Responsive design
- 🌙 Dark/Light mode support
- 📊 Transaction history
- 🔔 Real-time notifications
- 💰 Multi-crypto support (SOL, USDC, USDT)
- 🤝 Social payments with emoji support
- 🔒 Client-side wallet generation
- 📱 Smart bill splitting
- 🌐 Payment feed with social features
- 🔐 Privacy controls and settings

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Radix UI
- Framer Motion
- Solana Web3.js
- Lucide Icons
- Date-fns
- Supabase

### Backend
- Express.js
- TypeScript
- Node.js
- CORS
- Environment Variables
- Solana Program (Rust)
- SPL Token

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Solana CLI (optional, for development)

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

## Project Structure

```
tabi/
├── frontend/           # Next.js frontend
│   ├── app/           # App router pages
│   ├── components/    # Reusable components
│   ├── hooks/         # Custom React hooks
│   ├── lib/          # Utility functions
│   └── public/       # Static assets
├── backend/          # Express backend
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── controllers/ # Route controllers
│   │   ├── models/   # Data models
│   │   └── middleware/ # Custom middleware
│   └── dist/        # Compiled JavaScript
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