/**
 * TypeScript interfaces for your smart contract data structures
 * Define the shape of your contract's data here
 */

export interface Item {
  id?: string
  name: string
  description: string
  price: number
  owner: string
  isActive: boolean
  createdAt?: number
}

export interface User {
  address: string
  itemsOwned: string[]
  totalSpent: number
}

export interface ContractEvent {
  type: string
  itemId: string
  user: string
  amount?: number
  timestamp: number
}

/**
 * Add more interfaces for your contract data structures
 */
