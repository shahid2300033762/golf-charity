import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('[Main] Initializing app...');
const rootElement = document.getElementById('root');
console.log('[Main] Root element found:', !!rootElement);

if (!rootElement) {
  console.error('[Main] Root element not found!');
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  console.log('[Main] Render called');
}
