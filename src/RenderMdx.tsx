import React, { useMemo } from 'react'
import components from './markdownComponents'
import { ThemeContext } from './ThemeContext'
import { CalcRoot } from './utils/calc'
import MDX from '@mdx-js/runtime'
import { styles } from './style/styles'

const defaultScope = {}

export function RenderMdx({ children, style = {}, scope = {}, componentStyle = {} }) {
  const defaultComponents = useMemo(() => components(styles(componentStyle)), [componentStyle])
  const contentScope = {...defaultScope, ...scope}

  if (!children) {
    return null
  }

  return (
    <CalcRoot style={style}>
      <ThemeContext.Provider value={componentStyle}>
        <MDX components={defaultComponents} scope={contentScope}>
          {children}
        </MDX>
      </ThemeContext.Provider>
    </CalcRoot>
  )
}
