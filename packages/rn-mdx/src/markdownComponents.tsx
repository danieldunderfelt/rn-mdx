import React, { Children, useCallback, useContext, useRef } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import openUrl from './utils/openUrl'
import FitImage from 'react-native-fit-image'
import { MarkdownStyles } from './style/styles'

function wrapChildren(children, textProps) {
  return Children.map(children, child =>
    typeof child === 'string' ? <Text {...textProps}>{child}</Text> : child
  )
}

const ListStyleContext = React.createContext<{ style: string; getIndex?: () => number }>({
  style: 'unordered',
  getIndex: () => 0,
})

const components = (styles: MarkdownStyles = {}) => {
  return {
    div: ({ children }) => {
      return <View style={styles.div}>{children}</View>
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
      return <Text style={styles.text}>{children}</Text>
    },
    inline: ({ children }) => {
      return <Text style={[styles.text, styles.inline]}>{children}</Text>
    },
    text: ({ children }) => {
      return <Text style={styles.text}>{children}</Text>
    },
    span: ({ children }) => {
      return <Text style={styles.text}>{children}</Text>
    },
    strong: ({ children }) => {
      return <Text style={[styles.text, styles.strong]}>{children}</Text>
    },
    a: ({ href, children }) => {
      return (
        <TouchableOpacity style={[styles.link]} onPress={() => openUrl(href)}>
          <Text style={[styles.text, styles.linkLabel]}>{children}</Text>
        </TouchableOpacity>
      )
    },
    em: ({ children }) => {
      return <Text style={[styles.text, styles.em]}>{children}</Text>
    },
    h1: ({ children, index }) => {
      const isFirst = index === 0

      return (
        <View
          style={[styles.headingContainer, styles.headingBorder, isFirst ? { marginTop: 0 } : {}]}>
          <Text style={[styles.text, styles.heading, styles.heading1]}>{children}</Text>
        </View>
      )
    },
    h2: ({ children, index }) => {
      const isFirst = index === 0

      return (
        <View
          style={[styles.headingContainer, styles.headingBorder, isFirst ? { marginTop: 0 } : {}]}>
          <Text style={[styles.text, styles.heading, styles.heading2]}>{children}</Text>
        </View>
      )
    },
    h3: ({ children, index }) => {
      const isFirst = index === 0

      return (
        <View style={[styles.headingContainer, isFirst ? { marginTop: 0 } : {}]}>
          <Text style={[styles.text, styles.heading, styles.heading3]}>{children}</Text>
        </View>
      )
    },
    h4: ({ children, index }) => {
      const isFirst = index === 0

      return (
        <View style={[styles.headingContainer, isFirst ? { marginTop: 0 } : {}]}>
          <Text style={[styles.text, styles.heading, styles.heading4]}>{children}</Text>
        </View>
      )
    },
    h5: ({ children }) => {
      return (
        <View style={styles.headingContainer}>
          <Text style={[styles.text, styles.heading, styles.heading5]}>{children}</Text>
        </View>
      )
    },
    h6: ({ children }) => {
      return (
        <View style={styles.headingContainer}>
          <Text style={[styles.text, styles.heading, styles.heading6]}>{children}</Text>
        </View>
      )
    },
    p: ({ children, index }) => {
      const isFirst = index === 0

      return (
        <Text style={[styles.paragraph, isFirst ? { marginTop: 0 } : {}]}>
          {wrapChildren(children, {
            style: [styles.text, styles.paragraphText],
          })}
        </Text>
      )
    },
    blockquote: ({ children, firstOfType }) => {
      const wrappedChildren = wrapChildren(children, {
        style: styles.text,
      })

      return (
        <View style={[styles.blockquote, firstOfType ? { marginTop: 20 } : { marginTop: -40 }]}>
          {wrappedChildren}
        </View>
      )
    },
    inlineCode: ({ children }) => {
      return <Text style={[styles.text, styles.inlineCode]}>{children}</Text>
    },
    code: ({ children }) => {
      return <Text style={[styles.text, styles.codeBlock]}>{children}</Text>
    },
    pre: ({ children }) => {
      return (
        <View style={styles.pre}>
          <Text style={styles.text}>{children}</Text>
        </View>
      )
    },
    ul: ({ children }) => {
      return (
        <View style={[styles.list, styles.listUnordered]}>
          <ListStyleContext.Provider value={{ style: 'unordered', getIndex: () => 0 }}>
            {children}
          </ListStyleContext.Provider>
        </View>
      )
    },
    ol: ({ children }) => {
      const itemIndex = useRef(0)
      const getItemIndex = useCallback(() => ++itemIndex.current, [])

      return (
        <View style={[styles.list, styles.listOrdered]}>
          <ListStyleContext.Provider value={{ style: 'ordered', getIndex: getItemIndex }}>
            {children}
          </ListStyleContext.Provider>
        </View>
      )
    },
    li: ({ children }) => {
      const { style, getIndex = () => 0 } = useContext(ListStyleContext)

      return (
        <View style={style === 'unordered' ? styles.listUnorderedItem : styles.listOrderedItem}>
          {style === 'unordered' ? (
            <View
              style={[
                styles.listUnorderedItemIcon,
                {
                  backgroundColor:
                    styles?.listUnorderedItemIcon?.backgroundColor || styles?.text?.color,
                },
              ]}
            />
          ) : (
            <View style={styles.listOrderedItemIcon}>
              <Text>{getIndex()}.</Text>
            </View>
          )}
          <Text style={[styles.listItem]}>
            <Text style={[styles.text, styles.listItemText]}>{children}</Text>
          </Text>
        </View>
      )
    },
    table: ({ children }) => {
      return <View style={[styles.table]}>{children}</View>
    },
    thead: ({ children }) => {
      return <View style={[styles.tableHeader]}>{children}</View>
    },
    tbody: ({ children }) => {
      return <View style={styles.tableBody}>{children}</View>
    },
    th: ({ children }) => {
      return (
        <View style={[styles.tableHeaderCell]}>
          <Text style={styles.text}>{children}</Text>
        </View>
      )
    },
    tr: ({ children }) => {
      return <View style={[styles.tableRow]}>{children}</View>
    },
    td: ({ children }) => {
      return (
        <View style={[styles.tableRowCell]}>
          <Text style={styles.text}>{children}</Text>
        </View>
      )
    },
    hr: () => {
      return <View style={[styles.hr]} />
    },
    br: () => <Text>{'\n'}</Text>,
    img: ({ src }) => {
      return <FitImage style={styles.img} source={{ uri: src }} />
    },
  }
}

export default components
