// pages/TipManagementDashboard.tsx
import { useState, useEffect } from 'react'
import OAuthConnect from '@/components/OAuthConnect'
import UserAddress from '@/components/UserAddress'
import PreferenceForm from '@/components/PreferenceForm'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

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

const endpoint = 'http://localhost:3000'

const TipManagementDashboard = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [userAddress, setUserAddress] = useState<string | null>(null)

  const fetchUserAddress = async () => {
    if (!isAuthenticated) return
    try {
      // console.log(haswallet)

      const authToken = await getAccessTokenSilently()
      const response = await axios.get(`${endpoint}/wallet/mail`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      // const res = await axios.post(
      //   `${endpoint}/wallet/claim`,
      //   {},
      //   { headers: { Authorization: `Bearer ${authToken}` } }
      // )
      setUserAddress(response.data)
    } catch (error) {
      console.error('Failed to fetch user address:', error)
    }
  }

  useEffect(() => {
    fetchUserAddress()
  }, [isAuthenticated])

  const handleSavePreferences = async (chain: string, token: string) => {
    if (!isAuthenticated) return
    try {
      const authToken = await getAccessTokenSilently()
      await axios.post(
        `${endpoint}/wallet/set-preference`,
        { chain, token },
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
    } catch (error) {
      console.error('Failed to save preferences:', error)
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
          {userAddress ? (
            <UserAddress address={userAddress} />
          ) : (
            <p className="text-muted-foreground mt-4 mb-4">
              Fetching your address...
            </p>
          )}
          <PreferenceForm onSave={handleSavePreferences} />
        </div>
      )}
    </div>
  )
}

export default TipManagementDashboard
