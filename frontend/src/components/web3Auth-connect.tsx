import { useWeb3Auth } from '@web3auth/modal-react-hooks'

const ConnectWeb3AuthButton = () => {
  const { isConnected, connect, logout } = useWeb3Auth()

  if (isConnected) {
    return (
      <div
        className="bg-white text-pink-600 px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 cursor-pointer"
        onClick={() => logout()}
      >
        Logout
      </div>
    )
  }
  return (
    <div
      className="bg-white text-pink-600 px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 cursor-pointer"
      onClick={connect}
    >
      Connect
    </div>
  )
}
export default ConnectWeb3AuthButton
