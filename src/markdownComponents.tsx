import React, { Children, useCallback, useContext, useRef } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import openUrl from './utils/openUrl'
import { useStyleContext } from './ThemeContext'
import FitImage from 'react-native-fit-image'

function wrapChildren(children, textProps) {
  return Children.map(children, child =>
    typeof child === 'string' ? <Text {...textProps}>{child}</Text> : child
  )
}

const ListStyleContext = React.createContext<{ style: string; getIndex?: () => number }>({
  style: 'unordered',
  getIndex: () => 0,
})

const components = styles => {
  return {
    div: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <View style={contextStyle.div}>{children}</View>
    },
    wrapper: ({ children }) => {
      let prevChildTypes = ['root']
      const childrenCount = Children.count(children)

      return Children.map(children, (child, index) => {
        if (typeof child === 'string') {
          return child
        }

        const prevSibling = prevChildTypes[prevChildTypes.length - 1]
        const mdxType = child.props.mdxType || 'element'
        const isFirstOfType = prevChildTypes[prevChildTypes.length - 1] !== mdxType

        prevChildTypes.push(mdxType)

        return React.cloneElement(
          child,
          {
            ...child.props,
            index,
            firstChild: index === 0,
            lastChild: index === childrenCount - 1,
            firstOfType: isFirstOfType,
            prevSibling: prevSibling,
          },
          child.props.children
        )
      })
    },
    textgroup: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <Text style={contextStyle.text}>{children}</Text>
    },
    inline: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <Text style={[contextStyle.text, contextStyle.inline]}>{children}</Text>
    },
    text: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <Text style={contextStyle.text}>{children}</Text>
    },
    span: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <Text style={contextStyle.text}>{children}</Text>
    },
    strong: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <Text style={[contextStyle.text, contextStyle.strong]}>{children}</Text>
    },
    a: ({ href, children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <TouchableOpacity
          style={[contextStyle.link, { color: contextStyle.text.color }]}
          onPress={() => openUrl(href)}>
          <Text style={[contextStyle.text, contextStyle.linkLabel]}>{children}</Text>
        </TouchableOpacity>
      )
    },
    em: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return <Text style={[contextStyle.text, contextStyle.em]}>{children}</Text>
    },
    h1: ({ children, index }) => {
      const contextStyle = useStyleContext(styles)
      const isFirst = index === 0

      return (
        <View
          style={[
            contextStyle.headingContainer,
            contextStyle.headingBorder,
            isFirst ? { marginTop: 0 } : {},
          ]}>
          <Text style={[contextStyle.text, contextStyle.heading, contextStyle.heading1]}>
            {children}
          </Text>
        </View>
      )
    },
    h2: ({ children, index }) => {
      const contextStyle = useStyleContext(styles)
      const isFirst = index === 0

      return (
        <View
          style={[
            contextStyle.headingContainer,
            contextStyle.headingBorder,
            isFirst ? { marginTop: 0 } : {},
          ]}>
          <Text style={[contextStyle.text, contextStyle.heading, contextStyle.heading2]}>
            {children}
          </Text>
        </View>
      )
    },
    h3: ({ children, index }) => {
      const contextStyle = useStyleContext(styles)
      const isFirst = index === 0

      return (
        <View style={[contextStyle.headingContainer, isFirst ? { marginTop: 0 } : {}]}>
          <Text style={[contextStyle.text, contextStyle.heading, contextStyle.heading3]}>
            {children}
          </Text>
        </View>
      )
    },
    h4: ({ children, index }) => {
      const contextStyle = useStyleContext(styles)
      const isFirst = index === 0

      return (
        <View style={[contextStyle.headingContainer, isFirst ? { marginTop: 0 } : {}]}>
          <Text style={[contextStyle.text, contextStyle.heading, contextStyle.heading4]}>
            {children}
          </Text>
        </View>
      )
    },
    h5: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <View style={contextStyle.headingContainer}>
          <Text style={[contextStyle.text, contextStyle.heading, contextStyle.heading5]}>
            {children}
          </Text>
        </View>
      )
    },
    h6: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <View style={contextStyle.headingContainer}>
          <Text style={[contextStyle.text, contextStyle.heading, contextStyle.heading6]}>
            {children}
          </Text>
        </View>
      )
    },
    p: ({ children, index }) => {
      const contextStyle = useStyleContext(styles)
      const isFirst = index === 0

      return (
        <Text style={[contextStyle.paragraph, isFirst ? { marginTop: 0 } : {}]}>
          {wrapChildren(children, {
            style: [contextStyle.text, contextStyle.paragraphText],
          })}
        </Text>
      )
    },
    blockquote: ({ children, firstOfType }) => {
      const contextStyle = useStyleContext(styles)

      const wrappedChildren = wrapChildren(children, {
        style: contextStyle.text,
      })

      return (
        <View
          style={[contextStyle.blockquote, firstOfType ? { marginTop: 20 } : { marginTop: -40 }]}>
          {wrappedChildren}
        </View>
      )
    },
    inlineCode: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      // TODO: Use another font here
      return <Text style={[contextStyle.text, contextStyle.codeInline]}>{children}</Text>
    },
    code: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      // TODO: Use another font here
      return <Text style={[contextStyle.text, contextStyle.codeBlock]}>{children}</Text>
    },
    pre: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <View style={contextStyle.pre}>
          <Text style={contextStyle.text}>{children}</Text>
        </View>
      )
    },
    ul: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <View style={[contextStyle.list, contextStyle.listUnordered]}>
          <ListStyleContext.Provider value={{ style: 'unordered', getIndex: () => 0 }}>
            {children}
          </ListStyleContext.Provider>
        </View>
      )
    },
    ol: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      const itemIndex = useRef(0)
      const getItemIndex = useCallback(() => ++itemIndex.current, [])

      return (
        <View style={[contextStyle.list, contextStyle.listOrdered]}>
          <ListStyleContext.Provider value={{ style: 'ordered', getIndex: getItemIndex }}>
            {children}
          </ListStyleContext.Provider>
        </View>
      )
    },
    li: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      const { style, getIndex = () => 0 } = useContext(ListStyleContext)

      return (
        <View
          style={
            style === 'unordered' ? contextStyle.listUnorderedItem : contextStyle.listOrderedItem
          }>
          {style === 'unordered' ? (
            <View
              style={[
                contextStyle.listUnorderedItemIcon,
                {
                  backgroundColor:
                    contextStyle.listUnorderedItemIcon.backgroundColor || contextStyle.text.color,
                },
              ]}
            />
          ) : (
            <View style={contextStyle.listOrderedItemIcon}>
              <Text>{getIndex()}.</Text>
            </View>
          )}
          <Text style={[contextStyle.listItem]}>
            <Text style={[contextStyle.text, contextStyle.listItemText]}>{children}</Text>
          </Text>
        </View>
      )
    },
    table: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <View style={[contextStyle.table]}>{children}</View>
    },
    thead: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <View style={[contextStyle.tableHeader]}>{children}</View>
    },
    tbody: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <View style={contextStyle.tableBody}>{children}</View>
    },
    th: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <View style={[contextStyle.tableHeaderCell]}>
          <Text style={contextStyle.text}>{children}</Text>
        </View>
      )
    },
    tr: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <View style={[contextStyle.tableRow]}>{children}</View>
    },
    td: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <View style={[contextStyle.tableRowCell]}>
          <Text style={contextStyle.text}>{children}</Text>
        </View>
      )
    },
    hr: () => {
      const contextStyle = useStyleContext(styles)
      return <View style={[contextStyle.hr]} />
    },
    br: () => <Text>{'\n'}</Text>,
    img: ({ src }) => {
      const contextStyle = useStyleContext(styles)
      return <FitImage indicator={true} style={contextStyle.image} source={{ uri: src }} />
    },
  }
}

export default components
