import React from 'react'
import { Platform, StyleProp, TextProps, TextStyle } from 'react-native'
import styled from 'styled-components/native'
import { getIsTablet } from '../constants'
import { ReactChildProp } from '../types/common'
import { rem } from '../utils/calc'
import { colors } from './colors'

export enum TextWeight {
  REGULAR = 'regular',
  MEDIUM = 'medium',
  BOLD = 'bold',
  BLACK = 'black',
}

function platformValue(val: number) {
  if (Platform.OS === 'ios' && getIsTablet()) {
    return val * 0.8
  }

  if (Platform.OS === 'ios') {
    return val * 1.15
  }

  return val
}

export function getLineHeightValue(val: number) {
  if (Platform.OS === 'ios' && getIsTablet()) {
    return val * 0.7
  }

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

type TextSizeValue = number

export interface ITypographyProps {
  italic?: boolean
  weight?: TextWeight
  size?: TextSizeValue
  color?: string
  children: ReactChildProp
  style?: StyleProp<TextStyle>
  serif?: boolean
  adjustToFit?: boolean
  textProps?: TextProps
}

const DEFAULT_FONT = 'barlow'

export type TypographyStyleProps = {
  italic?: boolean
  weight?: TextWeight
  size?: TextSizeValue
  color?: string
  family?: string
} & TextProps

const TypographyView = styled.Text<TypographyStyleProps>`
  font-family: '${DEFAULT_FONT}-${p => p.weight}${p => (p.italic ? '-italic' : '')}';
  font-size: ${p => p.size}px;
  color: ${p => p.color};
  line-height: ${p => rem(p.size * getLineHeightValue(1.6))}px;
`

const Typography = ({
  children,
  style,
  weight = TextWeight.REGULAR,
  size = TextSize.BODY,
  color = colors.blueDark,
  italic = false,
  adjustToFit = false,
  textProps = {},
}: ITypographyProps) => {
  createBaseSize()

  return (
    <TypographyView
      adjustsFontSizeToFit={adjustToFit}
      style={style}
      italic={italic}
      color={get(colors, color, color)}
      weight={weight}
      size={size}
      {...textProps}>
      {children}
    </TypographyView>
  )
}

export default Typography
