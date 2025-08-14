'use client'

import { useState } from 'react'
import { Search, Wallet, TrendingUp, Activity } from 'lucide-react'
import WalletSearch from './components/WalletSearch'
import TransactionHistory from './components/TransactionHistory'
import StatsCard from './components/StatsCard'

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('')
  const [searchedAddress, setSearchedAddress] = useState('')

  const handleSearch = (address: string) => {
    setSearchedAddress(address)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-dark-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Wallet className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold">ردیاب والت کریپتو</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-primary-400 transition-colors">خانه</a>
              <a href="#" className="hover:text-primary-400 transition-colors">بازارها</a>
              <a href="#" className="hover:text-primary-400 transition-colors">تحلیل</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
            تحلیل تراکنش‌های والت
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            آدرس والت خود را وارد کنید و تاریخچه کامل تراکنش‌هایتان را مشاهده کنید
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <WalletSearch onSearch={handleSearch} />
        </div>

        {/* Stats Cards */}
        {searchedAddress && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatsCard
              title="موجودی کل"
              value="$12,345.67"
              icon={<Wallet className="h-6 w-6" />}
              change="+5.2%"
              positive={true}
            />
            <StatsCard
              title="تعداد تراکنش‌ها"
              value="1,234"
              icon={<Activity className="h-6 w-6" />}
              change="+12"
              positive={true}
            />
            <StatsCard
              title="سود/زیان"
              value="+$2,345.12"
              icon={<TrendingUp className="h-6 w-6" />}
              change="+8.7%"
              positive={true}
            />
          </div>
        )}

        {/* Transaction History */}
        {searchedAddress && (
          <div className="max-w-7xl mx-auto">
            <TransactionHistory walletAddress={searchedAddress} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-dark-900/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 ردیاب والت کریپتو. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
