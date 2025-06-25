import { bcs, fromHex, toHex } from "@mysten/bcs"
import { Transaction } from "@mysten/sui/transactions"
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"
import { decodeSuiPrivateKey } from "@mysten/sui/cryptography"
import contractConfig from "./config.json"

const { PACKAGE_ID, SHARED_OBJECT } = contractConfig

/**
 * Query class for reading data from your smart contract
 * Uses devInspectTransactionBlock for read-only operations
 */
export class ContractQueries {
  private keypair: Ed25519Keypair
  private client: SuiClient
  private Address: any

  constructor() {
    // For production, use environment variables or a more secure method
    const privateKey = process.env.NEXT_PUBLIC_QUERY_PRIVATE_KEY || "suiprivkey1qr4uu3cpez087ml9u3lcdvp8lahlw9sal4mfkjtcukuv3y6pdtd5w0tl0zz"

    if (!privateKey) {
      throw new Error("Please set your private key in environment variables")
    }

    this.keypair = Ed25519Keypair.fromSecretKey(decodeSuiPrivateKey(privateKey).secretKey)
    this.client = new SuiClient({ url: getFullnodeUrl("devnet") }) // Change network as needed
    this.Address = bcs.bytes(32).transform({
      input: (val: string) => fromHex(val),
      output: (val) => toHex(val),
    })
  }

  private async devInspectTransactionBlock(transaction: Transaction) {
    try {
      const result = await this.client.devInspectTransactionBlock({
        transactionBlock: transaction,
        sender: this.keypair.getPublicKey().toSuiAddress(),
      })
      return result.results ? result.results.map((result) => result.returnValues) : null
    } catch (error) {
      console.error("Error executing query:", error)
      return null
    }
  }

  /**
   * Example: Get item information
   * Replace with your actual contract query function
   */
  async getItemInfo(itemId: string) {
    const txn = new Transaction()
    txn.moveCall({
      target: `${PACKAGE_ID}::your_module::get_item_info`,
      arguments: [txn.object(itemId)],
    })

    const returnValues = await this.devInspectTransactionBlock(txn)

    if (returnValues && returnValues[0]) {
      return {
        name: bcs.string().parse(Uint8Array.from(returnValues[0][0][0])),
        description: bcs.string().parse(Uint8Array.from(returnValues[0][1][0])),
        price: bcs.u64().parse(Uint8Array.from(returnValues[0][2][0])),
        owner: `0x${this.Address.parse(Uint8Array.from(returnValues[0][3][0]))}`,
        isActive: bcs.bool().parse(Uint8Array.from(returnValues[0][4][0])),
      }
    }
    return null
  }

  /**
   * Example: Get all items
   * Replace with your actual contract query function
   */
  async getAllItems() {
    const txn = new Transaction()
    txn.moveCall({
      target: `${PACKAGE_ID}::your_module::get_all_items`,
      arguments: [txn.object(SHARED_OBJECT)],
    })

    const returnValues = await this.devInspectTransactionBlock(txn)

    if (returnValues && returnValues[0]) {
      const itemAddresses = bcs.vector(this.Address).parse(Uint8Array.from(returnValues[0][0][0]))
      const items: any[] = []

      for (const address of itemAddresses) {
        const itemInfo = await this.getItemInfo(`0x${address}`)
        if (itemInfo) {
          items.push({
            id: `0x${address}`,
            ...itemInfo,
          })
        }
      }
      return items
    }
    return []
  }

  /**
   * Example: Check if user owns an item
   * Replace with your actual contract query function
   */
  async isOwner(itemId: string, userAddress: string): Promise<boolean> {
    const txn = new Transaction()
    txn.moveCall({
      target: `${PACKAGE_ID}::your_module::is_owner`,
      arguments: [txn.object(itemId), txn.pure.address(userAddress)],
    })

    const returnValues = await this.devInspectTransactionBlock(txn)

    return returnValues && returnValues[0] ? bcs.bool().parse(Uint8Array.from(returnValues[0][0][0])) : false
  }

  /**
   * Add more query methods for your contract here
   */
}
