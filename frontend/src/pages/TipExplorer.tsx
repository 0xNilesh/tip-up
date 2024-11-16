import { Twitter, Github } from 'lucide-react'

const dummyTips = [
  {
    sender: '0x1234...abcd',
    receiver: '@dev1',
    receiverPlatform: 'github', // or 'twitter'
    txHash: '0x9876...wxyz',
  },
  {
    sender: '0xabcd...1234',
    receiver: '@user2',
    receiverPlatform: 'twitter',
    txHash: '0x5678...qrst',
  },
  {
    sender: '0xffff...ffff',
    receiver: '@cooldev',
    receiverPlatform: 'github',
    txHash: '0xa1b2...c3d4',
  },
]

const TipExplorer = () => {
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
                    href={`https://etherscan.io/tx/${tip.txHash}`}
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
