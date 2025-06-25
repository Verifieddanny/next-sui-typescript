"use client"
import { useState, useEffect } from "react"
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit"
import { getAllItems, createItem, purchaseItem } from "@/lib/smart-contract"
import type { Item } from "@/lib/smart-contract/types"

export function ContractExample() {
  const account = useCurrentAccount()
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)

  // Form state for creating new items
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 0,
  })

  // Load all items on component mount
  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    setLoading(true)
    try {
      const allItems = await getAllItems()
      setItems(allItems)
    } catch (error) {
      console.error("Failed to load items:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateItem = async () => {
    if (!account) {
      alert("Please connect your wallet first")
      return
    }

    setCreating(true)
    try {
      const transaction = await createItem(
        newItem.name,
        newItem.description,
        newItem.price * 1000000000, // Convert to MIST
      )

      signAndExecute(
        { transaction },
        {
          onSuccess: () => {
            console.log("Item created successfully!")
            setNewItem({ name: "", description: "", price: 0 })
            loadItems() // Refresh the list
          },
          onError: (error) => {
            console.error("Failed to create item:", error)
            alert("Failed to create item")
          },
        },
      )
    } catch (error) {
      console.error("Error creating item:", error)
    } finally {
      setCreating(false)
    }
  }

  const handlePurchaseItem = async (itemId: string, price: number) => {
    if (!account) {
      alert("Please connect your wallet first")
      return
    }

    try {
      const transaction = await purchaseItem(itemId, price * 1000000000) // Convert to MIST

      signAndExecute(
        { transaction },
        {
          onSuccess: () => {
            console.log("Item purchased successfully!")
            loadItems() // Refresh the list
          },
          onError: (error) => {
            console.error("Failed to purchase item:", error)
            alert("Failed to purchase item")
          },
        },
      )
    } catch (error) {
      console.error("Error purchasing item:", error)
    }
  }

  if (!account) {
    return (
      <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Smart Contract Integration</h3>
        <p className="text-slate-400">Connect your wallet to interact with the smart contract</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Create Item Form */}
      <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Create New Item</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:border-cyan-500"
              placeholder="Item name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:border-cyan-500"
              placeholder="Item description"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Price (SUI)</label>
            <input
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:border-cyan-500"
              placeholder="0.0"
              step="0.1"
            />
          </div>
          <button
            onClick={handleCreateItem}
            disabled={creating || !newItem.name || !newItem.description || newItem.price <= 0}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-md transition-all duration-200 font-medium"
          >
            {creating ? "Creating..." : "Create Item"}
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-semibold">All Items</h3>
          <button
            onClick={loadItems}
            disabled={loading}
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-md text-sm transition-colors"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            <span className="ml-3 text-slate-400">Loading items...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-slate-400">No items found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
              >
                <div className="flex-1">
                  <h4 className="text-white font-medium">{item.name}</h4>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                  <p className="text-cyan-400 text-sm font-mono">Price: {(item.price / 1000000000).toFixed(2)} SUI</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      item.isActive
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                  {item.isActive && item.owner !== account.address && (
                    <button
                      onClick={() => handlePurchaseItem(item.id!, item.price)}
                      className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded text-sm transition-all duration-200"
                    >
                      Purchase
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
