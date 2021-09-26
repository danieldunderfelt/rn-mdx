import React, { ComponentType, useMemo } from 'react'
import markdownComponents from './markdownComponents'
import MDX from '@mdx-js/runtime'
import { MarkdownStyles, styles } from './style/styles'

const defaultScope = {}

type RenderMdxProps = {
  children?: string
  scope?: Record<string, unknown>
  components?: Record<string, ComponentType>
  componentStyle?: MarkdownStyles
}

export function RenderMdx({
  children,
  components = {},
  scope = {},
  componentStyle = {},
}: RenderMdxProps) {
  const defaultComponents = useMemo(
    () => markdownComponents(styles(componentStyle)),
    [componentStyle]
  )
  const contentScope = { ...defaultScope, ...scope }

  const mdxComponents = useMemo(
    () => ({ ...defaultComponents, ...components }),
    [components, defaultComponents]
  )

  return (
    <MDX components={mdxComponents} scope={contentScope}>
      {children}
    </MDX>
  )
}
