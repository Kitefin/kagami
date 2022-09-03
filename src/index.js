import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { MoralisProvider } from "react-moralis"
import { BrowserRouter as Router } from "react-router-dom"

import App from "./App"

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

const APP_ID = process.env.REACT_APP_APP_ID
const SERVER_URL = process.env.REACT_APP_SERVER_URL

root.render(
  <StrictMode>
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <Router>
        <App />
      </Router>
    </MoralisProvider>
  </StrictMode>
)
