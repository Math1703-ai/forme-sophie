import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/fraunces' // titres élégants
import '@fontsource-variable/manrope' // corps de texte
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
