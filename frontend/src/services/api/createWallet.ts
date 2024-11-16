import { API_URL } from '@/constants';
import { PlatformIdentifierType } from '@/types';
import axios, { AxiosResponse } from 'axios';
// import * as ethers from 'ethers';
import { Alchemy, Network } from "alchemy-sdk";

// Define the response type
interface WalletResponse {
  address: string;
}

const reqUrl = `${API_URL}/create`;

const config = {
  apiKey: "9N3CPPgkAxmb2YvOU2tYfThGUogvD3_W",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

// Function to create wallet
export const createWallet = async (
  identifierType: PlatformIdentifierType,
  identifier: string
): Promise<WalletResponse | null> => {
  
  try {
    console.log(identifierType, identifier);
    if (identifierType == "ens") {
      const address = await alchemy.core.resolveName(`${identifier}.eth`);
      return { address: address || ""};
    } else {

      const response: AxiosResponse<string> = await axios.post(reqUrl, {
        identifierType: identifierType.toLowerCase(),
        identifier,
      });

      // Wrap the response in an object to match WalletResponse interface
      return { address: response.data };
    }
  } catch (error) {
    console.error("Error creating wallet:", error);
    return null;
  }
};
