import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import Admin from "./Admin.tsx"

const isAdmin = window.location.hash.startsWith("#studio-8841")

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isAdmin ? <Admin /> : <App />}
  </StrictMode>,
)
