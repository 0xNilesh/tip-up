import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import Home from './pages/Home'
import Tip from './pages/Tip'
import web3AuthContextConfig from './services/web3AuthContext'
import { Web3AuthProvider } from '@web3auth/modal-react-hooks'
import Login from './pages/Login'
import TipMangementDashboard from './pages/TipManagementDshboard'
import TipExplorer from './pages/TipExplorer'
import { PrivyProvider } from '@privy-io/react-auth'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PrivyProvider
        appId="cm3k4hfl602jjwd7shiocem7i"
        config={{
          // Display email and wallet as login methods
          loginMethods: ['email', 'wallet', 'github', 'google'],
          // Customize Privy's appearance in your app
          appearance: {
            theme: 'light',
            accentColor: '#676FFF',
            logo: 'https://docs.privy.io/privy-logo-light.png',
          },
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            createOnLogin: 'users-without-wallets',
          },
        }}
      >
        <Web3AuthProvider config={web3AuthContextConfig}>
          <Router>
            {/* Theme toggle will be visible on all routes */}
            <div className="fixed top-4 right-4">
              <ModeToggle />
            </div>
            <Routes>
              {/* Home page route */}
              <Route path="/" element={<Home />} />
              {/* Login page route */}
              <Route path="/login" element={<Login />} />
              {/* Dynamic app and username route */}
              <Route path="/tip/:app/:username" element={<Tip />} />
              {/* Tip Management Dashboard */}
              <Route path="/dashboard" element={<TipMangementDashboard />} />
              {/* Tip Explorer */}
              <Route path="/explorer" element={<TipExplorer />} />
              {/* 404 route - Redirect to Home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </Web3AuthProvider>
      </PrivyProvider>
    </ThemeProvider>
  )
}

export default App
