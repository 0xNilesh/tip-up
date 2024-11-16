import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-o7z6ei3bl6iph6qv.us.auth0.com"
      clientId="NmciuF37ELqq3VkxBBoZ0wjSLXMbSntq"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/#/dashboard`,
        audience: 'https://dev-o7z6ei3bl6iph6qv.us.auth0.com/api/v2/',
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
)
