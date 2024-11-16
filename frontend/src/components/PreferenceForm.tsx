// components/PreferenceForm.tsx
import { chain } from '@/services/chainConfig'
import { useState } from 'react'

interface PreferenceFormProps {
  onSave: (chain: string, token: string) => void
}

const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSave }) => {
  const [selectedChain, setSelectedChain] = useState<string>('')
  const [selectedToken, setSelectedToken] = useState<string>('')

  const chains = Object.keys(chain)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedChain && selectedToken) {
      onSave(selectedChain, selectedToken)
    } else {
      alert('Please select both a chain and a token.')
    }
  }

  return (
    <div className="p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mt-4 mb-4">Set / Change Preferences</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Choose EVM Chain</label>
        <select
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none text-gray-700"
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value)}
        >
          <option value="" disabled>
            Select Chain
          </option>
          {chains.map((chain) => (
            <option key={chain} value={chain}>
              {chain}
            </option>
          ))}
        </select>

        <label className="block mb-2">Choose Token</label>
        <input
          type="text"
          className="w-full px-3 py-2 mb-4 border rounded-lg text-gray-700 focus:outline-none"
          placeholder="Enter Token"
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Preferences
        </button>
      </form>
    </div>
  )
}

export default PreferenceForm
