"use client"

import { useState } from "react"
import { WalletSearch } from "@/components/wallet-search"
import { WalletDashboard } from "@/components/wallet-dashboard"
import { WalletHistory } from "@/components/wallet-history"
import { RecentScams } from "@/components/recent-scams"
import { AnimatedBackground } from "@/components/animated-background"

export interface WalletData {
  address: string
  balance: string
  tokens: Array<{
    name: string
    symbol: string
    balance: string
    value: string
    contractAddress: string
  }>
  transactions: Array<{
    hash: string
    from: string
    to: string
    value: string
    timeStamp: string
    gasUsed: string
    gasPrice: string
  }>
  contracts: Array<{
    address: string
    name?: string
    interactionCount: number
  }>
  riskAnalysis: {
    isBlacklisted: boolean
    riskLevel: "LOW" | "MEDIUM" | "HIGH" | "EXTREME"
    riskScore: number
    confidenceLevel: number
    riskFactors: string[]
    recommendation: string
    analytics: {
      ageInDays: number
      transactionFrequency: {
        daily: number
        weekly: number
        monthly: number
        yearly: number
      }
      exchangeInteractions: string[]
      suspiciousPatterns: string[]
      riskScore: number
      confidenceLevel: number
    }
  }
  analyzedAt: Date
}

export default function Home() {
  const [analyzedWallets, setAnalyzedWallets] = useState<WalletData[]>([])
  const [currentWallet, setCurrentWallet] = useState<WalletData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<string>("")

  const handleWalletAnalyzed = (walletData: WalletData) => {
    const walletWithTimestamp = {
      ...walletData,
      analyzedAt: new Date(),
    }

    setCurrentWallet(walletWithTimestamp)
    setAnalyzedWallets((prev) => {
      const existing = prev.findIndex((w) => w.address === walletData.address)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = walletWithTimestamp
        return updated
      }
      return [...prev, walletWithTimestamp]
    })
    setIsAnalyzing(false)
  }

  const handleAnalysisStart = (address: string) => {
    setCurrentAddress(address)
    setIsAnalyzing(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">Ethereum OSINT Analyzer</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Análisis completo de wallets Ethereum con detección avanzada de riesgos y verificación de blacklists
          </p>
        </div>

        <WalletSearch
          onAnalysisStart={handleAnalysisStart}
          onWalletAnalyzed={handleWalletAnalyzed}
          isAnalyzing={isAnalyzing}
          currentWallet={currentAddress}
        />

        {/* Siempre mostrar el dashboard de la wallet actual */}
        {currentWallet && <WalletDashboard wallet={currentWallet} />}

        {/* Historial de consultas si hay más de una wallet */}
        {analyzedWallets.length > 0 && <WalletHistory wallets={analyzedWallets} />}

        {/* Sección de scams recientes */}
        <RecentScams />
      </div>
    </div>
  )
}
