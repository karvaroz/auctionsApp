import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App.jsx"
import "./index.css"

import { ContextProvider } from "./context/AuthContext.jsx"
import { AuctionProvider } from "./context/AuctionContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <AuctionProvider>
        <App />
      </AuctionProvider>
    </ContextProvider>
  </React.StrictMode>
)
