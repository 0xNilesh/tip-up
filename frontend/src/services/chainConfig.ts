import { CHAIN_NAMESPACES, CustomChainConfig } from '@web3auth/base'

export const chain: {
  [key: string]: CustomChainConfig
} = {
  ethereum: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x1',
    displayName: 'Ethereum Mainnet',
    rpcTarget: 'https://rpc.ankr.com/eth',
    blockExplorerUrl: 'https://etherscan.io',
    ticker: 'ETH',
    tickerName: 'Ethereum',
    logo: 'https://web3auth.io/images/web3authlog.png',
  },
  polygon: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x89', // hex of 137, polygon mainnet
    rpcTarget: 'https://rpc.ankr.com/polygon',
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    displayName: 'Polygon Mainnet',
    blockExplorerUrl: 'https://polygonscan.com',
    ticker: 'POL',
    tickerName: 'Polygon',
    logo: 'https://web3auth.io/images/web3authlog.png',
  },
  base: {
    // https://docs.base.org/using-base/
    chainNamespace: CHAIN_NAMESPACES.EIP155,
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
    chainNamespace: CHAIN_NAMESPACES.EIP155,
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
    chainNamespace: CHAIN_NAMESPACES.EIP155,
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
    chainNamespace: CHAIN_NAMESPACES.EIP155,
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
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x82750', // hex of 534352
    rpcTarget: 'https://scroll-rpc.publicnode.com',
    displayName: 'Scroll Mainnet',
    blockExplorerUrl: 'https://scrollscan.com/',
    ticker: 'ETH',
    tickerName: 'ETH',
    logo: 'https://web3auth.io/images/web3authlog.png',
  },
  bitkub: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x60', // hex of 96
    rpcTarget: 'https://rpc.bitkubchain.io',
    displayName: 'BitKub Mainnet',
    blockExplorerUrl: 'https://www.bkcscan.com/',
    ticker: 'KUB',
    tickerName: 'KUB',
    logo: 'https://web3auth.io/images/web3authlog.png',
  },
  kinto: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x1ecf',
    rpcTarget: 'https://kinto-mainnet.calderachain.xyz/http',
    displayName: 'Kinto Mainnet',
    blockExplorerUrl: 'https://kintoscan.io/',
    ticker: 'ETH',
    tickerName: 'ETH',
    logo: 'https://web3auth.io/images/web3authlog.png',
  },
  gnosis: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
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
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0xe9ac0d6',
    rpcTarget: 'https://neon-proxy-mainnet.solana.p2p.org',
    displayName: 'NeonEVM Mainnet',
    blockExplorerUrl: 'https://neonscan.org/',
    ticker: 'NEON',
    tickerName: 'NEON',
    logo: 'https://web3auth.io/images/web3authlog.png',
  },
  rootstock: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x1e',
    rpcTarget: 'https://rootstock-mainnet.public.blastapi.io',
    displayName: 'Rootstock Mainnet',
    blockExplorerUrl: 'https://explorer.rootstock.io/',
    ticker: 'RBTC',
    tickerName: 'RBTC',
    logo: 'https://web3auth.io/images/web3authlog.png',
  },
  oasis: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x5afe',
    rpcTarget: 'https://1rpc.io/oasis/sapphire',
    displayName: 'Oasis Sapphire Mainnet',
    blockExplorerUrl: 'https://explorer.oasis.io/mainnet/sapphire',
    ticker: 'ROSE',
    tickerName: 'ROSE',
    logo: 'https://web3auth.io/images/web3authlog.png',
  },
  mantle: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x1388',
    rpcTarget: 'https://rpc.mantle.xyz',
    displayName: 'Mantle Mainnet',
    blockExplorerUrl: 'https://explorer.mantle.xyz/',
    ticker: 'MNT',
    tickerName: 'MNT',
    logo: 'https://web3auth.io/images/web3authlog.png',
  },
  linea: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0xe708',
    rpcTarget: 'https://linea.drpc.org',
    displayName: 'Linea Mainnet',
    blockExplorerUrl: 'https://lineascan.build/',
    ticker: 'ETH',
    tickerName: 'ETH',
    logo: 'https://web3auth.io/images/web3authlog.png',
  }
}
