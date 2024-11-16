import 'dotenv/config';
import { Injectable, BadRequestException } from '@nestjs/common';
import CapsuleServer, {
  Environment,
  getSHA256HashHex,
  PregenIdentifierType,
  WalletType,
} from '@usecapsule/server-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';
const email = 'amangupta200103@gmail.com';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}

  private readonly validPreferences = {
    ethereum: {
      chainId: '0x1',
      displayName: 'Ethereum Mainnet',
      rpcTarget: 'https://rpc.ankr.com/eth',
      blockExplorerUrl: 'https://etherscan.io',
      ticker: 'ETH',
      tickerName: 'Ethereum',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    polygon: {
      chainId: '0x89', // hex of 137, polygon mainnet
      rpcTarget: 'https://rpc.ankr.com/polygon',
      // Avoid using public rpcTarget in production.
      // Use services like Infura, Quicknode etc
      displayName: 'Polygon Mainnet',
      blockExplorerUrl: 'https://polygonscan.com',
      ticker: 'MATIC',
      tickerName: 'Matic',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    base: {
      chainId: '0x14A34', // hex of 84532
      rpcTarget: 'https://sepolia.base.org',
      // Avoid using public rpcTarget in production.
      // Use services like Infura, Quicknode etc
      displayName: 'Base Sepolia',
      blockExplorerUrl: 'https://sepolia-explorer.base.org/',
      ticker: 'ETH',
      tickerName: 'ETH',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    arbitrum: {
      chainId: '0xA4B1', // hex of 42161
      rpcTarget: 'https://rpc.ankr.com/arbitrum',
      // Avoid using public rpcTarget in production.
      // Use services like Infura, Quicknode etc
      displayName: 'Arbitrum Mainnet',
      blockExplorerUrl: 'https://arbiscan.io',
      ticker: 'AETH',
      tickerName: 'AETH',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    celo: {
      chainId: '0xa4ec', // hex of 42220, Celo mainnet
      rpcTarget: 'https://rpc.ankr.com/celo',
      // Avoid using public rpcTarget in production.
      // Use services like Infura, Quicknode etc
      displayName: 'Celo Mainnet',
      blockExplorerUrl: 'https://explorer.celo.org',
      ticker: 'CELO',
      tickerName: 'CELO',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    flare: {
      chainId: '0xE', // hex of 14
      rpcTarget: 'https://flare-api.flare.network/ext/C/rpc',
      // Avoid using public rpcTarget in production.
      // Use services provided by Flare or other node providers
      displayName: 'Flare Mainnet',
      blockExplorerUrl: 'https://flare-explorer.flare.network/',
      ticker: 'FLR',
      tickerName: 'FLR',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    scroll: {
      chainId: '0x82750', // hex of 534352
      rpcTarget: 'https://scroll-rpc.publicnode.com',
      displayName: 'Scroll Mainnet',
      blockExplorerUrl: 'https://scrollscan.com/',
      ticker: 'ETH',
      tickerName: 'ETH',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    bitkub: {
      chainId: '0x60', // hex of 96
      rpcTarget: 'https://rpc.bitkubchain.io',
      displayName: 'BitKub Mainnet',
      blockExplorerUrl: 'https://www.bkcscan.com/',
      ticker: 'KUB',
      tickerName: 'KUB',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    kinto: {
      chainId: '0x1ecf',
      rpcTarget: 'https://kinto-mainnet.calderachain.xyz/http',
      displayName: 'Kinto Mainnet',
      blockExplorerUrl: 'https://kintoscan.io/',
      ticker: 'ETH',
      tickerName: 'ETH',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    gnosis: {
      chainId: '0x64',
      rpcTarget: 'https://rpc.ankr.com/gnosis',
      displayName: 'Gnosis Mainnet',
      blockExplorerUrl: 'https://gnosisscan.io/',
      ticker: 'XDAI',
      tickerName: 'XDAI',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    // hedera: {
    //   chainNamespace: CHAIN_NAMESPACES.EIP155,
    //   chainId: '0x127',
    //   rpcTarget: 'https://mainnet.hashio.io/api',
    //   displayName: 'Hedera Mainnet',
    //   blockExplorerUrl: 'https://hashscan.io/mainnet/dashboard',
    //   ticker: 'HBAR',
    //   tickerName: 'HBAR',
    //   logo: 'https://web3auth.io/images/web3authlog.png',
    // },
    neon: {
      chainId: '0xe9ac0d6',
      rpcTarget: 'https://neon-proxy-mainnet.solana.p2p.org',
      displayName: 'NeonEVM Mainnet',
      blockExplorerUrl: 'https://neonscan.org/',
      ticker: 'NEON',
      tickerName: 'NEON',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    rootstock: {
      chainId: '0x1e',
      rpcTarget: 'https://rootstock-mainnet.public.blastapi.io',
      displayName: 'Rootstock Mainnet',
      blockExplorerUrl: 'https://explorer.rootstock.io/',
      ticker: 'RBTC',
      tickerName: 'RBTC',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    oasis: {
      chainId: '0x5afe',
      rpcTarget: 'https://1rpc.io/oasis/sapphire',
      displayName: 'Oasis Sapphire Mainnet',
      blockExplorerUrl: 'https://explorer.oasis.io/mainnet/sapphire',
      ticker: 'ROSE',
      tickerName: 'ROSE',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    mantle: {
      chainId: '0x1388',
      rpcTarget: 'https://rpc.mantle.xyz',
      displayName: 'Mantle Mainnet',
      blockExplorerUrl: 'https://explorer.mantle.xyz/',
      ticker: 'MNT',
      tickerName: 'MNT',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
    linea: {
      chainId: '0xe708',
      rpcTarget: 'https://linea.drpc.org',
      displayName: 'Linea Mainnet',
      blockExplorerUrl: 'https://lineascan.build/',
      ticker: 'ETH',
      tickerName: 'ETH',
      logo: 'https://web3auth.io/images/web3authlog.png',
    },
  };

  async create(identifierType: string, identifier: string) {
    const pregenIdentifier = await this.getWalletMail(
      identifierType,
      identifier,
    );

    const capsuleClient = new CapsuleServer(
      Environment.BETA,
      process.env.CAPSULE_API_KEY,
    );
    const wallet = await this.walletRepository.findOneBy({ pregenIdentifier });
    // const hasWallet = await capsuleClient.hasPregenWallet(pregenIdentifier);
    if (!wallet) {
      const pregenWallet = await capsuleClient.createWalletPreGen(
        WalletType.EVM,
        pregenIdentifier,
        PregenIdentifierType.EMAIL,
      );
      const userShare = capsuleClient.getUserShare();
      const dbEntry = this.walletRepository.create({
        pregenIdentifier,
        identifierType,
        identifier,
        walletId: pregenWallet.id,
        walletAddress: pregenWallet.address,
        userShare,
      });
      await this.walletRepository.save(dbEntry);
      console.log(`Wallet created for ${identifierType}: ${identifier}`);
      console.log(
        'New pregenerated wallet created:',
        pregenWallet.id,
        pregenWallet.address,
      );
      return pregenWallet.address;
    } else {
      const pregenWallet = (
        await capsuleClient.getPregenWallets(pregenIdentifier)
      )[0];
      console.log(pregenWallet);
      console.log(`Wallet already exists for ${identifierType}: ${identifier}`);
      return wallet.walletAddress;
    }
  }

  async claim(
    identifierType: string,
    identifier: string,
    mail: string,
    session: string,
  ) {
    const capsuleClient = new CapsuleServer(
      Environment.BETA,
      process.env.CAPSULE_API_KEY,
    );
    await capsuleClient.importSession(session);

    const pregenIdentifier = await this.getWalletMail(
      identifierType,
      identifier,
    );
    await this.create(identifierType, identifier);
    const wallet = await this.walletRepository.findOneBy({ pregenIdentifier });

    console.log(wallet);

    await capsuleClient.setUserShare(wallet.userShare);

    const isLogedIn = await capsuleClient.isFullyLoggedIn();
    console.log('Login Status', isLogedIn);

    await capsuleClient.updateWalletIdentifierPreGen(email, wallet.walletId);

    console.log('Wallet identifier changed to email:', email);

    // update db mark as claimed
    await this.walletRepository.update(
      { pregenIdentifier },
      { isClaimed: true },
    );

    const recovery = await capsuleClient.claimPregenWallets(email);

    console.log(recovery);

    console.log(`Wallet claimed for ${identifierType}: ${identifier}`);
    console.log('Wallet claimed:', wallet.walletId, wallet.walletAddress);
    // TODO: Maybe delete entry from the database since the wallet is claimed
    return recovery;
  }

  async setPreference(
    identifierType: string,
    identifier: string,
    chain: string,
    token: string,
  ) {
    // Check if the chain exists in the validPreferences
    const allowedTokens = this.validPreferences[chain];
    if (!allowedTokens) {
      throw new BadRequestException(`Invalid chain: ${chain}`);
    }

    const pregenIdentifier = await this.getWalletMail(
      identifierType,
      identifier,
    );

    // store in the database
    this.walletRepository.update(
      { pregenIdentifier },
      { chainPreference: chain, tokenPreference: token },
    );

    // If validation passes, store or process the preference as needed
    console.log(`Preference set for chain ${chain} with token: ${token}`);
  }

  // get preference
  async getPreference(identifierType: string, identifier: string) {
    const pregenIdentifier = await this.getWalletMail(
      identifierType,
      identifier,
    );

    const wallet = await this.walletRepository.findOneBy({ pregenIdentifier });

    console.log(wallet);

    return {
      chain: wallet?.chainPreference || null,
      token: wallet?.tokenPreference || null,
    };
  }

  async getWalletMail(identifierType: string, identifier: string) {
    const pregenIdentifier = `${getSHA256HashHex(
      `${identifierType}:${identifier.toLowerCase()}`,
    )}@unitipper.com`;
    return pregenIdentifier;
  }

  async getUserInfo(token: string) {
    const userInfoUrl = 'https://dev-o7z6ei3bl6iph6qv.us.auth0.com/userinfo';

    // Use fetch to call the userinfo endpoint
    const response = await fetch(userInfoUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user information: ${response.statusText}`,
      );
    }

    return await response.json(); // Parse the JSON response
  }

  async getWallet(identifierType: string, identifier: string) {
    const pregenIdentifier = await this.getWalletMail(
      identifierType,
      identifier,
    );
    return await this.walletRepository.findOneBy({ pregenIdentifier });
  }
}
