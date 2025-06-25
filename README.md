# Sui TypeScript Scaffold

A modern TypeScript scaffold for building decentralized applications on the Sui blockchain using Next.js with full type safety.

## ✨ Features

- 🚀 **Next.js 15** with App Router
- 🔷 **TypeScript** with strict type checking
- 💼 **Wallet Integration** with @mysten/dapp-kit
- 🔗 **Smart Contract Integration** template with type safety
- 🎨 **Modern UI** with Tailwind CSS and shadcn/ui
- 📱 **Responsive Design**
- 🔧 **Developer-Friendly** setup guides
- 🛡️ **Type-Safe** smart contract interactions

## 🚀 Quick Start

# Clone the repository

```bash
git clone <your-repo-url>
cd next-sui-typescript
```

# Install dependencies

```bash
npm install
```

# Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main page component
│   ├── SuiProvider.tsx    # Sui client and wallet provider
│   └── globals.css        # Global styles
├── components/            # React components
│   └── contract-example.tsx
├── lib/smart-contract/    # Smart contract integration
│   ├── config.json        # Contract addresses
│   ├── client-transactions.ts  # Transaction builders
│   ├── queries.ts         # Read-only queries
│   ├── types.ts           # TypeScript interfaces
│   ├── utils.ts           # Utility functions
│   └── index.ts           # Main exports
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind configuration
└── next.config.mjs        # Next.js configuration
```

## 🔧 Smart Contract Integration

### 1. Deploy Your Contract

# Deploy to devnet

```bash
sui client publish --gas-budget 100000000
```

### 2. Update Configuration

Edit `lib/smart-contract/config.json`:

```json
{
  "PACKAGE_ID": "0x_YOUR_PACKAGE_ID_HERE",
  "ADMIN_CAP": "0x_YOUR_ADMIN_CAP_HERE",
  "SHARED_OBJECT": "0x_YOUR_SHARED_OBJECT_HERE"
}
```

### 3. Define Types

Update `lib/smart-contract/types.ts`:

```typescript
export interface Item {
  id?: string
  name: string
  description: string
  price: number
  owner: string
  isActive: boolean
  createdAt?: number
}
```

### 4. Create Transaction Builders

Update `lib/smart-contract/client-transactions.ts`:

```typescript
export const clientTransactions = {
  createItem: (name: string, description: string, price: number): Transaction => {
    const transaction = new Transaction()
    transaction.moveCall({
      target: `${PACKAGE_ID}::your_module::create_item`,
      arguments: [
        transaction.object(SHARED_OBJECT),
        transaction.pure.string(name),
        transaction.pure.string(description),
        transaction.pure.u64(price),
      ],
    })
    return transaction
  }
}
```

### 5. Add Query Functions

Update `lib/smart-contract/queries.ts`:

```typescript
async getItemInfo(itemId: string): Promise<Item | null> {
  const txn = new Transaction()
  txn.moveCall({
    target: `${PACKAGE_ID}::your_module::get_item_info`,
    arguments: [txn.object(itemId)],
  })
  
  const returnValues = await this.devInspectTransactionBlock(txn)
  // Parse and return typed data
}
```

### 6. Create Utility Functions

Update `lib/smart-contract/utils.ts`:

```typescript
export const createItem = async (
  name: string, 
  description: string, 
  price: number
): Promise<Transaction> => {
  return clientTransactions.createItem(name, description, price)
}

export const getItemInfo = async (itemId: string): Promise<Item | null> => {
  return await contractQueries.getItemInfo(itemId)
}
```

## 🔑 Environment Variables

Create a `.env.local` file:


# Optional: For read-only queries

```bash
NEXT_PUBLIC_QUERY_PRIVATE_KEY=your_private_key_here
```

## 📦 Key Dependencies

- **@mysten/dapp-kit**: Sui wallet integration
- **@mysten/sui**: Sui TypeScript SDK
- **@tanstack/react-query**: State management for async operations
- **next**: Next.js framework
- **typescript**: TypeScript compiler
- **tailwindcss**: Utility-first CSS framework

## 🎯 Usage in Components

```typescript
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit"
import { createItem, getItemInfo, type Item } from "@/lib/smart-contract"

