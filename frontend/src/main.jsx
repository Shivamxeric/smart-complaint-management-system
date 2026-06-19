import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="805589625883-8u3l4b4voh2jsqqqctginjjohgq2pkmf.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
)