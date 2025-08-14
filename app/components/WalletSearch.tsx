'use client'

import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'

interface WalletSearchProps {
  onSearch: (address: string) => void
}

export default function WalletSearch({ onSearch }: WalletSearchProps) {
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    onSearch(address.trim())
    setIsLoading(false)
  }

  return (
    <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="wallet-address" className="block text-sm font-medium text-gray-300 mb-2">
            آدرس والت
          </label>
          <div className="relative">
            <input
              type="text"
              id="wallet-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="آدرس والت خود را وارد کنید (مثال: 0x742d35Cc6634C0532925a3b8D4C9db...)"
              className="w-full px-4 py-4 pr-12 bg-dark-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              dir="ltr"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!address.trim() || isLoading}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin ml-2" />
              <span>در حال جستجو...</span>
            </>
          ) : (
            <>
              <Search className="h-5 w-5 ml-2" />
              <span>جستجوی تراکنش‌ها</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
