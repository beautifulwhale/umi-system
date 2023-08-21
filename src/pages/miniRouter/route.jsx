import { RouterContext } from "./router";
import React, { createElement, useContext } from "react";
import { matchPath } from "react-router";

export default function Route(props) {
  const context = useContext(RouterContext)
  const location = props.location || context.location
  const match = props.computedMatch ? props.computedMatch : props.path ? matchPath(props, location.pathname) : context.match

  const newProps = { ...context, location, match }

  const { children, component, render } = props
  let renderContent = null
  if (newProps.match) {
    if (children) {
      renderContent = typeof children === 'function' ? children(newProps) : children
    } else if (component) {
      renderContent = createElement(component, newProps)
    } else if (render) {
      renderContent = render(newProps)
    }
  }

  return <RouterContext.Provider value={{ newProps }}>
    {renderContent}
  </RouterContext.Provider>
}
