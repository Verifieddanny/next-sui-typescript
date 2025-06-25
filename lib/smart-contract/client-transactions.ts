import { Transaction } from "@mysten/sui/transactions"
import contractConfig from "./config.json"

const { PACKAGE_ID, ADMIN_CAP, SHARED_OBJECT } = contractConfig

/**
 * Client-side transaction builders for your smart contract
 * These functions return Transaction objects that can be executed by connected wallets
 */
export const clientTransactions = {
  /**
   * Example: Create a new item
   * Replace with your actual contract function
   */
  createItem: (name: string, description: string, price: number) => {
    const transaction = new Transaction()

    transaction.moveCall({
      target: `${PACKAGE_ID}::your_module::create_item`,
      arguments: [
        transaction.object(SHARED_OBJECT), // Your shared object
        transaction.pure.string(name),
        transaction.pure.string(description),
        transaction.pure.u64(price),
      ],
    })

    return transaction
  },

  /**
   * Example: Purchase an item
   * Replace with your actual contract function
   */
  purchaseItem: (itemId: string, amount: number) => {
    const transaction = new Transaction()

    // Split coins for payment
    const [coin] = transaction.splitCoins(transaction.gas, [transaction.pure.u64(amount)])

    transaction.moveCall({
      target: `${PACKAGE_ID}::your_module::purchase_item`,
      arguments: [
        transaction.object(itemId),
        coin,
        transaction.object("0x6"), // Clock object
      ],
    })

    return transaction
  },

  /**
   * Example: Update item (admin only)
   * Replace with your actual contract function
   */
  updateItem: (itemId: string, newPrice: number) => {
    const transaction = new Transaction()

    transaction.moveCall({
      target: `${PACKAGE_ID}::your_module::update_item`,
      arguments: [
        transaction.object(ADMIN_CAP), // Admin capability
        transaction.object(itemId),
        transaction.pure.u64(newPrice),
      ],
    })

    return transaction
  },

  /**
   * Add more transaction builders for your contract functions here
   */
}
