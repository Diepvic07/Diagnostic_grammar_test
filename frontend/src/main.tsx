console.log('main.tsx executing...');
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import { LanguageProvider } from './context/LanguageContext'
// import { LandingPage } from './pages/LandingPage'
import App from './App.tsx'

console.log('Mounting React app...');
try {
  const root = document.getElementById('root');
  if (!root) throw new Error('Root element not found');
  console.log('Root element found:', root);

  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  console.log('React app mounted successfully');
} catch (e) {
  console.error('Failed to mount React app:', e);
}
