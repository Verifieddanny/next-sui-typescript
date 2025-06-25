"use client"
import {
  useCurrentAccount,
  useSuiClientQuery,
  useConnectWallet,
  useWallets,
  useDisconnectWallet,
} from "@mysten/dapp-kit"
import { useState } from "react"
import { ContractExample } from "@/components/contract-example"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2300D4AA' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">{"<>"}</span>
              </div>
              <h1 className="text-xl font-bold text-white">Sui TypeScript Scaffold</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* Debug info */}
              <WalletDebugInfo />
              {/* Custom Connect/Disconnect Button */}
              <WalletConnectionButton />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-full px-4 py-2 mb-6 border border-slate-700/50">
              <span className="text-emerald-400">⚡</span>
              <span className="text-sm text-slate-300">Next.js + Sui SDK + TypeScript</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent mb-6">
              Build on Sui
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              A modern TypeScript scaffold for building decentralized applications on the Sui blockchain. Get started in
              minutes with this developer-friendly template.
            </p>

            {/* Developer Credit */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className="text-slate-400">Built by</span>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-white font-semibold">DevDanny</span>
                <div className="flex space-x-2">
                  <a
                    href="https://x.com/dannyclassi_c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-slate-800 border border-slate-600 hover:bg-slate-700 hover:border-cyan-500/50 rounded-md text-sm text-white transition-all duration-200"
                  >
                    𝕏
                  </a>
                  <a
                    href="https://github.com/Verifieddanny"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-slate-800 border border-slate-600 hover:bg-slate-700 hover:border-cyan-500/50 rounded-md text-sm text-white transition-all duration-200"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Installation Guide */}
          <WalletInstallationGuide />

          {/* Smart Contract Setup Guide */}
          <SmartContractSetupGuide />

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6 hover:border-cyan-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👛</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Wallet Integration</h3>
              <p className="text-slate-400 text-sm">Connect and interact with Sui wallets seamlessly</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6 hover:border-blue-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-white font-semibold mb-2">TypeScript Ready</h3>
              <p className="text-slate-400 text-sm">Full type safety with the latest Sui TypeScript SDK</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6 hover:border-emerald-500/30 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Next.js 15</h3>
              <p className="text-slate-400 text-sm">Built with the latest Next.js features and optimizations</p>
            </div>
          </div>

          {/* Navigation Instructions */}
          <NavigationInstructions />

          {/* Resources */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/20 backdrop-blur-sm rounded-lg p-6 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">📚</span>
                <h3 className="text-white text-lg font-semibold">Sui TypeScript SDK</h3>
              </div>
              <p className="text-slate-400 mb-4 text-sm">
                Comprehensive documentation and guides for the Sui TypeScript SDK
              </p>
              <a
                href="https://sdk.mystenlabs.com/typescript"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 rounded-md transition-all duration-200 font-medium"
              >
                <span>View Documentation</span>
                <span>↗</span>
              </a>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 backdrop-blur-sm rounded-lg p-6 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">👥</span>
                <h3 className="text-white text-lg font-semibold">Join the Community</h3>
              </div>
              <p className="text-slate-400 mb-4 text-sm">Connect with other developers and get support on Discord</p>
              <a
                href="https://discord.com/invite/Sui"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-2 rounded-md transition-all duration-200 font-medium"
              >
                <span>Join Discord</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Connected Account Section */}
          <ConnectedAccount />

          {/* Smart Contract Integration Example */}
          <div className="mt-12">
            <ContractExample />
          </div>
        </main>
      </div>
    </div>
  )
}

