// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { BlockchainProviderConnector, EIP712TypedData } from '@1inch/cross-chain-sdk';
import { WalletClient } from 'viem';

export class ViemBlockchainProviderConnector implements BlockchainProviderConnector {
  private walletClient: WalletClient;

  constructor(walletClient: WalletClient) {
    this.walletClient = walletClient;
  }

  async signTypedData(walletAddress: string, typedData: EIP712TypedData): Promise<string> {
    const { domain, types } = typedData;

    return this.walletClient.signTypedData({
      account: walletAddress as `0xstring`,
      primaryType: 'EIP712Domain',
      domain,
      types,
    });
  }

  async ethCall(contractAddress: string, callData: string): Promise<string> {
    return this.walletClient.request({
      method: 'eth_call', 
      params: [
        {
          to: contractAddress as `0xstring`,
          data: callData as `0xstring`,
        },
        'latest',
      ],
    });
  }
}