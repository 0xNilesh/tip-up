import { API_URL } from '@/constants'
import axios, { AxiosResponse } from 'axios'
import { chain } from '../chainConfig'

// Define the preference response type
export interface PreferenceResponse {
  chainId: string
  address: string
}

const preferenceUrl = `${API_URL}/preference`

// Function to get preference
export const getPreference = async (
  platform: 'github' | 'twitter',
  identifier: string
): Promise<PreferenceResponse | null> => {
  try {
    const response: AxiosResponse = await axios.get(preferenceUrl, {
      params: {
        identifierType: platform.toLowerCase(),
        identifier,
      },
    })

    console.log('Preference response:', response.data)

    const res = {
      chainId: parseInt(chain[response.data.chain].chainId, 16).toString(),
      address: response.data.token,
    }
    return res
  } catch (error) {
    console.error('Error fetching preference:', error)
    return null
  }
}
