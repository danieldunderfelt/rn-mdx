import * as React from 'react'
import { useCallback, useContext, useState } from 'react'
import { Dimensions, PixelRatio, View, ViewStyle } from 'react-native'
import { ReactChildProp } from '../types'

const PERCENT = /[\d.]+%/
const VIEWPORT_WIDTH = /[\d.]+vw/
const VIEWPORT_HEIGHT = /[\d.]+vh/
const PIXEL = /(\d+)px/g
const REM = /[\d.]+rem/
const MATH_EXP = /[+\-/*]?[\d.]+(px|%|em|rem|vw|vh)?/g
const PLACEHOLDER = '$1'
const ONLYNUMBERS = /[\s\-0-9]/g

type ElementSize = {
  width: number
  height: number
}

const window: ElementSize = Dimensions.get('window')
const CalcContext = React.createContext<ElementSize>(window)

type CalcRootProps = {
  children: ReactChildProp
  style: ViewStyle
}

export const CalcRoot: React.FC<CalcRootProps> = ({ style, children }) => {
  const [measured, setMeasured] = useState(false)
  const [parentSize, setParentSize] = useState<ElementSize>(window)

  const onLayout = useCallback(
    event => {
      if (measured) {
        return
      }

      const { width, height } = event.nativeEvent.layout
      setParentSize({ width, height })
      setMeasured(true)
    },
    [measured]
  )

  return (
    <View
      onLayout={onLayout}
      style={{
        width: '100%',
        height: '100%',
        ...style,
      }}>
      <CalcContext.Provider value={parentSize}>{children}</CalcContext.Provider>
    </View>
  )
}

type CalcName = 'width' | 'height'

interface ICalcProps {
  value: string
  name?: CalcName
  remBase?: number
  win?: ElementSize
  parent?: ElementSize
}

export const calc = ({ name, value, win = window, parent = window }: ICalcProps) => {
  if (!value) {
    return parseFloat(value)
  }

  const formula = value
  const matches = formula.match(MATH_EXP)

  let currentFormula = formula.replace(PIXEL, PLACEHOLDER)

  matches?.forEach(match => {
    let refValue
    let modifier

    if (match.match(PERCENT)) {
      refValue = name === 'height' ? parent.height : parent.width
      modifier = parseFloat(match) / 100
    } else if (match.match(VIEWPORT_WIDTH)) {
      refValue = win.width
      modifier = parseFloat(match) / 100
    } else if (match.match(VIEWPORT_HEIGHT)) {
      refValue = win.height
      modifier = parseFloat(match) / 100
    } else if (match.match(REM)) {
      refValue = (win.width / 850) * Math.min(Math.max(win.height / win.width, 1.5), 2)
      modifier = parseFloat(match)
    }

    if (modifier) {
      currentFormula = currentFormula.replace(match, `${refValue * modifier}`)
    }
  })

  if (currentFormula.match(ONLYNUMBERS)) {
    const result = eval('(' + currentFormula + ')') // eslint-disable-line no-eval
    return PixelRatio.roundToNearestPixel(parseFloat(result))
  }

  return parseFloat(value)
}

export const useCalc = (value: string, name: CalcName = 'width') => {
  const calcRoot = useContext(CalcContext)

  return calc({
    value,
    name,
    win: window,
    parent: calcRoot,
  })
}

export const rem = (value: number, height = false) => {
  return calc({
    value: `${value}rem`,
    name: height ? 'height' : 'width',
  })
}

export const calcWidth = (value: number | string) => {
  return calc({
    value: typeof value === 'number' ? `${value}vw` : value,
    name: 'width',
    win: window,
    parent: window,
  })
}

export const calcHeight = (value: number) => {
  return calc({
    value: typeof value === 'number' ? `${value}vh` : value,
    name: 'height',
    win: window,
    parent: window,
  })
}
