import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useWeb3Auth } from '@web3auth/modal-react-hooks'
import ConnectBtn from '@/components/web3Auth-connect' // Import your existing ConnectBtn component

function Login() {
  const { isConnected } = useWeb3Auth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Extract app and username from query parameters
  const app = searchParams.get('app')
  const username = searchParams.get('username')

  useEffect(() => {
    // Redirect to AppDetails page if connected
    if (isConnected && app && username) {
      navigate(`/tip/${app}/${username}`)
    }
  }, [isConnected, app, username, navigate])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ConnectBtn />
    </div>
  )
}

export default Login
