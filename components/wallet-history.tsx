"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { History, GitCompare, Users, Clock } from "lucide-react"
import type { WalletData } from "@/app/page"

interface WalletHistoryProps {
  wallets: WalletData[]
}

export function WalletHistory({ wallets }: WalletHistoryProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "LOW":
        return "bg-slate-500/20 text-slate-200 border-slate-500/30"
      case "MEDIUM":
        return "bg-slate-400/20 text-slate-200 border-slate-400/30"
      case "HIGH":
        return "bg-slate-600/20 text-slate-200 border-slate-600/30"
      case "EXTREME":
        return "bg-slate-800/20 text-slate-200 border-slate-800/30"
      default:
        return "bg-slate-500/20 text-slate-200 border-slate-500/30"
    }
  }

  const findWalletInteractions = () => {
    const interactions: Array<{
      wallet1: string
      wallet2: string
      commonTransactions: number
      commonContracts: number
      directTransactions: number
    }> = []

    for (let i = 0; i < wallets.length; i++) {
      for (let j = i + 1; j < wallets.length; j++) {
        const wallet1 = wallets[i]
        const wallet2 = wallets[j]

        // Buscar transacciones directas entre wallets
        const directTxs = wallet1.transactions.filter(
          (tx) =>
            tx.from.toLowerCase() === wallet2.address.toLowerCase() ||
            tx.to.toLowerCase() === wallet2.address.toLowerCase(),
        ).length

        // Buscar contratos comunes
        const commonContracts = wallet1.contracts.filter((c1) =>
          wallet2.contracts.some((c2) => c1.address.toLowerCase() === c2.address.toLowerCase()),
        ).length

        // Buscar transacciones con las mismas direcciones
        const commonTxAddresses = new Set()
        wallet1.transactions.forEach((tx) => {
          if (
            wallet2.transactions.some(
              (tx2) => tx.from.toLowerCase() === tx2.from.toLowerCase() || tx.to.toLowerCase() === tx2.to.toLowerCase(),
            )
          ) {
            commonTxAddresses.add(tx.from)
            commonTxAddresses.add(tx.to)
          }
        })

        if (directTxs > 0 || commonContracts > 0 || commonTxAddresses.size > 0) {
          interactions.push({
            wallet1: wallet1.address,
            wallet2: wallet2.address,
            commonTransactions: commonTxAddresses.size,
            commonContracts,
            directTransactions: directTxs,
          })
        }
      }
    }

    return interactions
  }

  const interactions = findWalletInteractions()

  return (
    <div className="max-w-7xl mx-auto space-y-6 mt-12">
      {/* Historial de Consultas */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <History className="w-5 h-5" />
            Historial de Consultas ({wallets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-4">
              {wallets.map((wallet, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <p className="text-white font-mono text-sm break-all">{wallet.address}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-white/60" />
                        <span className="text-white/60 text-xs">{wallet.analyzedAt.toLocaleString()}</span>
                      </div>
                    </div>
                    <Badge className={getRiskColor(wallet.riskAnalysis.riskLevel)}>
                      {wallet.riskAnalysis.riskLevel}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-white/60">Balance</p>
                      <p className="text-white font-bold">{wallet.balance} ETH</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60">Tokens</p>
                      <p className="text-white">{wallet.tokens.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60">Transacciones</p>
                      <p className="text-white">{wallet.transactions.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60">Contratos</p>
                      <p className="text-white">{wallet.contracts.length}</p>
                    </div>
                  </div>

                  {wallet.riskAnalysis.isBlacklisted && (
                    <div className="mt-3 bg-red-500/20 border border-red-500/30 rounded p-2">
                      <p className="text-red-200 text-xs text-center">⚠️ WALLET EN BLACKLIST</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Análisis de Interacciones */}
      {wallets.length > 1 && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <GitCompare className="w-5 h-5" />
              Análisis de Interacciones entre Wallets
            </CardTitle>
          </CardHeader>
          <CardContent>
            {interactions.length > 0 ? (
              <div className="space-y-4">
                {interactions.map((interaction, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-white/60" />
                      <span className="text-white font-medium">Interacción Detectada</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-white/60 text-sm">Wallet 1:</p>
                        <p className="text-white font-mono text-xs break-all">{interaction.wallet1}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">Wallet 2:</p>
                        <p className="text-white font-mono text-xs break-all">{interaction.wallet2}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-blue-500/20 rounded p-2">
                        <p className="text-blue-200 text-sm font-medium">{interaction.directTransactions}</p>
                        <p className="text-blue-200/80 text-xs">Transacciones Directas</p>
                      </div>
                      <div className="bg-green-500/20 rounded p-2">
                        <p className="text-green-200 text-sm font-medium">{interaction.commonContracts}</p>
                        <p className="text-green-200/80 text-xs">Contratos Comunes</p>
                      </div>
                      <div className="bg-purple-500/20 rounded p-2">
                        <p className="text-purple-200 text-sm font-medium">{interaction.commonTransactions}</p>
                        <p className="text-purple-200/80 text-xs">Direcciones Comunes</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-white/40 mx-auto mb-3" />
                <p className="text-white/60">No se detectaron interacciones directas entre las wallets analizadas</p>
                <p className="text-white/40 text-sm mt-1">Las wallets parecen operar de forma independiente</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
