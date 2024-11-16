// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useEffect } from 'react'
import OAuthConnect from '@/components/OAuthConnect'
import UserAddress from '@/components/UserAddress'
import PreferenceForm from '@/components/PreferenceForm'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { API_URL } from '@/constants'
import Capsule, { CapsuleModal, Environment } from '@usecapsule/react-sdk'
import '@usecapsule/react-sdk/styles.css'

const capsule = new Capsule(
  Environment.BETA,
  '05f3a0500bb9c7a5aeda851b85717ced'
)

// const constructorOpts: ConstructorOpts = {
//   emailPrimaryColor: '#ff6700',
//   githubUrl: 'https://github.com/capsule-org',
//   linkedinUrl: 'https://www.linkedin.com/company/usecapsule/',
//   xUrl: 'https://x.com/usecapsule',
//   homepageUrl: 'http://localhost:5173',
//   supportUrl: 'https://usecapsule.com/talk-to-us',
// }

// const capsule = new Capsule(
//   Environment.BETA,
//   '52ce9e3efe63978598444c3c6fadfe76',
//   constructorOpts
// )

const endpoint = API_URL

const TipManagementDashboard = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [userWallet, setUserWallet] = useState(null)
  const [capsuleSession, setCapsuleSession] = useState(null)
  const [isFullyLoggedIn, setIsFullyLoggedIn] = useState(false)

  const fetchWallet = async () => {
    if (!isAuthenticated) return
    try {
      const authToken = await getAccessTokenSilently()
      const response = await axios.get(`${endpoint}/wallet`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      // const res = await axios.post(
      //   `${endpoint}/wallet/claim`,
      //   {},
      //   { headers: { Authorization: `Bearer ${authToken}` } }
      // )
      setUserWallet(response.data)
      setCapsuleSession(capsule.exportSession())

      console.log('Session')
      console.log(capsule.exportSession())

      const isFullyLoggedIn = await capsule.isFullyLoggedIn()
      setIsFullyLoggedIn(isFullyLoggedIn)

      if (isFullyLoggedIn) {
        setCapsuleSession(capsule.exportSession())
      }
    } catch (error) {
      console.error('Failed to fetch user address:', error)
    }
  }

  useEffect(() => {
    fetchWallet()
  }, [isAuthenticated, capsule])

  const handleSavePreferences = async (chain: string, token: string) => {
    if (!isAuthenticated) return
    try {
      const authToken = await getAccessTokenSilently()
      await axios.post(
        `${endpoint}/set-preference`,
        { chain, token },
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
    } catch (error) {
      console.error('Failed to save preferences:', error)
    }
  }

  const [isOpen, setIsOpen] = useState(false)

  const claimWallet = async () => {
    if (!isAuthenticated) return
    try {
      const authToken = await getAccessTokenSilently()
      const response = await axios.post(
        `${endpoint}/claim`,
        { session: capsuleSession },
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      console.log(response)
    } catch (error) {
      console.error('Failed to claim wallet:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {!isAuthenticated ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center space-y-6">
          <h1 className="text-4xl font-bold">Manage Your Tips with Ease</h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            Log in to access your dashboard, claim your tips, set up
            preferences, and keep track of all your incoming support.
          </p>
          <OAuthConnect />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <OAuthConnect />
          {userWallet && userWallet.walletAddress ? (
            <UserAddress address={userWallet?.walletAddress} />
          ) : (
            <p className="text-muted-foreground mt-4 mb-4">
              Fetching your address...
            </p>
          )}

          {userWallet ? (
            userWallet.isClaimed ? (
              <div className="mt-10 mb-10 text-center">
                <p className="text-lg font-semibold">Wallet Already Claimed:</p>
                <p className="text-gray-700">{userWallet.address}</p>
              </div>
            ) : (
              isFullyLoggedIn && (
                <div className="text-center">
                  <button
                    className="m-8 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    onClick={claimWallet}
                  >
                    Claim Wallet
                  </button>
                </div>
              )
            )
          ) : (
            <div className="mt-10 mb-10 text-center">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                onClick={() => setIsOpen(true)}
              >
                Sign In
              </button>
              <CapsuleModal
                capsule={capsule}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
              />
            </div>
          )}

          {userWallet &&
            userWallet.chainPreference &&
            userWallet.tokenPreference && (
              <div className="w-full max-w-md mx-auto p-4 border rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                  Preferred Details
                </h3>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">Chain:</span>
                  <span>{userWallet.chainPreference}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Token:</span>
                  <span>{userWallet.tokenPreference}</span>
                </div>
              </div>
            )}

          <PreferenceForm onSave={handleSavePreferences} />
        </div>
      )}
    </div>
  )
}

export default TipManagementDashboard
