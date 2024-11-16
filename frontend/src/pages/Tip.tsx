// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { Twitter, Github } from "lucide-react";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { createWallet } from "@/services/api/createWallet";
import {
  validateGitHubUsername,
  validateTwitterUsername,
} from "@/services/platformValidation";
import { chain as chainConfig } from "@/services/chainConfig";
import { CustomChainConfig } from "@web3auth/base";
import viemActions from "@/viemRPC";
// import { switchChain } from "viem/actions";
import {
  createPublicClient,
  createWalletClient,
  custom,
  erc20Abi,
  parseUnits,
} from "viem";
import { tokenConfig } from "@/services/tokenConfig"; // Adjust import path accordingly
import {
  getPreference,
  PreferenceResponse,
} from "@/services/api/getPreference";
import { NATIVE_TOKEN_ADDRESS } from "@/constants";
import {
  COW_PROTOCOL_VAULT_RELAYER_ADDRESS,
  OrderSigningUtils,
  SigningScheme,
  UnsignedOrder,
  SupportedChainId,
  OrderBookApi,
  OrderQuoteRequest,
  OrderQuoteSideKindSell,
} from "@cowprotocol/cow-sdk";
import * as ethers from "ethers";
import { SDK, HashLock } from "@1inch/cross-chain-sdk";

