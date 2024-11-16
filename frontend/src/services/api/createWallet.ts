import { API_URL } from '@/constants';
import { PlatformIdentifierType } from '@/types';
import axios, { AxiosResponse } from 'axios';

// Define the response type
interface WalletResponse {
  address: string;
}

const reqUrl = `${API_URL}/create`;

// Function to create wallet
export const createWallet = async (
  identifierType: PlatformIdentifierType,
  identifier: string
): Promise<WalletResponse | null> => {
  
  try {
    const response: AxiosResponse<string> = await axios.post(reqUrl, {
      identifierType: identifierType.toLowerCase(),
      identifier,
    });

    // Wrap the response in an object to match WalletResponse interface
    return { address: response.data };
  } catch (error) {
    console.error("Error creating wallet:", error);
    return null;
  }
};
