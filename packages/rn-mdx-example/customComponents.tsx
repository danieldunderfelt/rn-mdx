import { Text, View } from 'react-native'
import React from 'react'

export const ColorBox = props => {
  let { label, color = 'red', labelColor = 'white' } = props

  return (
    <View style={{ backgroundColor: color, width: 100, height: 100 }}>
      {label && <Text style={{ color: labelColor }}>{label}</Text>}
    </View>
  )
}

export const ColorText = props => {
  let { color = 'white' } = props
  return <Text style={{ color, fontSize: 18 * 1.15 }}>{props.children}</Text>
}
