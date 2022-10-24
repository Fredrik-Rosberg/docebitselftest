import React, { useState, } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import LoginComponent from "./components/signin/SignInComponent"
import "@fontsource/raleway"
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <LoginComponent/>
    </div>
    )
}

export default App
