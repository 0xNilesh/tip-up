import { AuthAdapter, MFA_LEVELS } from '@web3auth/auth-adapter'
import { UX_MODE, WEB3AUTH_NETWORK } from '@web3auth/base'
import { getDefaultExternalAdapters } from '@web3auth/default-evm-adapter'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { Web3AuthOptions } from '@web3auth/modal'
import {
  BUTTON_POSITION,
  CONFIRMATION_STRATEGY,
  WalletServicesPlugin,
} from '@web3auth/wallet-services-plugin'

import { chain } from './chainConfig'

const clientId =
  'BOmxmrHpsfyJ2zqth9kjmcGdSYQivjy95CFh4QPprp0JN1h9vDoWSJ1tYHKOEgcergHORGJCORU-iWBZLpiYZiE'

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: chain.arbitrum,
  },
})

const web3AuthOptions: Web3AuthOptions = {
  chainConfig: chain.arbitrum,
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
}

const authAdapter = new AuthAdapter({
  loginSettings: {
    mfaLevel: MFA_LEVELS.OPTIONAL,
  },
  adapterSettings: {
    uxMode: UX_MODE.POPUP, // "redirect" | "popup"
  },
})

const walletServicesPlugin = new WalletServicesPlugin({
  wsEmbedOpts: {},
  walletInitOptions: {
    whiteLabel: {
      showWidgetButton: true,
      buttonPosition: BUTTON_POSITION.BOTTOM_RIGHT,
      logoLight: 'https://web3auth.io/images/web3auth-logo.svg',
      logoDark: 'https://web3auth.io/images/web3auth-logo---Dark.svg',
    },
    confirmationStrategy: CONFIRMATION_STRATEGY.MODAL,
  },
})

const adapters = getDefaultExternalAdapters({ options: web3AuthOptions })

const web3AuthContextConfig = {
  web3AuthOptions,
  adapters: [authAdapter, ...adapters],
  plugins: [walletServicesPlugin],
}

export default web3AuthContextConfig
