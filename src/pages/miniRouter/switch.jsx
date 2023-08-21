import React, { useContext } from "react"
import { RouterContext } from "./router"
import { matchPath } from "react-router";

export default function Switch(props) {
  const context = useContext(RouterContext)
  const location = props.location || context.location

  let match = null
  let children = null

  React.Children.forEach(props.children, (child) => {
    if (!match && React.isValidElement(child)) {
      const path = child.props.path
      children = child
      // 匹配当前路由
      match = path ? matchPath({ ...child.props }, location.pathname) : context.match
    }
  })

  if (match) {
    return React.cloneElement(children, { ...context, location, computedMatch: match })
  }
}