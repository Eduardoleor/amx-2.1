import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ComponentProps } from 'react'
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native'

type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>

const MAPPING: IconMapping = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
}

export interface IconSymbolProps {
  name: keyof typeof MAPPING
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
  weight?: string
}

export const IconSymbol = ({ name, size = 24, color, style }: IconSymbolProps) => (
  <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />
)
