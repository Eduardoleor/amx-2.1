import { Platform } from 'react-native'

export type IconSymbolProps = {
  name: string
  size?: number
  color: string
  style?: any
  weight?: string
}

let IconComponent

if (Platform.OS === 'ios') {
  IconComponent = require('./IconSymbol.ios').IconSymbol
} else {
  IconComponent = require('./IconSymbol.android').IconSymbol
}

export const IconSymbol = IconComponent
