import React, { createContext, useEffect, useMemo, useState } from "react"
import { createBrowserHistory as createHistory } from "history"

export let rootHistory = null
export const RouterContext = createContext()

// context 提供 history location 
export default function Router(props) {
  const history = useMemo(() => {
    rootHistory = createHistory()
    return rootHistory
  }, [])

  const [location, setLocation] = useState(history.location)


  // 监视地址变化
  useEffect(() => {
    const unlisten = history.listen((location) => {
      console.log('location', location);
      setLocation(location)
    })
    return () => {
      unlisten && unlisten()
    }
  }, [])

  return <RouterContext.Provider value={
    {
      location,
      history,
      match: { path: '/', url: '/', isExact: location.pathname === '/', params: {} }
    }
  }>
    {props.children}
  </RouterContext.Provider>
}




