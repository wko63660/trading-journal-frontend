import { useState } from "react"
import { TradeFormData } from "./tradeForm.types"

export default function TradeEntryForm() {
  const [formData, setFormData] = useState<TradeFormData>({
    symbol: "",
    entryDate: "",
    exitDate: "",
    side: "LONG",
    setup: "",
    tags: "",
    notes: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting trade:", formData)
    // You can POST this to /api/trades later
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md space-y-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Log New Trade</h2>

      <div>
        <label className="block text-sm mb-1">Symbol</label>
        <input name="symbol" value={formData.symbol} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm mb-1">Entry Date</label>
          <input type="date" name="entryDate" value={formData.entryDate} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
        </div>
        <div className="flex-1">
          <label className="block text-sm mb-1">Exit Date</label>
          <input type="date" name="exitDate" value={formData.exitDate} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
        </div>
      </div>

      <div>
        <label className="block text-sm mb-1">Side</label>
        <select name="side" value={formData.side} onChange={handleChange} className="w-full px-3 py-2 border rounded">
          <option value="LONG">Long</option>
          <option value="SHORT">Short</option>
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Setup / Strategy</label>
        <input name="setup" value={formData.setup} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
      </div>

      <div>
        <label className="block text-sm mb-1">Tags (comma-separated)</label>
        <input name="tags" value={formData.tags} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
      </div>

      <div>
        <label className="block text-sm mb-1">Notes</label>
        <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full px-3 py-2 border rounded h-24" />
      </div>

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Submit Trade
      </button>
    </form>
  )
}
