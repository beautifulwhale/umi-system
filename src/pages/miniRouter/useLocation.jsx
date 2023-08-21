import { useContext } from "react"
import { RouterContext } from "./router"


export default function useLocation() {
  const context = useContext(RouterContext)
  return context.location
}