function SmartContractSetupGuide() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "Deploy Your Smart Contract",
      description: "Deploy your Move smart contract to Sui network",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-cyan-400 font-medium mb-2">📝 Write Your Move Contract</h4>
            <p className="text-slate-300 text-sm mb-3">
              Create your smart contract using the Move programming language
            </p>
            <div className="bg-slate-900/50 rounded p-3 font-mono text-xs text-slate-300 overflow-x-auto">
              <div className="text-emerald-400">// Example Move module</div>
              <div>{"module my_package::my_module {"}</div>
              <div className="ml-4">{"public fun create_item(name: String) {"}</div>
              <div className="ml-8">// Your contract logic here</div>
              <div className="ml-4">{"}"}</div>
              <div>{"}"}</div>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-cyan-400 font-medium mb-2">🚀 Deploy to Network</h4>
            <p className="text-slate-300 text-sm mb-3">Use Sui CLI to deploy your contract</p>
            <div className="bg-slate-900/50 rounded p-3 font-mono text-xs text-slate-300">
              <div className="text-emerald-400"># Deploy to devnet</div>
              <div>sui client publish --gas-budget 100000000</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Configure Contract Addresses",
      description: "Update the config file with your deployed contract addresses",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-cyan-400 font-medium mb-2">📁 Update config.json</h4>
            <p className="text-slate-300 text-sm mb-3">
              Navigate to <code className="bg-slate-700 px-1 rounded text-xs">lib/smart-contract/config.json</code>
            </p>
            <div className="bg-slate-900/50 rounded p-3 font-mono text-xs text-slate-300 overflow-x-auto">
              <div>{"{"}</div>
              <div className="ml-2">
                <span className="text-blue-400">"PACKAGE_ID"</span>:{" "}
                <span className="text-emerald-400">"0x_YOUR_PACKAGE_ID_HERE"</span>,
              </div>
              <div className="ml-2">
                <span className="text-blue-400">"ADMIN_CAP"</span>:{" "}
                <span className="text-emerald-400">"0x_YOUR_ADMIN_CAP_HERE"</span>,
              </div>
              <div className="ml-2">
                <span className="text-blue-400">"SHARED_OBJECT"</span>:{" "}
                <span className="text-emerald-400">"0x_YOUR_SHARED_OBJECT_HERE"</span>
              </div>
              <div>{"}"}</div>
            </div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <span className="text-amber-400 text-sm">💡</span>
              <p className="text-amber-200 text-sm">
                Get these addresses from your deployment output or use{" "}
                <code className="bg-amber-900/30 px-1 rounded text-xs">sui client objects</code>
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Update Transaction Builders",
      description: "Modify the transaction builders to match your contract functions",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-cyan-400 font-medium mb-2">🔧 Edit client-transactions.ts</h4>
            <p className="text-slate-300 text-sm mb-3">
              Update{" "}
              <code className="bg-slate-700 px-1 rounded text-xs">lib/smart-contract/client-transactions.ts</code>
            </p>
            <div className="bg-slate-900/50 rounded p-3 font-mono text-xs text-slate-300 overflow-x-auto">
              <div className="text-emerald-400">// Replace example functions with your contract functions</div>
              <div>
                <span className="text-blue-400">createItem</span>: (name: string) ={">"} {"{"}
              </div>
              <div className="ml-2">const transaction = new Transaction()</div>
              <div className="ml-2">transaction.moveCall({"{"})</div>
              <div className="ml-4">
                target: <span className="text-emerald-400">`${"${PACKAGE_ID}"}::your_module::create_item`</span>,
              </div>
              <div className="ml-4">arguments: [transaction.pure.string(name)]</div>
              <div className="ml-2">{"}"}</div>
              <div className="ml-2">return transaction</div>
              <div>{"}"}</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Configure Query Functions",
      description: "Set up read-only functions to query your contract data",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-cyan-400 font-medium mb-2">🔍 Edit queries.ts</h4>
            <p className="text-slate-300 text-sm mb-3">
              Update <code className="bg-slate-700 px-1 rounded text-xs">lib/smart-contract/queries.ts</code>
            </p>
            <div className="bg-slate-900/50 rounded p-3 font-mono text-xs text-slate-300 overflow-x-auto">
              <div className="text-emerald-400">// Add your query functions</div>
              <div>
                <span className="text-blue-400">async getItemInfo</span>(itemId: string) {"{"}
              </div>
              <div className="ml-2">const txn = new Transaction()</div>
              <div className="ml-2">txn.moveCall({"{"})</div>
              <div className="ml-4">
                target: <span className="text-emerald-400">`${"${PACKAGE_ID}"}::your_module::get_item`</span>,
              </div>
              <div className="ml-4">arguments: [txn.object(itemId)]</div>
              <div className="ml-2">{"}"}</div>
              <div className="ml-2">
                <span className="text-emerald-400">// Parse and return data</span>
              </div>
              <div>{"}"}</div>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-cyan-400 font-medium mb-2">🔑 Set Environment Variable</h4>
            <p className="text-slate-300 text-sm mb-3">Add your private key for read-only queries (optional)</p>
            <div className="bg-slate-900/50 rounded p-3 font-mono text-xs text-slate-300">
              <div className="text-emerald-400"># .env.local</div>
              <div>NEXT_PUBLIC_QUERY_PRIVATE_KEY=your_private_key_here</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Define TypeScript Types",
      description: "Create type definitions for your contract data structures",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-cyan-400 font-medium mb-2">📝 Edit types.ts</h4>
            <p className="text-slate-300 text-sm mb-3">
              Define interfaces in{" "}
              <code className="bg-slate-700 px-1 rounded text-xs">lib/smart-contract/types.ts</code>
            </p>
            <div className="bg-slate-900/50 rounded p-3 font-mono text-xs text-slate-300 overflow-x-auto">
              <div className="text-blue-400">export interface</div>{" "}
              <span className="text-emerald-400">YourDataType</span> {"{"}
              <div className="ml-2">
                id?: <span className="text-blue-400">string</span>
              </div>
              <div className="ml-2">
                name: <span className="text-blue-400">string</span>
              </div>
              <div className="ml-2">
                price: <span className="text-blue-400">number</span>
              </div>
              <div className="ml-2">
                owner: <span className="text-blue-400">string</span>
              </div>
              <div className="ml-2">
                isActive: <span className="text-blue-400">boolean</span>
              </div>
              <div>{"}"}</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Test Your Integration",
      description: "Connect your wallet and test the smart contract integration",
      content: (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-cyan-400 font-medium mb-2">🧪 Test the Integration</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                <span className="text-slate-300 text-sm">Connect your wallet using the button above</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                <span className="text-slate-300 text-sm">Try creating an item using the form below</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                <span className="text-slate-300 text-sm">Check the browser console for transaction results</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                <span className="text-slate-300 text-sm">View your objects in the "Connected Account" section</span>
              </div>
            </div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <span className="text-emerald-400 text-sm">✅</span>
              <p className="text-emerald-200 text-sm">
                Once everything works, you can customize the UI and add more contract functions!
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 backdrop-blur-sm rounded-lg p-6 mb-12">
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-2xl">🏗️</span>
        <h2 className="text-white text-xl font-semibold">Smart Contract Integration Setup</h2>
      </div>
      <p className="text-slate-300 mb-6">Follow these steps to integrate your own smart contract with this scaffold</p>

      {/* Step Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeStep === index
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-700/50 hover:text-slate-300"
            }`}
          >
            {index + 1}. {step.title}
          </button>
        ))}
      </div>

      {/* Active Step Content */}
      <div className="bg-slate-900/30 rounded-lg p-6 border border-slate-700/30">
        <div className="flex items-center space-x-3 mb-4">
          <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
            {activeStep + 1}
          </span>
          <div>
            <h3 className="text-white font-semibold">{steps[activeStep].title}</h3>
            <p className="text-slate-400 text-sm">{steps[activeStep].description}</p>
          </div>
        </div>
        {steps[activeStep].content}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="px-4 py-2 bg-slate-800 border border-slate-600 hover:bg-slate-700 hover:border-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md transition-all duration-200"
        >
          Previous
        </button>
        <span className="text-slate-400 text-sm self-center">
          Step {activeStep + 1} of {steps.length}
        </span>
        <button
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md transition-all duration-200"
        >
          Next
        </button>
      </div>
    </div>
  )
}

