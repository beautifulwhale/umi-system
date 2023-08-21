import { useContext } from "react"
import { RouterContext } from "./router"


export default function useHistory() {
  const context = useContext(RouterContext)
  return context.history
}