import { Platform, StyleSheet } from 'react-native'
import { rem } from '../utils/calc'

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
  DETAIL: rem(BaseTextSize.DETAIL),
  SMALL: rem(BaseTextSize.SMALL),
  BODY_SMALL: rem(BaseTextSize.BODY_SMALL),
  BODY: rem(BaseTextSize.BODY),
  BODY_LARGE: rem(BaseTextSize.BODY_LARGE),
  MEDIUM: rem(BaseTextSize.MEDIUM),
  LARGE: rem(BaseTextSize.LARGE),
  HEADING: rem(BaseTextSize.HEADING),
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
    DETAIL: rem(BaseTextSize.DETAIL),
    SMALL: rem(BaseTextSize.SMALL),
    BODY_SMALL: rem(BaseTextSize.BODY_SMALL),
    BODY: rem(BaseTextSize.BODY),
    BODY_LARGE: rem(BaseTextSize.BODY_LARGE),
    MEDIUM: rem(BaseTextSize.MEDIUM),
    LARGE: rem(BaseTextSize.LARGE),
    HEADING: rem(BaseTextSize.HEADING),
  }

  return { BaseTextSize, TextSize }
}

type MarkdownStyles = {
  headingBorder?: { paddingBottom: number }
  linkLabel?: {}
  paragraph?: { marginBottom: number; marginTop: number }
  strong?: { fontWeight: string }
  link?: {}
  listOrdered?: {}
  del?: { backgroundColor: string }
  hr?: { backgroundColor: string; height: number }
  tableRow?: { borderColor: string; flexDirection: string; borderBottomWidth: number }
  tableHeaderCell?: { padding: number; flex: number }
  div?: {}
  hardbreak?: { width: string; height: number }
  view?: {}
  listUnorderedItemText?: { lineHeight: number }
  listOrderedItemIcon?: {
    marginRight: number
    alignSelf: string
    minWidth: number
    justifyContent: string
    marginLeft: number
  }
  codeBlock?: {
    padding: number
    borderColor: string
    backgroundColor: string
    borderRadius: number
    borderWidth: number
  }
  codeInline?: {
    padding: number
    borderColor: string
    backgroundColor: string
    borderRadius: number
    borderWidth: number
  }
  root?: {}
  listItemText?: {}
  listUnordered?: { marginBottom: number }
  text?: {}
  strikethrough?: { textDecorationLine: string }
  table?: { borderColor: string; borderRadius: number; borderWidth: number }
  listUnorderedItemIcon?: {
    marginRight: number
    alignSelf: string
    borderRadius: number
    width: number
    aspectRatio: number
    lineHeight: number
    marginTop: number
    marginLeft: number
  }
  listItem?: { flexWrap: string; marginVertical: number; flex: number }
  tableBody?: {}
  tableRowCell?: { padding: number; flex: number }
  image?: { flex: number }
  blockquote?: {
    paddingVertical: number
    marginHorizontal: number
    backgroundColor: string
    paddingHorizontal: number
    marginBottom: number
    lineHeight: number
    marginTop: number
  }
  listOrderedItem?: { alignItems: string; flexDirection: string; justifyContent: string }
  paragraphText?: { fontSize: number; lineHeight: number }
  pre?: {}
  heading?: {}
  heading1?: { fontSize: number; lineHeight: number }
  em?: { lineHeight: number }
  list?: {}
  tableHeader?: {}
  headingContainer?: {
    marginHorizontal: number
    flexDirection: string
    paddingHorizontal: number
    marginBottom: number
    marginTop: number
  }
  heading2?: { fontSize: number; lineHeight: number }
  heading3?: { fontSize: number; lineHeight: number }
  heading4?: { fontSize: number; lineHeight: number }
  heading5?: { fontSize: number; lineHeight: number }
  heading6?: { fontSize: number; lineHeight: number }
  inlineCode?: {
    fontFamily: string
    borderRadius: number
    borderWidth: number
    fontWeight: string
  }
  listUnorderedItem?: { alignItems: string; flexDirection: string; justifyContent: string }
}

export const styles = (userStyles: MarkdownStyles = {}): MarkdownStyles => {
  let { TextSize } = createBaseSize()

  let defaultStyles: MarkdownStyles = StyleSheet.create({
    root: {},
    view: {},
    text: {},
    codeBlock: {
      borderWidth: 1,
      borderColor: '#CCCCCC',
      backgroundColor: '#f5f5f5',
      padding: 10,
      borderRadius: 4,
    },
    codeInline: {
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
      lineHeight: rem(TextSize.BODY * getLineHeightValue(1.6)),
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
      lineHeight: rem(TextSize.HEADING * getLineHeightValue(1.25)),
    },
    heading2: {
      fontSize: TextSize.LARGE,
      lineHeight: rem(TextSize.LARGE * getLineHeightValue(1.25)),
    },
    heading3: {
      fontSize: TextSize.MEDIUM,
      lineHeight: rem(TextSize.MEDIUM * getLineHeightValue(1.25)),
    },
    heading4: {
      fontSize: TextSize.BODY,
      lineHeight: rem(TextSize.BODY * getLineHeightValue(1.4)),
    },
    heading5: {
      fontSize: TextSize.BODY_SMALL,
      lineHeight: rem(TextSize.BODY_SMALL * getLineHeightValue(1.4)),
    },
    heading6: {
      fontSize: TextSize.SMALL,
      lineHeight: rem(TextSize.SMALL * getLineHeightValue(1.4)),
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
      lineHeight: rem(TextSize.BODY * getLineHeightValue(1.6)),
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
      lineHeight: rem(TextSize.BODY * getLineHeightValue(1.6)),
      alignSelf: 'flex-start',
    },
    listUnorderedItemText: {
      lineHeight: rem(TextSize.BODY * getLineHeightValue(1.6)),
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
      lineHeight: rem(TextSize.BODY * getLineHeightValue(1.6)),
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
    image: {
      flex: 1,
    },
  })

  return { ...defaultStyles, ...userStyles }
}
