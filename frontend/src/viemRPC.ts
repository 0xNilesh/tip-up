/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createWalletClient,
  createPublicClient,
  custom,
  formatEther,
  parseEther,
  parseUnits,
} from "viem";
import {
  bitkub,
  polygonAmoy,
  scrollSepolia,
  bitkubTestnet,
  baseSepolia,
  arbitrumSepolia,
  celoAlfajores,
  flareTestnet,
  kinto,
  gnosisChiado,
  neonDevnet,
  rootstockTestnet,
  oasisTestnet,
  mantleSepoliaTestnet,
  lineaSepolia,
  arbitrum,
  polygon,
  mainnet,
  sepolia,
} from "viem/chains";

const chainsList = [
  bitkub,
  polygonAmoy,
  scrollSepolia,
  bitkubTestnet,
  baseSepolia,
  arbitrumSepolia,
  celoAlfajores,
  flareTestnet,
  kinto,
  gnosisChiado,
  neonDevnet,
  rootstockTestnet,
  oasisTestnet,
  mantleSepoliaTestnet,
  lineaSepolia,
  arbitrum,
  polygon,
  mainnet,
  sepolia,
];

import type { IProvider } from "@web3auth/base";
import erc20Abi from "@/lib/erc20Abi.json";

const getViewChain = (chainId: string) => {
  const targetChain = chainsList.find(
    (chain) => chain.id.toString() == chainId
  );
  return targetChain;
};

const getChainId = async (provider: IProvider): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      transport: custom(provider),
    });

    // const address = await walletClient.getAddresses()

    const chainId = await walletClient.getChainId();
    return chainId.toString();
  } catch (error) {
    return error;
  }
};
const getAccounts = async (provider: IProvider): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const address = await walletClient.getAddresses();

    return address;
  } catch (error) {
    return error;
  }
};

const getBalance = async (provider: IProvider): Promise<string> => {
  try {
    const publicClient = createPublicClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const address = await walletClient.getAddresses();

    const balance = await publicClient.getBalance({ address: address[0] });
    console.log(balance);
    return formatEther(balance);
  } catch (error) {
    return error as string;
  }
};

const sendNativeToken = async ({
  provider,
  receiver,
  amount,
  chainId,
}: {
  provider: IProvider;
  receiver: string;
  amount: string;
  chainId: string;
}): Promise<any> => {
  try {
    const publicClient = createPublicClient({
      chain: getViewChain(chainId),
      transport: custom(provider),
    });

    const walletClient = createWalletClient({
      chain: getViewChain(chainId),
      transport: custom(provider),
    });

    const amountToSend = parseEther(amount.toString());
    const address = await walletClient.getAddresses();

    // Submit transaction to the blockchain
    const hash = await walletClient.sendTransaction({
      account: address[0],
      to: receiver as `0xstring`,
      value: amountToSend,
    });
    console.log(hash);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    return JSON.stringify(
      receipt,
      (_key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

const sendErc20Token = async ({
  provider,
  receiver,
  tokenAddress,
  amount,
  decimals,
  chainId,
}: {
  provider: IProvider;
  receiver: string;
  tokenAddress: string;
  amount: string;
  decimals: number;
  chainId: string;
}): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      chain: getViewChain(chainId),
      transport: custom(provider),
    });

    const amountToSend = parseUnits(amount.toString(), decimals);
    const address = await walletClient.getAddresses();

    await walletClient.writeContract({
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: "transfer",
      args: [receiver, amountToSend],
      account: address[0],
    });

    // Submit transaction to the blockchain
    // const hash = await walletClient.sendTransaction({
    //   account: address[0],
    //   to: receiver as `0xstring`,
    //   value: amountToSend,
    // })
    // console.log(hash)
    // const receipt = await publicClient.waitForTransactionReceipt({ hash })

    // return JSON.stringify(
    //   receipt,
    //   (_key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
    // )
  } catch (error) {
    console.log(error);
    return error;
  }
};

// const sendErc20Transaction = async ({provider, receiver, tokenAddress, amount}: {provider: IProvider, receiver: string, tokenAddress: string, amount: string}) => {
//   try {
//     const walletClient = createWalletClient({
//       chain: getViewChain(provider),
//       transport: custom(provider),
//     });

//     await walletClient.writeContract({
//       address: tokenAddress as `0x${string}`,
//       abi: erc20Abi,
//       functionName: 'transfer',
//       args: [receiver, amount]
//     })
//   } catch (error) {
//     return error;
//   }
// }

const signMessage = async (provider: IProvider): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    // data for signing
    const address = await walletClient.getAddresses();
    const originalMessage = "YOUR_MESSAGE";

    // Sign the message
    const hash = await walletClient.signMessage({
      account: address[0],
      message: originalMessage,
    });

    console.log(hash);

    return hash.toString();
  } catch (error) {
    return error;
  }
};

export default {
  getViewChain,
  getChainId,
  getAccounts,
  getBalance,
  sendNativeToken,
  signMessage,
  sendErc20Token,
};
