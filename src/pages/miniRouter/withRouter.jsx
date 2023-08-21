import { useContext } from "react"
import { RouterContext } from "./router"
import hoistNonReactStatics from 'hoist-non-react-statics'

export default function useWithRouter(Component) {
  const wrapComponent = (props) => {
    const context = useContext(RouterContext)
    const { wrapComponentRef, ...remainProps } = props
    return <Component ref={wrapComponentRef} {...remainProps}  {...context} />
  }

  return hoistNonReactStatics(wrapComponent, Component)
}