import { clientTransactions, ContractQueries } from "./index"

// Initialize the queries instance
const contractQueries = new ContractQueries()

/**
 * High-level utility functions that combine transactions and queries
 * These are the functions you'll import and use in your components
 */

export const createItem = async (name: string, description: string, price: number) => {
  return clientTransactions.createItem(name, description, price)
}

export const getAllItems = async () => {
  const items = await contractQueries.getAllItems()
  return items
}

export const getItemInfo = async (itemId: string) => {
  return await contractQueries.getItemInfo(itemId)
}

export const purchaseItem = async (itemId: string, amount: number) => {
  return clientTransactions.purchaseItem(itemId, amount)
}

export const isItemOwner = async (itemId: string, address: string): Promise<boolean> => {
  return await contractQueries.isOwner(itemId, address)
}

export const updateItem = async (itemId: string, newPrice: number) => {
  return clientTransactions.updateItem(itemId, newPrice)
}

/**
 * Add more utility functions that combine your transactions and queries
 */
