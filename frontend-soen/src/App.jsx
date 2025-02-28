import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from "./AppRoutes/AppRoutes"
import dotenv from "dotenv"

dotenv.config()

function App() {
  
  if (process.env.NODE_ENV === "production") {
    console.log = (message) => window.__DEBUG__ && console.info(message);
}
window.__DEBUG__ = true;

  return (
    <AppRoutes />
  )
}

export default App
