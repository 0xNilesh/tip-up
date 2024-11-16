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

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
    </ThemeProvider>
  )
}

export default App
