'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight, ArrowDownLeft, ExternalLink, Copy, Check } from 'lucide-react'

interface Transaction {
  hash: string
  type: 'send' | 'receive'
  amount: string
  token: string
  to: string
  from: string
  timestamp: string
  status: 'success' | 'pending' | 'failed'
  value_usd: string
}

interface TransactionHistoryProps {
  walletAddress: string
}

export default function TransactionHistory({ walletAddress }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  // Mock data - در پروژه واقعی از API استفاده کنید
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockTransactions: Transaction[] = [
        {
          hash: '0x1234567890abcdef1234567890abcdef12345678',
          type: 'receive',
          amount: '0.5',
          token: 'ETH',
          to: walletAddress,
          from: '0xabcdef1234567890abcdef1234567890abcdef12',
          timestamp: '2024-01-15T10:30:00Z',
          status: 'success',
          value_usd: '$1,234.56'
        },
        {
          hash: '0xabcdef1234567890abcdef1234567890abcdef12',
          type: 'send',
          amount: '100',
          token: 'USDT',
          to: '0x9876543210fedcba9876543210fedcba98765432',
          from: walletAddress,
          timestamp: '2024-01-14T15:45:00Z',
          status: 'success',
          value_usd: '$100.00'
        },
        {
          hash: '0x567890abcdef1234567890abcdef1234567890ab',
          type: 'receive',
          amount: '1000',
          token: 'USDC',
          to: walletAddress,
          from: '0x1111222233334444555566667777888899990000',
          timestamp: '2024-01-13T09:15:00Z',
          status: 'success',
          value_usd: '$1,000.00'
        }
      ]
      
      setTransactions(mockTransactions)
      setLoading(false)
    }

    fetchTransactions()
  }, [walletAddress])

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedHash(text)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
        <h3 className="text-2xl font-bold mb-6">تاریخچه تراکنش‌ها</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-700 h-20 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">تاریخچه تراکنش‌ها</h3>
        <span className="text-gray-400">{transactions.length} تراکنش</span>
      </div>
      
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.hash} className="bg-dark-900/50 rounded-xl p-6 border border-gray-600 hover:border-primary-500 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${
                  tx.type === 'receive' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {tx.type === 'receive' ? (
                    <ArrowDownLeft className="h-5 w-5" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5" />
                  )}
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-lg">
                      {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.token}
                    </span>
                    <span className="text-gray-400">({tx.value_usd})</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {tx.type === 'receive' ? 'از' : 'به'}: {formatAddress(tx.type === 'receive' ? tx.from : tx.to)}
                  </div>
                </div>
              </div>
              
              <div className="text-left">
                <div className="text-sm text-gray-400 mb-2">
                  {formatDate(tx.timestamp)}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToClipboard(tx.hash)}
                    className="text-xs text-primary-400 hover:text-primary-300 flex items-center space-x-1"
                  >
                    {copiedHash === tx.hash ? (
                      <Check className="h-3 w-3 ml-1" />
                    ) : (
                      <Copy className="h-3 w-3 ml-1" />
                    )}
                    <span>{formatAddress(tx.hash)}</span>
                  </button>
                  <a
                    href={`https://etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
