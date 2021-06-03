import { ImageStyle, Platform, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'

function platformValue(val: number) {
  if (Platform.OS === 'ios') {
    return val * 1.15
  }

  return val
}

export function getLineHeightValue(val: number) {
  if (Platform.OS === 'ios') {
    return val * 1.05
  }

  return val
}

let BaseTextSize = {
  DETAIL: platformValue(10),
  SMALL: platformValue(13),
  BODY_SMALL: platformValue(16),
  BODY: platformValue(20),
  BODY_LARGE: platformValue(22),
  MEDIUM: platformValue(24),
  LARGE: platformValue(28),
  HEADING: platformValue(40),
}

export let TextSize = {
  DETAIL: BaseTextSize.DETAIL,
  SMALL: BaseTextSize.SMALL,
  BODY_SMALL: BaseTextSize.BODY_SMALL,
  BODY: BaseTextSize.BODY,
  BODY_LARGE: BaseTextSize.BODY_LARGE,
  MEDIUM: BaseTextSize.MEDIUM,
  LARGE: BaseTextSize.LARGE,
  HEADING: BaseTextSize.HEADING,
}

export function createBaseSize() {
  BaseTextSize = {
    DETAIL: platformValue(10),
    SMALL: platformValue(13),
    BODY_SMALL: platformValue(16),
    BODY: platformValue(18),
    BODY_LARGE: platformValue(20),
    MEDIUM: platformValue(22),
    LARGE: platformValue(28),
    HEADING: platformValue(40),
  }

  TextSize = {
    DETAIL: BaseTextSize.DETAIL,
    SMALL: BaseTextSize.SMALL,
    BODY_SMALL: BaseTextSize.BODY_SMALL,
    BODY: BaseTextSize.BODY,
    BODY_LARGE: BaseTextSize.BODY_LARGE,
    MEDIUM: BaseTextSize.MEDIUM,
    LARGE: BaseTextSize.LARGE,
    HEADING: BaseTextSize.HEADING,
  }

  return { BaseTextSize, TextSize }
}

export type MarkdownStyles = {
  headingBorder?: ViewStyle
  linkLabel?: TextStyle
  paragraph?: TextStyle
  strong?: TextStyle
  link?: TextStyle
  listOrdered?: ViewStyle
  del?: TextStyle
  hr?: ViewStyle
  tableRow?: ViewStyle
  tableHeaderCell?: ViewStyle
  div?: ViewStyle
  hardbreak?: ViewStyle
  view?: ViewStyle
  listUnorderedItemText?: TextStyle
  listOrderedItemIcon?: ViewStyle
  codeBlock?: TextStyle
  root?: ViewStyle
  listItemText?: TextStyle
  listUnordered?: ViewStyle
  text?: TextStyle
  inline?: TextStyle
  strikethrough?: TextStyle
  table?: ViewStyle
  listUnorderedItemIcon?: ViewStyle
  listItem?: ViewStyle
  tableBody?: ViewStyle
  tableRowCell?: ViewStyle
  img?: StyleProp<ImageStyle>
  blockquote?: ViewStyle
  listOrderedItem?: ViewStyle
  paragraphText?: TextStyle
  pre?: TextStyle
  heading?: TextStyle
  heading1?: TextStyle
  em?: TextStyle
  list?: ViewStyle
  tableHeader?: ViewStyle
  headingContainer?: ViewStyle
  heading2?: TextStyle
  heading3?: TextStyle
  heading4?: TextStyle
  heading5?: TextStyle
  heading6?: TextStyle
  inlineCode?: TextStyle
  listUnorderedItem?: TextStyle
}

export const styles = (userStyles: MarkdownStyles = {}): MarkdownStyles => {
  let { TextSize } = createBaseSize()

  let defaultStyles: MarkdownStyles = StyleSheet.create({
    root: {
      flex: 1,
      height: '100%',
    },
    view: {
      flex: 1,
    },
    text: {},
    inline: {},
    codeBlock: {
      borderWidth: 1,
      borderColor: '#CCCCCC',
      backgroundColor: '#f5f5f5',
      padding: 10,
      borderRadius: 4,
    },
    del: {
      backgroundColor: '#000000',
    },
    em: {
      lineHeight: TextSize.BODY * getLineHeightValue(1.6),
    },
    headingContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 10,
      marginTop: 20,
      marginHorizontal: -20,
    },
    headingBorder: {
      paddingBottom: 5,
    },
    heading: {},
    heading1: {
      fontSize: TextSize.HEADING,
      lineHeight: TextSize.HEADING * getLineHeightValue(1.25),
    },
    heading2: {
      fontSize: TextSize.LARGE,
      lineHeight: TextSize.LARGE * getLineHeightValue(1.25),
    },
    heading3: {
      fontSize: TextSize.MEDIUM,
      lineHeight: TextSize.MEDIUM * getLineHeightValue(1.25),
    },
    heading4: {
      fontSize: TextSize.BODY,
      lineHeight: TextSize.BODY * getLineHeightValue(1.4),
    },
    heading5: {
      fontSize: TextSize.BODY_SMALL,
      lineHeight: TextSize.BODY_SMALL * getLineHeightValue(1.4),
    },
    heading6: {
      fontSize: TextSize.SMALL,
      lineHeight: TextSize.SMALL * getLineHeightValue(1.4),
    },
    hr: {
      backgroundColor: '#000000',
      height: 1,
    },
    blockquote: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginHorizontal: -20,
      marginBottom: 20,
      marginTop: 20,
      backgroundColor: '#f3f3f3',
      lineHeight: TextSize.BODY * getLineHeightValue(1.6),
    },
    inlineCode: {
      borderRadius: 3,
      borderWidth: 1,
      fontFamily: 'Courier',
      fontWeight: 'bold',
    },
    list: {},
    listItem: {
      flex: 1,
      flexWrap: 'wrap',
      marginVertical: 0,
    },
    listUnordered: {
      marginBottom: 20,
    },
    listUnorderedItem: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'baseline',
    },
    listUnorderedItemIcon: {
      marginLeft: 2,
      marginRight: 10,
      marginTop: 15,
      width: 4,
      aspectRatio: 1,
      borderRadius: 4,
      lineHeight: TextSize.BODY * getLineHeightValue(1.6),
      alignSelf: 'flex-start',
    },
    listUnorderedItemText: {
      lineHeight: TextSize.BODY * getLineHeightValue(1.6),
    },
    listOrdered: {},
    listOrderedItem: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'baseline',
    },
    listOrderedItemIcon: {
      marginLeft: 0,
      marginRight: 10,
      minWidth: 13,
      alignSelf: 'flex-start',
      justifyContent: 'flex-start',
    },
    listItemText: {},
    div: {},
    paragraph: {
      marginTop: 5,
      marginBottom: 10,
    },
    paragraphText: {
      fontSize: TextSize.BODY,
      lineHeight: TextSize.BODY * getLineHeightValue(1.6),
    },
    hardbreak: {
      width: '100%',
      height: 1,
    },
    strong: {
      fontWeight: 'bold',
    },
    table: {
      borderWidth: 1,
      borderColor: '#000000',
      borderRadius: 3,
    },
    tableHeader: {},
    tableBody: {},
    tableHeaderCell: {
      flex: 1,
      padding: 5,
    },
    tableRow: {
      borderBottomWidth: 1,
      borderColor: '#000000',
      flexDirection: 'row',
    },
    tableRowCell: {
      flex: 1,
      padding: 5,
    },
    strikethrough: {
      textDecorationLine: 'line-through',
    },
    pre: {},
    link: {},
    linkLabel: {},
    img: {},
  })

  return { ...defaultStyles, ...userStyles }
}
