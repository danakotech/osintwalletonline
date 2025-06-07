"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { WalletData } from "@/app/page"
import { GitCompare } from "lucide-react"

interface ComparisonViewProps {
  wallets: WalletData[]
}

export function ComparisonView({ wallets }: ComparisonViewProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "LOW":
        return "bg-green-500/20 text-green-200 border-green-500/30"
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-200 border-yellow-500/30"
      case "HIGH":
        return "bg-orange-500/20 text-orange-200 border-orange-500/30"
      case "EXTREME":
        return "bg-red-500/20 text-red-200 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-200 border-gray-500/30"
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <GitCompare className="w-5 h-5" />
            Comparación de Wallets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wallets.map((wallet, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg space-y-4">
                <div className="text-center">
                  <p className="text-white/60 text-sm">Wallet {index + 1}</p>
                  <p className="text-white font-mono text-xs break-all">{wallet.address}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Balance ETH:</span>
                    <span className="text-white font-bold">{wallet.balance}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/60">Tokens:</span>
                    <span className="text-white">{wallet.tokens.length}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/60">Transacciones:</span>
                    <span className="text-white">{wallet.transactions.length}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/60">Contratos:</span>
                    <span className="text-white">{wallet.contracts.length}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Riesgo:</span>
                    <Badge className={getRiskColor(wallet.riskAnalysis.riskLevel)}>
                      {wallet.riskAnalysis.riskLevel}
                    </Badge>
                  </div>

                  {wallet.riskAnalysis.isBlacklisted && (
                    <div className="bg-red-500/20 border border-red-500/30 rounded p-2">
                      <p className="text-red-200 text-xs text-center">⚠️ En Blacklist</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
