import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // [!code ++]
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient() // [!code ++]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/* [!code ++] */}
      <App />
    </QueryClientProvider> {/* [!code ++] */}
  </StrictMode>,
)