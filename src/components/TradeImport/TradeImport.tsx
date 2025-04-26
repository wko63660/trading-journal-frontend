import { useState } from "react"
import api from "../../services/api"
import { toast } from "react-toastify"
import { useAuth } from "../../context/AuthContext"

interface ParsedTrade {
  symbol: string,
  contract: string,
  exchange: string,
  price: number,
  currency: string,
  fee: number,
  // date: string
  // entryTime: string,
  // exitTime: string,
  entryDateTime: string,
  exitDateTime?: string,
  side: "LONG" | "SHORT"
  action: "BUYTOOPEN" | "SELLTOOPEN" | "BUYTOCLOSE" | "SELLTOCLOSE"
  qty: number,
  position: number,
  cost: number,
  tradeType: string,
  status?: string
}

export default function TradeImport() {
  const [trades, setTrades] = useState<ParsedTrade[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const { username } = useAuth()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    const lines = text.trim().split("\n")
    const parsed: ParsedTrade[] = []

    for (const line of lines) {

      if (!line.startsWith("OPT_TRD")) continue

      try {
        // only stock and option for now
        const tradeType = line.startsWith("OPT_TRD") ? "OPTION" : "STOCK"

        const parts = line.split("|")
        const symbol = parts[3]?.split(" ")[0] || ""
        const contract = parts[3]?.substring(parts[3]?.indexOf(" ")+1) || ""
        const action = parts[5]?.toUpperCase().trim() || "UNKNOWN"
        const rawStatus = parts[6]?.toUpperCase().trim() || "UNKNOWN"
        const status = rawStatus === "C" ? "CLOSED" : rawStatus === "O" ? "OPEN" : "UNKNOWN"
        const rawDate = parts[7] || ""
        const rawTime = parts[8] || ""
        const date = `${rawDate.substring(0, 4)}-${rawDate.substring(4, 6)}-${rawDate.substring(6, 8)}`
        const fullDateTime = `${date}T${rawTime}`
        // const pnl = parseFloat(parts[12])
        const qty = parseInt(parts[11])
        const position = parseInt(parts[10]) // negative for short positions
        const price = parseFloat(parts[12]) || 0
        const currency = parts[9] || ""
        const exchange = parts[4] || ""
        const cost = qty * price || 0

        const fee = parseFloat(parts[14]) || 0

        let side: "LONG" | "SHORT" = "LONG"
        if (action === "SELLTOOPEN") side = "SHORT"
        else if (action === "BUYTOOPEN") side = "LONG"

        parsed.push({
          symbol:symbol,
          contract: contract,
          exchange: exchange,
          price: price,
          currency: currency,
          fee: fee,
          // date: date,
          entryDateTime: rawStatus === "O" ? fullDateTime : "",
          exitDateTime: rawStatus === "C" ? fullDateTime : "",
          // entryTime: rawStatus === "O" ? rawTime : "",
          // exitTime: rawStatus === "C" ? rawTime : "",
          side : side,
          action: action as ParsedTrade["action"],
          qty : qty,
          position : position,
          cost,
        //   pnl,
          tradeType: tradeType,
          status: status
        })
      } catch (err) {
        console.warn("Skipped line due to parse error:", line)
      }
    }

    setTrades(parsed)
    toast.info(`${parsed.length} valid trades parsed.`)
  }

  const handleImport = async () => {
    if (trades.length === 0) return
    setLoading(true)
    try {
      await api.post("/trades/import-trades/"+username, trades)
      setMessage("Trades imported successfully!")
      setTrades([])
    } catch (err) {
      console.error(err)
      setMessage("Failed to import trades.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold">Import Trades (.tlg)</h2>
      <input
        type="file"
        accept=".tlg"
        onChange={handleFileUpload}
        className="border px-4 py-2 rounded"
      />

      {trades.length > 0 && (
        <div>
          <p>{trades.length} trades parsed.</p>
          <button
            onClick={handleImport}
            disabled={loading}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {loading ? "Importing..." : "Import to Journal"}
          </button>
        </div>
      )}

      {message && <p className="text-sm text-center text-blue-500 mt-2">{message}</p>}
    </div>
  )
}