// In your component
const { mutate: signAndExecute } = useSignAndExecuteTransaction()

const handleCreate = async () => {
  const transaction = await createItem("Item Name", "Description", 1000000000)
  
  signAndExecute(
    { transaction },
    {
      onSuccess: () => console.log("Success!"),
      onError: (error: Error) => console.error("Error:", error),
    }
  )
}

// Type-safe data fetching
const [item, setItem] = useState<Item | null>(null)

useEffect(() => {
  const fetchItem = async () => {
    const itemData = await getItemInfo("0x123...")
    setItem(itemData)
  }
  fetchItem()
}, [])
```

## 🛡️ TypeScript Benefits

- **Type Safety**: Catch errors at compile time
- **IntelliSense**: Better IDE support and autocomplete
- **Refactoring**: Safe code refactoring with confidence
- **Documentation**: Types serve as inline documentation
- **Error Prevention**: Prevent runtime errors with strict typing

## 🔧 TypeScript Configuration

The project uses strict TypeScript settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## 📚 Documentation

- [SMART_CONTRACT_SETUP.md](./SMART_CONTRACT_SETUP.md) - Detailed smart contract integration guide
- [Sui TypeScript SDK Docs](https://sdk.mystenlabs.com/typescript) - Official Sui documentation
- [Next.js Docs](https://nextjs.org/docs) - Next.js documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript documentation

## 🛠️ Development Scripts

# Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 🧪 Testing


# Run tests

```bash
npm run test
```

# Run tests in watch mode

```bash
npm run test:watch
```

# Run tests with coverage

```bash
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

# Install Vercel CLI

```bash
npm i -g vercel
```

# Deploy

```bash
vercel
```

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Use `npm run build` and deploy the `.next` folder
- **Railway**: Connect your GitHub repository
- **DigitalOcean**: Use App Platform with Node.js buildpack

## 🔍 Code Quality

The project includes:

- **ESLint**: Code linting with TypeScript rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **TypeScript**: Strict type checking
- **Import sorting**: Organized imports

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write type-safe code
- Add JSDoc comments for complex functions
- Update tests for new features
- Ensure all TypeScript checks pass

## 🐛 Troubleshooting

### Common Issues

**TypeScript Errors**

# Clear Next.js cache

```bash
rm -rf .next
npm run dev
```

**Wallet Connection Issues**
- Ensure wallet extension is installed
- Check network configuration (devnet/testnet/mainnet)
- Verify wallet has sufficient balance

**Smart Contract Integration**
- Verify contract addresses in `config.json`
- Check network matches deployed contract
- Ensure Move functions match TypeScript interfaces

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Sui Website](https://sui.io/)
- [Sui Discord](https://discord.com/invite/Sui)
- [Sui GitHub](https://github.com/MystenLabs/sui)
- [DevDanny on X](https://twitter.com/dannyclassi_c)
- [DevDanny on GitHub](https://github.com/Verifieddanny)

## 🙏 Acknowledgments

- [Mysten Labs](https://mystenlabs.com/) for the Sui blockchain and SDK
- [Vercel](https://vercel.com/) for Next.js and deployment platform
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- The Sui developer community for feedback and contributions

---

**Built with ❤️ for the Sui ecosystem**


This TypeScript README includes:

## 🔷 **TypeScript-Specific Features:**
- Type safety benefits and examples
- Strict TypeScript configuration details
- Type-safe component usage examples
- Interface definitions and type annotations

## 🛡️ **Enhanced Developer Experience:**
- IntelliSense and IDE support mentions
- Type checking scripts
- Error prevention through types
- Refactoring safety

## 📚 **Comprehensive Documentation:**
- Detailed smart contract integration with types
- TypeScript best practices
- Development guidelines
- Troubleshooting section

## 🧪 **Professional Setup:**
- Testing configuration
- Code quality tools (ESLint, Prettier, Husky)
- Multiple deployment options
- Contributing guidelines

The README emphasizes the advantages of using TypeScript for Sui dApp development while providing practical examples and comprehensive setup instructions!
