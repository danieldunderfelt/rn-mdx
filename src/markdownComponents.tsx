import React, { Children } from 'react'

function wrapChildren(children, textProps) {
  return Children.map(children, child =>
    typeof child === 'string' ? <Typography {...textProps}>{child}</Typography> : child
  )
}

const ListStyleContext = React.createContext<{ style: string; getIndex?: () => number }>({
  style: 'unordered',
  getIndex: () => 0,
})

const components = styles => {
  const defaultColor = styles.text.color || colors.blueDark
  let defaultTextSize = TextSize.BODY

  return {
    div: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <ViewText style={contextStyle.div}>{children}</ViewText>
    },
    wrapper: ({ children }) => {
      let prevChildTypes = ['root']
      const childrenCount = Children.count(children)

      return Children.map(children, (child, index) => {
        if (typeof child === 'string') {
          return child
        }

        const prevSibling = last(prevChildTypes)
        const mdxType = child.props.mdxType || 'element'
        const firstOfType = prevChildTypes[prevChildTypes.length - 1] !== mdxType

        prevChildTypes.push(mdxType)

        return React.cloneElement(
          child,
          {
            ...child.props,
            index,
            firstChild: index === 0,
            lastChild: index === childrenCount - 1,
            firstOfType,
            prevSibling: prevSibling,
          },
          child.props.children
        )
      })
    },
    textgroup: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <Typography
          size={get(contextStyle, 'text.fontSize', defaultTextSize)}
          color={contextStyle.text.color || defaultColor}
          style={contextStyle.text}>
          {children}
        </Typography>
      )
    },
    inline: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return (
        <Typography
          serif={true}
          size={get(contextStyle, 'text.fontSize', defaultTextSize)}
          color={contextStyle.text.color || defaultColor}
          style={contextStyle.text}>
          {children}
        </Typography>
      )
    },
    text: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return (
        <Typography
          serif={true}
          style={contextStyle.text}
          size={get(contextStyle, 'text.fontSize', defaultTextSize)}
          color={contextStyle.text.color || defaultColor}>
          {children}
        </Typography>
      )
    },
    span: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return (
        <Typography
          serif={true}
          style={contextStyle.text}
          color={contextStyle.text.color || defaultColor}
          size={get(contextStyle, 'text.fontSize', defaultTextSize)}>
          {children}
        </Typography>
      )
    },
    strong: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return (
        <Typography
          serif={true}
          weight={TextWeight.BOLD}
          color={contextStyle.text.color || defaultColor}
          size={get(contextStyle, 'text.fontSize', defaultTextSize)}
          style={[contextStyle.text, contextStyle.strong]}>
          {children}
        </Typography>
      )
    },
    a: ({ href, children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <TouchableOpacity
          style={[contextStyle.link, { color: contextStyle.text.color || defaultColor }]}
          onPress={() => openUrl(href)}>
          <Typography
            style={contextStyle.text}
            color={contextStyle.text.color || defaultColor}
            size={get(contextStyle, 'text.fontSize', defaultTextSize)}>
            {children}
          </Typography>
        </TouchableOpacity>
      )
    },
    em: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <Typography
          serif={true}
          italic={true}
          color={contextStyle.text.color || defaultColor}
          size={get(contextStyle, 'text.fontSize', defaultTextSize)}
          style={[contextStyle.text, contextStyle.em]}>
          {children}
        </Typography>
      )
    },
    h1: ({ children, index }) => {
      const contextStyle = useStyleContext(styles)
      const isFirst = index === 0

      return (
        <ViewText
          style={[
            contextStyle.headingContainer,
            contextStyle.headingBorder,
            isFirst ? { marginTop: 0 } : {},
          ]}>
          <Typography
            style={[contextStyle.text, contextStyle.heading, contextStyle.heading1]}
            weight={TextWeight.BLACK}
            color={contextStyle.text.color || defaultColor}
            size={TextSize.HEADING}>
            {children}
          </Typography>
        </ViewText>
      )
    },
    h2: ({ children, index }) => {
      const contextStyle = useStyleContext(styles)
      const isFirst = index === 0

      return (
        <ViewText
          style={[
            contextStyle.headingContainer,
            contextStyle.headingBorder,
            isFirst ? { marginTop: 0 } : {},
          ]}>
          <Typography
            style={[contextStyle.text, contextStyle.heading, contextStyle.heading2]}
            weight={TextWeight.BOLD}
            color={contextStyle.text.color || defaultColor}
            size={TextSize.LARGE}>
            {children}
          </Typography>
        </ViewText>
      )
    },
    h3: ({ children, index }) => {
      const contextStyle = useStyleContext(styles)
      const isFirst = index === 0

      return (
        <ViewText
          style={[contextStyle.headingContainer, isFirst ? { marginTop: 0 } : {}]}>
          <Typography
            style={[contextStyle.text, contextStyle.heading, contextStyle.heading3]}
            weight={TextWeight.REGULAR}
            color={contextStyle.text.color || defaultColor}
            size={TextSize.LARGE}>
            {children}
          </Typography>
        </ViewText>
      )
    },
    h4: ({ children, index }) => {
      const contextStyle = useStyleContext(styles)
      const isFirst = index === 0

      return (
        <ViewText
          style={[contextStyle.headingContainer, isFirst ? { marginTop: 0 } : {}]}>
          <Typography
            style={[contextStyle.text, contextStyle.heading, contextStyle.heading4]}
            weight={TextWeight.BOLD}
            color={contextStyle.text.color || defaultColor}
            size={TextSize.MEDIUM}>
            {children}
          </Typography>
        </ViewText>
      )
    },
    h5: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <ViewText style={contextStyle.headingContainer}>
          <Typography
            style={[contextStyle.text, contextStyle.heading, contextStyle.heading5]}
            weight={TextWeight.REGULAR}
            color={contextStyle.text.color || defaultColor}
            size={TextSize.MEDIUM}>
            {children}
          </Typography>
        </ViewText>
      )
    },
    h6: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <ViewText style={contextStyle.headingContainer}>
          <Typography
            serif={true}
            style={[contextStyle.text, contextStyle.heading, contextStyle.heading6]}
            weight={TextWeight.BOLD}
            color={contextStyle.text.color || defaultColor}
            size={TextSize.BODY}>
            {children}
          </Typography>
        </ViewText>
      )
    },
    p: ({ children, index }) => {
      const contextStyle = useStyleContext(styles)
      const isFirst = index === 0

      return (
        <Text style={[contextStyle.paragraph, isFirst ? { marginTop: 0 } : {}]}>
          {wrapChildren(children, {
            style: [contextStyle.text, contextStyle.paragraphText],
            serif: false,
            color: contextStyle.text.color || defaultColor,
            size: defaultTextSize,
            weight: TextWeight.REGULAR,
          })}
        </Text>
      )
    },
    blockquote: ({ children, firstOfType }) => {
      const contextStyle = useStyleContext(styles)

      const wrappedChildren = wrapChildren(children, {
        serif: true,
        style: contextStyle.text,
        color: contextStyle.text.color || defaultColor,
        size: get(
          contextStyle,
          'paragraph.fontSize',
          get(contextStyle, 'text.fontSize', defaultTextSize)
        ),
        weight: TextWeight.REGULAR,
      })

      return (
        <ViewText
          style={[
            contextStyle.blockquote,
            firstOfType ? { marginTop: 20 } : { marginTop: -40 },
          ]}>
          {wrappedChildren}
        </ViewText>
      )
    },
    inlineCode: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      // TODO: Use another font here
      return (
        <Typography
          serif={true}
          color={contextStyle.text.color || defaultColor}
          size={get(
            contextStyle,
            'paragraph.fontSize',
            get(contextStyle, 'text.fontSize', defaultTextSize)
          )}
          style={[contextStyle.text, contextStyle.codeInline]}>
          {children}
        </Typography>
      )
    },
    code: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      // TODO: Use another font here
      return (
        <Typography
          serif={true}
          color={contextStyle.text.color || defaultColor}
          size={get(
            contextStyle,
            'paragraph.fontSize',
            get(contextStyle, 'text.fontSize', defaultTextSize)
          )}
          style={[contextStyle.text, contextStyle.codeBlock]}>
          {children}
        </Typography>
      )
    },
    pre: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        // TODO: Use another font here
        <ViewText style={contextStyle.pre}>
          <Typography
            serif={true}
            style={contextStyle.text}
            color={contextStyle.text.color || defaultColor}
            size={get(
              contextStyle,
              'paragraph.fontSize',
              get(contextStyle, 'text.fontSize', defaultTextSize)
            )}
            weight={TextWeight.REGULAR}>
            {children}
          </Typography>
        </ViewText>
      )
    },
    ul: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <ViewText style={[contextStyle.list, contextStyle.listUnordered]}>
          <ListStyleContext.Provider value={{ style: 'unordered', getIndex: () => 0 }}>
            {children}
          </ListStyleContext.Provider>
        </ViewText>
      )
    },
    ol: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      const itemIndex = useRef(0)
      const getItemIndex = useCallback(() => ++itemIndex.current, [])

      return (
        <ViewText style={[contextStyle.list, contextStyle.listOrdered]}>
          <ListStyleContext.Provider value={{ style: 'ordered', getIndex: getItemIndex }}>
            {children}
          </ListStyleContext.Provider>
        </ViewText>
      )
    },
    li: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      const { style, getIndex = () => 0 } = useContext(ListStyleContext)

      return (
        <ViewText
          style={
            style === 'unordered'
              ? contextStyle.listUnorderedItem
              : contextStyle.listOrderedItem
          }>
          {style === 'unordered' ? (
            <ViewText
              style={[
                contextStyle.listUnorderedItemIcon,
                {
                  backgroundColor:
                    contextStyle.listUnorderedItemIcon.backgroundColor ||
                    contextStyle.text.color ||
                    defaultColor,
                },
              ]}
            />
          ) : (
            <ViewText style={contextStyle.listOrderedItemIcon}>
              <Typography serif={true} color={contextStyle.text.color || defaultColor}>
                {getIndex()}.
              </Typography>
            </ViewText>
          )}
          <Text style={[contextStyle.listItem]}>
            <Typography
              serif={true}
              style={[contextStyle.text, contextStyle.listItemText]}
              color={contextStyle.text.color || defaultColor}
              size={get(
                contextStyle,
                'paragraph.fontSize',
                get(contextStyle, 'text.fontSize', defaultTextSize)
              )}
              weight={TextWeight.REGULAR}>
              {children}
            </Typography>
          </Text>
        </ViewText>
      )
    },
    table: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <ViewText style={[contextStyle.table]}>{children}</ViewText>
    },
    thead: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <ViewText style={[contextStyle.tableHeader]}>{children}</ViewText>
    },
    tbody: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <ViewText style={contextStyle.tableBody}>{children}</ViewText>
    },
    th: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <ViewText style={[contextStyle.tableHeaderCell]}>
          <Typography
            style={contextStyle.text}
            color={contextStyle.text.color || defaultColor}
            size={TextSize.BODY}
            weight={TextWeight.REGULAR}>
            {children}
          </Typography>
        </ViewText>
      )
    },
    tr: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <ViewText style={[contextStyle.tableRow]}>{children}</ViewText>
    },
    td: ({ children }) => {
      const contextStyle = useStyleContext(styles)

      return (
        <ViewText style={[contextStyle.tableRowCell]}>
          <Typography
            style={contextStyle.text}
            color={contextStyle.text.color || defaultColor}
            size={TextSize.BODY}
            weight={TextWeight.REGULAR}>
            {children}
          </Typography>
        </ViewText>
      )
    },
    hr: ({ children }) => {
      const contextStyle = useStyleContext(styles)
      return <ViewText style={[contextStyle.hr]} />
    },
    br: ({ children }) => <Text>{'\n'}</Text>,
    img: ({ src, children }) => {
      const contextStyle = useStyleContext(styles)
      return (
        <FitImage indicator={true} style={contextStyle.image} source={{ uri: src }} />
      )
    },
  }
}

export default components
