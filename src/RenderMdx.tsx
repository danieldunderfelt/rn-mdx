import React, {useMemo, useCallback} from 'react'
import components from './markdownComponents'

export function RenderMdx({ children, style = {}, scope = {}, componentStyle = {} }) {
  const defaultComponents = useMemo(() => components(styles()), [IS_TABLET])

  const Custom = useCallback(
    props => <CustomComponent wrapper={defaultComponents.wrapper} {...props} />,
    [defaultComponents]
  )

  const contentScope = merge({}, defaultScope, scope)

  if (!children) {
    return null
  }

  return (
    <ContentView style={style}>
      <ThemeContext.Provider value={componentStyle}>
        <MDX components={mdxComponents} scope={contentScope}>
          {children}
        </MDX>
      </ThemeContext.Provider>
    </ContentView>
  )
}
