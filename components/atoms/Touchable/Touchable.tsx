import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from 'styled-components/native'
import { AppTheme } from '@/types'

export interface TouchableProps extends TouchableOpacityProps {
  backgroundColor?: keyof AppTheme['colors'] | string
  style?: StyleProp<ViewStyle>
  activeOpacity?: number
}

export const Touchable: React.FC<TouchableProps> = ({
  children,
  backgroundColor,
  style,
  activeOpacity = 0.7,
  ...rest
}) => {
  const theme = useTheme() as AppTheme

  let bgColor: string | undefined

  if (backgroundColor) {
    if (backgroundColor in theme.colors) {
      const colorValue = theme.colors[backgroundColor as keyof AppTheme['colors']]
      bgColor = typeof colorValue === 'string' ? colorValue : undefined
    } else {
      bgColor = backgroundColor
    }
  }

  return (
    <TouchableOpacity
      style={[style, backgroundColor ? { backgroundColor: bgColor } : undefined]}
      activeOpacity={activeOpacity}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
}
