import { StyleProp, StyleSheet } from 'react-native'
import { colors } from '../../style/colors'
import { createBaseSize, getLineHeightValue } from '../../style/Typography'
import { rem } from '../calc'

export const styles = (): { [key: string]: StyleProp<any> } => {
  let { TextSize } = createBaseSize()

  return StyleSheet.create({
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
      fontFamily: 'barlow-regular-italic',
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
      borderColor: colors.greyDark,
      borderStyle: 'solid',
      borderBottomWidth: StyleSheet.hairlineWidth,
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
    list: {
      ...this.view,
    },
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
      fontFamily: 'barlow-regular',
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
    listItemText: {
      fontFamily: 'barlow-regular',
    },
    div: {
      ...this.view,
    },
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
    image: {
      flex: 1,
    },
  })
}
