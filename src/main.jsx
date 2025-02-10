import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CO2 from './CO2.jsx'
import Burgers from './Burgers.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CO2 />
  </StrictMode>,
)