function NavigationInstructions() {
  return (
    <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6 mb-12">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-2xl">🧭</span>
        <h2 className="text-white text-xl font-semibold">How to Navigate This App</h2>
      </div>
      <p className="text-slate-400 mb-6">Here's how to use this scaffold and integrate your smart contract</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Basic Navigation */}
        <div className="space-y-4">
          <h3 className="text-cyan-400 font-semibold mb-3">🚀 Getting Started</h3>

          <div className="flex items-start space-x-4">
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              1
            </span>
            <div>
              <h4 className="text-white font-medium">Install a Sui Wallet</h4>
              <p className="text-slate-400 text-sm">Install Sui Wallet or Suiet extension from the Chrome Web Store</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              2
            </span>
            <div>
              <h4 className="text-white font-medium">Connect Your Wallet</h4>
              <p className="text-slate-400 text-sm">Click "Connect Wallet" in the header to link your Sui wallet</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              3
            </span>
            <div>
              <h4 className="text-white font-medium">Explore the Interface</h4>
              <p className="text-slate-400 text-sm">
                View your owned objects and try the example smart contract integration
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Smart Contract Setup */}
        <div className="space-y-4">
          <h3 className="text-emerald-400 font-semibold mb-3">🏗️ Smart Contract Setup</h3>

          <div className="flex items-start space-x-4">
            <span className="bg-orange-500/10 text-orange-400 border border-orange-500/30 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              A
            </span>
            <div>
              <h4 className="text-white font-medium">Deploy Your Contract</h4>
              <p className="text-slate-400 text-sm">Use Sui CLI to deploy your Move smart contract to the network</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              B
            </span>
            <div>
              <h4 className="text-white font-medium">Update Configuration</h4>
              <p className="text-slate-400 text-sm">
                Add your contract addresses to{" "}
                <code className="bg-slate-700 px-1 rounded text-xs">lib/smart-contract/config.json</code>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <span className="bg-pink-500/10 text-pink-400 border border-pink-500/30 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
              C
            </span>
            <div>
              <h4 className="text-white font-medium">Customize Functions</h4>
              <p className="text-slate-400 text-sm">Modify transaction builders and queries to match your contract</p>
            </div>
          </div>
        </div>
      </div>

      {/* File Structure Guide */}
      <div className="mt-8 pt-6 border-t border-slate-700/50">
        <h3 className="text-white font-semibold mb-4">📁 Key Files to Modify</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-cyan-400">📄</span>
              <code className="text-cyan-400 text-sm">lib/smart-contract/config.json</code>
            </div>
            <p className="text-slate-400 text-xs">Contract addresses and IDs</p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-blue-400">📄</span>
              <code className="text-blue-400 text-sm">lib/smart-contract/client-transactions.ts</code>
            </div>
            <p className="text-slate-400 text-xs">Transaction builders for wallet execution</p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-emerald-400">📄</span>
              <code className="text-emerald-400 text-sm">lib/smart-contract/queries.ts</code>
            </div>
            <p className="text-slate-400 text-xs">Read-only contract queries</p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-purple-400">📄</span>
              <code className="text-purple-400 text-sm">lib/smart-contract/types.ts</code>
            </div>
            <p className="text-slate-400 text-xs">TypeScript interfaces for your data</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function WalletDebugInfo() {
  const wallets = useWallets()
  const account = useCurrentAccount()

  return (
    <div className="text-xs text-slate-400 bg-slate-800/50 rounded px-2 py-1">
      Wallets: {wallets.length} | Connected: {account ? "Yes" : "No"}
    </div>
  )
}

function WalletConnectionButton() {
  const { mutate: connect } = useConnectWallet()
  const { mutate: disconnect } = useDisconnectWallet()
  const wallets = useWallets()
  const account = useCurrentAccount()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDisconnecting, setIsDisconnecting] = useState(false)

  const handleConnect = async () => {
    if (wallets.length === 0) {
      alert("No wallets detected! Please install a Sui wallet extension first.")
      return
    }

    setIsConnecting(true)
    try {
      connect(
        { wallet: wallets[0] },
        {
          onSuccess: () => {
            console.log("Wallet connected successfully!")
            setIsConnecting(false)
          },
          onError: (error) => {
            console.error("Failed to connect wallet:", error)
            alert(`Failed to connect wallet: ${error.message}`)
            setIsConnecting(false)
          },
        },
      )
    } catch (error) {
      console.error("Connection error:", error)
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    setIsDisconnecting(true)
    try {
      disconnect(undefined, {
        onSuccess: () => {
          console.log("Wallet disconnected successfully!")
          setIsDisconnecting(false)
        },
        onError: (error) => {
          console.error("Failed to disconnect wallet:", error)
          setIsDisconnecting(false)
        },
      })
    } catch (error) {
      console.error("Disconnect error:", error)
      setIsDisconnecting(false)
    }
  }

  if (account) {
    return (
      <div className="flex items-center space-x-2">
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-md px-3 py-2 text-emerald-400 text-sm">
          Connected: {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </div>
        <button
          onClick={handleDisconnect}
          disabled={isDisconnecting}
          className="bg-red-600/80 hover:bg-red-600 disabled:opacity-50 text-white px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium"
        >
          {isDisconnecting ? "Disconnecting..." : "Disconnect"}
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-md transition-all duration-200 font-medium"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
    </div>
  )
}

function WalletInstallationGuide() {
  const wallets = useWallets()

  if (wallets.length > 0) {
    return null // Don't show if wallets are detected
  }

  return (
    <div className="bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm rounded-lg p-6 mb-12">
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-2xl">⚠️</span>
        <h3 className="text-amber-400 text-lg font-semibold">No Wallets Detected</h3>
      </div>
      <p className="text-slate-300 mb-4">
        To connect to the Sui blockchain, you need to install a compatible wallet extension first.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <a
          href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 bg-slate-800/50 border border-slate-600 hover:border-cyan-500/50 rounded-lg p-4 transition-all duration-200"
        >
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">🦊</span>
          </div>
          <div>
            <h4 className="text-white font-medium">Sui Wallet</h4>
            <p className="text-slate-400 text-sm">Official Sui wallet extension</p>
          </div>
        </a>
        <a
          href="https://chrome.google.com/webstore/detail/suiet-sui-wallet/khpkpbbcccdmmclmpigdgddabeilkdpd"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 bg-slate-800/50 border border-slate-600 hover:border-cyan-500/50 rounded-lg p-4 transition-all duration-200"
        >
          <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <span className="text-xl">💎</span>
          </div>
          <div>
            <h4 className="text-white font-medium">Suiet</h4>
            <p className="text-slate-400 text-sm">Popular Sui wallet with DeFi features</p>
          </div>
        </a>
      </div>
    </div>
  )
}

function ConnectedAccount() {
  const account = useCurrentAccount()

  if (!account) {
    return (
      <div className="bg-slate-900/30 border border-slate-700/50 backdrop-blur-sm rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">👛</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Wallet Connected</h3>
        <p className="text-slate-400">Install and connect your Sui wallet to view your owned objects</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          <h3 className="text-white text-lg font-semibold">Connected Account</h3>
        </div>
        <DisconnectButton />
      </div>
      <p className="text-slate-400 font-mono text-sm mb-4 bg-slate-800/50 p-2 rounded border border-slate-700/50">
        {account.address}
      </p>
      <OwnedObjects address={account.address} />
    </div>
  )
}

function DisconnectButton() {
  const { mutate: disconnect } = useDisconnectWallet()
  const [isDisconnecting, setIsDisconnecting] = useState(false)

  const handleDisconnect = () => {
    setIsDisconnecting(true)
    disconnect(undefined, {
      onSuccess: () => {
        console.log("Wallet disconnected!")
        setIsDisconnecting(false)
      },
      onError: (error) => {
        console.error("Disconnect failed:", error)
        setIsDisconnecting(false)
      },
    })
  }

  return (
    <button
      onClick={handleDisconnect}
      disabled={isDisconnecting}
      className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 px-3 py-1 rounded-md transition-all duration-200 text-sm font-medium"
    >
      {isDisconnecting ? "Disconnecting..." : "Disconnect"}
    </button>
  )
}

function OwnedObjects({ address }: { address: string }) {
  const { data, isLoading } = useSuiClientQuery("getOwnedObjects", {
    owner: address,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
        <span className="ml-3 text-slate-400">Loading objects...</span>
      </div>
    )
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">📦</div>
        <p className="text-slate-400">No objects found for this address</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <h4 className="text-white font-medium">Owned Objects</h4>
        <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full px-2 py-1 text-xs font-mono">
          {data.data.length}
        </span>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {data.data.map((object) => (
          <div
            key={object.data?.objectId}
            className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-cyan-500/30 transition-all duration-200"
          >
            <span className="text-slate-300 font-mono text-sm truncate flex-1">{object.data?.objectId}</span>
            <a
              href={`https://suiscan.xyz/mainnet/object/${object.data?.objectId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-2 py-1 bg-slate-700 border border-slate-600 hover:bg-slate-600 hover:border-cyan-500/50 rounded text-xs text-white transition-all duration-200"
            >
              ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
