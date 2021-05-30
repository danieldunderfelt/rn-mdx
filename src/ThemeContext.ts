import React, { useContext } from 'react'

export const ThemeContext = React.createContext({})

export const useStyleContext = (style) => {
  const styleContext = useContext(ThemeContext)
  return { ...style, ...styleContext }
}
