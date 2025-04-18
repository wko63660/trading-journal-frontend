import { useState } from "react"
import TradeImport from "../components/TradeImport/TradeImport"
import TradeForm from "../components/TradingForm/TradeEntryForm"

export default function NewTradePage() {
  const [mode, setMode] = useState<"manual" | "import">("manual")

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Trade</h1>

      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setMode("manual")}
          className={`px-4 py-2 rounded ${
            mode === "manual"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Manual Input
        </button>
        <button
          onClick={() => setMode("import")}
          className={`px-4 py-2 rounded ${
            mode === "import"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Import .TLG File
        </button>
      </div>

      <div className="mt-4">
        {mode === "manual" ? <TradeForm /> : <TradeImport />}
      </div>
    </div>
  )
}
