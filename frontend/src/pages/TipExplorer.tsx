import { Twitter, Github } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getAttestations } from '@/services/signX'
import { AttestationInfo } from '@ethsign/sp-sdk'

const dummyTips = [
  {
    sender: '0x087F5052fBcD7C02DD45fb9907C57F1EccC2bE25',
    receiver: 'aman035',
    receiverPlatform: 'github', // or 'twitter'
    txHash:
      '0x3c73e9b957bbaec798bf1915db3efc66968fe22464984e495ee814284aa125eb',
  },
  {
    sender: '0x087F5052fBcD7C02DD45fb9907C57F1EccC2bE25',
    receiver: '0xnilesh',
    receiverPlatform: 'twitter',
    txHash:
      '0x74678c6767688295f187b34dc8630388ee4c0c705eb61ff7888ff04c89489bf7',
  },
  {
    sender: '0x087F5052fBcD7C02DD45fb9907C57F1EccC2bE25',
    receiver: 'aman035',
    receiverPlatform: 'github',
    txHash:
      '0x875ca5a7458fc2ad98896d047e1e6c0dfa9853432afbe0282d21266108064d1c',
  },
]

const TipExplorer = () => {
  const [attestations, setAttestations] = useState<AttestationInfo[]>([])

  useEffect(() => {
    const fetchAttestations = async () => {
      const att = await getAttestations('tDWgWZUWDkZyK', 1)
      if (att) setAttestations(att.rows)
    }

    fetchAttestations()
  }, [])

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
        Tip Explorer
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wider">
              <th className="py-3 px-6 text-left">Sender</th>
              <th className="py-3 px-6 text-left">Receiver</th>
              <th className="py-3 px-6 text-left">Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {dummyTips.map((tip, index) => (
              <tr
                key={index}
                className="border-t border-gray-300 dark:border-gray-700"
              >
                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                  {tip.sender}
                </td>
                <td className="py-4 px-6 flex items-center text-gray-700 dark:text-gray-300">
                  {tip.receiverPlatform === 'twitter' ? (
                    <Twitter className="text-blue-400 dark:text-blue-300 mr-2" />
                  ) : (
                    <Github className="text-gray-700 dark:text-gray-300 mr-2" />
                  )}
                  {tip.receiver}
                </td>
                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                  <a
                    href={`https://arbitrum.blockscout.com/tx/${tip.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    {tip.txHash}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TipExplorer
