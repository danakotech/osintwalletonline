"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, AlertTriangle } from "lucide-react"
import { analyzeWallet } from "@/lib/wallet-analyzer"
import type { WalletData } from "@/app/page"

interface WalletSearchProps {
  onAnalysisStart: (address: string) => void
  onWalletAnalyzed: (wallet: WalletData) => void
  isAnalyzing: boolean
  currentWallet: string
}

export function WalletSearch({ onAnalysisStart, onWalletAnalyzed, isAnalyzing, currentWallet }: WalletSearchProps) {
  const [walletAddress, setWalletAddress] = useState("")
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")

  const handleAnalyze = async () => {
    if (!walletAddress.trim()) return

    onAnalysisStart(walletAddress)
    setProgress(0)
    setCurrentStep("Iniciando análisis...")

    try {
      const result = await analyzeWallet(walletAddress, (step, progressValue) => {
        setCurrentStep(step)
        setProgress(progressValue)
      })

      onWalletAnalyzed(result)
      setWalletAddress("")
    } catch (error) {
      console.error("Error analyzing wallet:", error)
      setCurrentStep("Error en el análisis")
    }
  }

  return (
    <Card className="max-w-4xl mx-auto mb-8 bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-2xl flex items-center gap-2">
          <Search className="w-6 h-6" />
          Análisis de Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <Input
            placeholder="Ingresa la dirección de la wallet (0x...)"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60"
            disabled={isAnalyzing}
          />
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !walletAddress.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isAnalyzing ? "Analizando..." : "Analizar"}
          </Button>
        </div>

        {isAnalyzing && (
          <div className="space-y-4">
            <div className="text-white/80">
              <p className="text-sm mb-2">{currentStep}</p>
              <Progress value={progress} className="h-2" />
              <p className="text-xs mt-1 text-white/60">{progress}% completado</p>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-200">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Analizando: {currentWallet}</span>
              </div>
              <p className="text-yellow-100/80 text-sm mt-1">Verificando tokens, transacciones y blacklists...</p>
            </div>
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            <Plus className="w-4 h-4 mr-2" />
            Agregar otra wallet para comparar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