function Tip() {
  const { app: urlApp, username: urlUsername } = useParams<{
    app: string;
    username: string;
  }>();
  const [app, setApp] = useState<string>(urlApp || "");
  const [username, setUsername] = useState<string>("");
  const [isValidUser, setIsValidUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chain, setChain] = useState<CustomChainConfig>(chainConfig.arbitrum);
  const [selectedToken, setSelectedToken] = useState<{
    ticker: string;
    value: string;
    address: string;
    decimals: number;
  }>({
    ticker: "",
    value: "",
    address: "",
    decimals: 0,
  });
  const [tipAmount, setTipAmount] = useState<string>("");
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [isFetchingAddress, setIsFetchingAddress] = useState<boolean>(false);
  const [isCorrectChain, setIsCorrectChain] = useState<boolean>(true);
  const [chainTokens, setChainTokens] = useState<
    { ticker: string; value: string; address: string; decimals: number }[]
  >([]);
  const [recipientPreference, setRecipientPreference] =
    useState<PreferenceResponse>({ chainId: "", address: "" });

  const supportedApps = ["x", "github"];

  // Function to generate random bytes32 value
function getRandomBytes32(): string {
  const randomBytes = ethers.utils.randomBytes(32); // Generates 32 random bytes
  return ethers.utils.hexlify(randomBytes); // Convert bytes to a hex string (bytes32)
}

// Function to compute Solidity-packed Keccak256 hash
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function solidityPackedKeccak256(types: string[], values: any[]): string {
  const packedData = ethers.utils.solidityPack(types, values); // ABI encode the values
  return ethers.utils.keccak256(packedData); // Compute the Keccak256 hash of the packed data
}

  const { provider, isConnected, connect, addChain, switchChain } =
    useWeb3Auth();

  useEffect(() => {
    const fetchPreference = async () => {
      if (receiverAddress && app) {
        const identifierType = app.toLowerCase() === "x" ? "twitter" : "github";
        const preference: PreferenceResponse | null = await getPreference(
          identifierType,
          username
        );
        if (preference) setRecipientPreference(preference);
      }
    };

    fetchPreference();
  }, [receiverAddress, app]);

  useEffect(() => {
    if (urlApp) setApp(urlApp.toLowerCase());
    if (urlUsername) setUsername(urlUsername.toLowerCase());
  }, [urlApp, urlUsername]);

  // Update the token list and native token whenever the selected chain changes
  useEffect(() => {
    const selectedChainKey = Object.keys(chainConfig).find(
      (key) => chainConfig[key] === chain
    );
    if (selectedChainKey) {
      const nativeToken = chainConfig[selectedChainKey]?.ticker || "ETH"; // Use a default token like "ETH"
      setSelectedToken({
        ticker: nativeToken,
        value: nativeToken,
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        decimals: 18,
      }); // Set the default token to the native token
      setChainTokens(
        Object.keys(tokenConfig[selectedChainKey] || {}).map((tokenKey) => ({
          ticker: tokenConfig[selectedChainKey][tokenKey].ticker,
          value: tokenKey,
          address: tokenConfig[selectedChainKey][tokenKey].address,
          decimals: tokenConfig[selectedChainKey][tokenKey].decimals,
        }))
      );
    }
  }, [chain]);

  const handleValidation = async () => {
    setIsLoading(true);
    let valid = false;
    const normalizedApp = app.toLowerCase();

    if (normalizedApp === "x") {
      valid = await validateTwitterUsername(username);
    } else if (normalizedApp === "github") {
      valid = await validateGitHubUsername(username);
    }

    setIsValidUser(valid);
    setIsLoading(false);

    if (valid) {
      setIsFetchingAddress(true);
      const identifierType = normalizedApp === "x" ? "TWITTER" : "GITHUB";
      const walletResponse = await createWallet(identifierType, username);

      setReceiverAddress(walletResponse?.address || "");
      setIsFetchingAddress(false);
    } else {
      setReceiverAddress("");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (username) handleValidation();
    }, 500);

    return () => clearTimeout(timer);
  }, [app, username]);

  useEffect(() => {
    if (!provider) return;

    const checkChain = async () => {
      const connectedChainId = await viemActions.getChainId(provider);
      const chainIdDecimal = parseInt(chain.chainId, 16);
      setIsCorrectChain(connectedChainId == chainIdDecimal);
    };

    checkChain();
  }, [provider, chain]);

  const handleAppChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setApp(e.target.value.toLowerCase());

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value.toLowerCase());

  const handleChainChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedChainKey = e.target.value;
    const selectedChain = chainConfig[selectedChainKey];

    setChain(selectedChain);
  };

  const handleTokenChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = chainTokens.find(
      (token) => token.ticker === e.target.value
    );
    console.log(selected);
    if (selected) {
      setSelectedToken(selected);
    }
  };

  const switchChainNetwork = async () => {
    if (!provider) return;

    const chainId = parseInt(chain.chainId, 16); // Convert chainId to decimal

    // Helper function to attempt chain switch
    const attemptSwitchChain = async () => {
      try {
        await switchChain({ chainId: `0x${chainId.toString(16)}` });
        setIsCorrectChain(true);
      } catch (error) {
        console.warn("Switching chain failed, attempting to add chain:", error);
        throw error; // Re-throw to trigger addChain fallback
      }
    };

    // Helper function to attempt adding chain
    const attemptAddChain = async () => {
      try {
        await addChain(chain);
        setIsCorrectChain(true);
        await switchChain({ chainId: `0x${chainId.toString(16)}` });
      } catch (error) {
        console.error("Adding chain also failed:", error);
      }
    };

    // Execute switch, fallback to add if needed
    attemptSwitchChain().catch(attemptAddChain);
  };

  const transferTipWhenNoPreference = async () => {
    if (!provider) return;

    try {
      if (selectedToken.address == NATIVE_TOKEN_ADDRESS) {
        await viemActions.sendNativeToken({
          provider: provider,
          receiver: receiverAddress,
          amount: tipAmount,
        });
      } else {
        await viemActions.sendErc20Token({
          provider: provider,
          receiver: receiverAddress,
          amount: tipAmount,
          tokenAddress: selectedToken.address,
          decimals: selectedToken.decimals,
        });
      }
    } catch (error) {
      console.error("Error in transaction:", error);
    }
  };

  const transferTipOnSameChain = async () => {
    // Using CowSwap
    if (!provider) return;

    const publicClient = createPublicClient({
      chain: viemActions.getViewChain(provider),
      transport: custom(provider),
    });

    const connectedChainId = await viemActions.getChainId(provider);

    const walletClient = createWalletClient({
      chain: viemActions.getViewChain(provider),
      transport: custom(provider),
    });
    const address = await walletClient.getAddresses();

    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = ethersProvider.getSigner();

    const amountToSend = parseUnits(tipAmount, selectedToken.decimals); // Adjust decimals as needed

    const orderBookApi = new OrderBookApi({
      chainId: SupportedChainId.ARBITRUM_ONE,
    });

    if (selectedToken.address != NATIVE_TOKEN_ADDRESS) {
      try {
        const sellToken = selectedToken.address;
        const buyToken = recipientPreference.address;
        const sellAmount = amountToSend;
        if (!buyToken) return;

        const quoteRequest: OrderQuoteRequest = {
          sellToken,
          buyToken,
          from: address[0],
          receiver: receiverAddress,
          sellAmountBeforeFee: sellAmount.toString(),
          kind: OrderQuoteSideKindSell.SELL,
        };
        let quoteResponse;
        try {
          quoteResponse = await orderBookApi.getQuote(quoteRequest);

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          transferTipWhenNoPreference();
          return;
        }

        // Check existing allowance
        const currentAllowance = await publicClient.readContract({
          abi: erc20Abi,
          address: selectedToken.address as "0xstring",
          functionName: "allowance",
          args: [
            address[0],
            COW_PROTOCOL_VAULT_RELAYER_ADDRESS[connectedChainId],
          ],
        });

        console.log(currentAllowance);

        // Approve only if current allowance is less than the amount to send
        if (currentAllowance < sellAmount) {
          console.log(
            "Insufficient allowance. Approving the required amount..."
          );

          const hash = await walletClient.writeContract({
            abi: erc20Abi,
            address: selectedToken.address as "0xstring",
            functionName: "approve",
            args: [
              COW_PROTOCOL_VAULT_RELAYER_ADDRESS[connectedChainId],
              sellAmount,
            ],
            account: address[0],
          });

          console.log("Transaction sent for approval:", hash);

          const receipt = await publicClient.waitForTransactionReceipt({
            hash,
          });
          console.log("Transaction confirmed:", receipt);
        } else {
          console.log(
            "Sufficient allowance already granted, no need for approval."
          );
        }

        const feeAmount = "0";
        const slippageBps = 100; // 1%

        const order: UnsignedOrder = {
          ...quoteResponse.quote,
          sellAmount: sellAmount.toString(),
          feeAmount,
          receiver: receiverAddress,
          buyAmount: ethers.BigNumber.from(quoteResponse.quote.buyAmount)
            .mul(10000 - slippageBps) // Adjust for slippage (99% of original buyAmount)
            .div(10000) // Divide by 10000 to handle basis points
            .toString(), // Convert to string for compatibility
        };

        const signedOrder = await OrderSigningUtils.signOrder(
          order,
          SupportedChainId.ARBITRUM_ONE,
          signer
        );

        try {
          const orderId = await orderBookApi.sendOrder({
            ...quoteResponse.quote,
            ...signedOrder,
            sellAmount: order.sellAmount, // replace quote sellAmount with signed order sellAmount, which is equal to original sellAmount
            feeAmount: order.feeAmount, // replace quote feeAmount with signed order feeAmount, which is 0
            signingScheme:
              signedOrder.signingScheme as unknown as SigningScheme,
            buyAmount: order.buyAmount,
          });

          console.log(orderId);
        } catch (e) {
          return e;
        }

        console.log(quoteResponse.quote);
      } catch (error) {
        console.error("Error in transaction:", error);
      }
    } else {
      transferTipWhenNoPreference();
    }
  };

  const transferTipCrossChain = async () => {
    if (!provider) return;

    // const sdk = new SDK({
    //   url: "https://api.1inch.dev/fusion-plus",
    //   authKey: import.meta.env.VITE_APP_FUSION_API_KEY
    // });

    const walletClient = createWalletClient({
      chain: viemActions.getViewChain(provider),
      transport: custom(provider),
    });

    const connectedChainId = await viemActions.getChainId(provider);
    const address = await walletClient.getAddresses();
    const amountToSend = parseUnits(tipAmount, selectedToken.decimals); // Adjust decimals as needed

    // Create the custom connector
    // const viemConnector = new ViemBlockchainProviderConnector(walletClient);

    const sdk = new SDK({
      url: "https://api.1inch.dev/fusion",
      authKey: import.meta.env.VITE_APP_FUSION_API_KEY,
      blockchainProvider: walletClient
    });

    const pref = {chainId: 1, address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"};

    const params = {
      srcChainId: connectedChainId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dstChainId: pref.chainId as any,
      srcTokenAddress: selectedToken.address,
      dstTokenAddress: pref.address,
      amount: amountToSend.toString(),
      enableEstimate: true,
      walletAddress: address[0]
    };

    const quote = await sdk.getQuote(params);

const secretsCount = quote.getPreset().secretsCount;

const secrets = Array.from({ length: secretsCount }).map(() => getRandomBytes32());
const secretHashes = secrets.map((x) => HashLock.hashSecret(x));


const hashLock =
secretsCount === 1
  ? HashLock.forSingleFill(secrets[0])
  : HashLock.forMultipleFills(
      secretHashes.map((secretHash, i) =>
        solidityPackedKeccak256(["uint64", "bytes32"], [i, secretHash.toString()])
      ) as (string & {
        _tag: "MerkleLeaf";
      })[]
    );

sdk
.placeOrder(quote, {
  walletAddress: address[0],
  hashLock,
  secretHashes,
  // fee is an optional field
  fee: {
    takingFeeBps: 100, // 1% as we use bps format, 1% is equal to 100bps
    takingFeeReceiver: "0x0000000000000000000000000000000000000000" //  fee receiver address
  }
})
  }

  const handleSendTip = async () => {
    if (!provider) return;

    const walletClient = createWalletClient({
      chain: viemActions.getViewChain(provider),
      transport: custom(provider),
    });

    console.log(walletClient);

    const connectedChainId = await viemActions.getChainId(provider);
    const chainIdDecimal = parseInt(chain.chainId, 16);
    console.log(recipientPreference);
    if (
      !recipientPreference.chainId ||
      (chainIdDecimal.toString() === recipientPreference.chainId &&
        selectedToken.address.toLowerCase() ===
          recipientPreference.address.toLowerCase())
    ) {
      await transferTipCrossChain();
      console.log("Direct transfer to recipient");
      // await transferTipWhenNoPreference();
    } else if (
      connectedChainId === recipientPreference.chainId &&
      selectedToken.address != recipientPreference.address
    ) {
      // transferTipCrossChain();
      console.log("Swap token using CowSwap");
      const chainIds = Object.values(SupportedChainId).filter(
        (value) => typeof value === "number"
      );

      if (!chainIds.includes(Number(connectedChainId))) {
        console.log("Connected chain ID is not supported.");
        await transferTipWhenNoPreference();
      } else {
        console.log("Connected chain ID is supported.");
        await transferTipOnSameChain();
      }
    } else {
      console.log("Use 1inch Fusion for cross-chain transfer");
      transferTipCrossChain();
    }
  };

  const isSupported = supportedApps.includes(app || "");

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-800 dark:text-white">
      {isSupported ? (
        <>
          <div className="flex items-center space-x-4">
            {app.toLowerCase() === "x" && (
              <Twitter className="text-blue-500 h-8 w-8" />
            )}
            {app.toLowerCase() === "github" && (
              <Github className="text-gray-800 dark:text-white h-8 w-8" />
            )}
            <h1 className="text-4xl font-bold">{username}</h1>
          </div>

          {isLoading ? (
            <p className="text-blue-500 text-lg mt-4">
              Validating the username...
            </p>
          ) : (
            <>
              {isValidUser ? (
                <p className="text-green-500 text-lg mt-4">Valid username ✅</p>
              ) : (
                <p className="text-red-500 text-lg mt-4">
                  Invalid username. Please check and try again.
                </p>
              )}
            </>
          )}

          <div className="mt-6 mx-4 space-y-4 sm:w-1/3 w-[90%]">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Platform
              </label>
              <select
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 rounded-lg focus:outline-none"
                value={app}
                onChange={handleAppChange}
              >
                {supportedApps.map((appOption) => (
                  <option key={appOption} value={appOption}>
                    {appOption.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter username"
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Chain
              </label>
              <select
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 rounded-lg focus:outline-none"
                value={
                  Object.keys(chainConfig).find(
                    (key) => chainConfig[key] === chain
                  ) || ""
                }
                onChange={handleChainChange}
              >
                {Object.entries(chainConfig).map(([chainKey, chainData]) => (
                  <option key={chainKey} value={chainKey}>
                    {chainData.displayName}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Token
              </label>
              <select
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 rounded-lg focus:outline-none"
                value={selectedToken.ticker}
                onChange={handleTokenChange}
              >
                {chainTokens.map((token) => (
                  <option key={token.value} value={token.ticker}>
                    {token.ticker}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tip Amount ({selectedToken.ticker})
              </label>
              <input
                type="number"
                step="0.01"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                placeholder={`Enter tip amount`}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            {isFetchingAddress ? (
              <p className="text-blue-500 mt-8">
                Fetching Recipient address...
              </p>
            ) : receiverAddress ? (
              <p className="text-green-500 mt-8 flex justify-between">
                <span>Receiver address:</span>
                <span>
                  {receiverAddress.slice(0, 6)}...{receiverAddress.slice(-6)}
                </span>
              </p>
            ) : null}

            {isConnected ? (
              !isCorrectChain ? (
                <button
                  className="mt-8 w-full px-6 py-3 bg-indigo-500 text-white rounded-lg shadow transition hover:bg-indigo-400"
                  onClick={switchChainNetwork}
                >
                  Switch to {chain.displayName}
                </button>
              ) : (
                <button
                  className={`mt-8 w-full px-6 py-3 bg-indigo-500 text-white rounded-lg shadow transition ${
                    !isValidUser || !receiverAddress
                      ? "cursor-not-allowed"
                      : "hover:bg-indigo-400"
                  }`}
                  onClick={handleSendTip}
                  disabled={!isValidUser || !receiverAddress}
                >
                  Tip
                </button>
              )
            ) : (
              <button
                className="mt-8 w-full px-6 py-3 bg-indigo-500 text-white rounded-lg shadow transition hover:bg-indigo-400"
                onClick={() => connect()}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">Unsupported App</h1>
          <p className="text-xl mb-4">
            Sorry, <strong>{app}</strong> is not supported at the moment.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            We're constantly adding support for more platforms, so stay tuned
            for updates! Please select a supported app such as X or GitHub.
          </p>
          <a
            href="/"
            className="px-8 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-400 transition"
          >
            Back to Home
          </a>
        </div>
      )}
    </div>
  );
}

export default Tip;
