"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Wallet,
  Coins,
  Activity,
  FileText,
  AlertTriangle,
  Shield,
  ExternalLink,
  TrendingUp,
  Target,
  Calendar,
} from "lucide-react"
import type { WalletData } from "@/app/page"

interface WalletDashboardProps {
  wallet: WalletData
}

export function WalletDashboard({ wallet }: WalletDashboardProps) {
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

  const getRiskScoreColor = (score: number) => {
    if (score >= 8) return "text-slate-300"
    if (score >= 6) return "text-slate-400"
    if (score >= 4) return "text-slate-500"
    return "text-slate-600"
  }

  const analytics = wallet.riskAnalysis.analytics

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Critical Risk Alert */}
      {wallet.riskAnalysis.isBlacklisted && (
        <Alert className="bg-slate-700/30 border-slate-700/70 border-2">
          <AlertTriangle className="h-6 w-6 text-slate-300" />
          <AlertDescription className="text-slate-100 text-lg font-bold">
            🚨 ALERTA CRÍTICA - DIRECCIÓN PELIGROSA CONFIRMADA 🚨
            <br />
            <span className="text-slate-200 text-base font-normal">
              Esta wallet está verificada en la blacklist oficial de scams. El riesgo de operar con esta dirección es
              extremadamente elevado y completamente desaconsejable. NO INTERACTUAR BAJO NINGUNA CIRCUNSTANCIA.
            </span>
          </AlertDescription>
        </Alert>
      )}

      {/* High Risk Alert for new wallets */}
      {!wallet.riskAnalysis.isBlacklisted && wallet.transactions.length === 0 && (
        <Alert className="bg-yellow-500/20 border-yellow-500/50">
          <AlertTriangle className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-yellow-200">
            <strong>⚠️ WALLET NUEVA SIN HISTORIAL:</strong> Esta wallet no tiene transacciones registradas. No se puede
            evaluar la seguridad sin actividad previa. Proceder con extrema precaución.
          </AlertDescription>
        </Alert>
      )}

      {/* Wallet Overview with Risk Score */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Resumen de Wallet - Análisis OSINT Completo
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-white/60 text-sm">Dirección</p>
            <p className="text-white font-mono text-sm break-all">{wallet.address}</p>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-sm">Balance ETH</p>
            <p className="text-white text-xl font-bold">{wallet.balance} ETH</p>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-sm">Nivel de Riesgo</p>
            <Badge className={getRiskColor(wallet.riskAnalysis.riskLevel)}>{wallet.riskAnalysis.riskLevel}</Badge>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-sm">Puntuación de Seguridad</p>
            <p className={`text-2xl font-bold ${getRiskScoreColor(wallet.riskAnalysis.riskScore)}`}>
              {wallet.riskAnalysis.riskScore.toFixed(1)}/10
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Analytics Dashboard */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Wallet Age & Activity */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Análisis Temporal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/60">Edad de Wallet:</span>
              <span className="text-white font-bold">{analytics.ageInDays} días</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/60 text-sm">Transacciones/Día:</span>
                <span className="text-white">{analytics.transactionFrequency.daily}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 text-sm">Transacciones/Semana:</span>
                <span className="text-white">{analytics.transactionFrequency.weekly}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 text-sm">Transacciones/Mes:</span>
                <span className="text-white">{analytics.transactionFrequency.monthly}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 text-sm">Transacciones/Año:</span>
                <span className="text-white">{analytics.transactionFrequency.yearly}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/20">
              <p className="text-white/60 text-sm mb-2">Nivel de Confianza:</p>
              <Progress value={analytics.confidenceLevel} className="h-3" />
              <p className="text-white text-sm mt-1">{analytics.confidenceLevel}%</p>
            </div>
          </CardContent>
        </Card>

        {/* Exchange Interactions */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Interacciones con Exchanges
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analytics.exchangeInteractions.length > 0 ? (
              <div className="space-y-3">
                {analytics.exchangeInteractions.map((exchange, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-green-500/20 rounded">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-green-200 text-sm">{exchange}</span>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-green-500/10 rounded">
                  <p className="text-green-200 text-sm">✅ Buena señal: Interacciones con exchanges reconocidos</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-white/60 text-sm">No se detectaron interacciones con exchanges conocidos</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Risk Factors Visualization */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Factores de Riesgo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center mb-4">
                <div className={`text-4xl font-bold ${getRiskScoreColor(wallet.riskAnalysis.riskScore)}`}>
                  {wallet.riskAnalysis.riskScore.toFixed(1)}
                </div>
                <p className="text-white/60 text-sm">Puntuación de Seguridad</p>
              </div>

              <Progress value={(wallet.riskAnalysis.riskScore / 10) * 100} className="h-3" />

              <div className="text-xs text-white/60 flex justify-between">
                <span>0 (Peligroso)</span>
                <span>10 (Seguro)</span>
              </div>

              {analytics.suspiciousPatterns.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-orange-200 text-sm font-medium">Patrones Detectados:</p>
                  {analytics.suspiciousPatterns.map((pattern, index) => (
                    <div key={index} className="text-orange-200/80 text-xs flex items-center gap-2">
                      <div className="w-1 h-1 bg-orange-400 rounded-full" />
                      {pattern}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Analysis */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Análisis de Riesgo Detallado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-white font-medium mb-2">Recomendación del Sistema:</p>
            <p className="text-white/80 text-sm">{wallet.riskAnalysis.recommendation}</p>
          </div>

          <div>
            <p className="text-white font-medium mb-3">Factores Analizados:</p>
            <div className="grid md:grid-cols-2 gap-3">
              {wallet.riskAnalysis.riskFactors.map((factor, index) => (
                <div key={index} className="flex items-start gap-2 text-white/80 text-sm p-2 bg-white/5 rounded">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tokens and Transactions Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Tokens */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Coins className="w-5 h-5" />
              Tokens ({wallet.tokens.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {wallet.tokens.length > 0 ? (
                  wallet.tokens.map((token, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{token.name}</p>
                        <p className="text-white/60 text-sm">{token.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">{token.balance}</p>
                        <p className="text-green-400 text-sm">${token.value}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-white/60">No se encontraron tokens</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Transacciones Recientes ({wallet.transactions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {wallet.transactions.length > 0 ? (
                  wallet.transactions.slice(0, 10).map((tx, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-3 h-3 text-white/60" />
                          <span className="text-white font-mono text-xs">{tx.hash.slice(0, 10)}...</span>
                        </div>
                        <span className="text-white/60 text-xs">
                          {new Date(Number.parseInt(tx.timeStamp) * 1000).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-400 text-sm">{tx.value} ETH</span>
                        <span className="text-white/60 text-xs">Gas: {tx.gasUsed}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-white/60">No se encontraron transacciones</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Contracts */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Contratos Interactuados ({wallet.contracts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {wallet.contracts.length > 0 ? (
                wallet.contracts.map((contract, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-mono text-sm">{contract.address}</p>
                      {contract.name && <p className="text-white/60 text-sm">{contract.name}</p>}
                    </div>
                    <Badge variant="outline" className="text-white/80 border-white/30">
                      {contract.interactionCount} interacciones
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/60">No se encontraron interacciones con contratos</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
