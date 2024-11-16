import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import Home from './pages/Home'
import AppDetails from './pages/AppDetails'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        {/* Theme toggle will be visible on all routes */}
        <div className="fixed top-4 right-4">
          <ModeToggle />
        </div>
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />

          {/* Dynamic app and username route */}
          <Route path="/app/:app/username/:username" element={<AppDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
