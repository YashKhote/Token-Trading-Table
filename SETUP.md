# Setup Instructions

Quick start guide to get the Token Trading Table running locally.

## Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher (comes with Node.js)

## Quick Start

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

That's it! The application should now be running.

## Available Commands

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Project Structure Overview

```
.
├── app/                      # Next.js 14 App Router pages
├── components/              # React components
│   ├── ui/                 # Base UI components (shadcn/ui)
│   ├── token-trading-table/ # Main table components
│   ├── loading/            # Loading state components
│   └── error/              # Error boundary components
├── hooks/                   # Custom React hooks
├── store/                   # Redux store and slices
├── lib/                     # Utility functions and helpers
└── types/                   # TypeScript type definitions
```

## What to Expect

When you first run the application:

1. You'll see a loading skeleton for ~1 second (simulated API delay)
2. The table will populate with 15 mock tokens
3. Tokens will be grouped by category:
   - New Pairs (5 tokens)
   - Final Stretch (5 tokens)
   - Migrated (5 tokens)
4. Real-time price updates will start automatically (every 2-5 seconds)
5. You can interact with:
   - Column headers to sort
   - Token rows to view details
   - Popovers for pair addresses
   - Tooltips for additional info

## Troubleshooting

### Port Already in Use

If port 3000 is in use, Next.js will automatically use the next available port (3001, 3002, etc.). Check the terminal output for the actual URL.

### Dependencies Installation Issues

If you encounter errors installing dependencies:

1. Clear npm cache:
```bash
npm cache clean --force
```

2. Delete `node_modules` and `package-lock.json`:
```bash
rm -rf node_modules package-lock.json
```

3. Reinstall:
```bash
npm install
```

### Build Errors

If the build fails:

1. Ensure you're using Node.js 18+:
```bash
node --version
```

2. Check TypeScript errors:
```bash
npm run lint
```

3. Clear Next.js cache:
```bash
rm -rf .next
```

### Type Errors

If you see TypeScript errors:

1. Restart TypeScript server in your IDE
2. Ensure all dependencies are installed
3. Check that `tsconfig.json` is properly configured

## Next Steps

- Read [README.md](./README.md) for full documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to production
- Review [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines

## Need Help?

- Check the [README.md](./README.md) for detailed documentation
- Open an issue on GitHub for bugs or questions
- Review component code in `components/` directory

