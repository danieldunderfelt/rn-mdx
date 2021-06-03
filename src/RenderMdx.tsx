import React, { useMemo } from 'react'
import components from './markdownComponents'
import MDX from '@mdx-js/runtime'
import { styles } from './style/styles'

const defaultScope = {}

export function RenderMdx({ children, scope = {}, componentStyle = {} }) {
  const defaultComponents = useMemo(() => components(styles(componentStyle)), [componentStyle])
  const contentScope = { ...defaultScope, ...scope }

  if (!children) {
    return null
  }

  return (
    <MDX components={defaultComponents} scope={contentScope}>
      {children}
    </MDX>
  )
}
