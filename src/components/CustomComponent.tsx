import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import { ReactChildProp } from '../types'

interface ICustomComponent {
  wrapper?: any
  children?: ReactChildProp
  childStyles?: any
}

const CustomComponent = ({
  wrapper = React.Fragment,
  children,
  childStyles = {},
}: ICustomComponent) => {
  const MdxWrapper = wrapper
  const theme = useContext(ThemeContext)

  if (Object.keys(childStyles).length === 0) {
    return <MdxWrapper>{children}</MdxWrapper>
  }

  const nextTheme = { ...theme, ...childStyles }

  return (
    <ThemeContext.Provider value={nextTheme}>
      <MdxWrapper>{children}</MdxWrapper>
    </ThemeContext.Provider>
  )
}

export default CustomComponent
