import React from 'react'
import { StatusBar as RNStatusBar, StatusBarProps, ColorValue } from 'react-native'
import { useTheme } from 'styled-components/native'
import { AppTheme } from '@/types'

interface CustomStatusBarProps extends StatusBarProps {
  backgroundColor?: keyof AppTheme['colors'] | ColorValue
}

export const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  backgroundColor,
  barStyle,
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
  }

  const resolvedBarStyle =
    barStyle || (theme.themeMode === 'dark' ? 'light-content' : 'dark-content')

  return <RNStatusBar barStyle={resolvedBarStyle} backgroundColor={bgColor} {...rest} />
}
