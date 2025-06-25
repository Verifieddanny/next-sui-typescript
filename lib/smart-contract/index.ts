/**
 * Main export file for smart contract integration
 * Import everything you need from here
 */

export { clientTransactions } from "./client-transactions"
export { ContractQueries } from "./queries"
export * from "./utils"
export * from "./types"

// Re-export config for easy access
export { default as contractConfig } from "./config.json"
