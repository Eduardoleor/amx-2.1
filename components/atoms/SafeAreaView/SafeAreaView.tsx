import React from 'react'
import { SafeAreaView as RNSafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { ColorValue } from 'react-native'
import { useTheme } from 'styled-components/native'
import { AppTheme } from '@/types'

interface SafeAreaViewPropsExtended extends SafeAreaViewProps {
  backgroundColor?: keyof AppTheme['colors'] | ColorValue
}

export const SafeAreaView: React.FC<SafeAreaViewPropsExtended> = ({
  children,
  backgroundColor,
  style,
  ...rest
}) => {
  const theme = useTheme() as AppTheme

  let bgColor: ColorValue | undefined

  if (backgroundColor) {
    if (backgroundColor in theme.colors) {
      const themeColor = theme.colors[backgroundColor as keyof AppTheme['colors']]
      if (typeof themeColor === 'string') {
        bgColor = themeColor
      } else if (typeof themeColor === 'object' && 'main' in themeColor) {
        bgColor = themeColor.main as ColorValue
      }
    } else {
      bgColor = backgroundColor
    }
  } else {
    bgColor = theme.colors.background
  }

  return (
    <RNSafeAreaView style={[{ backgroundColor: bgColor }, style]} {...rest}>
      {children}
    </RNSafeAreaView>
  )
}
