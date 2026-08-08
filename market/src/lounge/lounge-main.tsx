import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./lounge.css"
import { LoungeApp } from "./LoungeApp"

createRoot(document.getElementById("lounge-root")!).render(
  <StrictMode>
    <LoungeApp />
  </StrictMode>,
)
