import React from 'react'
import { View, ViewStyle, StyleProp, DimensionValue } from 'react-native'
import { useTheme } from 'styled-components/native'
import { AppTheme } from '@/types'

interface ContainerProps {
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  backgroundColor?: keyof AppTheme['colors'] | string
  padding?: keyof AppTheme['spacing'] | number
  margin?: keyof AppTheme['spacing'] | number
  horizontalPadding?: keyof AppTheme['spacing'] | number
  verticalPadding?: keyof AppTheme['spacing'] | number
  horizontalMargin?: keyof AppTheme['spacing'] | number
  verticalMargin?: keyof AppTheme['spacing'] | number
  alignItems?: ViewStyle['alignItems']
  justifyContent?: ViewStyle['justifyContent']
  flexDirection?: ViewStyle['flexDirection']
  flex?: number
  height?: DimensionValue
}

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  backgroundColor,
  padding,
  margin,
  horizontalPadding,
  verticalPadding,
  horizontalMargin,
  verticalMargin,
  alignItems,
  justifyContent,
  flexDirection,
  flex,
  height,
}) => {
  const theme = useTheme() as AppTheme

  const bgColor =
    backgroundColor && backgroundColor in theme.colors
      ? String(theme.colors[backgroundColor as keyof AppTheme['colors']])
      : String(backgroundColor || theme.colors.background)

  const resolveSpacing = (value: keyof AppTheme['spacing'] | number | undefined) => {
    if (value === undefined) return undefined
    if (typeof value === 'string') return theme.spacing[value]
    return theme.rs(value)
  }

  const containerStyle: ViewStyle = {
    backgroundColor: bgColor,
    padding: resolveSpacing(padding),
    margin: resolveSpacing(margin),
    paddingHorizontal: resolveSpacing(horizontalPadding),
    paddingVertical: resolveSpacing(verticalPadding),
    marginHorizontal: resolveSpacing(horizontalMargin),
    marginVertical: resolveSpacing(verticalMargin),
    alignItems,
    justifyContent,
    flexDirection,
    flex,
    height,
  }

  return <View style={[containerStyle, style]}>{children}</View>
}
