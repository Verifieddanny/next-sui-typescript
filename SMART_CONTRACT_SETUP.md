# Smart Contract Integration Setup Guide

This template provides a structured way to integrate your Sui smart contracts with your Next.js application.

## 📁 Folder Structure

```
lib/smart-contract/
├── config.json              # Contract addresses and IDs
├── client-transactions.ts   # Transaction builders for wallet execution
├── queries.ts              # Read-only contract queries
├── types.ts                # TypeScript interfaces
├── utils.ts                # High-level utility functions
└── index.ts                # Main export file
```

## 🚀 Setup Instructions

### 1. Update Contract Configuration

Edit `lib/smart-contract/config.json` with your contract details:
```json
{
  "PACKAGE_ID": "0x_YOUR_PACKAGE_ID_HERE",
  "ADMIN_CAP": "0x_YOUR_ADMIN_CAP_HERE", 
  "SHARED_OBJECT": "0x_YOUR_SHARED_OBJECT_HERE"
}
```

### 2. Define Your Data Types

Update `lib/smart-contract/types.ts` with your contract's data structures:

```typescript
export interface YourDataType {
  id?: string
  field1: string
  field2: number
  // Add your fields here
}
```

### 3. Create Transaction Builders

Update `lib/smart-contract/client-transactions.ts` with your contract functions:

```typescript
export const clientTransactions = {
  yourFunction: (param1: string, param2: number) => {
    const transaction = new Transaction()
    transaction.moveCall({
      target: `${PACKAGE_ID}::your_module::your_function`,
      arguments: [
        transaction.pure.string(param1),
        transaction.pure.u64(param2),
      ]
    })
    return transaction
  }
}
```

### 4. Add Query Functions

Update `lib/smart-contract/queries.ts` with your read-only functions:

```typescript
async getYourData(objectId: string) {
  const txn = new Transaction()
  txn.moveCall({
    target: `${PACKAGE_ID}::your_module::get_your_data`,
    arguments: [txn.object(objectId)],
  })
  
  const returnValues = await this.devInspectTransactionBlock(txn)
  // Parse and return your data
}
```

### 5. Create Utility Functions

Update `lib/smart-contract/utils.ts` with high-level functions:

```typescript
export const createYourObject = async (param1: string, param2: number) => {
  return clientTransactions.yourFunction(param1, param2)
}

export const getYourObject = async (objectId: string) => {
  return await contractQueries.getYourData(objectId)
}
```

### 6. Environment Variables

Add your private key for queries (optional, for read-only operations):

```bash
# .env.local
NEXT_PUBLIC_QUERY_PRIVATE_KEY=your_private_key_here
```

## 🔧 Usage in Components

```typescript
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit"
import { createYourObject, getYourObject } from "@/lib/smart-contract"

// In your component
const { mutate: signAndExecute } = useSignAndExecuteTransaction()

const handleCreate = async () => {
  const transaction = await createYourObject("param1", 123)
  
  signAndExecute(
    { transaction },
    {
      onSuccess: () => console.log("Success!"),
      onError: (error) => console.error("Error:", error),
    }
  )
}
```

## 📝 Notes

- Replace all placeholder functions with your actual contract functions
- Update the BCS parsing in queries to match your contract's return types
- Test on devnet/testnet before mainnet deployment
- Consider error handling and loading states in your UI
- Use proper TypeScript types for better development experience

## 🔗 Useful Resources

- [Sui TypeScript SDK Documentation](https://sdk.mystenlabs.com/typescript)
- [BCS Encoding/Decoding](https://github.com/MystenLabs/sui/tree/main/sdk/bcs)
- [Transaction Building Guide](https://docs.sui.io/guides/developer/sui-101/building-ptb)
